"use client";
import React, { useState } from "react";
import { Chat } from "../components";

const ChatWithNote = () => {
  const [message, setMessage] = useState("");
  const [height, setHeight] = useState(40);

  // Functions to adjust height based on content
  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    const textarea = e.currentTarget;
    // textarea.style.height = "auto";
    setHeight(150);
  };

  const handleFocus = (e: TextAreaFocusEvent): void => {
    const textarea = e.target;
    // textarea.style.height = "auto";
    if (message) {
      setHeight(150);
    }
  };

  const handleBlur = (e: TextAreaFocusEvent): void => {
    const textarea = e.target;
    // textarea.style.height = "auto";
    setHeight(40);
  };
  return (
    <div className="flex">
      <section className="w-[10%] h-screen border-r-2 mr-2 p-2">Chats </section>
      <section className="p-5 sm:p-10 w-[90%]">
        <Chat
          isUser={false}
          name="Bonnie Green"
          time="11:46"
          message="That's awesome. I think our users will really appreciate the
          improvements."
          image="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/7DB1/production/_131577123_gettyimages-1725013151.jpg"
        />
        <Chat
          isUser={true}
          name="Bonnie Green"
          time="11:46"
          message="That's awesome. I think our users will really appreciate the
          improvements."
          image="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/7DB1/production/_131577123_gettyimages-1725013151.jpg"
        />
        <Chat
          isUser={false}
          name="Bonnie Green"
          time="11:46"
          message="That's awesome. I think our users will really appreciate the
          improvements."
          image="https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/7DB1/production/_131577123_gettyimages-1725013151.jpg"
        />

        <div className="flex items-center justify-center">
          <textarea
            className="fixed bottom-10 w-1/2 rounded-xl resize-none p-2 hide-scrollbar"
            placeholder="Type a message..."
            rows={1}
            style={{ height: `${height}px` }}
            onChange={(e) => setMessage(e.target.value)}
            onInput={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </section>
      {/* <Chat /> */}
    </div>
  );
};

export default ChatWithNote;
