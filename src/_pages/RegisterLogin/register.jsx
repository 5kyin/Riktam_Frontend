import React, { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row,Layout } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Register(){
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const HandleRegisterFormSubmit = (values) => {
        axios.post("/register/", values)
            .then(res => {
                navigate("/")
            }).catch(err => {})
    }
    
    return (
        <Layout>
            <Layout.Header><h1 style={{
                textAlign: "center",
                marginTop: 0,
                color: "#fff"
            }}>Registration</h1></Layout.Header>
            <Layout>
                
                <Layout.Content>

                
            <Row gutter={[16,16]}>
                <Col span={8}></Col>
                <Col span={8}></Col>
                <Col span={8}></Col>
                
                <Col span={8}></Col>    
                <Col span={8}>
                    <Form
                        onSubmit={e => e.preventDefault()}
                        onFinish={HandleRegisterFormSubmit}
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
                        
                    <Form.Item label="First Name" name="first_name">
                            <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item label="Last Name" name="last_name">
                            <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item type='email' label="Email" name="email">
                            <Input placeholder="Email" />
                    </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType='submit'>Submit</Button>
                            <Button type="link" onClick={()=>navigate("/")}>login</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}></Col>
                
                <Col span={8}></Col>
                <Col span={8}></Col>
                <Col span={8}></Col>
                    </Row>
                    </Layout.Content>
                
                </Layout>
            </Layout>
        )
    }