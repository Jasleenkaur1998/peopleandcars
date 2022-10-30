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
  const { id, firstName, lastName } = props
  const styles = getStyles()

  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => setEditMode(!editMode)

  return (
    <>
      {editMode ? (
        <UpdateCar
          id={id}
          firstName={firstName}
          lastName={lastName}
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
          {firstName} {lastName}
        </Card>
      )}
    </>
  )
}

export default PeopleItem