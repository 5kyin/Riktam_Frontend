import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row,Modal,Avatar,Tooltip,message } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { USERContext } from "../../_pages/App";


export default function UserEdit() {
    const { USER } = React.useContext(USERContext);    
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
    
    const handleOk = () => {
        setIsModalOpen(false);
      };
    
    const handleCancel = () => {
        setIsModalOpen(false);
      };

    const HandleRegisterFormSubmit = (values) => {
        axios.patch("/users/edit/", values)
            .then(res => {
                message.success("Success")
                handleCancel()
            }).catch(err => {})
    }
    return (USER && <>
        <Tooltip title={USER.username}>
            <Avatar icon={<UserOutlined />} onClick={showModal}/>
        </Tooltip>
        
        <Modal
            destroyOnClose={true}
            title={`${USER.username.toUpperCase()}'S EDIT WINDOW`}
            open={isModalOpen}
            footer={null}
            onOk={handleOk}
            onCancel={handleCancel}>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                    <Form
                        onSubmit={e => e.preventDefault()}
                        onFinish={HandleRegisterFormSubmit}
                        form={form}
                        layout="vertical"
                    >   
                    <Form.Item label="First Name" name="first_name">
                            <Input defaultValue={USER.first_name} placeholder="First Name" />
                    </Form.Item>
                    <Form.Item label="Last Name" name="last_name">
                            <Input defaultValue={USER.last_name} placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item type='email' label="Email" name="email">
                            <Input defaultValue={USER.email} placeholder="Email" />
                    </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType='submit'>Submit</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={8}></Col>
            </Row>
      </Modal>
      </>
        )
    }