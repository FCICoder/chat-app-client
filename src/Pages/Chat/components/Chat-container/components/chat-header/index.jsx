import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData , selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center justify-between w-full">
        <div className="flex gap-3 items-center justify-center  ">
          <div className="w-8 h-8 relative">
            {
              selectedChatType === 'contact' ? <Avatar className="h-8 w-8  rounded-full overflow-hidden">
              {selectedChatData?.image ? (
                <AvatarImage
                  className="object-cover w-full h-full bg-black"
                  src={`${HOST}/${selectedChatData?.image}`}
                  alt="profile"
                />
              ) : (
                <div
                  className={` uppercase h-8 w-8  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedChatData?.color
                  )}`}
                >
                  {selectedChatData?.firstName
                    ? selectedChatData?.firstName.split("").shift()
                    : selectedChatData?.email.split("").shift()}
                </div>
              )}
            </Avatar> 
            :
            <div className="bg-[#ffffff22] h-8 w-8 flex items-center justify-center rounded-full ">#</div>
            }
            
          </div>
          <div className="">
            {
              selectedChatType === 'channel' && <div className="ms-2"> <span >{selectedChatData.name}</span></div>
            }
            {
              selectedChatType ==='contact' && selectedChatData.firstName + ' ' + selectedChatData.lastName ?
              selectedChatType ==='contact' && selectedChatData.firstName + ' ' + selectedChatData.lastName :
              selectedChatData.email
            }
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button
            onClick={closeChat}
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
