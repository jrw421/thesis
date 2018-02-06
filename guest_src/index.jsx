<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
=======
import React from 'react'
import ReactDOM from 'react-dom'
import App2 from './components/app2.jsx'
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

>>>>>>> mod

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
<<<<<<< HEAD
});
=======
})

>>>>>>> mod

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
<<<<<<< HEAD
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
=======
      <App2/>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

// console.log('hiiiiiiiiii')
>>>>>>> mod
