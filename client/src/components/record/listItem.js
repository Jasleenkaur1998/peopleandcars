import { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import UpdateCar from '../actionButtons/updateListItem'
import RemoveCar from '../actionButtons/removeListItem'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const PeopleItem = props => {
  console.log(props);
  const { id, firstName, lastName, cars } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => setEditMode(!editMode);

  console.log(cars);

  return (
    <>
      {editMode ? (
        <UpdateCar
          id={id}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} />
          ]}
        >
          <h1 style={{ background: "#e2d6ff", padding: 8 }}>{firstName} {lastName}</h1>
          <ul style={{ listStyleType: "none" }}>
            {
              cars?.filter((item) => item.personId == id).map((val) => {
                return <li>{val.make}</li>
              })
            }
          </ul>
        </Card>
      )}
    </>
  )
}

export default PeopleItem