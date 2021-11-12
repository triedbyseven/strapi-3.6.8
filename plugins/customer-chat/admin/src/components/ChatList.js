import React from 'react';
import ChatItem from './Chat/ChatItem';
import { motion } from 'framer-motion';

const variants = {
  visible: i => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.025,
    },
  }),
  hidden: { opacity: 0, x: 100 },
};

const ChatList = (props) => {
  if (props.conversations.length === 0) return null;
  
  return props.conversations.map((chat, index) => (
    <div key={chat.sid}>
      <motion.div
        custom={index}
        initial="hidden"
        animate="visible"
        variants={variants}
      >
        <ChatItem 
          index={index}
          chat={chat} 
          currentConversation={props.currentConversation} 
          orijin={props.orijin} 
        />
      </motion.div>
    </div>
  ));
}
 
export default ChatList;