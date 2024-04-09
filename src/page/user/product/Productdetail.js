import React, { useState, useEffect } from 'react'
import "./ProductDetail.scss"
import "../../../css/bootstrap.scss"
import { productServices } from '../../../utils/services/admin/productServices'
import { productDetailServices } from '../../../utils/services/admin/productDetailService'
import { useParams } from 'react-router-dom';
import { Form, Input, Radio, Row, Col, Button, message } from 'antd';
const Productdetail = () => {
    const [dataProduct, setDataProduct] = useState([]);
    const [dataProductDetail, setDataProductdetail] = useState([]);
    const data = sessionStorage.getItem("orderData");
    const [dataOrder, setDataOrder] = useState(data ? JSON.parse(data) : []);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const [form] = Form.useForm();
    console.log(id)
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
            message.success('Thêm vào giỏ hàng thành công');
        } else {
            console.log('Không tìm thấy sản phẩm trong dataProductDetail.');
        }
    };
    //lấy sản phẩn chi tiết
    const getProduct = async () => {
        try {
            const res = await productServices.get({ Id: id });
            setDataProduct(res.items);
            console.log(dataProduct)
        } catch (error) {
            console.error(error);
        }
    }
    //lấy sản phẩn chi tiết
    const getProductDetail = async () => {
        try {
            const res = await productDetailServices.get({ Product_id: id });
            setDataProductdetail(res.items);
            console.log(dataProductDetail)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getProduct();
        getProductDetail();
    }, [id]);
    return (
        <div className="row margin-bottom-30" style={{ marginTop: "112px" }}>
            <div className="col-lg-9 col-md-12 col-12">
                <Form form={form} onFinish={onFinish}>
                    {dataProduct.map((items, index) => (
                        <React.Fragment key={index}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-12 product-detail-left product-images">
                                    <div className="product-image-block relative">
                                        <div class="swiper-container gallery-top swiper-container-fade swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" >
                                            <div class="swiper-wrapper" id="lightgallery" style={{ justifyContent: "flex-end" }}>
                                                <a class="swiper-slide swiper-slide-active" data-hash="0" href="//bizweb.dktcdn.net/thumb/1024x1024/100/490/431/products/p1211067.jpg?v=1695554494123" title="Click để xem" style={{ width: "503px", opacity: 1, transform: "translate3d(0px, 0px, 0px)" }}>
                                                    <img style={{ height: "370px", width: "480px" }} src={items.image} alt="Giày leo núi dã ngoại cổ lửng Arpenaz 50 cho nam" data-image="https://bizweb.dktcdn.net/100/490/431/products/p1211067.jpg?v=1695554494123" class="img-responsive mx-auto d-block swiper-lazy swiper-lazy-loaded" />
                                                </a>
                                            </div>
                                        </div>
                                        <div class="swiper-container gallery-thumbs swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events swiper-container-free-mode swiper-container-thumbs">
                                            <div class="swiper-wrapper" style={{ justifyContent: "end", marginTop: "10px" }}>
                                                {dataProductDetail.map((data, colorIndex) => (
                                                    <div class="swiper-slide swiper-slide-visible swiper-slide-active swiper-slide-thumb-active" data-hash="0" style={{ width: "92.6px", marginRight: "10px" }}>
                                                        <div class="p-100">
                                                            <img style={{ width: "80px", height: "80px" }} src={data.image} alt="Giày leo núi dã ngoại cổ lửng Arpenaz 50 cho nam" data-image="//bizweb.dktcdn.net/thumb/medium/100/490/431/products/p1211067.jpg?v=1695554494123" class="swiper-lazy swiper-lazy-loaded" />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div class="swiper-button-next swiper-button-disabled">
                                            </div>
                                            <div class="swiper-button-prev swiper-button-disabled">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-12 details-pro">
                                    <h1 className="title-product">{items.name}</h1>
                                    <div className="product-top ">
                                        <div className="sku-product ">
                                            <span className="d-none" itemProp="brand" itemScope>
                                                <meta itemProp="name" content="QUECHUA" />
                                                Thương hiệu: <strong>{items.supplier.name}</strong>
                                            </span>
                                            <span className="variant-sku" itemProp="sku" content="Đang cập nhật">
                                                Mã: <span className="a-sku">{id}</span>
                                            </span>
                                            <br />
                                            <span className="d-none" itemProp="type" itemScope>
                                                <meta itemProp="name" content="Giày thể thao" />
                                                Chất liệu: <strong>Giày thể thao</strong>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="inventory_quantity">
                                        <span class="mb-break">
                                            <span class="stock-brand-title">Thương hiệu:</span>
                                            <span class="a-vendor">
                                                QUECHUA
                                            </span>
                                        </span>
                                        <span class="line">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                                        <span class="mb-break">
                                            <span class="stock-brand-title">Tình trạng:</span>
                                            <span class="a-stock"><span class="a-stock">Còn hàng</span></span>
                                        </span>
                                    </div>
                                    <form encType="multipart/form-data" data-cart-form="" id="add-to-cart-form" action="/cart/add" method="post" className="form-inline">
                                        <div className="price-box clearfix">
                                            <span className="special-price">
                                                <span className="price product-price">{items.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                <meta itemProp="price" content="450000" />
                                                <meta itemProp="priceCurrency" content="VND" />
                                            </span>
                                            {/* <span className="old-price" itemProp="priceSpecification" itemScope itemType="http://schema.org/priceSpecification">
                                                <del className="price product-price-old">550.000₫</del>
                                                <meta itemProp="price" content="550000" />
                                                <meta itemProp="priceCurrency" content="VND" />
                                            </span>  */}
                                            {/* Giá gốc */}
                                            {/* <span className="sale-off">-18%</span> */}
                                        </div>
                                        <div class="swatch clearfix" data-option-index="0">
                                            <div class="header">Màu sắc:
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

                                            {/* <div data-value="Đen" title="Đen" class="swatch-element color den available">

                                                <div class="tooltip">Đen</div>

                                                <input id="swatch-0-den" type="radio" name="option-0" value="Đen" checked="" />
                                                <label for="swatch-0-den" style={{ background: "#000000", background: "linear-gradient(135deg, #000000 50%, #000000 50%)" }}>

                                                </label>

                                            </div> */}
                                        </div>
                                        <div class="swatch clearfix" data-option-index="1">
                                            <div class="header">Kích thước:
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
                                        <div class="custom custom-btn-number show">

                                            <div class="product-coupon__wrapper my-3">
                                            </div>
                                            <span>Số lượng: </span>
                                            <div class="input_number_product">
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
                                    </form>

                                    <div class="btn-mua button_actions">

                                        <button htmlType="submit" class="btn_button btn_base normal_button btn_add_cart add_to_cart btn-cart"><span class="txt-main">Thêm vào giỏ</span></button>
                                        <button class="btn-buyNow btn_button">
                                            <span class="txt-main">Mua ngay</span>
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </React.Fragment>
                    ))}
                </Form>
            </div>
            <div class="col-lg-3 col-md-12 col-12 product-col-right">
                <div class="block-policy">
                    <div class="policy-item ">
                        <span class="marker">1</span>
                        <div class="icon aspect-1">
                            <img width="50" height="50" class="lazyload loaded" data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_policy_1.svg?1706431508504" alt="Sudes Sport" src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_policy_1.svg?1706431508504" data-was-processed="true" />
                        </div>
                        <div class="info">
                            <h3>
                                Cam kết chính hãng 100%
                            </h3>
                            <span>
                            </span>
                        </div>
                    </div>
                    <div class="policy-item ">
                        <span class="marker">2</span>
                        <div class="icon aspect-1">
                            <img width="50" height="50" class="lazyload loaded" data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_policy_2.svg?1706431508504" alt="Sudes Sport" src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_policy_2.svg?1706431508504" data-was-processed="true" />
                        </div>
                        <div class="info">
                            <h3>
                                Bảo hành 12 tháng (<a href="#" title="click xem chi tiết ">click xem chi tiết</a>)
                            </h3>
                            <span>
                            </span>
                        </div>
                    </div>
                    <div class="policy-item ">
                        <span class="marker">3</span>
                        <div class="icon aspect-1">
                            <img width="50" height="50" class="lazyload loaded" data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_policy_3.svg?1706431508504" alt="Sudes Sport" src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_policy_3.svg?1706431508504" data-was-processed="true" />
                        </div>
                        <div class="info">
                            <h3>
                                Đổi trả hàng trong 7 ngày  (<a href="#" title="click xem chi tiết ">click xem chi tiết</a>)
                            </h3>
                            <span>
                            </span>
                        </div>
                    </div>
                    <div class="policy-item ">
                        <span class="marker">4</span>
                        <div class="icon aspect-1">
                            <img width="50" height="50" class="lazyload loaded" data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_policy_4.svg?1706431508504" alt="Sudes Sport" src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_policy_4.svg?1706431508504" data-was-processed="true" />
                        </div>
                        <div class="info">
                            <h3>
                                Giao hàng nhanh toàn quốc
                            </h3>
                            <span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="banner-product-box">
                    <a class="duration-300" href="/collections/all" title="Banner">
                        <img alt="Banner" class="lazyload loaded" width="480" height="381" data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_banner.jpg?1706431508504" src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/product_banner.jpg?1706431508504" data-was-processed="true" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Productdetail