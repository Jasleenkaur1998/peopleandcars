import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddPerson from './components/forms/addPerson';
import People from './components/recordList/list';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    width: "100%"
  }
})

function App() {

  const styles = getStyles()


  return (
    <ApolloProvider client={client}>
      <div className={styles.list}>
        <AddPerson />
        <People />
      </div>
    </ApolloProvider>
  );
}

export default App;
