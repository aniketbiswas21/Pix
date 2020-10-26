import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

let socket;

const Chat = () => {
  //   const [messages, setMessages] = useState(null);
  //   const { id } = useParams();
  //   const ENDPOINT = "http://localhost:5000";
  //   const fetchConversation = async () => {
  //     const res = await axios.post(
  //       `http://localhost:5000/api/chat/add-conversation/${id}`,
  //       { withCredentials: true }
  //     );
  //     setMessages(res.data.messages);
  //   };
  //   useEffect(() => {
  //     fetchConversation();
  //   }, []);

  //   useEffect(() => {
  //     socket = io(ENDPOINT);
  //     socket.emit("join", current._id);
  //     socket.on("messageClient", (data) => {
  //       console.log(data);
  //       addMessageState(data.data);
  //     });
  //   }, []);
  return <div>chat</div>;
};

export default Chat;
