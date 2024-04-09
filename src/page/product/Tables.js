
import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Popconfirm
} from "antd";

import { useState, useEffect } from "react";
import ProductDetail from "./productDetail/ProductDetail";
import { productServices } from "../../utils/services/admin/productServices";
import ModalProduct from "./modal/ModalProduct";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ModalEditProduct from "./modal/ModalEditProduct";
import { supplierServices } from "../../utils/services/admin/supplierService";
import { categoryServices } from "../../utils/services/admin/categoryService";
import { producTypeServices } from "../../utils/services/admin/productTypeService";
const { Title } = Typography;

function Tables() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [curData, setCurData] = useState();
  const [supplier, setSupplier] = useState([]);
  const [category, setCategory] = useState([]);
  const [productType, setProductType] = useState([]);
  const showModal = () => {
    setOpen(true);
  };
  const showModalEdit = (data) => {
    setOpenEdit(true);
    setCurData(data)
  };
  const [product, setProduct] = useState([]);
  //lấy dữ liệu sản phẩm 
  const getProduct = async () => {
    try {
      const res = await productServices.get()
      setProduct(res.items)
      console.log(res)
    } catch (error) {
      console.log(error)
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
  //lấy dữ liệu productType
  const getProductType = async () => {
    try {
      const res = await producTypeServices.get();
      setProductType(res);
    } catch (error) {
      console.log(error)
    }
  }
  //hàm xóa sản phẩm
  const handleDelete = async (id) => {
    try {
      const res = await productServices.deleteProduct({ Id: id });
      getProduct();
      message.error(res.message);
    } catch (err) {
      console.error(err);
      message.error("Xóa thất bại");
    }
  };
  //load dữ liệu lần đầu
  useEffect(() => {
    getProduct();
    getCategory();
    getSupplier();
    getProductType();
  }, []);
  // table code start
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
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: "32%",
    },
    {
      title: "Giới tính",
      key: "sex",
      dataIndex: "sex",
      render: (sex) => <div>{sex ? "Nam" : "Nữ"}</div>
    },
    {
      title: "Loại sản phẩm",
      key: "category",
      dataIndex: "category",
      render: (caterory) => <div>{caterory ? caterory?.name : ""}</div>,
    },
    {
      title: "Nhà cung cấp",
      key: "supplier",
      dataIndex: "supplier",
      render: (supplier) => <div>{supplier ? supplier?.name : ""}</div>,
    },
    {
      title: 'Thao tác',
      width: '108px',
      render: (record, index) => <div style={{ display: 'flex', justifyContent: 'space-around', paddingRight: '20px', paddingLeft: '20px' }}>

        <EditOutlined onClick={() => showModalEdit(record)} style={{ marginRight: '1rem', color: '#036CBF', cursor: 'pointer' }} />
        <Popconfirm onConfirm={() => handleDelete(record.id)} title="Bạn chắc chắn xóa?" cancelText='Hủy' okText='Đồng ý'>
          <DeleteOutlined style={{ color: 'red', cursor: 'point' }} />
        </Popconfirm>
      </div>
    }
  ];
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Authors Table"
              extra={
                <>
                  <Button type="primary"
                    style={{
                      display: 'flex',
                      cursor: "pointer",
                      minWidth: "36px",
                      minHeight: "36px",
                      fontSize: "calc(0.875rem * var(--ui-rem-scale))",
                      fontWeight: 550,
                      lineHeight: "calc(1rem * var(--ui-rem-scale))",
                      textTransform: "none",
                      letterSpacing: "normal",
                      alignItems: "center"
                    }}
                    onClick={showModal}
                  >
                    <span style={{ height: 18, width: 25 }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10m-1 5v4h-4v2h4v4h2v-4h4v-2h-4v-4zm-7 5c0 4.41 3.59 8 8 8s8-3.59 8-8-3.59-8-8-8-8 3.59-8 8" clip-rule="evenodd"></path></svg>
                    </span>

                    Thêm sản phẩm
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={product}
                  expandable={{
                    expandedRowRender: (record) => {
                      return <ProductDetail productId={record.id} />;
                    },
                  }}
                  pagination={false}
                  rowKey="id"
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <ModalProduct open={open} setOpen={setOpen} />
      <ModalEditProduct open={openEdit} setOpen={setOpenEdit} curData={curData} getProduct={getProduct} category={category} supplier={supplier} productType={productType} />
    </>
  );
}

export default Tables;
