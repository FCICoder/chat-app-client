import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {  IoPowerSharp } from "react-icons/io5";
  
const ProfileInfo = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();
  
  const logOut = async (userInfo) => {}; 
  return (
    <div className="absolute bottom-0 h-16 flex justify-between items-center px-5 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative">
          <Avatar className="h-12 w-12  rounded-full overflow-hidden">
            {userInfo?.image ? (
              <AvatarImage
                className="object-cover w-full h-full bg-black"
                src={`${HOST}/${userInfo?.image}`}
                alt="profile"
              />
            ) : (
              <div
                className={` uppercase h-12 w-12  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
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
          <p className=" font-mono ">
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
