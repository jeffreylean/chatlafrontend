import React, { useState, useEffect } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import {
  SearchOutlined,
  MoreVert,
  AttachFile,
  SettingsInputAntenna,
} from "@material-ui/icons";
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios";
import Pusher from "pusher-js";
import { auth } from "./firebase";

const Chat = () => {
  const user = auth.currentUser;
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/message/sync").then((response) => {
      console.log(response.data);
      response.data.forEach(function (data) {
        if (data.name != user.email) {
          data.received = true;
        }
      });
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("ddc4f9fc71b16a4c66ba", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      if (newMessage.name != user.email) {
        newMessage.received = true;
      }
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/message/new", {
      message: input,
      name: user.email,
      timestamp: `${Date.now.toString()}`,
      received: false,
    });

    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>room name</h3>
          <p>hahaha</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${!message.received && "chat__receiver"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmotionIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
