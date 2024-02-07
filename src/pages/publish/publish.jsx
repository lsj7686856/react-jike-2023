import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select, message
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss'
import {useEffect, useState} from "react";
import request from "@/utils/request";
import {useGetChannels} from "@/hooks/useGetChannels";

const {Option} = Select

const Publish = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [value, setValue] = useState('');
    const [channelList, setChannelList] = useGetChannels()
    const [imageList, setImageList] = useState([])
    const [maxCount, setMaxCount] = useState(1)
    return (
        <div className="publish">
            {contextHolder}
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '发布文章'},
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: maxCount}}
                    onFinish={(saveData) => {
                        if (maxCount !== imageList.length) {
                            return messageApi.warning('封面数量和图片数量不匹配', 2)
                        }
                        saveData.cover = {
                            type: maxCount,
                            image: imageList.map(item => item.response.data.url)
                        }
                        request({
                            url: '/mp/articles',
                            method: 'post',
                            params: {
                                draft: false
                            },
                            data: saveData
                        })
                    }}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}} allowClear/>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{required: true, message: '请选择文章频道'}]}
                    >
                        <Select
                            placeholder="请选择文章频道" style={{width: 400}}
                            options={channelList}
                            fieldNames={{label: 'name', value: 'id'}}
                            allowClear
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group
                                value={maxCount}
                                onChange={({target: {value}}) => {
                                    setMaxCount(value)
                                    setImageList([])
                                }}
                                options={[
                                    {label: '单图', value: 1},
                                    {label: '三图', value: 3},
                                    {label: '无图', value: 0},
                                ]}>
                            </Radio.Group>
                        </Form.Item>
                        <Upload
                            listType="picture-card"
                            showUploadList
                            action={'http://geek.itheima.net/v1_0/upload'}
                            name={'image'}
                            accept={'.png, .jpg, .jpeg .gif'}
                            className={maxCount === 0 && 'display-none'}
                            maxCount={maxCount}
                            fileList={imageList}
                            multiple={maxCount !== 1}
                            onChange={({fileList}) => {
                                console.log(fileList);
                                setImageList(fileList)
                            }}
                        >
                            <div>
                                <PlusOutlined/>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{required: true, message: '请输入文章内容'}]}
                    >
                        <ReactQuill theme="snow" value={value} onChange={setValue}
                                    placeholder='请输入内容'></ReactQuill>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish