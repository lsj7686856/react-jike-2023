import './index.scss'
import {Card, Form, Input, Button, message} from 'antd'
import logo from '@/assets/logo.png'
import {useDispatch} from "react-redux";
import {getToken, getUserInfo} from "@/store/modules/user";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    console.log('contextHolder', contextHolder);
    return (
        <div className="login">
            {contextHolder}
            <Card className="login-container">
                <img className="login-logo" src={logo} alt=""/>
                {/* 登录表单 */}
                <Form form={form}
                      onFinish={async (value) => {
                          await dispatch(getToken(value))
                          await dispatch(getUserInfo())
                          messageApi.success('登录成功', 0.5, () => {
                              navigate('/')
                          })
                      }}
                >
                    <Form.Item
                        name='mobile'
                        rules={[
                            {
                                required: true,
                                message: '请输入手机号',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号格式',
                            }
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" allowClear/>
                    </Form.Item>
                    <Form.Item
                        name='code'
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入验证码" allowClear/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block onClick={() => {
                            console.log('=====>', form.getFieldsValue(true))
                        }}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login