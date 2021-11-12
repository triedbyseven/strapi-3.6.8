import React from 'react';
import style from './style';

const ChatItemHeading = (props) => {

  return (
    <div 
      className={style.chatHeadingClasses} 
      style={style.chatHeadingStyle}
    >
      {props.friendlyName}
    </div>
  );
};

export default ChatItemHeading;