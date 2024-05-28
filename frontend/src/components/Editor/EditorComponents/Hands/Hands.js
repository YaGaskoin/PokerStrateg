import React from 'react';
import {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Form, Input, Layout, message, Row, Space, Switch} from 'antd'
import {CloseOutlined} from '@ant-design/icons';
import axiosInstance from "../../../../api/api"


const Hands = () => {
    let [items, setItems] = useState([]);

    const getHands = async () => {
        return await axiosInstance.get("/fact_data/hands").then(response => {
            setItems(response.data)
        })
    }

    const deleteHand = async (id) => {
        return await axiosInstance.delete(`/fact_data/hands/${id}`).then(response => {
            response.status === 204 ? message.success('Рука удалена') : message.error('Ошибка при удалении')
            getHands()
        })
    }
    useEffect(() => {
        getHands()
    }, [])

    const onFinish = async (values) => {
        await axiosInstance.post("/fact_data/hands", values).then(
            response => {
                response.status === 201 ? message.success('Рука успешно создана') : message.error('Ошибка при создании руки');
                getHands()
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
                            label="Карты"
                            name="cards"
                            rules={[
                                {
                                    required: true,
                                    max: 2,
                                    message: 'Максимальная длина 2, поле обязательное',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            name="suite"
                            label='Одномастные'
                            valuePropName="checked"


                        >
                            <Switch checked={false} />
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
                            return <Col ><Card hoverable={true} title={`${item.cards}${item.suite ? 's' : 'o'}`}
                                                       extra={<CloseOutlined onClick={() => {
                                                           deleteHand(item.id)
                                                       }} style={{color: 'red'}}/>}>
                                <p>{item.suite ? 'Одномастные' : 'Разномастные'}</p>

                            </Card>
                            </Col>
                        })}
                    </Row>
                </Space>
            </Layout>
        </>
    )
}

export default Hands