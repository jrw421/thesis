import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import { HashRouter } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <HashRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </HashRouter>,
  document.getElementById('root')
);

// mysql -u thesis -h thesis.ciqkxj8b112q.us-east-2.rds.amazonaws.com -P 3307 -p