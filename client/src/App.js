import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddPerson from './components/forms/addPerson';
import People from './components/recordList/list';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>

      <AddPerson />
      <People />

    </ApolloProvider>
  );
}

export default App;
