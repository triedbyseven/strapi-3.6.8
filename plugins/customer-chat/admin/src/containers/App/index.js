/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from 'strapi-helper-plugin';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import '../../../../tailwind.css';


// Utils
import pluginId from '../../pluginId';
// Containers
import HomePage from '../HomePage';
import useWindowSize from '../../utils/useWindowDimensions';


const client = new ApolloClient({
  uri: 'https://h4vdkljwoc.execute-api.us-west-2.amazonaws.com/dev/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  const { height } = useWindowSize();

  if (!height) return null;

  return (
    <ApolloProvider client={client}>
      <div style={{height: height - 60}}>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ApolloProvider>
  );
};

export default App;
