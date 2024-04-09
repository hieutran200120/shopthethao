import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Avatar, message } from "antd"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { productDetailServices } from "../../../utils/services/admin/productDetailService";
import ModalProductDetail from "../modal/ModalProductDetail";
import { colorServices } from "../../../utils/services/admin/colorService";
import { sizeServices } from "../../../utils/services/admin/sizeService";
const ProductDetail = ({ productId }) => {
    const [productDetail, setProductDetail] = useState([]);
    const [open, setOpen] = useState(false);
    const [curDataProductDetail, setCurDataProductDetail] = useState();
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);
    const showModalProductdetail = (data) => {
        setOpen(true);
        setCurDataProductDetail(data)
    };
    const getProductDetail = async (productId) => {
        try {
            const res = await productDetailServices.get({ Product_id: productId });
            setProductDetail(res.items);
            // console.log(res.items);
        } catch (error) {
            console.log(error);
        }
    };
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
    //hàm xóa sản phẩm
    const handleDelete = async (id) => {
        try {
            const res = await productDetailServices.deleteProductDetail({ Id: id });
            getProductDetail(productId);
            message.error(res.message);
        } catch (err) {
            console.error(err);
            message.error("Xóa thất bại");
        }
    };
    useEffect(() => {
        getProductDetail(productId);
        getColor();
        getSize();
    }, [productId]);
    const columns = [
        {
            title: "Ảnh",
            key: "image",
            dataIndex: "image",
            render: (text) => (
                <>
                    <Avatar.Group>
                        <Avatar
                            className="shape-avatar"
                            shape="square"
                            size={40}
                            src={text}
                        ></Avatar>
                    </Avatar.Group>{" "}
                </>
            )
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            align: "center"
        },
        {
            title: "kích cỡ",
            dataIndex: "size",
            align: "center",
            render: (size) => <div>{size ? size.name : ""}</div>,
        },
        {
            title: "Màu",
            dataIndex: "color",
            align: "center",
            render: (color) => <div>{color ? color.name : ""}</div>,
        },
        {
            title: 'Thao tác',
            width: '108px',
            render: (record, index) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

                <EditOutlined onClick={() => showModalProductdetail(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
                <Popconfirm onConfirm={() => handleDelete(record.id)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
                    <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
                </Popconfirm>
            </div>
        }
    ]
    return (
        <>
            <Table
                columns={columns}
                dataSource={productDetail}
                pagination={false}
                className="ant-border-space"
            />
            <ModalProductDetail open={open} setOpen={setOpen} curDataProductDetail={curDataProductDetail} size={size} color={color} />
        </>

    )
}

export default ProductDetail