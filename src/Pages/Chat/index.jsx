import { useAppStore } from "@/store"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Chat = () => {
  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast('Please Setup Profile to continue.');
      navigate('/profile');
    }
  },[userInfo , navigate])
  return (
    <div>
      
    </div>
  )
}

export default Chat
