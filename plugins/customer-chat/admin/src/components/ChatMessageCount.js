import React from 'react';

const ChatMessageCount = (props) => {
  const messageCount = props.messageCount;

  if (!messageCount) return null;

  return (
    <div className='flex items-center justify-center' style={{ width: 20, height: 20, backgroundColor: '#FB2B76', borderRadius: 300 }}>
      <span style={{ fontSize: 12, fontWeight: 'bold', color: '#FFFFFF' }}>
        {messageCount}
      </span>
    </div>
  )
};

export default ChatMessageCount;