import React from 'react';
import style from './style';

const ChatMarker = (props) => {
  if (!props.isShown) return null;

  return ( 
    <div style={style.chatMarkerContainerStyle}>
      <div style={style.chatMarkerStyle}></div>
    </div>
  );
}
 
export default ChatMarker;