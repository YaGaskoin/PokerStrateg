import React from 'react';
import {Layout, Menu} from "antd";
import {NavLink, Route, Routes, useResolvedPath} from "react-router-dom";
import {SmallDashOutlined } from "@ant-design/icons";
import MoveSets from "./SetupsEditorComponents/MoveSets/MoveSets";
import Diapasones from "./SetupsEditorComponents/Diapasone/Diapasone";


const {Sider, Content} = Layout;


const SetupsEditor = () => {
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
                                        <NavLink to={`${url}/movesets`}>
                                            <SmallDashOutlined /> Мувсет
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to={`${url}/diapasones`} >
                                            <SmallDashOutlined />Диапазон
                                        </NavLink>
                                    </Menu.Item>

                                </React.Fragment>
                            }
                        </Menu>
                    </Sider>
                <Layout>
                        <Content className={'page-content'}>
                             <Routes>
                                 <Route path={''} element={<MoveSets/>}/>
                                <Route  path={'movesets'} element={<MoveSets/>}/>
                                <Route path={'diapasones'} element={<Diapasones/>}/>
                                {/*<Route path={'stacks'} element={<Stacks/>}/>*/}
                              </Routes>

                        </Content>
                    </Layout>
            </Layout>
        </>
    )
}

export default SetupsEditor