import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import sports from "../Images/sports.png"
import soccer from "../Images/soccer-player.png"
import playing from "../Images/playing.png"
import games from "../Images/games.png"
import fitness from "../Images/fitness-tracker.png"
const Sidebar = ({ menuOpen, closeMenu }) => {
    const [menuDropdown, setDropdown] = useState(false);
    const [menuDropdown1, setDropdown1] = useState(false);
    const toggleDropdown = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của nút
        e.stopPropagation();
        setDropdown(!menuDropdown);
    };
    const toggleDropdown1 = (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của nút
        e.stopPropagation();
        setDropdown1(!menuDropdown1);
    };
    return (
        <>
            {menuOpen && (
                <div className="header-menu current">
                    <div className="navigation-horizontal">
                        <div className="title">
                            Danh mục
                            <div className="close-menu" title="Đóng" onClick={closeMenu}>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="col-menu" data-section="header_nav">
                            <ul id="nav-col" className="nav-col">
                                <li className="nav-item has-childs  ">
                                    <a className="nav-link" title="Môn Thể Thao" >

                                        <div className="group-category-image">
                                            <img className="img-fluid lazyload loaded"
                                                src={sports}
                                                data-src="//bizweb.dktcdn.net/thumb/small/100/490/431/collections/sports.png?v=1693640338110"
                                                alt="Môn Thể Thao" data-was-processed="true" />
                                        </div>
                                        Môn Thể Thao
                                        <i className={` ${menuDropdown ? 'open_mnu down_icon current' : 'open_mnu down_icon '}`} onClick={toggleDropdown} ></i>
                                    </a>
                                    {menuDropdown && (
                                        <ul className="-menu">
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Thể Thao Dưới Nước">
                                                    Thể Thao Dưới Nước
                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Thể Thao Ngoài Trời">
                                                    Thể Thao Ngoài Trời

                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Chạy Bộ &amp; Đi Bộ">
                                                    Chạy Bộ &amp; Đi Bộ

                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Các Môn Fitness">
                                                    Các Môn Fitness

                                                </a>
                                            </li>

                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Đạp Xe &amp; Trượt Ván">
                                                    Đạp Xe &amp; Trượt Ván

                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Thể Thao Mục Tiêu">
                                                    Thể Thao Mục Tiêu

                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Thể Thao Đồng Đội">
                                                    Thể Thao Đồng Đội

                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Các Môn Dùng Vợt">
                                                    Các Môn Dùng Vợt

                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Sản Phẩm Hỗ Trợ">
                                                    Sản Phẩm Hỗ Trợ

                                                </a>
                                            </li>
                                            <li className="nav-item-lv2 link-parent">
                                                <a href="https://sudes-sport.mysapo.net/mon-the-thao"
                                                    title="Xem tất cả Môn Thể Thao">
                                                    Xem tất cả <b>Môn Thể Thao »</b>
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li className="nav-item has-childs  ">
                                    <a className="nav-link" title="Nam">

                                        <div className="group-category-image">
                                            <img className="img-fluid lazyload loaded"
                                                src={soccer}
                                                data-src="//bizweb.dktcdn.net/thumb/small/100/490/431/collections/soccer-player.png?v=1693643500123"
                                                alt="Nam" data-was-processed="true" />
                                        </div>
                                        Nam
                                        <i className={` ${menuDropdown1 ? 'open_mnu down_icon current' : 'open_mnu down_icon '}`} onClick={toggleDropdown1} ></i>
                                    </a>
                                    {menuDropdown1 && (
                                        <ul className=" current">
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link"
                                                    title="Giày Dép">
                                                    Giày Dép

                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link" title="Áo">
                                                    Áo

                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link" title="Quần">
                                                    Quần

                                                </a>
                                            </li>
                                            <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                                <a className="nav-link" title="Đồ Bơi">
                                                    Đồ Bơi

                                                </a>
                                            </li>
                                            <li className="nav-item-lv2 link-parent">
                                                <a title="Xem tất cả Nam">
                                                    Xem tất cả <b>Nam »</b>
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                                <li className="nav-item has-childs  ">
                                    <a className="nav-link" title="Nữ">

                                        <div className="group-category-image">
                                            <img className="img-fluid lazyload loaded"
                                                src={playing}
                                                data-src="//bizweb.dktcdn.net/thumb/small/100/490/431/collections/playing.png?v=1693643512323"
                                                alt="Nữ" data-was-processed="true" />
                                        </div>
                                        Nữ

                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link"
                                                title="Giày Dép">
                                                Giày Dép

                                            </a>
                                        </li>
                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link" title="Áo">
                                                Áo

                                            </a>
                                        </li>
                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link" title="Quần">
                                                Quần

                                            </a>
                                        </li>

                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link" title="Đồ Lót">
                                                Đồ Lót

                                            </a>
                                        </li>
                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link" title="Đồ Bơi">
                                                Đồ Bơi

                                            </a>
                                        </li>
                                        <li className="nav-item-lv2 link-parent">
                                            <a title="Xem tất cả Nữ">
                                                Xem tất cả <b>Nữ »</b>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item has-childs  ">
                                    <a href="https://sudes-sport.mysapo.net/tre-em" className="nav-link" title="Trẻ Em">

                                        <div className="group-category-image">
                                            <img className="img-fluid lazyload loaded"
                                                src={games}
                                                data-src="//bizweb.dktcdn.net/thumb/small/100/490/431/collections/games.png?v=1693643587037"
                                                alt="Trẻ Em" data-was-processed="true" />
                                        </div>

                                        Trẻ Em

                                    </a>

                                    <ul className="dropdown-menu">
                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link"
                                                title="Giày Dép">
                                                Giày Dép

                                            </a>
                                        </li>
                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link" title="Áo">
                                                Áo

                                            </a>
                                        </li>
                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link" title="Quần">
                                                Quần

                                            </a>
                                        </li>
                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link"
                                                title="Đồ Bơi">
                                                Đồ Bơi

                                            </a>
                                        </li>
                                        <li className="dropdown-submenu nav-item-lv2 has-childs2">
                                            <a className="nav-link"
                                                title="Trang Bị Thể Thao">
                                                Trang Bị Thể Thao

                                            </a>
                                        </li>
                                        <li className="nav-item-lv2 link-parent">
                                            <a title="Xem tất cả Trẻ Em">
                                                Xem tất cả <b>Trẻ Em »</b>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item has-childs   hover-left">
                                    <a className="nav-link" title="Phụ Kiện">

                                        <div className="group-category-image">
                                            <img className="img-fluid lazyload loaded"
                                                src={fitness}
                                                data-src="//bizweb.dktcdn.net/thumb/small/100/490/431/collections/fitness-tracker.png?v=1693643743327"
                                                alt="Phụ Kiện" data-was-processed="true" />
                                        </div>

                                        Phụ Kiện

                                    </a>
                                </li>
                            </ul>
                            <ul id="nav" className="nav">
                                <li className="nav-item ">
                                    <a className="nav-link" href="https://sudes-sport.mysapo.net/gioi-thieu" title="Về Sudes Sport">
                                        Về Sudes Sport
                                    </a>
                                </li>
                                <li className="nav-item has-childs  ">
                                    <a href="https://sudes-sport.mysapo.net/chinh-sach-mua-hang" className="nav-link"
                                        title="Chính sách mua hàng">
                                        Chính sách mua hàng

                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/chinh-sach-mua-hang"
                                                title="Chính sách mua hàng">Chính sách mua hàng</a>
                                        </li>
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/chinh-sach-doi-tra"
                                                title="Chính sách đổi trả">Chính sách đổi trả</a>
                                        </li>
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/chinh-sach-van-chuyen"
                                                title="Chính sách vận chuyển">Chính sách vận chuyển</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item has-childs  ">
                                    <a href="https://sudes-sport.mysapo.net/huong-dan-mua-hang" className="nav-link"
                                        title="Hướng dẫn mua hàng">
                                        Hướng dẫn mua hàng

                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/huong-dan-mua-hang"
                                                title="Hướng dẫn mua hàng">Hướng dẫn mua hàng</a>
                                        </li>
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/huong-dan-doi-tra"
                                                title="Hướng dẫn đổi trả">Hướng dẫn đổi trả</a>
                                        </li>
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/huong-dan-chuyen-khoan"
                                                title="Hướng dẫn chuyển khoản">Hướng dẫn chuyển khoản</a>
                                        </li>
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/huong-dan-tra-gop"
                                                title="Hướng dẫn trả góp">Hướng dẫn trả góp</a>
                                        </li>
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/huong-dan-hoan-hang"
                                                title="Hướng dẫn hoàn hàng">Hướng dẫn hoàn hàng</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item has-childs  ">
                                    <a href="javascript:;" className="nav-link" title="Tin tức">
                                        Tin tức

                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/tin-tuc"
                                                title="Tin tức thể thao">Tin tức thể thao</a>
                                        </li>
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/kien-thuc-the-thao"
                                                title="Kiến thức thể thao">Kiến thức thể thao</a>
                                        </li>
                                        <li className="nav-item-lv2">
                                            <a className="nav-link" href="https://sudes-sport.mysapo.net/kinh-nghiem-the-thao"
                                                title="Kinh nghiệm thể thao">Kinh nghiệm thể thao</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" href="https://sudes-sport.mysapo.net/lien-he" title="Liên hệ chúng tôi">
                                        Liên hệ chúng tôi
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-menu">
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

                            <div className="sudes-header-stores">
                                <div className="frame-fix">
                                    <a href="https://sudes-sport.mysapo.net/he-thong-cua-hang" title="Hệ thống cửa hàng"></a>
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
                            <div className="sudes-header-iwish">
                                <div className="frame-fix">
                                    <a href="https://sudes-sport.mysapo.net/danh-sach-yeu-thich"
                                        title="Danh sách yêu thích"></a>
                                    <svg viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m256 455.515625c-7.289062 0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187 0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094 9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938 23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281 109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126 50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781 54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781 37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187 43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344 7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0">
                                        </path>
                                    </svg>
                                    <div className="text-box">
                                        <span className="acc-text-small">Danh sách yêu thích</span>
                                        <span className="acc-text"><span className="js-wishlist-count">0</span> sản phẩm</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Sidebar