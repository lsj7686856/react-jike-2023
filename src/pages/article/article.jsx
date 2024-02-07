import {Link} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Tag, Space, Table} from 'antd'
import img404 from "@/assets/error.png";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useGetChannels} from "@/hooks/useGetChannels";
import {useEffect, useState} from "react";
import request from "@/utils/request";

const {Option} = Select
const {RangePicker} = DatePicker

const Article = () => {
    const STATUS = {
        '1': <Tag color="success">审核通过</Tag>,
        '2': <Tag color="warning">待审核</Tag>
    }
    // 准备列数据
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover.images[0] || img404} width={80} height={60} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text, record, index) => STATUS[text]
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}/>
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined/>}
                        />
                    </Space>
                )
            }
        }
    ]
    // 获取频道列表
    const [channelList, setChannelList] = useGetChannels()
    // 获取表格数据
    const [tableData, setTableData] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        const getTableData = async () => {
            const result = await request.get('/mp/articles')
            setTableData(result.data.results)
            setCount(result.data.total_count)
        }
        getTableData()
    }, []);
    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>首页</Link>},
                        {title: '文章列表'},
                    ]}/>
                }
                style={{marginBottom: 20}}
            >
                <Form initialValues={{status: ''}}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={''}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{width: 120}}
                            options={channelList}
                            fieldNames={{label: 'name', value: 'id'}}
                            allowClear
                        >
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 40}}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/*表格数据*/}
            <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
                <Table rowKey="id"
                       columns={columns}
                       dataSource={tableData}
                       pagination={
                           {
                               showSizeChanger: true,
                               showQuickJumper: true
                           }}
                />
            </Card>
        </div>
    )
}

export default Article