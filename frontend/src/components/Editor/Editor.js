import React from 'react';
import {Layout, Menu} from "antd";
import {NavLink, Route, Routes, useResolvedPath} from "react-router-dom";
import {SmallDashOutlined } from "@ant-design/icons";
import Hands from './EditorComponents/Hands/Hands'
import Positions from './EditorComponents/Positions/Positions'
import Stacks from './EditorComponents/Stacks/Stacks'
import Authors from "./EditorComponents/Authors/Authors";

const {Sider, Content} = Layout;


const Editor = () => {
    const url = useResolvedPath("").pathname;
    return (
        <>
            <Layout>
                 <Sider breakpoint="lg"
                           collapsedWidth="0">
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="inline"
                        >
                            {
                                <React.Fragment>
                                    <Menu.Item>
                                        <NavLink to={`${url}/hands`}>
                                            <SmallDashOutlined /> Руки
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to={`${url}/positions`} >
                                            <SmallDashOutlined /> Позиции
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to={`${url}/stacks`}>
                                            <SmallDashOutlined /> Размер стэка
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to={`${url}/authors`}>
                                            <SmallDashOutlined /> Авторы
                                        </NavLink>
                                    </Menu.Item>
                                </React.Fragment>
                            }
                        </Menu>
                    </Sider>
                <Layout>
                        <Content className={'page-content'}>
                             <Routes>
                                 <Route path={''} element={<Hands/>}/>
                                <Route  path={'hands'} element={<Hands/>}/>
                                <Route path={'positions'} element={<Positions/>}/>
                                <Route path={'stacks'} element={<Stacks/>}/>
                                 <Route path={'authors'} element={<Authors/>}/>
                              </Routes>

                        </Content>
                    </Layout>
            </Layout>
        </>
    )
}

export default Editor