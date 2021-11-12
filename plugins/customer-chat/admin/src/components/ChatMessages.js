import React from 'react';
import PrimaryLoader from './Loaders/PrimaryLoader';
import style from '../styles/style.css';
import ChatMessageImage from './ChatMessageImage';
import { motion } from 'framer-motion';

const variants = {
  visible: i => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.025,
    },
  }),
  hidden: { opacity: 0, x: 50 },
};

const ChatMessages = (props) => {
  const messages = props.messages;
  const messageLength = props.messages;
  const isLoadingMessages = props.isLoadingMessages;
  const messagesEndRef = props.messagesEndRef;

  if (messageLength === 0 || isLoadingMessages) return <PrimaryLoader />;

  return (
    <div className={"flex flex-col parentDiv"}>
      <div className={"childDiv"} style={{height: '100%', paddingTop: 10}}>
        {messages.map((message, index) => {

          const messageType = message.author === "The Divine Med Spa" ?
            `mr-2 py-3 px-4 bg-black rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white`
            : `ml-2 py-3 px-4 bg-purple-600 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white`;

          const messageType2 = message.author === "The Divine Med Spa" ?
            `flex justify-end mb-4 px-5`
            : `flex justify-start mb-4 px-5`;

          /* If media is available */
          if (message.type === 'media') return (
            <motion.div key={message.sid} className={`${messageType2}`} custom={index} initial="hidden"
              animate="visible"
              variants={variants}>
              <div className={`${messageType}`}>
                <div style={{ fontWeight: 'bold' }}>{message.author === "The Divine Med Spa" ? message.author : message.conversation.friendlyName}</div>
                <ChatMessageImage message={message}/>
                {/* <img 
                  style={{ maxWidth: 150 }}
                  src='https://images.unsplash.com/photo-1630425347815-98fe4f007ab9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' 
                  alt='image-from-user' 
                /> */}
                {message.body ? <div>{message.body}</div> : null}
              </div>
            </motion.div>
          );

          /* No media just text is available */
          return (
            <motion.div key={message.sid} className={`${messageType2}`} custom={index} initial="hidden"
              animate="visible"
              variants={variants}>
              <div className={`${messageType}`}>
                <div style={{ fontWeight: 'bold' }}>{message.author === "The Divine Med Spa" ? message.author : message.conversation.friendlyName}</div>
                <div>{message.body}</div>
              </div>
            </motion.div>
          );
        })}
        <div style={{ color: 'red' }} ref={messagesEndRef}></div>
        </div>
    </div>
  );
};

export default ChatMessages;