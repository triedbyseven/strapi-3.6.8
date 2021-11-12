import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import ChatMessageCount from '../ChatMessageCount';
import ChatItemHeading from './ChatItemHeading';
import ChatItemSubHeading from './ChatItemSubHeading';
import TrashIcon from '../Icons/TrashIcon';
import ChatMarker from './ChatMarker';
import style from './style';

const MUTATE_DELETE_CHAT = gql`
  mutation deleteOneChat($id: String! $accountName: String!) {
    deleteChat(id: $id, accountName: $accountName)
  }
`;

const ChatItem = (props) => {
  const Orijin = props.orijin();
  const chat = props.chat ? props.chat : "";
  const currentConversationSid = props.currentConversation ? props.currentConversation.sid : null;
  const isCurrentConversation = chat.sid === currentConversationSid;

  const [state, setState] = useState({
    isInitialized: false,
    messageCount: 0,
    chat: null,
  });
  
  const [MutateDeleteChat, { loading: MutateDeleteChatLoading }] = useMutation(MUTATE_DELETE_CHAT, {
    onCompleted: () => {
      Orijin.setConversation(chat);
    }
  });

  // const getChatMessageCount = async () => {
  //   try {
      // if (props.chat.lastReadMessageIndex === null) await chat.advanceLastReadMessageIndex(props.chat.lastMessage.index);

  //     const count = await chat.getUnreadMessagesCount();
      
  //     console.log('Updating state: state.messageCount', count);
  //     setState(prevState => ({ ...prevState, messageCount: count }));

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const eventListener = async (message) => {
    try {
      console.log('messageAdded - Event listener is running', message);
  
      const chatSid = chat.sid;
      let currentConversationSid;

      if (!Orijin.getConversation()) 
        currentConversationSid = undefined;
      else
        currentConversationSid = Orijin.getConversation().sid;
        
      const isCurrentConversation = chatSid === currentConversationSid;
      if (isCurrentConversation) return;
  
      console.log('updating state: state.messageCount');
      setState(prevState => ({ ...prevState, messageCount: prevState.messageCount + 1 }));
    } catch (error) {
      console.error(error);
    }
  };

  const uninitializeMessages = () => {
    chat.removeListener('messageAdded', eventListener);
    // chat.removeListener('messageUpdated', eventListener);
  }

  const handleOnMount = async () => {
    chat.addListener('messageAdded', eventListener);

    const count = await chat.getUnreadMessagesCount();
    setState(prevState => ({ ...prevState, messageCount: count }));
  };

  const handleDeleteChat = () => {
    if (confirm(`Are you sure you want to remove chat with ${chat.friendlyName}?`)) {
      try {
        Orijin.deleteConversation(chat.sid);
        MutateDeleteChat({
            variables: {
              id: chat.sid,
              accountName: 'The Divine Med Spa'
            }
          }
        );
      } catch (error) {
        console.error(error);
        console.log(`Restoring chat, there was a problem removing chat with ${chat.friendlyName}`);
        Orijin.setConversation(chat);
      }
    } else {
      // Do nothing!
      console.log('Nothing was done you have cancelled.');
    }
  };

  const handleOnClick = async () => {
    const prevMessageCount = state.messageCount;
    
    try {
      Orijin.setConversation(chat);
      if (!state.messageCount) return;
      setState(prevState => ({ ...prevState, messageCount: 0 }));
    } catch(error) {
      setState(prevState => ({ ...prevState, messageCount: prevMessageCount }));
      console.error(error);
    }
  };

  useEffect(() => {
    if(!state.isInitialized ) setState(prevState => ({ ...prevState, isInitialized: true}));
  }, [])

  useEffect(() => {
    if (state.isInitialized) handleOnMount();

    return () => uninitializeMessages();
  }, [state.isInitialized]);

  return (
    <div
      onClick={handleOnClick}
      className={style.containerClasses}
      style={style.containerStyle(isCurrentConversation)}
    >
      {/* Chat Identifiers */}
      <div className="w-full">
        <ChatItemHeading friendlyName={chat.friendlyName} />
        <ChatItemSubHeading uniqueName={chat.uniqueName} />
      </div>
      {/* Event Icons */}
      <div className="flex">
        <div>
          <ChatMessageCount chat={props.chat} messageCount={state.messageCount} />
        </div>
        <div onClick={handleDeleteChat}>
            <TrashIcon isShown={isCurrentConversation} />
        </div>
      </div>
      <ChatMarker isShown={isCurrentConversation} />
    </div>
  );
};
 
export default ChatItem;