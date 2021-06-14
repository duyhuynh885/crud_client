import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Button, Select, Spin } from 'antd';
import { toast } from 'react-toastify';
import './FormProduct.css';
import { retrieveCategories } from '../../../actions/categories';
import { retrieveBrands } from '../../../actions/brand';
import { clearState, createProduct, updateProduct } from '../../../actions/products';
import { useDispatch, useSelector } from 'react-redux';
import { ICategory, IBrand } from '../../../interfaces';
import { useHistory, useParams } from "react-router-dom";
import { storage } from '../../../firebase';
import ProductsService from '../../../services/ProductsService';
import { Prompt } from 'react-router-dom';
import "../../../pages/Admin/Admin.css";
import { LoadingOutlined } from '@ant-design/icons';
import { AppDispatch, RootState } from '../../../store';
import { validateMessages } from '../../../constants/messages';
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 15,
    },
};


/**
 * FormProduct
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By DuyHV9
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       DuyHV9           Create
 */
const FormProduct: React.FC = () => {
    /*
    * Initial State For Component 
    */
    const [categoryId, setCategoryId] = useState<any>(0);
    const [brandId, setBrandId] = useState<any>(0);
    const [file, setFile] = useState<any | null>();
    const [loading, setLoading] = useState(false);
    const [isFormIncomplete, setIsFormIncomplete] = useState(false);
    const [imageUrl, setImageUrl] = useState<any | null>();
    const { productId } = useParams<any>();
    /*
    *  Get state from store
    */
    const Success = useSelector((state: RootState) => state.isSuccess)
    const Error = useSelector((state: RootState) => state.isError)
    const lsCategory = useSelector((state: RootState) => state.categories)
    const lsBrand = useSelector((state: RootState) => state.brands)
    /*
    * Initial Something For Component 
    */
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const { Option } = Select;
    const [form] = Form.useForm();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const onReset = () => {
        form.resetFields();
    };

    /*
    * Initial Function For Component 
    */
    /**
      * Handle update action
      * @param values contains update information
      * @param id to update category
      */
    const handleUpdate = (values: any, id: string) => {
        setLoading(true)
        lsCategory.forEach((element: ICategory) => {
            if (element.categoryName === values.product.category) values.product.category = element.id;
        });
        lsBrand.forEach((element: IBrand) => {
            if (element.brandName === values.product.brand) values.product.brand = element.id;
        });
        const productCreate = {
            ...values.product,
            category: {
                id: values.product.category
            },
            brand: {
                id: values.product.brand
            },
            productName: values.product.productName.trim()
        }
        if (file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                setLoading(false)
                toast.error('You can only upload JPG/PNG file!');
                setFile(null);
                return;
            }
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        productCreate.image1 = url;
                        dispatch(updateProduct(id, productCreate))
                    });
            });
        } else {
            dispatch(updateProduct(id, productCreate))
        }
    }

    /**
    * Handle create action
    * @param values contains create create information
    */
    const handleCreate = (values: any) => {
        console.log(form.getFieldsValue().product);
        setLoading(true)
        const productCreate = {
            ...values.product,
            category: {
                id: values.product.category
            },
            brand: {
                id: values.product.brand
            },
            productName: values.product.productName.trim()

        }
        if (file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                setLoading(false)
                toast.error('You can only upload JPG/PNG file!');
                setFile(null);
                return;
            }
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        productCreate.image1 = url;
                        dispatch(createProduct(productCreate));
                    });
            });
        } else {
            setLoading(false)
            toast.warning("Image is required!");
        }
    }

    /**
     * Clear state
     */
    useEffect(() => {
        return () => {
            if (form.getFieldsValue(true).product !== undefined) setIsFormIncomplete(true);
            dispatch(clearState());
            onReset();
        };
    }, []);

    //fetch category form db
    useEffect(() => {
        dispatch(retrieveBrands())
        dispatch(retrieveCategories());
    }, []);

    /**
     * Load error or success message if exist
     */
    useEffect(() => {
        if (Error) {
            toast.error(Error);
            dispatch(clearState());
        }
        if (Success) {
            toast.success(Success);
            dispatch(clearState());
            history.push("/admin/product")
            onReset()
        }
        // neu nhu state success and error thay doi thi se call lai useEffect
    }, [Success, Error]);


    /**
     * Create or update action if submit success
     * @param values contains create or update information
     */
    const onFinish = async (values: any) => {
        if (!productId) handleCreate(values);
        else handleUpdate(values, productId);
    };


    /**
     * Set values for form fields if action is update
     */
    useEffect(() => {
        if (productId) {
            ProductsService.get(productId)
                .then(response => {
                    const cate = response.data.category;
                    const brand = response.data.brand;
                    setCategoryId(cate.id);
                    form.setFieldsValue({
                        product: {
                            ...response.data,
                            category: cate.categoryName,
                            brand: brand.brandName
                        }
                    });
                    setImageUrl(response.data.image1)
                })
                .catch(error => {
                    toast.error(error.message);
                })
        }
    }, [])

    /**
     * Process if submit fail
     * @param errorInfo show warning message
     */
    const onFinishFailed = (errorInfo: any) => {
        toast.warning(errorInfo);
    };
    /**
     * handle Change
     * @param e event
     */
    function handleChange(e: any) {
        e.preventDefault();
        setFile(e.target.files[0])
    }
    /**
     * handle Back
     */
    const handleBack = () => {
        history.goBack()
    }

    return (

        <div className="formProduct">
            <Prompt
                when={isFormIncomplete}
                message="Are you sure you want to leave?" />
            <div className="formProduct__container">
                <h2 className="formProduct__title">{productId ? 'Update Product' : 'Add Product'}</h2>
                <h1 style={{ borderBottom: 'solid 1px rgb(224, 215, 215)', marginBottom: '30px' }}></h1>
                <Form {...layout}
                    form={form}
                    colon={false}
                    name="nest-messages"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    labelAlign="left"
                    validateMessages={validateMessages}>
                    <div className="formProduct__form">
                        <div className="formProduct__items">
                            <Form.Item
                                name={['product', 'productName']}
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        max: 60,
                                        whitespace: true
                                    },
                                ]}
                            >
                                <Input tabIndex={1} style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} />
                            </Form.Item>
                            <Form.Item
                                name={['product', 'category']}
                                label="Category"
                                rules={[
                                    {
                                        required: true,
                                    }
                                ]}
                            >
                                {
                                    (productId)
                                        ? <Select tabIndex={2} defaultValue={categoryId} style={{ width: 120, marginLeft: "5px" }} >
                                            {lsCategory.map((item: any) => (
                                                <Option  key={item.categoryName} value={item.id} >{item.categoryName}</Option>
                                            ))}
                                        </Select>
                                        : <Select  tabIndex={2} defaultValue="-- Option --" style={{ width: 120, marginLeft: "5px" }} >
                                            {lsCategory.map((item: any) => (
                                                <Option  key={item.categoryName} value={item.id} >{item.categoryName}</Option>
                                            ))}
                                        </Select>
                                }
                            </Form.Item>
                            <Form.Item
                                name={['product', 'brand']}
                                label="Brand"
                                rules={[
                                    {
                                        required: true,
                                    }
                                ]}
                            >
                                {
                                    (productId)
                                        ? <Select tabIndex={3} defaultValue={brandId} style={{ width: 120, marginLeft: "5px" }} >
                                            {lsBrand.map((item: any) => (
                                                <Option  key={item.brandName} value={item.id} >{item.brandName}</Option>
                                            ))}
                                        </Select>
                                        : <Select tabIndex={3} defaultValue="-- Option --" style={{ width: 120, marginLeft: "5px" }} >
                                            {lsBrand.map((item: any) => (
                                                <Option key={item.brandName} value={item.id} >{item.brandName}</Option>
                                            ))}
                                        </Select>
                                }
                            </Form.Item>
                            <Form.Item
                                name={['product', 'price']}
                                label="Price"
                                rules={[
                                    {
                                        required: true,
                                        type: 'number',
                                        min: 0,
                                        max: 99999
                                    },
                                ]}
                            >
                                <InputNumber
                                    tabIndex={4}
                                    step="1000"
                                    formatter={(value: any) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ borderRadius: "6px", marginLeft: "5px", width: "30%" }} />
                            </Form.Item>

                            <Form.Item
                                name={['product', 'image1']}
                                label="Image"
                            >
                                {(imageUrl) ? <img src={imageUrl} alt="avatar" style={{ width: '100px', height: "100px", borderRadius: "6px", marginLeft: "5px", marginBottom: "5px" }} /> : ''}
                                <input  tabIndex={5}  style={{ marginLeft: "5px" }} type="file" onChange={handleChange} accept="image/*" id="fileControl"></input>
                            </Form.Item>
                            <Form.Item name={['product', 'description']}
                                rules={[
                                    {
                                        type: "string",
                                        required: true,
                                        max: 90,
                                    }
                                ]} label="Description" >
                                <Input.TextArea  tabIndex={6}  style={{ borderRadius: "6px", marginLeft: "5px", width: "80%" }} autoSize={{ minRows: 2, maxRows: 5 }} />
                            </Form.Item>
                        </div>


                    </div>
                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}> <Spin spinning={loading} indicator={antIcon} /></div>

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Form.Item>

                            <Button  tabIndex={6}  onClick={() => onReset()} style={{ marginRight: "15px", width: "5rem" }} size="middle">
                                Clear
                        </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button  tabIndex={7}  danger type="primary" onClick={() => handleBack()} style={{ marginRight: "15px", width: "5rem" }} size="middle" color="#d9f7be">
                                Back
                        </Button>
                        </Form.Item>
                        <Form.Item>
                            <Button  tabIndex={8}  type="primary" htmlType="submit" style={{ width: "5rem" }} size="middle" >
                                Submit
                        </Button>
                        </Form.Item>
                    </div>
                </Form>

            </div>
        </div>
        //     </div>
        // </div>
    )
}

export default FormProduct;
