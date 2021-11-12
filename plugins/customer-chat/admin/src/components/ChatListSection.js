import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import ScrollProvider from './ScrollProvider';
import ChatList from './ChatList';
import { conversationList, conversationListStyle } from '../containers/HomePage/style';
import { motion } from 'framer-motion';

const ChatListSection = (props) => {
  const orijin = props.orijin;
  const Orijin = orijin();

  const [state, setState] = useState({
    viewMoreEnabled: false
  });

  const onLeaveEnd = (current) => {
    const { scrollTop, scrollHeight, clientHeight } = current;

    if (scrollTop + clientHeight <= scrollHeight - 25 && !state.viewMoreEnabled) return;

    setState(prevState => ({ ...prevState, viewMoreEnabled: false }))
  };

  const onReachEnd = (current) => {
    const { hasNextPage } = Orijin.getConversationsState();

    if ( !hasNextPage ) return;

    const { scrollTop, scrollHeight, clientHeight } = current;

    if (scrollTop + clientHeight >= scrollHeight - 25 && state.viewMoreEnabled) return;

    setState(prevState => ({ ...prevState, viewMoreEnabled: true }));
  };

  const onViewMoreHandler = async () => {
    console.log('Loading more conversations...');

    const { nextPage } = Orijin.getConversationsState();
    
    try {
      const { items: conversations, hasNextPage } = await nextPage();
  
      console.log('nextConversations', conversations);

      Orijin.setConversationsState(conversations, hasNextPage);

      setState(prevState => ({ ...prevState, viewMoreEnabled: false }));
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <div className='relative w-full h-full' style={conversationListStyle}>
      <ScrollProvider className={conversationList} style={conversationListStyle} onReachEnd={onReachEnd} onLeaveEnd={onLeaveEnd}>
        <ChatList conversations={props.conversations} currentConversation={props.currentConversation} orijin={orijin} />
      </ScrollProvider>
      {!state.viewMoreEnabled ? null : (
        <motion.div 
          style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'absolute', width: '100%', bottom: '0.75rem', left: 0, paddingTop: '0.5rem', paddingBottom: '0.5rem', cursor: 'pointer' }}
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 100, opacity: 0 }}
        >
          <div onClick={onViewMoreHandler} className="shadow-lg" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 12, paddingTop: '0.5rem', paddingBottom: '0.5rem', paddingLeft: '1.75rem', paddingRight: '1.75rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="#3F3697">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span style={{ color: '#4F46BA' }}>View more chats</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
 
export default ChatListSection;