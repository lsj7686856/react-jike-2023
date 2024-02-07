import {Layout, Menu, Popconfirm} from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import Authorization from "@/components/authorization";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo, resetState} from "@/store/modules/user";

const {Header, Sider} = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined/>,
    },
    {
        label: '文章管理',
        key: '/article',
        icon: <DiffOutlined/>,
    },
    {
        label: '创建文章',
        key: '/publish',
        icon: <EditOutlined/>,
    },
]

const GeekLayout = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const {name} = useSelector(state => state.userStoreReducer.userInfo)
    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch]);
    return (
        <Authorization>
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <div className="user-info">
                        <span className="user-name">{name}</span>
                        <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={(e) => {
                dispatch(resetState())
                navigate('/login')
            }}>
              <LogoutOutlined/> 退出
            </Popconfirm>
          </span>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            theme="dark"
                            selectedKeys={[pathname]}
                            items={items}
                            style={{height: '100%', borderRight: 0}}
                            onClick={(obj) => {
                                console.log(obj)
                                navigate(obj.key)
                            }}
                        ></Menu>
                    </Sider>
                    <Layout className="layout-content" style={{padding: 20}}>
                        <Outlet></Outlet>
                    </Layout>
                </Layout>
            </Layout>
        </Authorization>
    )
}
export default GeekLayout