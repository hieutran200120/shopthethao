import React from 'react';
// import "../css/main.scss";
// import "../css/fonts.scss";
// import "../css/bootstrap.scss";
// import "../css/picbox.scss";
import Header from './Header';
import Footer from './Footer';
import { ProductBoy } from '../page/user/product/ProductBoy';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {

    return (
        <>
            <header className="header hSticky">
                <Header />
            </header>

            {/* <ProductBoy /> */}
            <Outlet />
            <footer className="footer">
                <Footer />
            </footer>
        </>
    );
};

export default Layout;