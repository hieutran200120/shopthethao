import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Oder.scss"

const Oder = () => {
    // const orderData = JSON.parse(sessionStorage.getItem('orderData'));
    const [cart, setCart] = useState([])
    const navigate = useNavigate();
    console.log(cart);
    const handleRemoveItem = (productId) => {
        // Tìm vị trí của sản phẩm trong orderData dựa trên id
        const productIndex = cart.findIndex((item) => item.id === productId);
        if (productIndex !== -1) {
            // Tạo một bản sao của orderData để tránh thay đổi trực tiếp state
            const updatedOrderData = [...cart];
            // Xóa sản phẩm tại vị trí productIndex
            updatedOrderData.splice(productIndex, 1);
            // Cập nhật state và sessionStorage
            setCart(updatedOrderData);
            sessionStorage.setItem('orderData', JSON.stringify(updatedOrderData));
            // Hiển thị thông tin đơn hàng trong console
            console.log('Updated Order data:', updatedOrderData);
        } else {
            console.error(`Product with id ${productId} not found in orderData.`);
        }
    };
    // tính tổng tiền 
    const totalAmount = cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    //nút chuyển trang
    const handleButtonClick = async () => {
        navigate(`pay`)
    }
    useEffect(() => {
        const cartData = sessionStorage.getItem('orderData');
        if (cartData) {
            setCart(JSON.parse(cartData));
        }
    }, []);
    return (
        <section class="main-cart-page main-container col1-layout">

            <div class="main container cartpcstyle">
                <div class="wrap_background_aside">
                    <div class="header-cart">
                        <div class="title-block-page">
                            <h1 class="title_cart">
                                <span>Giỏ hàng của bạn</span>
                            </h1>
                        </div>
                    </div>
                    <div class="row" style={{ marginTop: "100px" }}>
                        <div class="col-xl-9 col-lg-7 col-12 col-cart-left">

                            <div class="cart-page d-xl-block d-none">
                                <div class="drawer__inner">
                                    <div class="CartPageContainer">
                                        <div class="cart ajaxcart cartpage">
                                            <div class="cart-header-info">
                                                <div
                                                    style={{
                                                        width: "51%",
                                                        textAlign: "left",
                                                        paddingLeft: "10px"
                                                    }}
                                                >
                                                    Thông tin sản phẩm
                                                </div>
                                                <div
                                                    style={{
                                                        width: "16%",
                                                        textAlign: "center"
                                                    }}
                                                >Đơn giá
                                                </div>
                                                <div
                                                    style={{
                                                        width: "16%",
                                                        textAlign: "center"
                                                    }}
                                                >Số lượng
                                                </div>
                                                <div
                                                    style={{
                                                        width: "16%",
                                                        textAlign: "center"
                                                    }}
                                                >Thành tiền</div>
                                            </div>
                                            {cart.map((data, index) => {
                                                return (
                                                    <div key={index} className="ajaxcart__inner ajaxcart__inner--has-fixed-footer cart_body items">
                                                        <div className="ajaxcart__row">
                                                            <div className="ajaxcart__product cart_product" data-line="1">
                                                                <img
                                                                    style={{
                                                                        height: "110px",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        marginLeft: "10px"
                                                                    }}
                                                                    src={data.img} alt="Giày leo núi dã ngoại cổ lửng Arpenaz 50 cho nam" />
                                                                <div className="grid__item cart_info">
                                                                    <div className="ajaxcart__product-name-wrapper cart_name"
                                                                        style={{
                                                                            display: "grid", width: "50%",
                                                                            marginBottom: "5px"
                                                                        }}>
                                                                        <a href="/gia-y-leo-nu-i-da-ngoa-i-co-lu-ng-arpenaz-50-cho-nam" className="ajaxcart__product-name h4" >{data.name}</a>
                                                                        <span className="ajaxcart__product-meta variant-title">{data.color} / {data.size}</span>
                                                                        <div title="Xóa" className="cart__btn-remove remove-item-cart ajaxifyCart--remove" onClick={() => handleRemoveItem(data.id)}>Xóa</div>
                                                                    </div>
                                                                    <div className="grid">
                                                                        <div className="grid__item one-half text-right cart_prices">
                                                                            <span className="cart-price">  {data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="grid">

                                                                        <input type="text" name="updates[]" className="ajaxcart__qty-num number-sidebar" maxLength="3" value={data.quantity} min="0" data-id="" data-line="1" aria-label="quantity" pattern="[0-9]*" fdprocessedid="3o1gy1" />

                                                                    </div>
                                                                    <div className="grid justify-right">
                                                                        <div className="grid__item one-half text-right cart_prices">
                                                                            <span className="cart-price">{(data.price * data.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                        {/* <div>
                                            <h1>Your Order</h1>
                                            {orderData.map((item, index) => (
                                                <div key={index}>
                                                    <p>ID: {item.id}</p>
                                                    <p>Name: {item.name}</p>
                                                    <p>Color: {item.color}</p>
                                                    <p>Size: {item.size}</p>
                                                    <p>Quantity: {item.quantity}</p>
                                                    <p>Price: {item.price}</p>
                                                    <hr />
                                                </div>
                                            ))}
                                        </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-5 col-12 col-cart-right">
                            <div class="ajaxcart__footer">
                                <div class="checkout-header">
                                    Thông tin đơn hàng
                                </div>
                                <div class="checkout-body">
                                    <div class="summary-total">
                                        <div class="content-items">
                                            <div class="item-content-left" style={{ fontWeight: 600 }}>Tổng tiền</div>
                                            <div class="item-content-right"><span class="total-price">{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></div>
                                        </div>
                                    </div>
                                    <div class="summary-button">
                                        <div class="cart__btn-proceed-checkout-dt">
                                            <button onClick={() => handleButtonClick()} type="button" class=" btn btn-default " id="btn-proceed-checkout" title="Thanh toán" fdprocessedid="ze7uht">Thanh toán</button>
                                        </div>
                                        <button class="return_buy" title="Tiếp tục mua hàng" href="collections/all">Tiếp tục mua hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Oder