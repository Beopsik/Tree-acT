import React from "react";
import { useEffect } from "react";
import { MessageData } from "../../../common/types";
import { sampleData, sampleGenerateMessage } from "../../../common/sampleData";

interface vscode {
  postMessage(message: MessageData): void;
}

declare const vscode: vscode;

const postData = () => {
  vscode.postMessage(sampleGenerateMessage);
};

const PostTest = () => {
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data; // The JSON data our extension sent

      console.log(message.data);
    });
  });

  return (
    <>
      <button onClick={postData}>Generate React Project</button>
    </>
  );
};

export default PostTest;
