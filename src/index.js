import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css'
import './index.css';
import App from './App';
import {RouterProvider} from "react-router-dom";
import store from "@/store";
import {Provider} from "react-redux";
import router from "./routers";
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <RouterProvider router={router}>
                <App/>
            </RouterProvider>
        </ConfigProvider>
    </Provider>
);
