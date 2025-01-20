import React from "react";
import { Document } from "../ui/icons";

const SavedDocuments = () => {
  return (
    <div className="w-60 h-72 border rounded-xl group">
      <article className="flex items-center justify-center p-5 h-[70%] border-b group-hover:opacity-50 group-hover:cursor-pointer group-hover:bg-gray-400 transition-all">
        <Document />
      </article>
      <article className="flex items-center p-2 h-[30%]">
        <div>
          <p>File name</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
      </article>
    </div>
  );
};

export default SavedDocuments;
