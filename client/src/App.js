import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddPerson from './components/forms/addPerson';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>

      <AddPerson />

    </ApolloProvider>
  );
}

export default App;
