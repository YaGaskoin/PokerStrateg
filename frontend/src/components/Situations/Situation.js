import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, Layout, List, message, Select, Typography, Radio, Space} from "antd";
import axiosInstance from "../../api/api";
import './Situations.scss';
import sorted_names from "../../assets/cards_sorted";

const {Sider, Content} = Layout;


const Situations = () => {
    let [rightMoveSets, setRightMoveSets] = useState([])
    let [hands, setHands] = useState([]);
    let [positions, setPositions] = useState([]);
    let [stacks, setStacks] = useState([]);
    let [authors, setAuthors] = useState([]);
    let [movesets, setMoveSets] = useState([]);
    const onFinish = async (values) => {
        await axiosInstance.get("/moves/move_sets/right_moves", {params: values}).then(
            response => {
                setRightMoveSets(response.data)
            }
        )
    };
    const onFinishFailed = (errorInfo) => {
        message.error('Неправильно заполнена форма')
    };

    const getMoveSets = async () => {
        return await axiosInstance.get("/moves/move_sets").then(response => {
            setMoveSets(response.data)
        })
    }

     const getAuthors = async () => {
        return await axiosInstance.get("/fact_data/authors/").then(response => {
            setAuthors(response.data)
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

    const deleteMoveSet = async (id) => {
        return await axiosInstance.delete(`/moves/move_sets/${id}`).then(response => {
            response.status === 204 ? message.success('Мувсет удален') : message.error('Ошибка при удалении')
            getMoveSets()
        })
    }
    useEffect(() => {

        getMoveSets()
        getHands()
        getStacks()
        getPositions()
        getAuthors()
    }, [])

    return (
        <>
            <Layout>
                <Content className={'page-content'}>

                    <Form
                        name="basic"
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
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Автор"
                            name="author"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select
                                style={{width: 200}}
                                name={'author'}
                            >
                                {authors.map(author => {
                                    return (
                                        <Select.Option
                                            value={author.id}>
                                            {author.name}
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
                            <Radio.Group  buttonStyle="solid" style={{width:'200px', minWidth: '200px'}}>
                                 <Space direction="vertical">
                                 {
                                     positions.map((position) => {
                                         return <Radio.Button style={{width:'180px'}}  key={position.id}  value={position.id}>{position.name}</Radio.Button>
                                     })
                                 }
                                 </Space>
                             </Radio.Group>
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
                             <Radio.Group  buttonStyle="solid" style={{width:'200px', minWidth: '200px'}}>
                                 <Space direction="vertical">
                                 {
                                     stacks.map((stack) => {
                                         return <Radio.Button style={{width:'180px'}}  key={stack.id}  value={stack.id}>{stack.max_size !== stack.min_size ?
                                            `${stack.min_size}ББ - ${stack.max_size}ББ` : stack.max_size + 'ББ'}</Radio.Button>
                                     })
                                 }
                                 </Space>
                             </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label="Рука"
                            name="hand"
                            style={{width:'520px', display:'flex'}}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                             <Radio.Group style={{display: 'block', 'width': '450px'}} buttonStyle="solid">
                                 {[...Array(169).keys()].map((index) => {
                                     let cards = sorted_names[index]
                                     for(let current_hand of hands) {
                                         if (`${current_hand.cards}${current_hand.suite?'s':'o'}` === cards){
                                             return <Radio.Button className={'cardCell'} key={index}  value={current_hand.id}>{`${current_hand.cards}${current_hand.suite?'s':'o'}`}</Radio.Button>
                                         }
                                     }

                                 })}

                            </Radio.Group>

                        </Form.Item>

                        <Form.Item

                        >
                            <Button type="primary" htmlType="submit">
                                Искать
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider/>
                    <Layout>


                            {
                                rightMoveSets.length > 0 ?
                                    <List
                                        header={<div>Действия</div>}
                                        bordered
                                        dataSource={rightMoveSets}
                                        renderItem ={ (item) => {
                                            // for (let move of rightMoveSets) {
                                            //     if (item.name === move.name){
                                            //         return(
                                            //             <List.Item>
                                            //         <Typography.Text style={{color:'green'}}>Есть</Typography.Text> {item.name}
                                            // </List.Item>
                                            //         )
                                            //     }
                                            // }
                                            return(
                                                        <List.Item>
                                                    <Typography.Text style={{color:'green'}}>Есть</Typography.Text> {item.name}
                                            </List.Item>
                                                    )
                                        }}

                                    />
                                :
                                     <List
                                        header={<div>Действия</div>}
                                        bordered
                                        >
                                          <List.Item>
                                    <Typography.Text style={{color:'green'}}>Есть</Typography.Text> Фолд
                                               </List.Item>
                                         </List>
                            }
                    </Layout>
                </Content>
            </Layout>
        </>
    )
}

export default Situations