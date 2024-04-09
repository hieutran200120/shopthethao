import React, { useState, useEffect } from 'react'
import { Button, Modal, message } from 'antd';
import { productDetailServices } from '../../../utils/services/admin/productDetailService';
import { productServices } from '../../../utils/services/admin/productServices';
import { Form, Input, Radio, Row, Col } from 'antd';
import "./ModalProduct.scss"
import ProductDetail from '../../product/productDetail/ProductDetail';
const ModalProduct = ({ isModalOpen, handleOk, handleCancel, productId }) => {
    const [DataProduct, setDataProduct] = useState([]);
    const [dataProductDetail, setDataProductdetail] = useState([]);
    const data = sessionStorage.getItem("orderData");
    const [dataOrder, setDataOrder] = useState(data ? JSON.parse(data) : []);
    const [quantity, setQuantity] = useState(1);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        const productDetailItem = dataProductDetail.find(
            (item) => item.color.name === values.selectedColor && item.size.name === values.selectedSize
        );
        if (productDetailItem) {
            let updatedOrderData = dataOrder.map((item) =>
                item.id === productDetailItem.product.id
                    ? { ...item, quantity: Number(item.quantity) + Number(values.quantity) }
                    : item
            );
            if (!updatedOrderData.some((item) => item.id === productDetailItem.product.id)) {
                const newDataOrderItem = {
                    id: productDetailItem.product.id,
                    name: productDetailItem.product.name,
                    img: productDetailItem.image,
                    price: productDetailItem.product.price,
                    quantity: values.quantity,
                    color: values.selectedColor,
                    size: values.selectedSize
                };
                updatedOrderData.push(newDataOrderItem);
            }
            setDataOrder(updatedOrderData);
            sessionStorage.setItem('orderData', JSON.stringify(updatedOrderData));
            // Hiển thị thông tin đơn hàng trong console
            message.success('Thêm vào giỏ hàng thành công')
        } else {
            console.log('Không tìm thấy sản phẩm trong dataProductDetail.');
        }
    };
    //lấy dữ liệu sản phẩm 
    const getProduct = async () => {
        try {
            const res = await productServices.get({ Id: productId });
            setDataProduct(res.items);
            // console.log(DataProduct)
        } catch (error) {
            console.error(error);
        }
    };
    //lấy sản phẩn chi tiết
    const getProductDetail = async () => {
        try {
            const res = await productDetailServices.get({ Product_id: productId });
            setDataProductdetail(res.items);
            console.log("dataProductDetail", res.items)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (isModalOpen == true) {
            getProduct();
            getProductDetail();
        }
    }, [isModalOpen]);
    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} width={667} >
            <Form form={form} onFinish={onFinish}>
                {DataProduct.map((items, index) => (
                    <React.Fragment key={index}>
                        <div className="block-quickview primary_block details-product">
                            <div className="row">
                                <div className="product-left-column product-images col-xs-12 col-sm-4 col-md-4 col-lg-5 col-xl-5">
                                    <div className="image-block large-image col_large_default">
                                        <span className="view_full_size">
                                            <img src={items.image} alt={items.name} />
                                        </span>
                                    </div>
                                </div>
                                <div className="product-center-column product-info product-item col-xs-12 col-sm-6 col-md-8 col-lg-7 col-xl-7 details-pro style_product style_border">
                                    <div className="box-product-info">
                                        <div className="group-info-pro">
                                            <div className="head-qv group-status">
                                                <h3 className="qwp-name title-product">
                                                    {items.name}
                                                </h3>
                                            </div>
                                            <div className="quickview-info">
                                                <span className="prices price-box">
                                                    <span className="price product-price">
                                                        {items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </span>
                                                    <del className="old-price" style={{ display: 'none' }}></del>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="swatch clearfix">
                                            <div className="header">Size: </div>
                                            <div className="name-size">
                                                <Form.Item name="selectedColor" rules={[{ required: true, message: 'Please select a color' }]}>
                                                    <Radio.Group>
                                                        {dataProductDetail.map((data, colorIndex) => (
                                                            <Radio key={colorIndex} value={data.color.name}>
                                                                <span className='check-radio'>{data.color.name}</span>
                                                            </Radio>
                                                        ))}
                                                    </Radio.Group>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="swatch clearfix">
                                            <div className="header">Màu: </div>
                                            <div className="name-color">
                                                <Form.Item name="selectedSize" rules={[{ required: true, message: 'Please select a size' }]}>
                                                    <Radio.Group>
                                                        {dataProductDetail.map((data, sizeIndex) => (
                                                            <Radio key={sizeIndex} value={data.size.name}>
                                                                <span className='check-radio' >{data.size.name}</span>
                                                            </Radio>
                                                        ))}
                                                    </Radio.Group>
                                                </Form.Item>
                                            </div>
                                        </div>
                                        <div className="form_product_content">
                                            <div className="count_btn_style quantity_wanted_p">
                                                <div className=" soluong1 clearfix">
                                                    <Form.Item name="quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
                                                        <div className="input_number_product">
                                                            {/* <button className="button-quantity" onClick={decreaseQuantity}>-</button> */}
                                                            <Input
                                                                type="number"
                                                                id="quantity-detail"
                                                                value={quantity}
                                                                min={1}
                                                                name="quantity"
                                                                className="form-control prd_quantity"
                                                                onChange={(e) => {
                                                                    form.setFieldsValue({ quantity: e.target.value });
                                                                    setQuantity(e.target.value);
                                                                }}
                                                            />
                                                            {/* <button className="button-quantity " onClick={increaseQuantity}>+</button> */}
                                                        </div>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="button_actions clearfix">
                                                <Form.Item >
                                                    <Button type="primary" htmlType="submit" style={{
                                                        background: "var(--mainColor)",
                                                        fontSize: "1.6rem",
                                                        borderRadius: 0,
                                                        transition: "background 0.3s"
                                                    }}
                                                        hover={{
                                                            background: "var(--subColor)",
                                                            color: "#333"
                                                        }}
                                                    >
                                                        Thêm vào giỏ hàng
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                ))}
            </Form>
        </Modal >
    )
}

export default ModalProduct