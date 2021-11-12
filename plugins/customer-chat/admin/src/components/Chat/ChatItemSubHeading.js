import React from 'react';
import style from './style';

const ChatItemSubHeading = (props) => {

  return (
    <span 
      className={style.chatSubHeadingClasses}
      style={style.chatSubHeadingStyle}
    >
      {props.uniqueName}
    </span>
  );
};

export default ChatItemSubHeading;