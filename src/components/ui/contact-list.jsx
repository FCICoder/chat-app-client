import { useAppStore } from "@/store";
import { Avatar } from "./avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { useEffect } from "react";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    setSelectedChatMessages,
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    
  } = useAppStore();
  console.log(contacts);
  
  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact?._id) {
      setSelectedChatMessages([]);
    }
  };

  useEffect(()=>{
    console.log(selectedChatType);
    if(selectedChatType === "contact"){
        setSelectedChatMessages([]);
      }else if(selectedChatType === "channel"){
        setSelectedChatMessages([]);
      }
    
    
  },[selectedChatType === undefined])
  return (
    <>
    {
      selectedChatType === "channel" || selectedChatType === "contact" || selectedChatType === undefined ?
      <div className="mt-5">
      {contacts?.map((contact , index) => (
        // console.log(contact)
        <div 
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact?._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
          key={index}
        >
          <div className="flex gap-5 items-center justify-start text-neutral-300">
            {!isChannel && (
              <Avatar className="h-6 w-6  rounded-full overflow-hidden">
                {contact?.image ? (
                    <>
                  <AvatarImage
                    className="object-cover w-full h-full bg-black"
                    src={`${HOST}/${contact?.image}`}
                    alt="profile"
                  />
                    </>
                ) : (
                  <div
                    className={`
                      ${selectedChatData&&selectedChatData._id === contact?._id ? "bg-[#ffffff22] border border-white/70" : getColor(contact?.color)}
                      uppercase h-6 w-6  text-lg border-[1px] flex items-center justify-center rounded-full`}
                  >
                    {contact?.firstName
                      ? contact?.firstName.split("").shift()
                      : contact?.email.split("").shift()}
                    
                  </div>
                )}
              </Avatar>

            )}
              {
                isChannel && <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">#</div>
              }
              {
                isChannel ? <span>{contact?.name}</span> : <span>{`${contact?.firstName} ${contact?.lastName}`}</span>
              }  
          </div>
        </div>
      ))}
    </div> : ''}
    </>
  );
};

export default ContactList;
