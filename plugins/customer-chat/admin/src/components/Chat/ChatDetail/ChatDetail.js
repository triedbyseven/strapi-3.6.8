import React, { useState, useEffect } from 'react';
import TextInput from '../../TextInput';
import ChatMessages from '../../ChatMessages';
import ChatDetailSelectConversation from './ChatDetailSelectConversation';

const ChatDetail = (props) => {
  const Orijin = props.orijin();
  const [isLoadingMessages, setIsLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);

  const messagesEndRef = React.useRef(null);

  const handleOnClick = () => console.log(Orijin.getConversation());

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const sendMessage = async (message) => {
    console.log('sending message from conversation..');
    const conversation = Orijin.getConversation();
    console.log(conversation);
    const response = await conversation.sendMessage(message);
    console.log(response);
  };

  const eventListener = async (message) => {
    console.log('messageAdded - Event listener is running', message);

    const conversation = Orijin.getConversation();
    let currentConversationSid;
    
    
    if (!conversation)
      currentConversationSid = undefined;
    else
      currentConversationSid = message.conversation.sid;
    
    const isCurrentConversation = conversation.sid === currentConversationSid;
    if (!isCurrentConversation) return;

    await conversation.setAllMessagesRead();

    setMessages((prevState) => {
      const filtered = [...new Set([...prevState, message])];
      const nextMessages = filtered;
      
      return nextMessages;
    });
  };

  const uninitializeMessages = async () => {
    const conversation = Orijin.getConversation();
    if (!conversation) return;
    conversation.removeListener('messageAdded', eventListener);
  }

  const initalizeMessages = async () => {
    try {
      const conversation = Orijin.getConversation();
      if (!conversation) return;

      await conversation.setAllMessagesRead();

      conversation.addListener('messageAdded', eventListener);
      const messages = await conversation.getMessages(30, undefined, 'backwards');
      setMessages(messages.items);
      setIsLoadingMessages(false);
    } catch (error) {
      console.log('Initialize Messages failed.');
      console.log(error.code, error.message);
    }
  };

  const fetchMessages = async () => {
    const conversation = Orijin.getConversation();

    if (!conversation) return;

    setIsLoadingMessages(true);

    conversation.addListener('messageAdded', eventListener);
    await conversation.setAllMessagesRead();
    const messages = await conversation.getMessages(30, undefined, 'backwards');
    
    setMessages(messages.items);
    setIsLoadingMessages(false);
  };

  useEffect(() => {
    if (messages.length === 0) initalizeMessages();

    return () => uninitializeMessages();
  }, []);

  useEffect(() => {
    fetchMessages();

    return () => uninitializeMessages();
  }, [props.currentConversation])

  useEffect(() => {
    let setScrollTimeout = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(setScrollTimeout);
  }, [messages]);

  if (!props.currentConversation) return <ChatDetailSelectConversation />;

  return ( 
    <div className="relative w-full h-full flex flex-col justify-between">
      <ChatMessages messages={messages} messagesEndRef={messagesEndRef} messageLength={messages.length} isLoadingMessages={isLoadingMessages} />
      <TextInput sendMessage={sendMessage} handleOnClick={handleOnClick}/>
    </div>
   );
}
 
export default ChatDetail;