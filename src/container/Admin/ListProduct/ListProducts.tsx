import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Tag, Space, Image, Modal, Tooltip, } from 'antd';
import { ClearOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FundViewOutlined, SearchOutlined } from '@ant-design/icons';
import './ListProduct.css';
import { toast } from 'react-toastify';
import { IProduct } from '../../../interfaces'

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { retrieveProducts, clearState, deleteProduct, findByName } from '../../../actions/products'
import { Dispatch } from "redux"
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import ProductsService from '../../../services/ProductsService'

import "../../../pages/Admin/Admin.css";
import ViewProduct from '../../../components/Admin/ViewProduct/ViewProduct';
import { handleError } from '../../../helper/helper';
import { retrieveCategories } from '../../../actions/categories';
import { ColumnsType } from 'antd/es/table';
import { RootState, AppDispatch } from '../../../store'
const defaultPosts: IProduct[] = [];


const ListProducts: React.FC = () => {
    /*
    * Initial State For Component 
    */
    const [products, setProducts]: [IProduct[], (posts: IProduct[]) => void] = useState(defaultPosts);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [viewProduct, setViewProduct] = useState<Object | any>();
    /*
    *  Get state from store
    */
    const lsProduct = useSelector((state: RootState) => state.products);
    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)
    const lsCategory = useSelector((state: RootState) => state.categories)
    const lsBrand = useSelector((state: RootState) => state.brands)
    /*
    * Initial Something For Component 
    */
    const dispatch: AppDispatch = useDispatch();
    const [form] = Form.useForm();
    const history = useHistory();
    const { confirm } = Modal;
    /*
    * Initial Function For Component 
    */


    
    const filterCatList = lsCategory.map((item: any) => {
        return {
            text: item.categoryName,
            value: item.categoryName,
        }
    })
    const filterBrandList = lsBrand.map((item: any) => {
        return {
            text: item.brandName,
            value: item.brandName,
        }
    })


    const showModal = async (id: string) => {
        if (id) {
            const result = await products.find((item: any) => item.id === id)
            await setViewProduct(result);
            await setIsModalVisible(true)
        }
    };
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 1,
        // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });


    const columns: ColumnsType<IProduct> = [
        {
            title: 'Name',
            dataIndex: 'productName',
            key: 'productName',
            width: 100,
            sorter: (a: any, b: any) => a.productName.localeCompare(b.productName),
            ellipsis: true,
            render: (value:string,record: IProduct) => <Tooltip placement="topLeft" title="Click to view Products">
                <a style={{cursor:"pointer",color:"black"}} onClick={() => showModal(record.id)} >{value}</a>
            </Tooltip>
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: 70,
            ellipsis: true,
            render: (category: any) => category?.categoryName,
            filters: filterCatList,
            onFilter: (value: any, record: any) => value ? record.category?.categoryName.includes(value) : ""
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            width: 70,
            ellipsis: true,
            render: (brand: any) => brand?.brandName,
            filters: filterBrandList,
            onFilter: (value: any, record: any) => value ? record.brand?.brandName.includes(value) : ""
        },
        {
            title: 'Price ($)',
            dataIndex: 'price',
            key: 'name',
            align: "right",
            width: 80,
            sorter: (a: any, b: any) => a.price - b.price,
            ellipsis: true,
            render: (price: number) => {
                return formatter.format(price);
            },
        },
        {
            title: 'Image',
            dataIndex: 'image1',
            key: 'image1',
            render: (image1: string) => {
                // if (image1.length >= 0) {
                return (
                    <Image
                        width={80}
                        height={80}
                        src={image1}
                    />
                );
                // }
            },
            width: 100,
            ellipsis: true,
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'id',
            render: (id: string) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showModal(id)} icon={<FundViewOutlined />} style={{ backgroundColor: "#73d13d", border: "#73d13d" }}>View
                    </Button>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleUpdateProduct(id)}>
                        Edit
                    </Button>
                    <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => { return showDeleteConfirm(id) }} >Delete
                    </Button>
                </Space>
            ),
            width: 250,
            ellipsis: true,
        },

    ];

    const handleUpdateProduct = (id: string) => {
        ProductsService.get(id)
            .then(response => {
                history.push(`/admin/product/update/${id}`);
            })
            .catch(error => {
                const message = handleError(error)
                handleConfirmRecord(message)
            })
    }

    const handleConfirmRecord = (Error: string) => {
        confirm({
            title: Error,
            content: "Do you want to reload page",
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            autoFocusButton: "cancel",
            cancelText: 'No',
            onOk() {
                dispatch(retrieveProducts())
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    function showDeleteConfirm(id: string) {
        confirm({
            title: 'Are you sure delete this product?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            autoFocusButton: "cancel",
            onOk() {
                handleDeleteProduct(id);
            },
            onCancel() {
            },
        });
    }
    const handleDeleteProduct = async (id: string) => {
        if (id) {
            await dispatch(deleteProduct(id))
        }
    }
    useEffect(() => {
        dispatch(retrieveProducts())
        setLoading(false);
    }, []);

    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, []);

    useEffect(() => {
        if (lsProduct) setProducts(lsProduct);
        if (Error) {
            handleConfirmRecord(Error)
            dispatch(clearState());
        }
        if (Success) {
            toast.success(Success);
            dispatch(retrieveProducts())
            dispatch(clearState());
        }
    }, [lsProduct, Success, Error]);

    //fetch cate
    useEffect(() => {
        dispatch((retrieveCategories()));
    }, []);


    // handle Form
    const onFinish = async (values: any) => {
        const productName: String = values.inputSearch;
        dispatch(findByName(productName.trim()));
    };

    const onFinishFailed = (errorInfo: any) => {
        toast.warning(errorInfo);
    };

    const onReset = () => {
        form.resetFields();
        dispatch(retrieveProducts())
    }

    //--------------

    const onSearch = (value: any) => dispatch(findByName(value));;
    //handle model 
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    //--------------
    return (
        <div className="listProduct">
            <Modal
                centered
                visible={isModalVisible}
                closable={false}
                onOk={handleOk} onCancel={handleCancel}
                footer={[
                    <Button type="primary" key="back" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                <ViewProduct viewProduct={viewProduct} />
            </Modal>
            <div className="listProduct__action">
                <Form form={form} name="nest-messages" onFinish={onFinish} onFinishFailed={onFinishFailed} style={{ display: 'flex' }}>
                    <Form.Item
                        name={'inputSearch'}

                        rules={[
                            {
                                required: true, message: "Please input search! "
                            },
                            {
                                max: 64, message: "Name max length 64 character!"
                            }
                            ,
                            {
                                whitespace: true
                            }
                        ]}
                    >
                        <Input tabIndex={1} placeholder="Search by Name" style={{ borderRadius: "6px", marginRight: "5px" }} />
                    </Form.Item>

                    <Form.Item  >
                        <Button tabIndex={2} onClick={() => onReset()} shape="circle" size="middle" icon={<ClearOutlined />} style={{ margin: "0 5px" }} />
                        <Button tabIndex={3} shape="circle" type="primary" htmlType="submit" size="middle" icon={<SearchOutlined />} style={{ marginRight: "5px" }} />
                    </Form.Item>
                </Form>
                {/* <Search
                    placeholder="Search by name"
                    allowClear
                    onChange={(e: any) => onSearch(e.target.value)}
                    size="large"
                onSearch={onSearch}
                /> */}
                <Button type="primary">
                    <Link to="/admin/product/add">Add Product</Link>
                </Button>
            </div>

            <Table
                loading={loading}
                bordered
                pagination={{
                    position: ['bottomCenter'],
                    pageSize: 5,
                    responsive: true,
                    total: products.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    // showSizeChanger: true,
                    // pageSizeOptions: ['10', '20', '30'],
                    showQuickJumper: true
                }}
                // scroll={{y:700}}
                title={() => 'List Products'}
                footer={() => ''}

                rowKey={(products: any) => products.id}
                columns={columns} dataSource={products} >
            </Table>

        </div>

    )
}

ListProducts.propTypes = {

}

export default ListProducts

