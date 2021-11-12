/*
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import pluginId from '../../pluginId';
import ChatListSection from '../../components/ChatListSection';
import ChatDetail from '../../components/Chat/ChatDetail/ChatDetail';
import ChatProvider from '../../components/ChatProvider';
import { container, conversationClass, conversationStyle } from './style';
 
const HomePage = (props) => {
  const orijin = props.orijin;

  const Orijin = orijin();

  useEffect(() => {
    // if ( !props.currentConversation && props.conversations.length > 0 ) {
    //   console.log('No converation was detected, mounting current convo now!', props.conversations[0]);
    //   Orijin.setConversation(props.conversations[0]);
    // }
  }, [props.currentConversation, props.conversations]);

  // if (!props.currentConversation || props.conversations.length === 0 ) return <div><p>No Conversation mounted yet...</p></div>;
  // if ( props.conversations.length === 0 ) return <div><p>No Conversation mounted yet...</p></div>;
  if (!props.conversationsLoaded) return <div><p>No Conversation mounted yet...</p><button onClick={() => Orijin.logState()}>logState</button></div>;

  return (
    <div className='h-full'>
      <div className={container}>
        {/* Conversation List */}
        <ChatListSection conversations={props.conversations} currentConversation={props.currentConversation} orijin={orijin}/>
        {/* Conversation */}
        <div className={conversationClass} style={conversationStyle}>
          <ChatDetail orijin={orijin} currentConversation={props.currentConversation} />
        </div>

      </div>
    </div>
  );
};

export default memo(ChatProvider(HomePage));
