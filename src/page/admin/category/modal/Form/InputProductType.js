import React, { useState } from 'react'
import { Form, Input, message, Row, Modal, Upload, Col, Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { producTypeServices } from '../../../../../utils/services/admin/productTypeService';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const InputProductType = () => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState(null);
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
        // Ensure only one file is in the fileList
        const newFileList = file ? [file] : [];

        if (fileList.length === 0) {
            setFileList(null);
            setPreviewImage('');
            setPreviewTitle('');
            setPreviewOpen(false);
        } else {
            setFileList(newFileList.length > 0 ? { ...newFileList[0] } : null);
            // Reset preview state when changing the file
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
    const onFinishProductType = async (values) => {
        try {
            const formData = new FormData();
            if (fileList) {
                const fileObj = fileList.originFileObj;
                formData.append(`ImageFile`, fileObj);
                // console.log(fileObj)
            }
            formData.append("Name", values.Name);
            await producTypeServices.create(formData);
            message.success("Thêm mới thành công");
            console.log("values:", values)
        } catch (error) {
            console.error(error);
            message.error("Thêm mới thất bại");
        }
    };
    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinishProductType}
        >
            <Row gutter={15}>
                <Col span={6}>
                    <Upload
                        listType="picture-card"
                        fileList={fileList ? [fileList] : []}
                        name="ImageFile"
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Col>
                <Col span={18}>
                    <Form.Item
                        style={{ marginBottom: "4px" }}
                        label={"Tên môn thể thao"}
                        name="Name"
                        rules={[
                            {
                                required: true,
                                message: "Nhập tên môn thể thao",
                            }
                        ]}
                    >
                        <Input type="text" placeholder="Nhập tên môn thể thao" />
                    </Form.Item>
                </Col>
            </Row>
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

export default InputProductType