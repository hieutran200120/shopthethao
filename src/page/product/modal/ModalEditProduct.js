import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, Select, Input, Modal, Upload, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { productServices } from '../../../utils/services/admin/productServices';
import axios from 'axios';
const { Option } = Select;
const { TextArea } = Input;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const ModalEditProduct = ({ open, setOpen, curData, getProduct, category, supplier, productType }) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState(null);
    //  const handleCancel = () => setPreviewOpen(false);
    useEffect(() => {
        console.log("curData:", curData);
        if (curData) {
            form.setFieldsValue({
                Name: curData?.name ? curData?.name : "",
                Price: curData?.price ? curData?.price : undefined,
                PriceSale: curData?.priceSale ? curData?.priceSale : undefined,
                Description: curData?.description ? curData?.description : undefined,
                Sex: curData?.sex ? curData?.sex : undefined,
                IsSale: curData?.isSale ? curData?.isSale : undefined,
                'Category.Id': curData?.category?.id ? curData?.category?.id : undefined,
                'ProductType.Id': curData?.productType?.id ? curData?.productType?.id : undefined,
                'Supplier.Id': curData?.supplier?.id ? curData?.supplier?.id : undefined
            })
        }
    }, [curData, form])
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
        setFileList(newFileList.length > 0 ? { ...newFileList[0] } : null);
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
            formData.append("Name", values.Name);
            formData.append("Price", values.Price);
            formData.append("PriceSale", values.PriceSale);
            formData.append("Sex", values.Sex);
            formData.append("IsSale", values.IsSale);
            formData.append("Category.Id", values["Category.Id"]);
            formData.append("Supplier.Id", values["Supplier.Id"]);
            formData.append("ProductType.Id", values["ProductType.Id"]);
            formData.append("Description", values.Description);
            const res = await productServices.updateProduct(curData.id, formData);
            console.log("API Response:", res);
            if (res) {
                getProduct();
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
        >
            <Form
                layout="vertical"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Row gutter={15}>
                    <Col span={15}>
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            label={"Tên sản phẩm"}
                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập tên sản phẩm",
                                }
                            ]}
                        >
                            <Input type="text" placeholder="Nhập tên sản phẩm" />
                        </Form.Item>
                        <Row gutter={15}>
                            <Col span={12}>
                                <Form.Item
                                    style={{ marginBottom: "4px" }}
                                    label={"IsSale"}
                                    name="IsSale"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn trạng thái Sale",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Chọn trạng thái Sale"
                                        style={{ width: 120 }}
                                        options={[
                                            { value: true, label: 'Giảm giá' },
                                            { value: false, label: 'Không giảm' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    style={{ marginBottom: "4px" }}
                                    label={"Giới tính"}
                                    name="Sex"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Vui lòng chọn trạng thái Sale",
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Chọn trạng thái Sale"
                                        style={{ width: 120 }}
                                        options={[
                                            { value: true, label: 'Nam' },
                                            { value: false, label: 'Nữ' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div style={{ marginTop: 8 }}>
                            <span style={{ fontSize: 14 }}>Ảnh đại diện</span>
                        </div>
                        <Upload
                            //  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            listType="picture-card"
                            fileList={fileList ? [fileList] : []}
                            name='ImageFile'
                            onPreview={handlePreview}
                            onChange={handleChange}
                        >
                            {fileList ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col span={12}>
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            label={" PriceSale"}
                            name="PriceSale"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập giá sale",
                                }

                            ]}
                        >
                            <Input type="number" placeholder="Nhập giá sale" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            label={"Price "}
                            name="Price"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập giá ",
                                }

                            ]}
                        >
                            <Input type="number" placeholder="Nhập giá chính" />
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={15}>
                    <Col span={12}>
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            label={"Loại sản phẩm"}
                            name="Category.Id"
                            rules={[
                                {
                                    required: true,
                                    message: "Chọn loại sản phẩm",
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                showSearch
                                placeholder="Chọn loại sản phẩm"
                                filterOption={(input, option) =>
                                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                    0
                                }
                            >
                                {category.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            label={"Kiểu sản phẩm"}
                            name="ProductType.Id"
                            rules={[
                                {
                                    required: true,
                                    message: "Chọn nhà loại sản phẩm",
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                showSearch
                                placeholder="Chọn loại sản phẩm"
                                filterOption={(input, option) =>
                                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                    0
                                }
                            >
                                {productType.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            label={"nhà cung cấp"}
                            name="Supplier.Id"
                            rules={[
                                {
                                    required: true,
                                    message: "Chọn nhà cung cấp",
                                },
                            ]}
                        >
                            <Select
                                allowClear
                                showSearch
                                placeholder="Chọn nhà cung cấp"
                                filterOption={(input, option) =>
                                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                    0
                                }
                            >
                                {supplier.map((item) => (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <Form.Item
                            style={{ marginBottom: "4px" }}
                            label={"Mô tả"}
                            name="Description"
                        >
                            <TextArea rows={4} placeholder="Type your comment" />
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
                                    Next
                                </Button>
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalEditProduct