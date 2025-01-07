import React from "react";

interface ChatProps {
  name: string;
  time: string;
  message: string;
  image: string;
  isUser: boolean;
}

const Chat: React.FC<ChatProps> = ({ name, time, message, image, isUser }) => {
  return (
    <section className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="flex items-start gap-2.5">
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={image}
          alt="Jese image"
        />
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {name}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {time}
            </span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {message}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Chat;
