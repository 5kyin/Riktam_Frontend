import React, { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login(){
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const HandleLoginFormSubmit = (values) => {
        axios.post("/login/", values)
            .then(res => {
                navigate("/dashboard")
                let get_user_data = res?.data
                axios.defaults.headers.common['Authorization'] = get_user_data.token
                localStorage.setItem("User", JSON.stringify(get_user_data))
            }).catch(err => {
                navigate("/")
                axios.defaults.headers.common['Authorization'] = "";
                localStorage.removeItem("User")
            })
    }
    
    return (
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <Form
                        onSubmit={e => e.preventDefault()}
                        onFinish={HandleLoginFormSubmit}
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item label="User Name" name="username" required tooltip="This is a required field"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input placeholder="User Name placeholder" />
                        </Form.Item>
                        <Form.Item label="Password" name="password" required tooltip="This is a required field"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}>
                            <Input type='password' placeholder="Password placeholder" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}></Col>
            </Row>
        )
    }