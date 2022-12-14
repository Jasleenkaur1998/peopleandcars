import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ADD_PERSON, GET_PERSONS } from '../../queries';
import React from 'react';


const AddPerson = () => {
    const [id] = useState(uuidv4())
    const [addPeople] = useMutation(ADD_PERSON)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { firstName, lastName } = values

        addPeople({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (cache, { data: { addPeople } }) => {
                const data = cache.readQuery({ query: GET_PERSONS })
                cache.writeQuery({
                    query: GET_PERSONS,
                    data: {
                        ...data,
                        peoples: [...data.peoples, addPeople]
                    }
                })
            }
        })
    }

    return (
        <Form
            form={form}
            name='add-contact-form'
            layout='inline'
            onFinish={onFinish}
            size='large'
            style={{ marginBottom: '40px', display: "flex", justifyContent: 'center', marginTop: '40px' }}
        >
            <Form.Item
                name='firstName'
                rules={[{ required: true, message: 'Please input your first name!' }]}
            >
                <Input placeholder='i.e. John' />
            </Form.Item>
            <Form.Item
                name='lastName'
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input placeholder='i.e. Smith' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Person
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddPerson;