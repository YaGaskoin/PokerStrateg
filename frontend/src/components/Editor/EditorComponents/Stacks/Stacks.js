import React from 'react';
import {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Form, Input, InputNumber, Layout, message, Row, Space, Switch} from 'antd'
import {CloseOutlined} from '@ant-design/icons';
import axiosInstance from "../../../../api/api"


const Stacks = () => {
    let [items, setItems] = useState([]);

    const getStacks = async () => {
        return await axiosInstance.get("/fact_data/stacks").then(response => {
            setItems(response.data)
        })
    }

    const deleteStack = async (id) => {
        return await axiosInstance.delete(`/fact_data/stacks/${id}`).then(response => {
            response.status === 204 ? message.success('Размер стека удален') : message.error('Ошибка при удалении')
            getStacks()
        })
    }
    useEffect(() => {
        getStacks()
    }, [])

    const onFinish = async (values) => {
        await axiosInstance.post("/fact_data/stacks", values).then(
            response => {
                response.status === 201 ? message.success('Размер стека создан') : message.error('Ошибка при создании стека');
                getStacks()
            }
        )
    };
    const onFinishFailed = (errorInfo) => {
        message.error('Неправильно заполнена форма')
    };
    return (
        <>
            <Layout>
                <div className={'form'}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="min_size"
                            label='Нижняя граница в ББ'
                        >
                                <InputNumber size="large" min={1} max={100}  />

                        </Form.Item>
                        <Form.Item
                            name="max_size"
                            label='Верхняя граница в ББ'


                        >
                                <InputNumber size="large" min={1} max={100} />

                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Добавить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Divider/>
                <Space direction="horizontal" size={16}>
                    <Row gutter={[8, 8]} style={{width: '100%'}} className={'items-list'}>

                        {items.map((item) => {
                            return <Col ><Card hoverable={true} title={''}
                                                       extra={<CloseOutlined onClick={() => {
                                                           deleteStack(item.id)
                                                       }} style={{color: 'red'}}/>}>
                                <p> {item.max_size !== item.min_size?`${item.min_size}ББ - ${item.max_size}ББ` : item.max_size + 'ББ'}</p>

                            </Card>
                            </Col>
                        })}
                    </Row>
                </Space>
            </Layout>
        </>
    )
}

export default Stacks;