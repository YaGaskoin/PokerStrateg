import React from 'react';
import {useEffect, useState} from "react";
import {Button, Card, Checkbox, Col, Divider, Form, Layout, message, Radio, Row, Select, Space} from 'antd'
import axiosInstance from "../../../../api/api"
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import GridSelect from "react-grid-select";
import "./Diapasone.scss"
import sorted_names from "../../../../assets/cards_sorted";


const Diapasones = () => {
    const [form] = Form.useForm();
    const [createForm] = Form.useForm();
    let [setups, setSetups] = useState([]);
    let [hands, setHands] = useState([]);
    let [positions, setPositions] = useState([]);
    let [stacks, setStacks] = useState([]);
    let [movesets, setMoveSets] = useState([]);
    let [filters, setFilters] = useState({});
    let [defaultValues, setDefaultValues] = useState(null)


    const getSetups = async () => {
        return await axiosInstance.get("/moves/setups", {'params': filters}).then(response => {
            setSetups(response.data)
        })
    }
    const getDefaultSetup = async (id) => {
        return await axiosInstance.get(`/moves/setups/${id}`, ).then(response => {
            setDefaultValues(response.data)
            console.log(response.data)

        })
    }

    const getMoveSets = async () => {
        return await axiosInstance.get("/moves/move_sets").then(response => {
            setMoveSets(response.data)
        })
    }

    const getHands = async () => {
        return await axiosInstance.get("/fact_data/hands").then(response => {
            setHands(response.data)
        })
    }

    const getPositions = async () => {
        return await axiosInstance.get("/fact_data/positions/").then(response => {
            setPositions(response.data)
        })
    }

    const getStacks = async () => {
        return await axiosInstance.get("/fact_data/stacks").then(response => {
            setStacks(response.data)
        })
    }

    const deleteSetups = async (id) => {
        return await axiosInstance.delete(`/moves/setups/${id}`).then(response => {
            response.status === 204 ? message.success('Диапазон удален') : message.error('Ошибка при удалении')
            getSetups()
        })
    }
    useEffect(() => {
        getSetups()
        getMoveSets()
        getHands()
        getStacks()
        getPositions()
    }, [])

    useEffect(() => {
        getSetups()
    }, [filters])

    useEffect(() => {
        createForm.setFieldsValue(defaultValues)
    }, [defaultValues])

    const onFinish = async (values) => {
        if (defaultValues){
            await axiosInstance.put(`/moves/setups/${defaultValues.id}`, values).then(
            response => {
                response.status === 200 ? message.success('Сетап успешно обновлен') : message.error('Ошибка при обновлении диапазона');
                getSetups()
                setDefaultValues(null)
                createForm.resetFields()
            }
        )
        }else{
           await axiosInstance.post("/moves/setups", values).then(
            response => {
                response.status === 201 ? message.success('Сетап успешно создан') : message.error('Ошибка при создании диапазона');
                getSetups()
            }
        )
        }

    };


    const onFinishFailed = (errorInfo) => {
        message.error('Неправильно заполнена форма')
    };
    return (
        <>
            <Layout>
                <div className={'form'}>
                    <Form
                        layout={'horizontal'}
                        name="basic"
                        form={createForm}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            maxWidth: 830,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Действие"
                            name="current_move"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{width: 400}}
                                name={'current_move'}
                            >
                                {movesets.map(moveset => {
                                    return (
                                        <Select.Option
                                            value={moveset.id}>
                                            {moveset.name}
                                        </Select.Option>
                                    )

                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Позиция"
                            name="position"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{width: 400}}
                                name='position'
                            >
                                {positions.map(position => {
                                    return (
                                        <Select.Option
                                            value={position.id}>
                                            {position.name}
                                        </Select.Option>
                                    )

                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Стек"
                            name="stack"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                name={'stack'}
                                style={{width: 400}}

                            >
                                {stacks.map(stack => {
                                    return (
                                        <Select.Option
                                            value={stack.id}>{stack.max_size !== stack.min_size ?
                                            `${stack.min_size}ББ - ${stack.max_size}ББ` : stack.max_size + 'ББ'}
                                        </Select.Option>
                                    )

                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Руки"
                            name="hands"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            {/*<Select*/}
                            {/*    style={{width: 400}}*/}
                            {/*    name={'hands'}*/}
                            {/*    mode="multiple"*/}
                            {/*    optionRender={(option, info) => {*/}
                            {/*        console.log(option, info)*/}
                            {/*        return (<div key={option.key} className={'cardCell'}>*/}
                            {/*                <Checkbox value={option.value}>{option.label}</Checkbox>*/}
                            {/*        </div>)*/}
                            {/*    }}*/}

                            {/*    dropdownStyle={{display:'grid 1fr 1fr 1fr !important'}}*/}
                            {/*>*/}
                            {/*    {hands.map(hand => {*/}
                            {/*        return (*/}
                            {/*            <Select.Option*/}
                            {/*                value={hand.id}>*/}
                            {/*                {`${hand.cards}${hand.suite? 's': 'o'}`}*/}
                            {/*            </Select.Option>*/}
                            {/*        )*/}

                            {/*    })}*/}
                            {/*</Select>*/}
                            <Checkbox.Group>
                                {[...Array(169).keys()].map((index) => {
                                     let cards = sorted_names[index]
                                     for(let current_hand of hands) {
                                         if (`${current_hand.cards}${current_hand.suite?'s':'o'}` === cards){
                                             return <Checkbox className={'cardCell'} key={index}  value={current_hand.id}>{`${current_hand.cards}${current_hand.suite?'s':'o'}`}</Checkbox>
                                         }
                                     }

                                 })}
                            </Checkbox.Group>

                        </Form.Item>

                        <Form.Item

                        >

                            <Button  type="primary" htmlType="submit" style={{marginRight: 10}}>
                                {defaultValues? 'Сохранить': 'Добавить'}
                            </Button>
                            <Button  type="primary" onClick={() => {
                        createForm.resetFields()
                        setDefaultValues(null)
                    }}>
                                Сбросить
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <Divider/>
                <Space direction="vertical" size={16}>
                     <Form
                         form={form}
                        name="filters"
                        layout={'inline'}
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}

                        initialValues={{
                            remember: true,
                        }}
                        onFinish={(values) => {
                            setFilters(values)
                        }}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Позиция"
                            name="position"

                        >
                            <Select
                                style={{width: 120}}
                                name='position'
                            >
                                {positions.map(position => {
                                    return (
                                        <Select.Option
                                            value={position.id}>
                                            {position.name}
                                        </Select.Option>
                                    )

                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Стек"
                            name="stack"

                        >
                            <Select
                                name={'stack'}
                                style={{width: 120}}

                            >
                                {stacks.map(stack => {
                                    return (
                                        <Select.Option
                                            value={stack.id}>{stack.max_size !== stack.min_size ?
                                            `${stack.min_size}ББ - ${stack.max_size}ББ` : stack.max_size + 'ББ'}
                                        </Select.Option>
                                    )

                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Действие"
                            name="move"

                        >
                            <Select
                                style={{width: 180}}
                                name={'move'}
                                showSearch={true}
                                filterOption = {(input,option) => {
                                    return option.children.includes(input)
                                }}
                            >
                                {movesets.map(moveset => {
                                    return (
                                        <Select.Option
                                            value={moveset.id}>
                                            {moveset.name}
                                        </Select.Option>
                                    )

                                })}
                            </Select>

                        </Form.Item>

                        <Form.Item

                        >
                            <Button type="primary" htmlType="submit">
                                Фильтровать
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button  htmlType="submit" onClick={() => {
                        form.resetFields()
                        setFilters({})
                    }}>
                                Сбросить фильтры
                            </Button>
                    <Row  gutter={[8, 8]}  className={'items-list'}>

                        {setups.map((setup) => {
                            return <Col span={8} ><Card
                                hoverable={true}
                                title={
                                    `${setup.position.name} 
                                ${setup.stack.max_size !== setup.stack.min_size ?
                                        `${setup.stack.min_size}ББ - ${setup.stack.max_size}ББ`
                                        : setup.stack.max_size + 'ББ'}
                                 ${setup.current_move.name}`}
                                extra={<><EditOutlined onClick={() => {
                                    getDefaultSetup(setup.id)
                                }} style={{marginRight: 10}} /><CloseOutlined onClick={() => {
                                    deleteSetups(setup.id)
                                }} style={{color: 'red'}}/> </>}>
                                <p>{setup.hands.map(hand => {
                                    return (
                                        (hand.suite? hand.cards + 's': hand.cards + 'o') + ' '
                                    )
                                })}</p>
                            </Card>
                            </Col>
                        })}
                    </Row>
                </Space>
            </Layout>
        </>
    )
}

export default Diapasones