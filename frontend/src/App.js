import './App.scss';
import React, {useEffect, useState} from "react";
import Editor from './components/Editor/Editor';
import SetupsEditor from './components/SetupsEditor/SetupsEditor';
import Situation from "./components/Situations/Situation";
import {BrowserRouter,HashRouter, NavLink, Route, Routes, Link} from "react-router-dom";
import {FallOutlined, UnorderedListOutlined, DownloadOutlined, ReadOutlined } from '@ant-design/icons';
import {Layout, Menu} from "antd";
import Preloader from "./components/common/Preloader/Preloader";

const {Sider, Content} = Layout;


function App() {
  return (
    <>
            <div className={'page-wrapper'}>
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
                                        <NavLink to={'/moves'}>
                                            <UnorderedListOutlined /> Сетапы
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to={'/situation'}>
                                            <ReadOutlined /> Расклад ситуации
                                        </NavLink>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <NavLink to={'/editor'}>
                                            <FallOutlined /> Исходники
                                        </NavLink>
                                    </Menu.Item>
                                </React.Fragment>
                            }
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content className={'page-content'}>
                             <Routes>
                                 <Route path={'/'}  element={<SetupsEditor/>}/>
                                 <Route path={'/moves/*'}  element={<SetupsEditor/>}/>
                                 <Route path={'/editor/*'}  element={<Editor/>}/>
                                 <Route path={'/situation'}  element={<Situation/>}/>
                                         </Routes>

                        </Content>
                    </Layout>
                </Layout>
            </div>
    </>
  );
}

function PokerApp() {
    return (
        <HashRouter>
            <App/>
        </HashRouter>
    )
}

export default PokerApp;
