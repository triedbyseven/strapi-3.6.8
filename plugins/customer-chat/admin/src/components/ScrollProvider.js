import React, { useState, useRef } from 'react';

const ScrollProvider = (props) => {
  const ref = useRef(null);
  const [state, setState] = useState(0);

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;

    if (scrollTop + clientHeight >= scrollHeight - 25) {
      props.onReachEnd(ref.current);
    } else {
      props.onLeaveEnd(ref.current);
    }

    setState(scrollTop);
  };

  return <div ref={ref} className={props.className} onScroll={onScroll}>{props.children}</div>;
}
 
export default ScrollProvider;