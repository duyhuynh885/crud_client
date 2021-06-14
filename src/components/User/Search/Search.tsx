import React from 'react'
import PropTypes from 'prop-types'
import { AppDispatch } from '../../../store';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { findByName, retrieveProducts } from '../../../actions/products';
import { toast } from 'react-toastify';
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';

/**
 * Search
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
function Search() {
    /*
    * Initial Something For Component 
    */
    const dispatch: AppDispatch = useDispatch();
    const [form] = Form.useForm();

    /**
     * Search action if submit success
     * @param values contains update or create information
     */
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

    return (
        <div>
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
                    <Input placeholder="Search by Name" style={{ borderRadius: "6px", marginRight: "5px" }} />
                </Form.Item>

                <Form.Item  >
                    <Button onClick={() => onReset()} shape="circle" size="middle" icon={<ClearOutlined />} style={{ margin: "0 5px" }} />
                    <Button shape="circle" type="primary" htmlType="submit" size="middle" icon={<SearchOutlined />} />
                </Form.Item>
            </Form>
        </div>
    )
}

Search.propTypes = {

}

export default Search

