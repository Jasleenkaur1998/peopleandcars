import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import AddPerson from './components/forms/addPerson';
import People from './components/recordList/list';
import AddCar from './components/forms/addCar';

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
        <AddCar />
        <People />
      </div>
    </ApolloProvider>
  );
}

export default App;
