import React from "react";
import "./Sidebar.css";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import { Avatar, IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutSmallIcon />
          </IconButton>
          <IconButton>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input placeholder="search or start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat />
      </div>
    </div>
  );
};

export default Sidebar;
