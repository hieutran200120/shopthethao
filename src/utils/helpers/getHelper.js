import React, { createContext, useState, useContext, useEffect } from 'react';
import { productServices } from '../services/admin/productServices';
import { producTypeServices } from '../services/admin/productTypeService';
import { supplierServices } from '../services/admin/supplierService';
import { categoryServices } from '../services/admin/categoryService';
import { colorServices } from '../services/admin/colorService';
import { sizeServices } from '../services/admin/sizeService';
import { provinceServices } from '../services/user/provinceService';
import { districtServices } from '../services/user/districtService';
import { WardServices } from '../services/user/wardService';
const ProductContext = createContext();
export const useProductContext = () => useContext(ProductContext);
export const ProductProvider = ({ children }) => {
    const [productBoy, setProductBoy] = useState([]);
    const [productGirl, setProductGirl] = useState([]);
    const [productType, setProductType] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [category, setCategory] = useState([]);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const getProducTypes = async () => {
        try {
            const res = await producTypeServices.get();
            setProductType(res);
            console.log("dữ liệu", res);
        } catch (error) {
            console.error(error);
        }
    }
    const getProductBoys = async () => {
        try {
            const res = await productServices.getProductBoy();
            setProductBoy(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    const getProductGirls = async () => {
        try {
            const res = await productServices.getProductGirl();
            setProductGirl(res.items);
        } catch (error) {
            console.error(error);
        }
    }
    //lấy dữ liệu nhà cung cấp 
    const getSupplier = async () => {
        try {
            const res = await supplierServices.get()
            setSupplier(res.items)
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu loại sản phẩm
    const getCategory = async () => {
        try {
            const res = await categoryServices.get()
            setCategory(res.items)
            console.log(category)
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu color
    const getColor = async () => {
        try {
            const res = await colorServices.get();
            setColor(res.items);
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu size
    const getSize = async () => {
        try {
            const res = await sizeServices.get();
            setSize(res.items);
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu tỉnh
    const getProvince = async () => {
        try {
            const res = await provinceServices.get();
            setProvince(res.items);
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu huyện
    const getDistrict = async () => {
        try {
            const res = await districtServices.get();
            setDistrict(res.items);
        } catch (error) {
            console.log(error)
        }
    }
    //lấy dữ liệu xã
    const getWard = async () => {
        try {
            const res = await WardServices.get();
            setWard(res.items);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProductBoys();
        getProductGirls();
        getProducTypes();
        getSupplier();
        getCategory();
        getColor();
        getSize();
        getProvince();
        getDistrict();
        getWard();
    }, []);
    return (
        <ProductContext.Provider value={{ productBoy, productGirl, productType, category, supplier, size, color, province, district, ward, getColor, getSize, getSupplier, getCategory, getProducTypes, getProductBoys, getProductGirls }}>
            {children}
        </ProductContext.Provider>
    );
}