import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES_ROUTE, HOST } from "@/utils/constants";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowDown, IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatData,
    selectedChatType,
    selectedChatMessages,
    setSelectedChatMessages,
    setIsDownloading,
    setFileDownloadProgress,
  } = useAppStore();
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const downloadFile = async (url) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const res = await apiClient.get(`${HOST}/${url}`, {
      responseType: "blob",
      withCredentials: true,
      onDownloadProgress: (progress) =>{
        const {loaded , total } = progress;
        const percentCompleted = Math.round((loaded*100)/total);
        setFileDownloadProgress(percentCompleted); 
      }
    });

   
    const urlBlob = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
    setFileDownloadProgress(0);
  };
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          { withCredentials: true }
        );
        if (res.data.messages) {
          setSelectedChatMessages(res.data.messages);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((msg, index) => {
      const messageDate = moment(msg.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={index}>
          {showDate && (
            <div className="text-sm text-center text-gray-500 my-2">
              {moment(msg.timeStamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(msg)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#b68ae7]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#b68ae7]/5 text-white/80 border-white/20"
          } border inline-block p-3 border-none   rounded-md my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#b68ae7]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#b68ae7]/5 text-white/80 border-white/20"
          } border inline-block p-3 border-none   rounded-md my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileURL) ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowImage(true);
                setImageUrl(message.fileURL);
              }}
            >
              <img
                src={`${HOST}/${message.fileURL}`}
                height={300}
                width={300}
                alt=""
              />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <span className="text-white/80 md:text-xl text-xs bg-black/20 rounded-full p-3">
                <MdFolderZip />
              </span>
              <span className="md:text-sm text-xs">{message.fileURL.split("/").pop()}</span>
              <span
                className="bg-black/20 p-3 md:text-xl text-xs rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                onClick={() => downloadFile(message.fileURL)}
              >
                <IoMdArrowRoundDown />
              </span>
            </div>
          )}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timeStamp).format("LT")}
      </div>
    </div>
  );
  return (
    <div className="flex-1 overflow-y-auto  scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw w-full]">
      {renderMessages()}

      <div ref={scrollRef} />
      {showImage && (
        <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
          <div>
            <img
              src={`${HOST}/${imageUrl}`}
              alt=""
              className="sm:h-[75vh] w-full bg-cover "
            />
          </div>
          <div className="flex gap-5 fixed top-0 mt-5">
            <button 
            onClick={()=> downloadFile(imageUrl)}
            className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300">
              <IoMdArrowDown /> 
            </button>

            <button 
            onClick={()=> {
              setShowImage(false);
              setImageUrl(null); 
            }}
            className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300">
              <IoCloseSharp /> 
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
