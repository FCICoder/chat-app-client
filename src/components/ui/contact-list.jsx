import { useAppStore } from "@/store";
import { Avatar } from "./avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {
  const {
    setSelectedChatMessages,
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessages([]);
    }
  };
  return (
    <div className="mt-5">
      {contacts?.map((contact) => (
        // console.log(contact)
        <div
          className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] hover:bg-[#8417ff]"
              : "hover:bg-[#f1f1f111]"
          }`}
          onClick={() => handleClick(contact)}
          key={contact._id}
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
                    className={` uppercase h-6 w-6  text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                      contact?.color
                    )}`}
                  >
                    {contact?.firstName
                      ? contact?.firstName.split("").shift()
                      : contact?.email.split("").shift()}
                    
                  </div>
                )}
              </Avatar>

            )}
              {contact?.firstName
                ? contact?.firstName + " " + contact?.lastName
                : contact?.email}  
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
