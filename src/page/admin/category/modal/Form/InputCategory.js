import React, { useState } from 'react'
import { Form, Row, Col, Button, Select, Input, Modal, Upload, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { categoryServices } from '../../../../../utils/services/admin/categoryService';
const { Option } = Select;
const { TextArea } = Input;
const InputCategory = () => {
    const [form] = Form.useForm();
    const onFinishCategory = async (values) => {
        try {
            await categoryServices.create(values);
            message.success("Thêm mới thành công");
        } catch (error) {
            console.error(error);
            message.error("thêm mới thất bại");
        }
    }
    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinishCategory}
        >
            <Form.Item
                style={{ marginBottom: "4px" }}
                label={"Tên loại sản phẩm"}
                name="name"
                rules={[
                    {
                        required: true,
                        message: "Nhập tên loại sản phẩm",
                    }
                ]}
            >
                <Input type="text" placeholder="Nhập tên loại sản phẩm" />
            </Form.Item>
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <Form.Item>
                        <div
                            style={{
                                display: "flex",
                                marginTop: "10px",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Lưu
                            </Button>
                        </div>
                    </Form.Item>
                </Col>
                <Col span={4}></Col>
            </Row>

        </Form>
    )
}

export default InputCategory