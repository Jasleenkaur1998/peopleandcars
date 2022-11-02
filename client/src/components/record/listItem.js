import { useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import UpdateCar from '../actionButtons/updateListItem'
import RemoveCar from '../actionButtons/removeListItem'
import React from 'react';

const getStyles = () => ({
  card: {
    width: 'calc(100vw - 100px)'
  }
})

const PeopleItem = props => {
  const { id, firstName, lastName, cars } = props;
  const styles = getStyles();

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => setEditMode(!editMode);

  return (
    <>
      <Card
        style={styles.card}
      >
        <h1 style={{ background: "#e2d6ff", padding: 8 }}>{firstName} {lastName}</h1>
        <ul style={{ listStyleType: "none" }}>
          {
            cars.filter((item) => item.personId == id).map((val) => {
              return <li style={{ display: "flex", justifyContent: "space-between" }}>

                <span>{val.make} {val.model} {val.year} ${val.price}</span>
                <div style={{ display: "flex", gap: 8, padding: 8 }}>
                  {
                    editMode ? <UpdateCar
                      id={id}
                      data={val}
                      onButtonClick={handleButtonClick}
                    /> : <EditOutlined key='edit' onClick={handleButtonClick} />
                  }


                  <RemoveCar id={val.id} />
                </div>
              </li>
            })
          }
        </ul>
      </Card>

    </>
  )
}

export default PeopleItem