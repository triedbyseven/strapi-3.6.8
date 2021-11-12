import React from 'react';
import { motion } from 'framer-motion';
// import image from '../../../assets/images/chat-logo.webp';

const ChatDetailSelectConversation = () => {
  return ( 
    <motion.div 
      className="relative w-full h-full flex justify-center items-center" 
      animate={{ x: 0, opacity: 1, scale: 1, transition: { delay: 0.25, duration: 0.75, type: 'spring' } }} 
      initial={{ x: 100 , opacity: 0, scale: 0 }}
    >
      <div style={{ maxWidth: 500 }}>
        <img 
          src='https://orijinator-main.s3.us-west-2.amazonaws.com/assets/chat-service/chat-logo.webp'
          alt='users-floating-with-chat-app'
          style={{ width: 500, marginBottom: '2rem' }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 16,
          color: '#FFF',
          textAlign: 'center',
          backgroundColor: '#3F3697',
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 12
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
          </svg>
          <span>Select a chat to begin conversating.</span>
        </div>
      </div>
    </motion.div>
  );
}
 
export default ChatDetailSelectConversation;