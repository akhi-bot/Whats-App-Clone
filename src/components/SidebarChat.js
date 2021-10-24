import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./SidebarChat.module.css";
import db from "../firebase";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const  [message, setMessage] = useState('')
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 4000));
  }, []);

  useEffect(() => {
    if(id) {
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => (
        setMessage(snapshot?.docs[0]?.data())
      ))
    }
  }, [id])



  const createChat = async () => {
    const roomName = prompt("please enter name for chat room");
    if (roomName) {
      // do some clever database stuff...

      db.collection('rooms').add({
        name: roomName
      })
    }
  };
  
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className={classes.sidebarChat}>
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className={classes.sidebarChat__info}>
        <h2>{name}</h2>
        <p>{message?.message}</p>
      </div>
    </div>
    </Link>
  ) : (
    <div onClick={createChat} className={classes.sidebarChat}>
      <h2>Add new Chat</h2>
    </div>
  );
};

export default SidebarChat;
