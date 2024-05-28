import React from 'react';
import {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Form, Input, Layout, message, Row, Space, Switch} from 'antd'
import {CloseOutlined} from '@ant-design/icons';
import axiosInstance from "../../../../api/api"


const MoveSets = () => {
    let [items, setItems] = useState([]);

    const getMoveSets = async () => {
        return await axiosInstance.get("/moves/move_sets").then(response => {
            setItems(response.data)
        })
    }

    const deleteMoveSet = async (id) => {
        return await axiosInstance.delete(`/moves/move_sets/${id}`).then(response => {
            response.status === 204 ? message.success('Мувсет удален') : message.error('Ошибка при удалении')
            getMoveSets()
        })
    }
    useEffect(() => {
        getMoveSets()
    }, [])

    const onFinish = async (values) => {
        await axiosInstance.post("/moves/move_sets", values).then(
            response => {
                response.status === 201 ? message.success('Мувсет успешно создан') : message.error('Ошибка при создании мувсета');
                getMoveSets()
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
                            label="Действие"
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
                                                           deleteMoveSet(item.id)
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

export default MoveSets