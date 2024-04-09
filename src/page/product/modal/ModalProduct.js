import React, { useEffect, useState } from 'react';
import { Button, Modal, Steps, message } from 'antd';
import Inputproduct from './Form/Inputproduct';
import InputProductdetail from './Form/InputProductdetail';
import { productServices } from '../../../utils/services/admin/productServices';
import { productDetailServices } from '../../../utils/services/admin/productDetailService';
import { useProductContext } from '../../../utils/helpers/getHelper';
const ModalProduct = ({ open, setOpen }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [idStep1, setIdStep1] = useState('')
  const [fileList, setFileList] = useState(null);
  const { productType, supplier, color, size, category } = useProductContext();
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const onBack = () => {
    prev(); // Gọi hàm prev để quay lại bước trước đó
  };
  //gửi dữ liệu product
  const onFinishProduct = async (values) => {
    try {
      const formData = new FormData();
      //  console.log(values)
      if (fileList) {
        const fileObj = fileList.originFileObj;
        formData.append(`ImageFile`, fileObj);
        console.log(fileObj)
      }
      formData.append("Name", values.Name);
      formData.append("Price", values.Price);
      formData.append("PriceSale", values.PriceSale);
      formData.append("Sex", values.Sex);
      formData.append("IsSale", values.IsSale);
      formData.append("Category.Id", values["Category.Id"]);
      formData.append("Supplier.Id", values["Supplier.Id"]);
      formData.append("ProductType.Id", values["ProductType.Id"]);
      formData.append("Description", values.Description);
      const response = await productServices.create(formData);
      setIdStep1(response.id);
      console.log(response.id);
      message.success("Thêm mới thành công");
      next();
      // console.log(response.data.id)
    } catch (error) {
      console.error(error);
      message.error("thêm mới thất bại");
    }
  }
  //gửi dữ liệu productDetail
  // const onFinishProductDetail = async (values) => {
  //   try {
  //     const formData = new FormData();

  //     values.items.forEach((item, index) => {
  //       const itemKey = `items[${index}]`;

  //       if (fileList) {
  //         const fileObj = fileList.originFileObj;
  //         formData.append(`ImageFile`, fileObj);
  //         // console.log(fileObj)
  //       }
  //       formData.append("Product.Id`, idStep1);
  //       formData.append("Color.Id`, item['Color.Id']);
  //       formData.append("Size.Id`, item['Size.Id']);
  //       formData.append("Quantity`, item.Quantity);
  //     });
  //     await productDetailServices.create(formData);
  //     message.success("Thêm mới thành công");
  //     console.log("values:", values)
  //   } catch (error) {
  //     console.error(error);
  //     message.error("Thêm mới thất bại");
  //   }
  // };
  const onFinishProductDetail = async (values) => {
    try {
      const formData = new FormData();
      if (fileList) {
        const fileObj = fileList.originFileObj;
        formData.append(`ImageFile`, fileObj);
        // console.log(fileObj)
      }
      formData.append("Product.Id", idStep1);
      formData.append("Color.Id", values["Color.Id"]);
      formData.append("Size.Id", values["Size.Id"]);
      formData.append("Quantity", values.Quantity);
      await productDetailServices.create(formData);
      message.success("Thêm mới thành công");
      console.log("values:", values)
    } catch (error) {
      console.error(error);
      message.error("Thêm mới thất bại");
    }
  };
  const steps = [

    {
      key: "1",
      title: 'Thông tin chung',
      content: <Inputproduct category={category} supplier={supplier} productType={productType} fileList={fileList} setFileList={setFileList} onFinishProduct={onFinishProduct} />,
    },
    {
      key: "2",
      title: 'Màu sắc,Size',
      content: <InputProductdetail onBack={onBack} fileList={fileList} setFileList={setFileList} color={color} size={size} onFinishProductDetail={onFinishProductDetail} />,
    },

  ]
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Steps current={current} items={steps} />
        <div >{steps[current].content}</div>
      </Modal>
    </>
  );
};

export default ModalProduct