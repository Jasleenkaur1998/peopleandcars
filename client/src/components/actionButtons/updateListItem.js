import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR } from '../../queries'
import React from 'react';

const UpdateCar = props => {
    const { id, make, model, year, personId, price } = props.data;
    console.log(personId, "From props");
    const [updateCar] = useMutation(UPDATE_CAR)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { make, model, year, price } = values;


        updateCar({
            variables: {
                id,
                make, model, year, personId, price
            }
        })

        props.onButtonClick()
    }

    return (
        <Form
            form={form}
            name='update-contact-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                make, model, year, personId, price
            }}
        >

<Form.Item
                name='year'
                rules={[{ required: true, message: 'Please enter car year here' }]}
            >
                <Input placeholder='i.e. 2018' />
            </Form.Item>
            
            <Form.Item
                name='make'
                rules={[{ required: true, message: 'Please enter car make here' }]}
            >
                <Input placeholder='i.e. BMW' />
            </Form.Item>
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Please enter car model here' }]}
            >
                <Input placeholder='i.e. 3 series' />
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Please enter car price here' }]}
            >
                <Input placeholder='i.e. 50000' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price'))  ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button type='danger' onClick={props.onButtonClick}>
                Cancel
            </Button>
        </Form>
    )
}

export default UpdateCar