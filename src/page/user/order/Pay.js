import React from 'react'
import { Form, Input, Row, Col, Select, message } from "antd";
import { Button } from 'react-bootstrap';
import { payServices } from '../../../utils/services/user/payService';
import { provinceServices } from '../../../utils/services/user/provinceService';
import { useProductContext } from '../../../utils/helpers/getHelper';
import { useNavigate } from "react-router-dom";
import './Pay.scss'
const { Option } = Select;
const Pay = () => {
  const { province, district, ward } = useProductContext();
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      const res = await payServices.create(values);
      message.success("Thêm mới thành công");

      window.location.href = res.redirectUrl;

      console.log("values:", values);
    } catch (error) {
      console.error(error);
      message.error("Thêm mới thất bại");
    }
  };
  return (
    <Form
      name="normal_login"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      layout="vertical"
      requiredMark="optional"
    >
      <div class="wrap" style={{ display: "flex", justifyContent: "center" }}>
        <main class="main" style={{ width: "52%", padding: "2em 2em 0 2em" }}>
          <header class="main__header" style={{ textAlign: "center", paddingBottom: "1.5em" }}>
            <img class="logo__image  logo__image--small " width={300} height={51} alt="Sudes Sport" src="https://bizweb.dktcdn.net/100/490/431/themes/927074/assets/checkout_logo.png?1706431508504" />
          </header>
          <div class="main__content">
            <Row gutter={18}>
              <Col span={12} >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      type: "text",
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Họ Tên"
                    style={{ margin: 0 }}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "text",
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="SĐT"
                    style={{ margin: 0 }}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "text",
                      required: true,
                      message: "Please input your Email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Địa chỉ"
                    style={{ margin: 0 }}
                  />
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "14px" }}
                  name="province_id"
                  rules={[
                    {
                      required: true,
                      message: "Tỉnh thành ",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder="Tỉnh thành"
                    filterOption={(input, option) =>
                      option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                  >
                    {province.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  style={{ marginBottom: "14px" }}
                  name="district_id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phường xã",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder="Phường xã"
                    filterOption={(input, option) =>
                      option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                  >
                    {district.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="ward_id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn xã",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder="xã"
                    filterOption={(input, option) =>
                      option?.children.toLowerCase().indexOf(input.toLowerCase()) >=
                      0
                    }
                  >
                    {ward.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <h2 class="section__title layout-flex__item layout-flex__item--stretch">
                  <i class="fa fa-truck fa-lg section__title--icon hide-on-desktop"></i>
                  Vận chuyển
                </h2>
                <div class="alert alert--info" style={{ color: "#0c5460", backgroundColor: "#d1ecf1", borderColor: "#bee5eb" }}>
                  Vui lòng nhập thông tin giao hàng
                </div>
              </Col>
            </Row>

          </div>
        </main>
        <aside class="sidebar">
          <div class="sidebar__header" style={{
            borderBottom: "1px solid #e1e1e1",
            paddingTop: "20px",
            paddingBottom: "20px"
          }}>
            <h2 class="sidebar__title">
              Đơn hàng (10 sản phẩm)
            </h2>
          </div>
          <div class="sidebar__content">
            <table class="product-table">
              <caption class="visually-hidden">Chi tiết đơn hàng</caption>
              <thead class="product-table__header">
                <tr>
                  <th>
                    <span class="visually-hidden">Ảnh sản phẩm</span>
                  </th>
                  <th>
                    <span class="visually-hidden">Mô tả</span>
                  </th>
                  <th>
                    <span class="visually-hidden">Sổ lượng</span>
                  </th>
                  <th>
                    <span class="visually-hidden">Đơn giá</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="product">
                  <td class="product__image">
                    <div class="product-thumbnail">
                      <div class="product-thumbnail__wrapper" data-tg-static="">
                        <img src="//bizweb.dktcdn.net/thumb/thumb/100/490/431/products/p2155510.jpg?v=1694054425827" alt="" class="product-thumbnail__image" />
                      </div>
                      <span class="product-thumbnail__quantity">7</span>
                    </div>
                  </td>
                  <th class="product__description">
                    <span class="product__description__name">
                      Giày chạy bộ RUN ACTIVE cho nam
                    </span>

                    <span class="product__description__property">
                      Đen cam / 39
                    </span>


                  </th>
                  <td class="product__quantity visually-hidden"><em>Số lượng:</em> 7</td>
                  <td class="product__price">

                    5.565.000₫

                  </td>
                </tr>
              </tbody>
              <tfoot class="total-line-table__footer">
                <tr class="total-line payment-due">
                  <th class="total-line__name">
                    <span class="payment-due__label-total">
                      Tổng cộng
                    </span>
                  </th>
                  <td class="total-line__price">
                    <span class="payment-due__price" data-bind="getTextTotalPrice()">6.640.000₫</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="order-summary__nav field__input-btn-wrapper hide-on-mobile layout-flex--row-reverse">
            <a href="/cart" class="previous-link">
              <i class="previous-link__arrow">❮</i>
              <span class="previous-link__content">Quay về giỏ hàng</span>
            </a>
            <Button type="submit" class="btn btn-checkout spinner" >
              <span class="spinner-label">ĐẶT HÀNG</span>
            </Button>

          </div>
        </aside>
      </div>
    </Form>
  )
}

export default Pay