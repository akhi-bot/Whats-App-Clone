import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import classes from "./Chat.module.css";
import SearchOutLined from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "../firebase";
import firebase from "firebase/compat/app";
import { useStateValue } from "../StateProvider";

const Chat = () => {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const iconStyle = classes["MuiSvgIcon-root"];
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useStateValue()[0];
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 4000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you entered>>", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div className={classes.chat}>
      <div className={classes.chat__header}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className={classes.chat__headerInfo}>
          <h3>{roomName}</h3>
          <p>{`Last seen ${new Date(
            messages[messages.length - 1]?.data.timestamp?.toDate()
          ).toLocaleString()}`}</p>
        </div>

        <div className={classes.chat__headerRight}>
          <IconButton>
            <SearchOutLined />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className={classes.chat__body}>
        {messages.map((message) => (
          <p
            className={`${classes.chat__message} ${
              message.data.name === user.displayName && classes.chat__receiver
            }`}
            key={message.id}
          >
            <span className={classes.chat__name}>{message.data.name}</span>
            {message.data.message}
            <span className={classes.chat__timestamp}>
              {new Date(message.data.timestamp?.toDate()).toLocaleString()}
            </span>
          </p>
        ))}
      </div>

      <div className={classes.chat__footer}>
        <InsertEmoticonIcon className={iconStyle} />
        <form action="">
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        {!input ? (
          <MicIcon className={iconStyle} />
        ) : (
          <button onClick={sendMessage} type="submit">
            <SendIcon className={iconStyle} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Chat;
