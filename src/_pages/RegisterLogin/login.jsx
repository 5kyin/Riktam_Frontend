import React, { useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row,Layout,message } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { USERContext } from "../../_pages/App";


export default function Login(){
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setUser } = React.useContext(USERContext);    

    const HandleLoginFormSubmit = (values) => {
        axios.post("/login/", values)
            .then(res => {
                navigate("/dashboard")
                let get_user_data = res?.data
                axios.defaults.headers.common['Authorization'] = get_user_data.token
                setUser(get_user_data)
                localStorage.setItem("User", JSON.stringify(get_user_data))
            }).catch(err => {
                navigate("/")
                console.log(err.response.data?.non_field_errors[0]);
                try {
                    let errorMessage = err.response.data?.non_field_errors[0]    
                    message.error(errorMessage)
                } catch (error) {
                    console.log(error);
                    // message.error(error)
                }
                
                axios.defaults.headers.common['Authorization'] = "";
                localStorage.removeItem("User")
            })
    }
    
    return (
        <Layout>
            <Layout.Header><h1 style={{
                textAlign: "center",
                marginTop: 0,
                color: "#fff"
            }}>Login</h1></Layout.Header>
            <Layout>
                
                <Layout.Content>
                <Row gutter={[16, 16]}>
                <Col span={8} />
                <Col span={8} />
                <Col span={8} />

                <Col span={8} />
                <Col span={8} >
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
                            <Button type="link" onClick={()=>navigate("/register")}>Register</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8} />

                <Col span={8} />
                <Col span={8} />
                <Col span={8} />
            </Row>
                </Layout.Content>
                
                </Layout>
            </Layout>
            
        )
    }