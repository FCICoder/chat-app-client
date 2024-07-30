import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTES } from "@/utils/constants";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {  IoPowerSharp } from "react-icons/io5";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
  
const ProfileInfo = () => {
  const navigate = useNavigate();
  const { userInfo ,setUserInfo } = useAppStore();
  
  const logOut = async (userInfo) => {
    try {
      const res = await apiClient.post(LOGOUT_ROUTES , {} , {withCredentials: true});
      
      if(res.status === 200) {
        setUserInfo(null);
        navigate('/auth');
      }
    
    } catch (error) {
      console.log(error);
      toast.error("Failed to log out.");
    }
  }; 
  return (
    <div className="absolute bottom-0 h-16 flex justify-between items-center px-5 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-8 h-8 relative">
          <Avatar className="h-8 w-8  rounded-full overflow-hidden">
            {userInfo?.image ? (
              <AvatarImage
                className="object-cover w-full h-full bg-black"
                src={`${HOST}/${userInfo?.image}`}
                alt="profile"
              />
            ) : (
              <div
                className={` uppercase h-8 w-8  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo?.color
                )}`}
              >
                {userInfo?.firstName
                  ? userInfo?.firstName.split("").shift()
                  : userInfo?.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div className=" ">
          <p className="lg:text-sm  font-mono ">
            {userInfo?.firstName && userInfo?.lastName
              ? `${userInfo?.firstName} ${userInfo?.lastName}`
              : ""}
          </p>
        </div>
      </div>
      <div className="flex gap-5  ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <FiEdit2 className='text-purple-500 text-xl font-medium'
                onClick={()=>navigate('/profile')} />
            </TooltipTrigger>
            <TooltipContent className='bg-[#1c1b1e] border-none text-white'>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <IoPowerSharp className='text-red-500 text-xl font-medium'
                onClick={logOut} />
            </TooltipTrigger>
            <TooltipContent className='bg-[#1c1b1e] border-none text-white'>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;
