import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Select, Input, Modal, Upload, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { productDetailServices } from '../../../utils/services/admin/productDetailService';
const { Option } = Select;
const { TextArea } = Input;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const ModalProductDetail = ({ open, setOpen, curDataProductDetail, color, size }) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState(null);
    //  const handleCancel = () => setPreviewOpen(false);
    useEffect(() => {
        console.log("curDataProductDetail:", curDataProductDetail);
        if (curDataProductDetail) {
            form.setFieldsValue({
                'Color.Id': curDataProductDetail?.color?.id ? curDataProductDetail?.color?.id : undefined,
                Quantity: curDataProductDetail?.quantity ? curDataProductDetail?.quantity : undefined,
                'Size.Id': curDataProductDetail?.size?.id ? curDataProductDetail?.size?.id : undefined
            })
        }
    }, [curDataProductDetail, form])
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
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
    const onFinish = async (values) => {
        try {
            console.log("Form Values:", values);
            const formData = new FormData();
            console.log(values)
            if (fileList) {
                const fileObj = fileList.originFileObj;
                formData.append(`ImageFile`, fileObj);
                console.log(fileObj)
            }
            formData.append("Color.Id", values["Color.Id"]);
            formData.append("Size.Id", values["Size.Id"]);
            formData.append("Quantity", values.Quantity);
            const res = await productDetailServices.updateProductDetail(curDataProductDetail.id, formData);
            console.log("API Response:", res);
            if (res) {
                //   getProduct();
                message.success("Chỉnh sửa thành công");
            }
        } catch (error) {
            console.error(error);
            message.error("Chỉnh sửa thất bại");
        }
    };
    return (
        <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={null}
            form={form}
        >
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                form={form}
                onFinish={onFinish}
                name="dynamic_form_complex"
                style={{
                    maxWidth: 600,
                    marginTop: "10px"
                }}
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

                        <Row>
                            <Col span={8}>
                                <div><label>Màu</label></div>
                                <Form.Item
                                    style={{ marginBottom: "4px" }}
                                    // label={"Màu"}
                                    name='Color.Id'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chọn màu",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        showSearch
                                        placeholder="Chọn màu "
                                        filterOption={(input, option) =>
                                            option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >
                                        {color.map((item) => (
                                            <Option key={item.id} value={item.id}>
                                                {item.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <div><label>size</label></div>
                                <Form.Item
                                    style={{ marginBottom: "4px" }}
                                    // label={"size"}
                                    name='Size.Id'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chọn size",
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        showSearch
                                        placeholder="Chọn size "
                                        filterOption={(input, option) =>
                                            option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                            0
                                        }
                                    >
                                        {size.map((item) => (
                                            <Option key={item.id} value={item.id}>
                                                {item.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <div><label>Số lượng</label></div>
                                <Form.Item
                                    style={{ marginBottom: "4px" }}
                                    // label={"Sex"}
                                    name='Quantity'
                                    rules={[
                                        {
                                            required: true,
                                            message: "Chọn số lượng",
                                        },
                                    ]}
                                >
                                    <Input style={{ marginBottom: "4px", padding: 0, textAlign: "center" }} type='number' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                        </Row>
                    </Col>

                </Row>
                <Button type="primary" htmlType="submit" style={{ marginTop: "10px", width: "100%" }}>
                    Chỉnh sửa
                </Button>
            </Form>
        </Modal>
    )
}
export default ModalProductDetail