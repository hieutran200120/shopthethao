
import { useState } from "react";

import {
    Row,
    Col,
    Card,
    Button,
    List,
    Descriptions,
    Avatar,
    Radio,
    Switch,
    Upload,
    message,
    Modal
} from "antd";

import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { useProductContext } from "../../../utils/helpers/getHelper";
import InputCategory from "./modal/Form/InputCategory";
import InputProductType from "./modal/Form/InputProductType";
import InputSupplier from "./modal/Form/InputSupplier";
import BgProfile from "../../../assets/images/bg-profile.jpg";
import convesionImg from "../../../assets/images/face-3.jpg";
import convesionImg2 from "../../../assets/images/face-4.jpg";
import convesionImg3 from "../../../assets/images/face-5.jpeg";
import convesionImg4 from "../../../assets/images/face-6.jpeg";
import convesionImg5 from "../../../assets/images/face-2.jpg";
import project1 from "../../../assets/images/home-decor-1.jpeg"
import project2 from "../../../assets/images/home-decor-2.jpeg";
import project3 from "../../../assets/images/home-decor-3.jpeg";

function Caterory() {
    const [imageURL, setImageURL] = useState(false);
    const [, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenSupplier, setIsModalOpenSupplier] = useState(false)
    const [isModalOpenCategory, setIsModalOpenCategory] = useState(false)
    const { productType, category, supplier } = useProductContext();
    const handleCancelSupplier = () => {
        setIsModalOpenSupplier(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCancelCategory = () => {
        setIsModalOpenCategory(false);
    };
    const showModalSupplier = () => {
        setIsModalOpenSupplier(true);
    };
    const showModalCategory = () => {
        setIsModalOpenCategory(true);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const userString = sessionStorage.getItem("user");
    const user = JSON.parse(userString);



    const pencil = [
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
                className="fill-gray-7"
            ></path>
            <path
                d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
                className="fill-gray-7"
            ></path>
        </svg>,
    ];

    const data = [
        {
            title: "Sophie B.",
            avatar: convesionImg,
            description: "Hi! I need more information…",
        },
        {
            title: "Anne Marie",
            avatar: convesionImg2,
            description: "Awesome work, can you…",
        },
        {
            title: "Ivan",
            avatar: convesionImg3,
            description: "About files I can…",
        },
        {
            title: "Peterson",
            avatar: convesionImg4,
            description: "Have a great afternoon…",
        },
        {
            title: "Nick Daniel",
            avatar: convesionImg5,
            description: "Hi! I need more information…",
        },
    ];

    return (
        <>
            <div
                className="profile-nav-bg"
                style={{ backgroundImage: "url(" + BgProfile + ")" }}
            ></div>

            <Card
                className="card-profile-head"
                bodyStyle={{ display: "none" }}
                title={
                    <Row justify="space-between" align="middle" gutter={[24, 0]}>
                        <Col span={24} md={12} className="col-info">
                            <Avatar.Group>
                                <Avatar size={74} shape="square" src={user.image} />

                                <div className="avatar-info">
                                    <h4 className="font-semibold m-0">{user.firstName}</h4>
                                    {user.roles && user.roles.map((item, index) => (
                                        <p key={index}>{item}</p>
                                    ))}
                                </div>
                            </Avatar.Group>
                        </Col>
                        <Col
                            span={24}
                            md={12}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                        </Col>
                    </Row>
                }
            ></Card>

            <Row gutter={[24, 0]}>

                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Loại sản phẩm</h6>}
                        className="header-solid h-full"
                        extra={<Button type="primary" onClick={showModalCategory}>{pencil} Thêm mới</Button>}
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={category}
                            split={false}
                            className="conversations-list"
                            renderItem={(item) => (
                                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                                    <List.Item.Meta
                                        title={item.name}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Môn thể thao</h6>}
                        className="header-solid h-full"
                        extra={<Button type="primary" onClick={showModal}>{pencil} Thêm mới</Button>}
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={productType}
                            split={false}
                            className="conversations-list"
                            renderItem={(item) => (
                                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar shape="square" size={48} src={item.image} />
                                        }
                                        title={item.name}
                                    // description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col span={24} md={8} className="mb-24">
                    <Card
                        bordered={false}
                        title={<h6 className="font-semibold m-0">Nhà cung cấp</h6>}
                        className="header-solid h-full"
                        extra={<Button type="primary" onClick={showModalSupplier}>{pencil} Thêm mới</Button>}
                        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={supplier}
                            split={false}
                            className="conversations-list"
                            renderItem={(item) => (
                                <List.Item actions={[<Button type="link">REPLY</Button>]}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar shape="square" size={48} src={item.image} />
                                        }
                                        title={item.name}
                                        description={item.address}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <InputProductType />
            </Modal>
            <Modal
                open={isModalOpenSupplier}
                onCancel={handleCancelSupplier}
                footer={null}
            >
                <InputSupplier />
            </Modal>
            <Modal
                open={isModalOpenCategory}
                onCancel={handleCancelCategory}
                footer={null}
            >
                <InputCategory />
            </Modal>
        </>
    );
}

export default Caterory;
