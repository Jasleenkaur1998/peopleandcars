import { useQuery } from '@apollo/client'
import { List } from 'antd'
import { GET_CARS, GET_PERSONS } from '../../queries'
import PeopleItem from '../record/listItem'

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const People = () => {
    const styles = getStyles()

    const people = useQuery(GET_PERSONS);
    const cars = useQuery(GET_CARS);

    if (people.loading) return 'Loading...'
    if (people.error) return `Error! ${people.error.message}`

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {people?.data?.peoples?.map(({ id, firstName, lastName }) => {
                return <List.Item key={id}>
                    <PeopleItem cars={cars.data?.cars} id={id} firstName={firstName} lastName={lastName} />
                </List.Item>
})}
        </List>
    )
}

export default People;