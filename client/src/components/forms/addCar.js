import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Dropdown, Form, Input, Menu, Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS, GET_PERSONS } from '../../queries'
import { DownOutlined } from '@ant-design/icons'

const AddCar = () => {
    const [id] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR);
    const [selectedId, setSelectedId] = useState("");
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const people = useQuery(GET_PERSONS);

    console.log(people, "people");

    useEffect(() => {
        forceUpdate({})
    }, []);

    function getMenu() {
        const data = people.data?.peoples.map((item, index) => {
            return (

                {
                    key: index,
                    label: (
                        <a onClick={() => setSelectedId(item.id)}>
                            {item.firstName}
                        </a>
                    ),
                }
            )
        })
        return < Menu items={data} />
    }

    const onFinish = values => {
        const { make, model, year, price } = values

        addCar({
            variables: {
                id,
                make, model, year, price,
                personId: selectedId
            },
            update: (cache, { data: { addCar } }) => {
                const data = cache.readQuery({ query: GET_CARS })
                cache.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, addCar]
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
                <Input placeholder='i.e. 3 series' />
            </Form.Item>
           <Form.Item>
           <Dropdown overlay={getMenu}>
                <a onClick={e => e.preventDefault()}>
                    <Space>
                        Add Person
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
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
                        Add Car
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddCar;