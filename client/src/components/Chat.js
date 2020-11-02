import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

let socket;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState(null);
  const { id } = useParams();
  const ENDPOINT = "http://localhost:5000";
  const fetchConversation = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/chat/conversation/${id}`,
      { withCredentials: true }
    );
    console.log(res.data.data);
    setMessages(res.data.data.messages);
    setConversation(res.data.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchConversation();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("join", id);
    socket.on("messageClient", (data) => {
      console.log(data);
      const messageData = data;
      console.log(messageData);
      setMessages((messages) => [...messages, messageData]);
    });
    //eslint-disable-next-line
  }, []);
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const sendMessage = () => {
    const messageObj = {
      from: conversation.participant1._id,
      to: conversation.participant2._id,
      body: message,
      conversationId: id,
    };
    socket.emit("messageServer", messageObj);
    setMessages((messages) => [...messages, messageObj]);
    setMessage("");
  };
  if (loading) {
    return <div>loading....</div>;
  }
  return (
    <div>
      {messages &&
        messages.map((message) => (
          <>
            <div>
              {message.from}:{message.body}
              <br />
            </div>
          </>
        ))}
      <input id="password" value={message} onChange={onChange} />
      <button onClick={sendMessage}>send</button>
    </div>
  );
};

export default Chat;
