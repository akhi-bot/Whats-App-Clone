import classes from "./Sidebar.module.css";
import { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import SearchOutLined from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "../StateProvider";
import db from '../firebase'

const Sidebar = () => {
  const {user} = useStateValue()[0]
  const iconStyle = classes["MuiSvgIcon-root"];
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
      setRooms(snapshot.docs.map(doc =>({
        id: doc.id,
        data: doc.data()
      })))
    ))

    return () => {
      unsubscribe()
    }
  },[])

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__header}>
        <Avatar src={user?.photoURL} />
        <div className={classes.sidebar__headerRight}>
          <IconButton>
            <DonutLargeIcon className={iconStyle} />
          </IconButton>
          <IconButton>
            <ChatIcon className={iconStyle} />
          </IconButton>
          <IconButton>
            <MoreVertIcon className={iconStyle} />
          </IconButton>
        </div>
      </div>
      <div className={classes.sidebar__search}>
        <div className={classes.sidebar__searchContainer}>
          <SearchOutLined className={iconStyle} />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className={classes.sidebar__chats}>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
