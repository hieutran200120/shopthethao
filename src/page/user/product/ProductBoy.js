import React, { useRef, useState, useEffect } from 'react'
import "../../../css/main.scss"
import { smoothHorizontalScrolling } from '../../../components/scroll';
import styled from 'styled-components';
import { productServices } from '../../../utils/services/admin/productServices';
import { producTypeServices } from '../../../utils/services/admin/productTypeService';
import { useProductContext } from '../../../utils/helpers/getHelper';
import "./ProductBoy.scss"
import ModalProduct from './ModalProduct';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const slides = [
    {
        index: 1,
        title1: 'Flash Sale',
        title2: 'Mua đôi giảm bội',
        title3: 'Áp dụng cho nhiều sản phẩm',
        buttonText: 'Xem chi tiết',
        buttonLink: 'https://sudes-sport.mysapo.net/collections/all',
        buttonIcon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                ></path>
            </svg>
        ),
        imageUrl: '//bizweb.dktcdn.net/100/490/431/themes/927074/assets/slider_1.jpg?1702725548056',
    },
    {
        index: 2,
        title1: 'Hot deal',
        title2: 'Càng mua càng giảm',
        title3: 'Thời gian: 01/10 - 15/10',
        buttonText: 'Xem chi tiết',
        buttonLink: 'https://sudes-sport.mysapo.net/collections/all',
        buttonIcon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
            >
                <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                ></path>
            </svg>
        ),
        imageUrl: '//bizweb.dktcdn.net/100/490/431/themes/927074/assets/slider_2.jpg?1702725548056',
    },
];
export const ProductBoy = () => {
    const sliderProductBoyRef = useRef();
    const ProductBoyRef = useRef();
    const sliderProductGirlRef = useRef();
    const ProductGirlRef = useRef();
    const siderProductTypeRef = useRef();
    const ProductTypeRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productId, setProductId] = useState();
    const { productBoy, productGirl, productType } = useProductContext();
    const navigate = useNavigate()
    const showModal = (id) => {
        setIsModalOpen(true);
        setProductId(id);
    };
    //nhấn xem chi tiết 
    const handleButtonClick = async (id) => {
        navigate(`product/${id}`)
    }
    //nhấn xem các sản phẩm trong các mục
    const handleButtonClickProduct = async (id) => {
        navigate(`category/${id}`)
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //slider dành cho sản phẩm nam
    const handleScrollRight = () => {
        const maxScrollLeft = sliderProductBoyRef.current.scrollWidth - sliderProductBoyRef.current.clientWidth;
        console.log(maxScrollLeft);
        if (sliderProductBoyRef.current.scrollLeft < maxScrollLeft) {
            smoothHorizontalScrolling(sliderProductBoyRef.current, 250, ProductBoyRef.current.clientWidth, sliderProductBoyRef.current.scrollWidth);
        }
    };
    const handleScrollLeft = () => {
        if (sliderProductBoyRef.current.scrollLeft > 0) {
            smoothHorizontalScrolling(sliderProductBoyRef.current, 250, -ProductBoyRef.current.clienWidth, sliderProductBoyRef.current.scrolllWidth)
        }
    }
    //slider dành cho sản phẩm nữ
    const handleScrollProductBoyRight = () => {
        const maxScrollLeft = sliderProductGirlRef.current.scrollWidth - sliderProductGirlRef.current.clientWidth;
        console.log(maxScrollLeft);
        if (sliderProductGirlRef.current.scrollLeft < maxScrollLeft) {
            smoothHorizontalScrolling(sliderProductGirlRef.current, 250, sliderProductGirlRef.current.clientWidth, sliderProductGirlRef.current.scrollWidth);
        }
    };
    const handleScrollProductGirlLeft = () => {
        if (sliderProductGirlRef.current.scrollLeft > 0) {
            smoothHorizontalScrolling(sliderProductGirlRef.current, 250, -ProductGirlRef.current.clienWidth, sliderProductGirlRef.current.scrolllWidth)
        }
    }
    //slider dàng cho các loại sản phẩm
    const handleScrollProductTypeRight = () => {
        const maxScrollLeft = siderProductTypeRef.current.scrollWidth - siderProductTypeRef.current.clientWidth;
        console.log(maxScrollLeft);
        if (siderProductTypeRef.current.scrollLeft < maxScrollLeft) {
            smoothHorizontalScrolling(siderProductTypeRef.current, 250, siderProductTypeRef.current.clientWidth, siderProductTypeRef.current.scrollWidth);
        }
    };
    const handleScrollProductTypeLeft = () => {
        if (siderProductTypeRef.current.scrollLeft > 0) {
            smoothHorizontalScrolling(siderProductTypeRef.current, 250, -ProductTypeRef.current.clienWidth, siderProductTypeRef.current.scrolllWidth)
        }
    }
    const MoviesSlider = styled.div`
        display: grid;
        grid-template-columns:repeat(${productBoy.length},243px);
        gap: 6px;
        transition: all 0.3s linear;
        user-select: none;
        overflow-y: hidden;
        overflow-x: auto;
        overflow:hidden;
        padding-top: 28px;
        padding-bottom: 28px;
        scroll-behavior: smooth;

        .movieItem {
            transform: scale(1);
            max-width: 228px;
            max-height: 414px;
            width: 100%;
            height: 100%;
            transition: all 0.3s linear;
            user-select: none;
            overflow: hidden;
            transform:center left;
            position: relative;
        }
    `;
    const ProductTypeSlider = styled.div`
display: grid;
grid-template-columns:repeat(${productType.length},243px);
gap: 6px;
transition: all 0.3s linear;
user-select: none;
overflow-y: hidden;
overflow-x: auto;
overflow:hidden;
padding-top: 28px;
padding-bottom: 28px;
scroll-behavior: smooth;

.movieItem {
    transform: scale(1);
    max-width: 156px;
    max-height: 414px;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    user-select: none;
    overflow: hidden;
    transform:center left;
    position: relative;
}
`;
    return (
        <>
            <div className="section_slider swiper-container swiper-container-fade swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events" style={{ cursor: 'grab' }}>
                <Carousel fade >
                    {slides.map((slide) => (
                        <Carousel.Item key={slide.index} interval={9000}>
                            <picture>
                                <source media="(min-width: 1200px)" srcSet={slide.imageUrl} />
                                <source media="(min-width: 992px)" srcSet={slide.imageUrl} />
                                <source media="(min-width: 569px)" srcSet={slide.imageUrl} />
                                <source media="(max-width: 480px)" srcSet={slide.imageUrl} />
                                <img
                                    width="1920"
                                    height="717"
                                    src={`./Sudes Sport - Giày Dép Phụ Kiện Thể Thao_files/slider_${slide.index}.jpg`}
                                    alt={`Slider ${slide.index}`}
                                    className="img-responsive center-block"
                                />
                            </picture>
                            <Carousel.Caption>
                                <div className="container-effect">
                                    <div className="title-1">{slide.title1}</div>
                                    <div className="title-2">{slide.title2}</div>
                                    <div className="title-3">{slide.title3}</div>
                                    <a href={slide.buttonLink} title="Xem chi tiết" className="btn btn-primary">
                                        <span>{slide.buttonText}</span>
                                        {slide.buttonIcon}
                                    </a>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}

                </Carousel>
            </div>
            {/* sản phẩm các môn thể thao */}
            <section class="section-index section_category">
                <div class="container">
                    <div class="section-title side-left has-control">
                        <h2>
                            Môn thể thao bạn yêu thích
                        </h2>
                        <div class="swiper-button-prev " onClick={handleScrollProductTypeLeft} style={{ left: "initial" }}></div>
                        <div class="swiper-button-next" onClick={handleScrollProductTypeRight} style={{ left: "initial" }} ></div>
                    </div>
                    <div class="swiper_category swiper-container control-top swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                        <div class="swiper-wrapper" style={{ transform: "translate3d(0px, 0px, 0px)", transitionDuration: "0ms" }}>
                            <MoviesRowContainer>
                                <ProductTypeSlider ref={siderProductTypeRef}>
                                    {productType.map((item, index) => (
                                        <div key={index} className="movieItem" ref={ProductTypeRef} style={{ border: 0, background: "#f8f9fa" }}>
                                            <div class="swiper-slide swiper-slide-active" style={{ width: "154.375px", marginRight: "20px" }}>
                                                <div class="bg-thumb">
                                                    <div class="thumb" onClick={() => handleButtonClickProduct(item.id)}>
                                                        <img src={item.image} alt={`Movie ${index}`} />
                                                    </div>
                                                </div>
                                                <div class="cate-content">
                                                    <h3 class="line-clamp-2-new" style={{ textAlign: "center", paddingTop: "8px" }}>
                                                        {item.name}
                                                    </h3>
                                                    {/* <div class="status">
                                                        <span class="total-product">9 sản phẩm</span>
                                                        <span class="view-more">Xem chi tiết</span>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </ProductTypeSlider>
                            </MoviesRowContainer>
                        </div>
                    </div>
                </div>
            </section>
            {/* banner */}
            <section class="section-index section_group_banner">
                <div class="container">
                    <div class="grid">
                        <div className="col-left">
                            <div className="banner_1 banner-box" >
                                <a href="/collections/all" title="Xem ngay">
                                    <picture>
                                        <source media="(max-width: 480px)" srcSet="https://bizweb.dktcdn.net/thumb/large/100/490/431/themes/927074/assets/section_gbanner_1.jpg?1706431508504" />
                                        <img
                                            data-src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_gbanner_1.jpg?1706431508504"
                                            src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_gbanner_1.jpg?1706431508504"
                                            alt="NEW ARRIVALS"
                                            loading="lazy"
                                            className="lazyload duration-300 loaded"
                                            data-was-processed="true"
                                        />
                                    </picture>
                                    <div className="box-title">
                                        <h3>
                                            NEW ARRIVALS
                                        </h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="col-right">
                            <div class="grid-sub">
                                <div className="banner_2 banner-box">
                                    <a href="/collections/all" title="Xem ngay">
                                        <picture>
                                            <source media="(max-width: 480px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/490/431/themes/927074/assets/section_gbanner_2.jpg?1706431508504" />
                                            <img
                                                data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_gbanner_2.jpg?1706431508504"
                                                src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_gbanner_2.jpg?1706431508504"
                                                alt="NOW TRENDING"
                                                loading="lazy"
                                                className="lazyload duration-300 loaded"
                                                data-was-processed="true"
                                            />
                                        </picture>
                                        <div className="box-title">
                                            <h3>
                                                NOW TRENDING
                                            </h3>
                                        </div>
                                    </a>
                                </div>
                                <div className="banner_3 banner-box">
                                    <a href="/collections/all" title="Xem ngay">
                                        <picture>
                                            <source media="(max-width: 480px)" srcSet="//bizweb.dktcdn.net/thumb/medium/100/490/431/themes/927074/assets/section_gbanner_3.jpg?1706431508504" />
                                            <img
                                                data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_gbanner_3.jpg?1706431508504"
                                                src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_gbanner_3.jpg?1706431508504"
                                                alt="CAMPAIGNS"
                                                loading="lazy"
                                                className="lazyload duration-300 loaded"
                                                data-was-processed="true"
                                            />
                                        </picture>
                                        <div className="box-title">
                                            <h3>
                                                CAMPAIGNS
                                            </h3>
                                        </div>
                                    </a>
                                </div>
                                <div className="banner_4 banner-box">
                                    <a href="/collections/all" title="Xem ngay">
                                        <picture>
                                            <source media="(max-width: 480px)" srcSet="//bizweb.dktcdn.net/thumb/medium/100/490/431/themes/927074/assets/section_gbanner_4.jpg?1706431508504" />
                                            <img
                                                data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_gbanner_4.jpg?1706431508504"
                                                src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_gbanner_4.jpg?1706431508504"
                                                alt="LOOKBOOK"
                                                loading="lazy"
                                                className="lazyload duration-300 loaded"
                                                data-was-processed="true"
                                            />
                                        </picture>
                                        <div className="box-title">
                                            <h3>
                                                LOOKBOOK
                                            </h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            {/* sản phẩm cho nam  */}
            <section class="section-index section_product section_product_1">
                <div class="container">
                    <div class="row">
                        <div class="block-title col-sm-12 col-xs-12 col-lg-3 col-xl-2">
                            <div class="section-title side-left has-control">
                                <h2>
                                    <a title="Thể thao cho nam">
                                        Thể thao cho nam
                                    </a>
                                </h2>
                                <div className="swiper-button-prev" onClick={handleScrollLeft}></div>
                                <div className="swiper-button-next" onClick={handleScrollRight}></div>
                            </div>
                            <a title="Xem tất cả" className="btn btn-primary"   >
                                <span>Xem tất cả</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                                </svg>
                            </a>
                        </div>
                        <div class="block-product-list col-sm-12 col-xs-12 col-lg-9 col-xl-10">
                            <div class="swiper_pro_1 swiper_pro swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                                <div class="swiper-wrapper load-after" data-section="section_product_1" >
                                    <MoviesRowContainer>
                                        <MoviesSlider ref={sliderProductBoyRef}>
                                            {productBoy.map((item, index) => (
                                                <div key={index} className="movieItem" ref={ProductBoyRef}>
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
                                        </MoviesSlider>
                                    </MoviesRowContainer>
                                </div>
                                <div class="view-more clearfix">
                                    <a href="https://sudes-sport.mysapo.net/nam" title="Xem tất cả" class="btn btn-primary">
                                        <span>Xem tất cả</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16 }} fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                                        </svg>
                                    </a>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>
            {/* Banner */}
            <section className="section-index section_big_banner">
                <div className="container">
                    <a href="/collections/all" title="Banner big" className="big-banner">
                        <picture>
                            <source media="(max-width: 480px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/490/431/themes/927074/assets/section_big_banner_mb.jpg?1706431508504" />
                            <img
                                data-src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_big_banner.jpg?1706431508504"
                                alt="Banner big"
                                width="1780"
                                height="385"
                                className="lazyload loaded"
                                src="//bizweb.dktcdn.net/100/490/431/themes/927074/assets/section_big_banner.jpg?1706431508504"
                                data-was-processed="true"
                            />
                        </picture>
                    </a>
                </div>
            </section>
            {/* sản phẩm cho nữ  */}
            <section class="section-index section_product section_product_1">
                <div class="container">
                    <div class="row">
                        <div class="block-title col-sm-12 col-xs-12 col-lg-3 col-xl-2">
                            <div class="section-title side-left has-control">
                                <h2>
                                    <a title="Thể thao cho nam">
                                        Thể thao cho Nữ
                                    </a>
                                </h2>
                                <div className="swiper-button-prev" onClick={handleScrollProductGirlLeft}></div>
                                <div className="swiper-button-next" onClick={handleScrollProductBoyRight}></div>
                            </div>
                            <a title="Xem tất cả" className="btn btn-primary" style={{ color: "#fff" }} >
                                <span
                                >
                                    Xem tất cả
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                                </svg>
                            </a>
                        </div>

                        <div class="block-product-list col-sm-12 col-xs-12 col-lg-9 col-xl-10">
                            <div class="swiper_pro_1 swiper_pro swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                                <div class="swiper-wrapper load-after" data-section="section_product_1" >
                                    <MoviesRowContainer>
                                        <MoviesSlider ref={sliderProductGirlRef}>
                                            {productGirl.map((item, index) => (
                                                <div key={index} className="movieItem" ref={ProductGirlRef}>
                                                    <div class="item_product_main">
                                                        <div class="product-thumbnail">
                                                            <img src={item.image} alt={`Movie ${index}`} onClick={() => handleButtonClick(item.id)} />
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
                                        </MoviesSlider>
                                    </MoviesRowContainer>
                                </div>
                                <div class="view-more clearfix">
                                    <a href="https://sudes-sport.mysapo.net/nam" title="Xem tất cả" class="btn btn-primary" style={{ color: "#fff" }}>
                                        <span
                                        >
                                            Xem tất cả
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" style={{ width: 16, height: 16 }} fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"></path>
                                        </svg>
                                    </a>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>
            <ModalProduct isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} productId={productId} />
        </>
    )
}
const MoviesRowContainer = styled.div`
    background-color: var(--color-background);
    color: var(--color-white);
    padding: 20px 20px 0;
    position:relative;
    width: 100%;
    height: 100%;
    .btnLeft{
        position:absolute;
        top:50%;
        left:30px;
        z-index:20;
        transform-origin:center;
        current:pointer;
        background-color:rgba(0,0,0,0.5);
        height:100px;
        width:50px;
        border-radius:4px;
        display:flex;
        align-items:center;
        transform:translateY(-20%);
    }
    .btnRight{
        position:absolute;
        top:50%;
        right:30px;
        z-index:20;
        transform-origin:center;
        current:pointer;
        background-color:rgba(0,0,0,0.5);
        height:100px;
        width:50px;
        border-radius:4px;
        display:flex;
        align-items:center;
        transform:translateY(-20%);
    }
`;


