import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR } from '../../queries'

const UpdateCar = props => {
    const { id, make, model, year, personId, price } = props
    const [updateCar] = useMutation(UPDATE_CAR)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const { make, model, year, personId, price } = values

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
                            (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Update Contact
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