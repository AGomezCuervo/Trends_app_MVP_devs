import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {ChatListContact} from "../index";
import { selectUserProfile } from "../../Redux/UsersSlice";
import { selectListChats, setListChats } from "../../Redux/chatSlice";
const viteUrl = import.meta.env.VITE_URL;

const ChatListContactContainer = () => {
    const user = useSelector(selectUserProfile);
    const listChats = useSelector(selectListChats);

    const dispatch = useDispatch();

    useEffect(()=>{
      if(Object.keys(user).length > 0){
        dispatch(setListChats(user.id))
      }
    },[user])

  return (
    <div className="flex flex-col w-full h-auto">
      {
        listChats?.map((conversation, index)=>{
            return(
                <ChatListContact
                  key={index}
                  id={conversation.id}
                  isGroup={conversation.isGroup}
                  name={conversation.name}
                  image={conversation.image}
                  last_message={conversation.last_message}
                  last_message_date={conversation.last_message_date}
                  no_read_counter={conversation.no_read_counter}
                  bio={"bio placeholder"}
                  show_last_message={true}
                />
            )
        })
      }
    </div>
  )
}

export default ChatListContactContainer;