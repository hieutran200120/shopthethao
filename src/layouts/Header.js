import React, { useEffect } from 'react'
import { useState } from 'react';
import logo from "../Images/logo.png"
import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [totalProduct, setTotalProduct] = useState(0);
    useEffect(() => {
        const data = sessionStorage.getItem("orderData");
        if (data) {
            const orderData = JSON.parse(data);
            let total = 0;
            orderData.forEach(product => {
                total += parseInt(product.quantity);
            });
            setTotalProduct(total);
        } else {
            console.log("Không có dữ liệu đơn hàng trong sessionStorage.");
        }
    }, [sessionStorage.getItem("orderData")])

    console.log("Tổng số sản phẩm:", totalProduct);
    const navigate = useNavigate()
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setSearchOpen(false);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };
    const handleButtonClick = async () => {
        navigate(`/order`)
    }
    const handleButtonClickLogin = async () => {
        navigate(`/login`)
    }
    const handleButtonClickRegister = async () => {
        navigate(`/register`)
    }
    return (
        <>
            <div className="main-header">
                <div className="container">
                    <div className="box-hearder">
                        <div className=" align-items-center" style={{ display: "flex", flexWrap: "wrap" }}>
                            <div className="header-logo">
                                <div className="menu-icon " aria-label="Menu" id="btn-menu-mobile" title="Menu" onClick={toggleMenu}>
                                    <div className="icon">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    <span className="title">Menu</span>
                                </div>

                                <a href="https://sudes-sport.mysapo.net/" className="logo-wrapper" title="Sudes Sport">
                                    <img width="250" height="43"
                                        src={logo}
                                        data-src="https//bizweb.dktcdn.net/100/490/431/themes/927074/assets/logo.png?1702725548056"
                                        alt="Sudes Sport" className="lazyload loaded" data-was-processed="true" />
                                </a>
                            </div>
                            <div className="header-mid">
                                <div className="list-top-item header_tim_kiem">
                                    <form className="header-search-form input-group search-bar" role="search">
                                        <input
                                            name="query"
                                            className="input-group-field auto-search search-auto form-control"
                                            placeholder="Tìm sản phẩm..."
                                            type="text"
                                        />
                                        <input type="hidden" name="type" value="product" />
                                        <button type="submit" className="btn icon-fallback-text duration-300" aria-label="Tìm kiếm" title="Tìm kiếm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                                            </svg>
                                        </button>
                                        <div className="search-suggest">
                                            <div className="search-recent d-none">
                                                <div className="search-title">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"></path>
                                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"></path>
                                                    </svg>
                                                    Tìm kiếm gần đây
                                                </div>
                                                <div className="search-list"></div>
                                            </div>
                                            <div className="item-suggest">
                                                <div className="search-title">
                                                    <svg height="20" viewBox="0 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg">
                                                        {/* ... Path data for the trending icon ... */}
                                                    </svg>
                                                    Đề xuất phổ biến
                                                </div>
                                                <div className="search-list">
                                                    {/* ... Your suggested search items ... */}
                                                </div>
                                            </div>
                                            <div className="list-search"></div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="header-right">
                                <div className="sudes-header-hotline">
                                    <div className="frame-fix">
                                        <a title="Điện thoại: 1900 6750" href="tel:19006750"></a>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            className="bi bi-whatsapp" viewBox="0 0 16 16">
                                            <path
                                                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z">
                                            </path>
                                        </svg>
                                        <div className="text-box">
                                            <span className="acc-text-small">Hotline hỗ trợ:</span>
                                            <span className="acc-text">1900 6750</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sudes-header-stores hidden-xs">
                                    <div className="frame-fix">
                                        <a href="https://sudes-sport.mysapo.net/he-thong-cua-hang"
                                            title="Hệ thống cửa hàng"></a>
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19 22.52L26 21.174V2H2V25.79L9.095 24.425C9.03237 24.2921 8.99993 24.1469 9 24V16C9 15.7348 9.10536 15.4804 9.29289 15.2929C9.48043 15.1054 9.73478 15 10 15H18C18.2652 15 18.5196 15.1054 18.7071 15.2929C18.8946 15.4804 19 15.7348 19 16V22.52ZM17 22.905V17H11V24C11 24.02 11 24.04 10.998 24.059L17 22.905ZM1 0H27C27.2652 0 27.5196 0.105357 27.7071 0.292893C27.8946 0.48043 28 0.734784 28 1V22C28 22.2324 27.919 22.4576 27.771 22.6368C27.623 22.816 27.4172 22.9381 27.189 22.982L1.189 27.982C1.04431 28.0098 0.89526 28.0054 0.752502 27.9689C0.609744 27.9324 0.476808 27.8649 0.363202 27.7711C0.249597 27.6772 0.158129 27.5595 0.0953412 27.4262C0.0325533 27.2929 -3.37575e-06 27.1473 2.62534e-10 27V1C2.62534e-10 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0ZM6 7.998V4H22V7.998H6Z"
                                                fill="black"></path>
                                        </svg>
                                        <div className="text-box">
                                            <span className="acc-text-small">Hệ thống cửa hàng</span>
                                            <span className="acc-text">7 cửa hàng</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="sudes-header-account header-action_account">
                                    <div className="frame-fix">
                                        <a href="javascript:;" className="header-account" aria-label="Tài khoản"
                                            title="Tài khoản"></a>
                                        <svg aria-hidden="true" className="svg-icon tool-icon" viewBox="0 0 32 32">
                                            <path
                                                d="M7.164 29.986a1 1 0 01-1.148-1.165l2-11A1 1 0 019 17h14a1 1 0 01.97.757l2 8a1 1 0 01-.806 1.23l-18 3zm1.074-2.206l15.53-2.588L22.218 19H9.835l-1.597 8.78zM16 15c-3.314 0-6-2.91-6-6.5S12.686 2 16 2s6 2.91 6 6.5-2.686 6.5-6 6.5zm0-2c2.172 0 4-1.98 4-4.5S18.172 4 16 4c-2.172 0-4 1.98-4 4.5s1.828 4.5 4 4.5z">
                                            </path>
                                        </svg>
                                        <div className="text-box">
                                            <span className="acc-text-small hidden-xs">Thông tin</span>
                                            <span className="acc-text">Tài khoản
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z">
                                                    </path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    <ul>
                                        <li className="li-account"><div rel="nofollow"
                                            title="Đăng nhập" onClick={handleButtonClickLogin}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-box-arrow-in-right"
                                                viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                    d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z">
                                                </path>
                                                <path fill-rule="evenodd"
                                                    d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z">
                                                </path>
                                            </svg>
                                            Đăng nhập</div>
                                        </li>
                                        <li className="li-account"><div rel="nofollow"
                                            title="Đăng ký" onClick={handleButtonClickRegister}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                                <path
                                                    d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z">
                                                </path>
                                                <path fill-rule="evenodd"
                                                    d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z">
                                                </path>
                                            </svg>
                                            Đăng ký</div>
                                        </li>


                                        <li className="li-account"><a rel="nofollow"
                                            href="https://sudes-sport.mysapo.net/danh-sach-yeu-thich"
                                            title="Danh sách yêu thích">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                                <path
                                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z">
                                                </path>
                                            </svg>
                                            Danh sách yêu thích (<span className="js-wishlist-count">0</span>)</a>
                                        </li>

                                    </ul>
                                </div>
                                <div className="sudes-header-cart header-action_cart">
                                    <div className="frame-fix" onClick={handleButtonClick}>
                                        {/* <a className="a-hea" href="https://sudes-sport.mysapo.net/cart" aria-label="Giỏ hàng"
                                            title="Giỏ hàng"></a> */}
                                        <span className="box-icon">
                                            <svg aria-hidden="true" className="svg-icon " viewBox="0 0 32 32">
                                                <path
                                                    d="M7.873 6.008A1.01 1.01 0 018 6h21a1 1 0 011 1v11a1 1 0 01-.836.986l-18 3a1 1 0 01-1.128-.72L5.318 4.281l-2.002.668a1 1 0 01-.632-1.898l3-1a1 1 0 011.28.681l.91 3.276zM8.427 8l3.296 11.864L28 17.153V8H8.427zM16 29a3 3 0 110-6 3 3 0 010 6zm9 0a3 3 0 110-6 3 3 0 010 6zm0-2a1 1 0 100-2 1 1 0 000 2zm-9 0a1 1 0 100-2 1 1 0 000 2z">
                                                </path>
                                            </svg>
                                        </span>
                                        <span className="count_item count_item_pr hidden-count">{totalProduct}</span>
                                        <span className="item-title hidden-xs">Giỏ hàng</span>
                                    </div>
                                    <div className="top-cart-content">
                                        <div className="CartHeaderContainer">
                                            <div className="cart--empty-message">
                                                <div className="img-empty"><img
                                                    src="./Sudes Sport - Giày Dép Phụ Kiện Thể Thao_files/empty-cart.png" />
                                                </div>
                                                <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar menuOpen={menuOpen} closeMenu={closeMenu} />
            <div className="mobile-nav-overflow"></div></>
    )
}

export default Header