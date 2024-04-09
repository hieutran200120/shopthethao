import React, { useState } from "react";
import { Button, Checkbox, Form, Grid, Input, theme, Typography, Modal, Upload, message, Row, Col } from "antd";
import { LockOutlined, MailOutlined, PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { userServices } from "../../../utils/services/user/userService";
import { useNavigate } from "react-router-dom";
import "./Register.scss"
const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Title, Link } = Typography;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const Register = () => {
    const { token } = useToken();
    const screens = useBreakpoint();
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [fileList, setFileList] = useState(null);
    const navigate = useNavigate()
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1));
    };
    const handleChange = ({ file, fileList }) => {
        const newFileList = file ? [file] : [];

        if (fileList.length === 0) {
            setFileList(null);
            setPreviewImage('');
            setPreviewTitle('');
            setPreviewOpen(false);
        } else {
            setFileList(newFileList.length > 0 ? { ...newFileList[0] } : null);
            setPreviewImage('');
            setPreviewTitle('');
            setPreviewOpen(false);
        }
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',

            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const styles = {
        container: {
            margin: "0 auto",
            padding: screens.md ? `${token.paddingXL}px` : `${token.sizeXXL}px ${token.padding}px`,
            width: "455px"
        },
        footer: {
            marginTop: token.marginLG,
            textAlign: "center",
            width: "100%"
        },
        forgotPassword: {
            float: "right"
        },
        header: {
            marginBottom: token.marginXL
        },
        section: {
            alignItems: "center",
            backgroundColor: token.colorBgContainer,
            display: "flex",
            height: screens.sm ? "100vh" : "auto",
            padding: screens.md ? `${token.sizeXXL}px 0px` : "0px"
        },
        text: {
            color: token.colorTextSecondary
        },
        title: {
            fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3
        }
    };
    //đăng kí người dùng
    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            //  console.log(values)
            if (fileList) {
                const fileObj = fileList.originFileObj;
                formData.append(`ImageFile`, fileObj);
                console.log(fileObj)
            }
            formData.append("LastName", values.LastName);
            formData.append("FirstName", values.FirstName);
            formData.append("Email", values.Email);
            formData.append("Bio", values.Bio);
            formData.append("Password", values.Password);
            formData.append("Role", values.Role = "customer");
            await userServices.create(formData);
            message.success("Thêm mới thành công");
            navigate(`/login`)
            console.log(formData);
        } catch (error) {
            console.error(error);
            message.error("thêm mới thất bại");
        }
    };
    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
                        <path
                            d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
                            fill="white"
                        />
                        <path
                            d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
                            fill="white"
                        />
                        <path
                            d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
                            fill="white"
                        />
                    </svg>

                    <Title style={styles.title}>Đăng ký</Title>
                </div>
                <Form
                    name="normal_login"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Row gutter={15}>
                        <Col span={12}>
                            <Form.Item
                                name="FirstName"
                                rules={[
                                    {
                                        type: "text",
                                        required: true,
                                        message: "Please input your FirstName!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="FirstName"
                                    style={{ margin: 0 }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="LastName"
                                rules={[
                                    {
                                        type: "text",
                                        required: true,
                                        message: "Please input your LastName!",
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<MailOutlined />}
                                    placeholder="LastName"
                                    style={{ margin: 0 }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Upload
                                //  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                listType="picture-card"
                                fileList={fileList ? [fileList] : []}
                                name='ImageFile'
                                onPreview={handlePreview}
                                onChange={handleChange}
                                style={{ textAlign: "center" }}
                            >
                                {fileList ? null : uploadButton}
                            </Upload>
                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </Col>
                    </Row>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Email"
                            style={{ margin: 0 }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                            style={{ margin: 0 }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Bio"
                        rules={[
                            {
                                type: "text",
                                required: true,
                                message: "Please input your Bio!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Bio"
                            style={{ margin: 0 }}
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: "0px" }}>
                        <Button block="true" type="primary" htmlType="submit">
                            ĐĂNG KÝ
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}

export default Register