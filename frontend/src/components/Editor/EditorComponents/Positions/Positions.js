import React from 'react';
import {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Form, Input, Layout, message, Row, Space, Switch} from 'antd'
import {CloseOutlined} from '@ant-design/icons';
import axiosInstance from "../../../../api/api"


const Positions = () => {
    let [items, setItems] = useState([]);

    const getPositions = async () => {
        return await axiosInstance.get("/fact_data/positions/").then(response => {
            setItems(response.data)
        })
    }

    const deletePosition = async (id) => {
        return await axiosInstance.delete(`/fact_data/positions/${id}`).then(response => {
            response.status === 204 ? message.success('Позиция удалена') : message.error('Ошибка при удалении')
            getPositions()
        })
    }
    useEffect(() => {
        getPositions()
    }, [])

    const onFinish = async (values) => {
        await axiosInstance.post("/fact_data/positions/", values).then(
            response => {
                response.status === 201 ? message.success('Позиция успешно создана') : message.error('Ошибка при создании позиции');
                getPositions()
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
                            label="Название позиции"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input/>
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
                                                           deletePosition(item.id)
                                                       }} style={{color: 'red'}}/>}>
                                <p>{item.name}</p>

                            </Card>
                            </Col>
                        })}
                    </Row>
                </Space>
            </Layout>
        </>
    )
}

export default Positions