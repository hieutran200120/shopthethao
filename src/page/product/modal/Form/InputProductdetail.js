import React, { useState } from 'react'
import { Form, Row, Col, Button, Select, Input, Modal, Upload, Card, Space, Typography, Checkbox } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@ant-design/icons';
const { Option } = Select;
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const InputProductdetail = ({ onBack, fileList, setFileList, color, size, onFinishProductDetail }) => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
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
    return (
        <Form
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 18,
            }}
            form={form}
            onFinish={onFinishProductDetail}
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
                Thêm mới
            </Button>
        </Form>
        // <Form
        //     labelCol={{
        //         span: 6,
        //     }}
        //     wrapperCol={{
        //         span: 18,
        //     }}
        //     form={form}
        //     onFinish={onFinishProductDetail}
        //     name="dynamic_form_complex"
        //     style={{
        //         maxWidth: 600,
        //     }}
        //     autoComplete="off"
        //     initialValues={{
        //         items: [{}],
        //     }}
        // >
        //     <Form.List name="items">
        //         {(fields, { add, remove }) => (
        //             <div
        //                 style={{
        //                     display: 'flex',
        //                     rowGap: 16,
        //                     flexDirection: 'column',
        //                 }}
        //             >
        //                 {fields.map((field) => (
        //                     <Card
        //                         size="small"
        //                         title={`Item ${field.name + 1}`}
        //                         key={field.key}
        //                         extra={
        //                             <CloseOutlined
        //                                 onClick={() => {
        //                                     remove(field.name);
        //                                 }}
        //                             />
        //                         }
        //                     >
        //                         <Row gutter={15}>
        //                             <Col span={6}>
        //                                 <Upload
        //                                     listType="picture-card"
        //                                     fileList={fileList ? [fileList] : []}
        //                                     name={[field.name, 'ImageFile']}
        //                                     onPreview={handlePreview}
        //                                     onChange={handleChange}
        //                                 >
        //                                     {fileList ? null : uploadButton}
        //                                 </Upload>
        //                                 <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        //                                     <img alt="example" style={{ width: '100%' }} src={previewImage} />
        //                                 </Modal>
        //                             </Col>
        //                             <Col span={18}>

        //                                 <Row>
        //                                     <Col span={8}>
        //                                         <div><label>Màu</label></div>
        //                                         <Form.Item
        //                                             style={{ marginBottom: "4px" }}
        //                                             // label={"Màu"}
        //                                             name={[field.name, 'Color.Id']}
        //                                             rules={[
        //                                                 {
        //                                                     required: true,
        //                                                     message: "Chọn màu",
        //                                                 },
        //                                             ]}
        //                                         >
        //                                             <Select
        //                                                 allowClear
        //                                                 showSearch
        //                                                 placeholder="Chọn màu "
        //                                                 filterOption={(input, option) =>
        //                                                     option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
        //                                                     0
        //                                                 }
        //                                             >
        //                                                 {color.map((item) => (
        //                                                     <Option key={item.id} value={item.id}>
        //                                                         {item.name}
        //                                                     </Option>
        //                                                 ))}
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col span={8}>
        //                                         <div><label>size</label></div>
        //                                         <Form.Item
        //                                             style={{ marginBottom: "4px" }}
        //                                             // label={"size"}
        //                                             name={[field.name, 'Size.Id']}
        //                                             rules={[
        //                                                 {
        //                                                     required: true,
        //                                                     message: "Chọn size",
        //                                                 },
        //                                             ]}
        //                                         >
        //                                             <Select
        //                                                 allowClear
        //                                                 showSearch
        //                                                 placeholder="Chọn size "
        //                                                 filterOption={(input, option) =>
        //                                                     option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
        //                                                     0
        //                                                 }
        //                                             >
        //                                                 {size.map((item) => (
        //                                                     <Option key={item.id} value={item.id}>
        //                                                         {item.name}
        //                                                     </Option>
        //                                                 ))}
        //                                             </Select>
        //                                         </Form.Item>
        //                                     </Col>
        //                                     <Col span={8}>
        //                                         <div><label>Số lượng</label></div>
        //                                         <Form.Item
        //                                             style={{ marginBottom: "4px" }}
        //                                             // label={"Sex"}
        //                                             name={[field.name, 'Quantity']}
        //                                             rules={[
        //                                                 {
        //                                                     required: true,
        //                                                     message: "Chọn số lượng",
        //                                                 },
        //                                             ]}
        //                                         >
        //                                             <Input style={{ marginBottom: "4px", padding: 0, textAlign: "center" }} type='number' />
        //                                         </Form.Item>
        //                                     </Col>
        //                                 </Row>
        //                                 <Row>


        //                                 </Row>
        //                             </Col>

        //                         </Row>
        //                     </Card>
        //                 ))}

        //                 <Button type="dashed" onClick={() => add()} block>
        //                     + Add Item
        //                 </Button>
        //             </div>
        //         )}
        //     </Form.List>
        //     <Button type="primary" htmlType="submit" style={{ marginTop: "10px", width: "100%" }}>
        //         Thêm mới
        //     </Button>
        // </Form>

    )
}

export default InputProductdetail