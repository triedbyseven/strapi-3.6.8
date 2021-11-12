import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Client as ConversationsClient } from '@twilio/conversations';
import PrimaryLoader from './Loaders/PrimaryLoader';
import { ORIJINATOR_ACCOUNT_ID, ORIJINATOR_NAME_OF_PROVIDER } from '../globalVariables';

const globalAny = window;

const GET_TOKEN = gql`
    mutation identity($id: String! $identity: String!) {
        identity(id: $id, identity: $identity)
    }
`;

const ChatProvider = Component => props => {
  const [mutateToken, { loading, error }] = useMutation(GET_TOKEN);
  const [conversations, setConversations] = useState({
    isInitialized: false,
    items: [],
    hasNextPage: null,
    hasPrevPage: null,
    nextPage: null,
    prevPage: null
  });
  const conversationsRef = React.useRef(conversations);
  const currentConversationsRef = React.useRef(null);
  
  const [currentConversation, setCurrentConversation] = useState(null);
  const [state, setState] = useState({
    token: '',
    status: '',
    statusMessage: 'Connecting...',
    conversationsReady: false
  });

  const Orijin = () => {
    const logState = () => console.log(conversations);

    const setConversation = (conversation) => {
      if (conversation && conversation.sid && currentConversation && conversation.sid === currentConversation.sid) return;

      currentConversationsRef.current = conversation;
      setCurrentConversation(conversation);
    };

    const setConversationsState = (conversations, hasNextPage) => {
      const nextConversations = conversations;

      setConversations(prevState => {
        const filtered = [...new Set([...prevState.items, ...nextConversations])]

        const nextState = { ...prevState, items: filtered, hasNextPage: hasNextPage };

        conversationsRef.current = nextState;
        return nextState;
      });
    };

    const getConversation = () => currentConversationsRef.current;

    const getConversationsLength = () => conversations.items.length;

    const getConversationsState = () => conversations;

    const deleteConversation = (id) => setConversations(prevState => {
      console.log('Deleting conversation...');
      const conversations = prevState.items.filter(it => it.sid !== id);

      const nextState = { ...prevState, items: conversations };

      return nextState;
    });

    return {
      logState,
      setConversation,
      setConversationsState,
      getConversation,
      getConversationsLength,
      getConversationsState,
      deleteConversation
    }
  };

  const getToken = async (identity) => {
    try {
      const response = await mutateToken({ variables: { id: ORIJINATOR_ACCOUNT_ID, identity: identity }});

      return response.data.identity;
    } catch (error) {
      console.error('Error getToken: ', error.name, error.message);
      return '';
    }
  };

  const setToken = async (token) => {
    try {
      localStorage.setItem('twilio_token', token);

      setState({ ...state, statusMessage: 'Connecting...', token });
    } catch (error) {
      console.error('Error setToken: ', error.name, error.message);
    }
  };

  const checkToken = async (identity) => {
    try {
      const token = localStorage.getItem('twilio_token') || '';

      if (!token) {
        console.log('No token! time to create one!');
        let token = await getToken(identity);
        // globalAny.conversationsClient = await ConversationsClient.create(token);
        // globalAny.conversationsClient.on('tokenAboutToExpire', async () => {
        //   token = await globalAny.conversationsClient.getToken(identity);
        //   globalAny.conversationsClient.updateToken(token);
        // });

        return setToken(token);
      }

      setToken(token);
    } catch (error) {
      console.error('Error checkToken:', error.name, error.message);
    }
  };

  const subscribedConversationsResponse = async () => {
    const response = await globalAny.conversationsClient.getSubscribedConversations();
    const items = response.items.sort(function (x, y) {
      // return y.lastMessage ? y.lastMessage.dateCreated : y.dateCreated - x.lastMessage ? x.lastMessage.dateCreated : x.dateCreated;
      return (y.dateCreated || y.lastMessage.dateCreated) - (x.dateCreated || x.lastMessage.dateCreated);
    });
    const newState = { isInitialized: true, items: items, ...response };
    
    conversationsRef.current = newState;
    setConversations(newState);
  };

  const initializeConversations = async () => {
    const logState = () => console.log(conversations);

    const setAllEvents = () => {

      globalAny.conversationsClient.on('connectionStateChanged', conversationState => {
        if (conversationState === 'connecting') setState({ ...state, status: 'default', statusMessage: 'Connecting...', conversationsReady: false });

        if (conversationState === 'connected') {
          setState({ ...state, status: 'success', statusMessage: 'You are connected.', conversationsReady: true })
        };

        if (conversationState === 'disconnecting') setState({ ...state, status: 'default', statusMessage: 'Disconnecting...', conversationsReady: false });

        if (conversationState === 'disconnected') setState({ ...state, status: 'warning', statusMessage: 'Disconnected', conversationsReady: false });

        if (conversationState === 'denied') setState({ ...state, status: 'error', statusMessage: 'Failed to connect.', conversationsReady: false });
      });

      globalAny.conversationsClient.on('conversationAdded', (conversation) => {

        if (!conversationsRef.current.isInitialized) return;

        const updater = prevState =>  {
          const PrevConversations = [...prevState.items];

          let NewConversations = [...PrevConversations, conversation];

          try {
            NewConversations.sort(function (x, y) {
              // return y.lastMessage ? y.lastMessage.dateCreated : y.dateCreated - x.lastMessage ? x.lastMessage.dateCreated : x.dateCreated;
              // return y.lastMessage ? y.lastMessage.dateCreated : y.dateCreated - x.lastMessage ? x.lastMessage.dateCreated : x.dateCreated;
              // return y.lastMessage ? y.lastMessage.dateCreated - x.lastMessage.dateCreated : y.dateCreated - x.dateCreated;
              // return (y.lastMessage.dateCreated || y.dateCreated) - (x.lastMessage.dateCreated || x.dateCreated);
              return (y.dateCreated || y.lastMessage.dateCreated) - (x.dateCreated || x.lastMessage.dateCreated);
              // return y.dateCreated - x.dateCreated
            });
            
            conversationsRef.current = { ...prevState, items: NewConversations };
            return { ...prevState, items: NewConversations };
          } catch(error) {
            console.error(error)
          }
        };
        
        setConversations(updater);
      });

      subscribedConversationsResponse();

      globalAny.conversationsClient.on('conversationUpdated', async ({ conversation: thisConversation }) => {
        const messages = await thisConversation.getMessages(1, undefined, 'backwards');
        if (messages.items[0].author === 'The Divine Med Spa') return;

        setConversations(prevState => {
          let PrevState = prevState.items.filter(it => it !== thisConversation);
          PrevState.sort(function (x, y) {
            return y.lastMessage ? y.lastMessage.dateCreated : y.dateCreated - x.lastMessage ? x.lastMessage.dateCreated : x.dateCreated;
          });
          return { ...prevState, items: [thisConversation, ...PrevState] };
        });
      });

      globalAny.conversationsClient.on('conversationRemoved', thisConversation => {
        let prevConversations = [...conversationsRef.current.items];

        if (prevConversations.length === 0) return console.log('..no conversation to be deleted on this client. Exiting converesationRemoved event.');

        prevConversations = prevConversations.filter(it => it !== thisConversation);

        setConversations(prevState => {
          const conversations = prevState.items.filter(it => it !== thisConversation);


          conversationsRef.current = { ...conversationsRef.current, items: conversations };
          return { ...prevState,  items: conversations };
        });
      });

      globalAny.conversationsClient.on('tokenAboutToExpire', async () => {
        console.error('tokenAboutToExpire: Token is about to expire, refreshing token...');
        const token = await getToken(ORIJINATOR_NAME_OF_PROVIDER);
        await globalAny.conversationsClient.updateToken(token);
      });

      globalAny.conversationsClient.on('tokenExpired', async () => {
        console.error('tokenExpired: Token has expired, refreshing token...');
        const token = await getToken(ORIJINATOR_NAME_OF_PROVIDER);
        await globalAny.conversationsClient.updateToken(token);
      });
    };

    const handleError = async (code, message) => {
      const token = await getToken(ORIJINATOR_NAME_OF_PROVIDER);
      localStorage.setItem('twilio_token', token);
      globalAny.conversationsClient = await ConversationsClient.create(token);
      setAllEvents();
    };

    try {
      if (globalAny.conversationsClient) {
        console.log('The conversationClient available, updating token!');
        await globalAny.conversationsClient.shutdown();
        globalAny.conversationsClient = await ConversationsClient.create(state.token);
        
      } else {
        console.log('No conversationClient available, creating ConversationClient!');
        globalAny.conversationsClient = await ConversationsClient.create(state.token);
      }
      
      setAllEvents();
    } catch (error) {
      handleError(error.code, error.message);
    };
  };

  useEffect(() => {
    if (ORIJINATOR_NAME_OF_PROVIDER) {
      console.log('Running check token!');
      checkToken(ORIJINATOR_NAME_OF_PROVIDER);
    }
  }, [ORIJINATOR_NAME_OF_PROVIDER]);

  useEffect(() => {
    async function removalZ() {
      await globalAny.conversationsClient.shutdown();
    }

    if (state.token) {
      console.log('Token is loaded! Initializing conversations!');
      initializeConversations();

      return () => removalZ();
    }
  }, [state.token]);

  if (!state.conversationsReady) return <PrimaryLoader />;

  return <Component conversationsLoaded={conversations.isInitialized} conversations={conversations.items} currentConversation={currentConversation} orijin={Orijin}/>;
};

export default ChatProvider;