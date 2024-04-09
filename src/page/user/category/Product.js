import React, { useState, useEffect } from 'react'
import { useProductContext } from '../../../utils/helpers/getHelper';
import { productServices } from '../../../utils/services/admin/productServices';
import { Checkbox } from 'antd';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ModalProduct from '../product/ModalProduct';
const Product = () => {
    const { color, supplier, size, category } = useProductContext();
    const [productCategory, setProductCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productId, setProductId] = useState();
    const { id } = useParams();
    const navigate = useNavigate()
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const showModal = (id) => {
        setIsModalOpen(true);
        setProductId(id);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const getProductCategory = async () => {
        try {
            const res = await productServices.get({ ProductType_id: id });
            setProductCategory(res.items);
            // console.log(dataProductDetail)
        } catch (error) {
            console.error(error);
        }
    }
    const handleButtonClick = async (id) => {
        navigate(`product/${id}`)
    }
    useEffect(() => {
        getProductCategory();
    }, [id]);
    return (
        <>
            <div class="container" style={{ marginTop: "100px" }}>

                <div class="row">
                    <div class="col-12 col-title">
                        <h1>Đi Bộ</h1>
                    </div>
                    <div class="col-12 col-banner">
                        <source media="(max-width: 480px)" srcset="//bizweb.dktcdn.net/thumb/large/100/490/431/themes/927074/assets/collection_banner_mb.jpg?1706431508504" />
                        <img alt="Banner top" width="1900" height="300" class="lazyload loaded" data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/collection_banner.jpg?1706431508504" src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/collection_banner.jpg?1706431508504" data-was-processed="true" />
                    </div>
                    <aside class="dqdt-sidebar left-content col-lg-3 col-12">
                        <div class="close-filters" title="Đóng bộ lọc">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
                            </svg>
                        </div>
                        <div class="section-box-bg">
                            <div class="filter-content" style={{ border: "1px solid #eee", marginBottom: "30px", padding: "10px", width: "100%", display: "inline-block", height: "auto" }}>
                                <div class="aside-title" style={{ padding: "10px", background: "#eee", marginBottom: "10px" }}>
                                    <h2 class="title-head" style={{ textTransform: "uppercase", fontWeight: "bold" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"></path>
                                        </svg> Bộ lọc sản phẩm
                                    </h2>
                                </div>
                                {/* chọn giá */}
                                <aside class="aside-item filter-price" style={{ marginBottom: "15px", borderBottom: "1px solid #ddd" }}>
                                    <div class="aside-title">
                                        <h2><span style={{ fontSize: "1.6rem", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}>Chọn mức giá</span></h2>
                                    </div>
                                    <div class="aside-content filter-group content_price">

                                    </div>
                                </aside>
                                {/* Lọc loại */}
                                <aside class="aside-item aside-itemxx filter-type" style={{ marginBottom: "15px", borderBottom: "1px solid #ddd" }}>
                                    <div class="aside-title">
                                        <h2 ><span style={{ fontSize: "1.6rem", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}>Loại sản phẩm</span></h2>
                                    </div>
                                    <div class="aside-content filter-group">
                                        <div class="aside-content filter-group">
                                            <ul>
                                                {
                                                    category.map((item, index) => (
                                                        <li key={index} class="filter-item filter-item--check-box filter-item--green">
                                                            <Checkbox onChange={onChange} style={{ fontSize: "1.6rem" }}>{item.name}</Checkbox>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                                {/* lọc thương hiệu */}
                                <aside class="aside-item filter-vendor f-left" style={{ marginBottom: "15px", borderBottom: "1px solid #ddd" }}>
                                    <div class="aside-title">
                                        <h2 ><span style={{ fontSize: "1.6rem", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}>Nhà cung cấp</span></h2>
                                    </div>
                                    <div class="aside-content margin-top-0 filter-group">
                                        <div class="aside-content filter-group">
                                            <div class="aside-content filter-group">
                                                <ul>
                                                    {
                                                        supplier.map((item, index) => (
                                                            <li key={index} class="filter-item filter-item--check-box filter-item--green">
                                                                <Checkbox onChange={onChange} style={{ fontSize: "1.6rem" }}>{item.name}</Checkbox>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                                {/* Màu sắc */}
                                <aside class="aside-item filter-vendor f-left" style={{ marginBottom: "15px", borderBottom: "1px solid #ddd" }}>
                                    <div class="aside-title">
                                        <h2 style={{ fontSize: "1.6rem", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}><span>Màu sắc</span></h2>
                                    </div>
                                    <div class="aside-content margin-top-0 filter-group">
                                        <div class="aside-content filter-group">
                                            <div class="aside-content filter-group">
                                                <ul>
                                                    {
                                                        color.map((item, index) => (
                                                            <li key={index} class="filter-item filter-item--check-box filter-item--green">
                                                                <Checkbox onChange={onChange} style={{ fontSize: "1.6rem" }}>{item.name}</Checkbox>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                                {/* Size */}
                                <aside class="aside-item filter-vendor f-left" style={{ marginBottom: "15px", borderBottom: "1px solid #ddd" }}>
                                    <div class="aside-title">
                                        <h2 style={{ fontSize: "1.6rem", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}><span>Size</span></h2>
                                    </div>
                                    <div class="aside-content margin-top-0 filter-group">
                                        <div class="aside-content filter-group">
                                            <div class="aside-content filter-group">
                                                <ul>
                                                    {
                                                        size.map((item, index) => (
                                                            <li key={index} class="filter-item filter-item--check-box filter-item--green">
                                                                <Checkbox onChange={onChange} style={{ fontSize: "1.6rem" }}>{item.name}</Checkbox>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                                {/* Giới tính */}
                                <aside class="aside-item filter-vendor f-left" style={{ marginBottom: "15px" }}>
                                    <div class="aside-title">
                                        <h2 style={{ fontSize: "1.6rem", textTransform: "uppercase", fontWeight: 600, marginBottom: "20px" }}><span>Giới tính</span></h2>
                                    </div>
                                    <div class="aside-content margin-top-0 filter-group">
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </aside>
                    <div class="block-collection col-lg-9 col-12">
                        <div class="category-products products-view-grid list_hover_pro">
                            <div class="row">

                                <div class="col-6 col-md-3 col-lg-4 col-xl-3">
                                    <div class="item_product_main">
                                        {productCategory.map((item, index) => (
                                            <div key={index} className="movieItem" >
                                                <div class="item_product_main">
                                                    <div class="product-thumbnail" onClick={() => handleButtonClick(item.id)}>
                                                        <img src={item.image} alt={`Movie ${index}`} />
                                                    </div>
                                                    <div class="product-info">
                                                        <h3 class="product-name line-clamp-2-new">
                                                            <span class="name-title">{item.name}</span>
                                                        </h3>
                                                    </div>
                                                    <div class="product-bottom">
                                                        <div class="product-price-cart">
                                                            <div class="price-box">
                                                                <span class="price">{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                            </div>
                                                        </div>
                                                        <div class="button-product">
                                                            <button className="button" style={{ width: "100%" }} title="Tùy chọn" type="button" data-handle="quan-short-boi-100-cho-nam" onClick={() => showModal(item.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                                                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>
                                                                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path>
                                                                </svg>
                                                                <span>Tùy chọn</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ModalProduct isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} productId={productId} />
            </div>
        </>
    )
}

export default Product