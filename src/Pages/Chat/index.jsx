import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/Contacts-container";
import EmptyChatContainer from "./components/Empty-chat-container";
import ChatContainer from "./components/Chat-container";

const Chat = () => {
  const {userInfo , selectedChatType , selectedChatData} = useAppStore();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast('Please Setup Profile to continue.');
      navigate('/profile');
    }
  },[userInfo , navigate])
  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactsContainer />
      {
        selectedChatType === undefined ? (
          <EmptyChatContainer />
        ) : (
          <ChatContainer selectedChatData={selectedChatData} />
        )
      }

    </div>
  )
}

export default Chat
