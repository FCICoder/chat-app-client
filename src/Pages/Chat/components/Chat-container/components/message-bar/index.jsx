import { useSocket } from "@/context/SocketContext";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { UPLOAD_FILES_ROUTE } from "@/utils/constants";
import EmojiPicker from "emoji-picker-react";
import { Contact } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { toast } from "sonner";
const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const {
    selectedChatData,
    selectedChatType,
    userInfo,
    setIsUploading,
    setFileUploadProgress,
  } = useAppStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleAddEmojiPicker = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  };
  const handleSendMessage = async () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        content: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileURL: undefined,
      });


    }else if (selectedChatType === "channel"){
      socket.emit("send-channel-message", {
        sender: userInfo.id,
        content: message,
        messageType: "text",
        fileURL: undefined,
        channelId: selectedChatData._id
      });
    }
    setMessage("");
    setEmojiPickerOpen(false);
  };

  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAttachmentChange = async (e) => {

    try {
      const file = e.target.files[0];
      console.log(file);
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);
        const res = await apiClient.post(UPLOAD_FILES_ROUTE, formData, {
          withCredentials: true,
          onUploadProgress: data => {setFileUploadProgress(Math.round(100*data.loaded)/data.total);}
        });
        console.log(res);
        if (res.status === 200) {
          setIsUploading(false);
          if (selectedChatType === "contact") {
            console.log(Contact);
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileURL: res.data.filePath,
            });
          }else if (selectedChatType === "channel"){
            socket.emit("send-channel-message", {
              sender: userInfo.id,
              content: undefined,
              messageType: "file",
              fileURL: res.data.filePath,
              channelId: selectedChatData._id
            });
          }
          setEmojiPickerOpen(false);
        } else {
          toast.error("Failed to upload file.");
        }
      } else {
        toast.error("Please select a file.");
      }
    } catch (err) {
      setIsUploading(false);
      console.log(err);
    }
  };
  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md gap-5 pr-5 ">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleAttachmentClick}
          className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
        >
          <GrAttachment className="text-2xl" />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAttachmentChange}
          />
        </button>
        <div className=" flex  relative">
          <button
            onClick={() => setEmojiPickerOpen(true)}
            className=" text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0 " ref={emojiRef}>
            <EmojiPicker
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmojiPicker}
              autoFocusSearch={false}
              theme="dark"
            />
          </div>
        </div>
      </div>
      <button
        onClick={handleSendMessage}
        className="bg-[#8417ff] rounded-md me-0 flex items-center justify-center p-5  focus:border-none hover:bg-[#501f88] focus:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all"
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
