import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Tag, Space, Button, Image, Modal, Input, Form } from 'antd';
import { ClearOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FundViewOutlined, SearchOutlined } from '@ant-design/icons';
import '../ListProduct/ListProduct.css';
import { toast } from 'react-toastify';
import { ICategory } from '../../../interfaces'
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from 'app/redux/store';
import { retrieveCategories, clearState, deleteCategory } from '../../../actions/categories'
import { Dispatch } from "redux"
import { Link, useHistory } from 'react-router-dom';
import categoriesService from '../../../services/CategoriesService';
import "../../../pages/Admin/Admin.css";
import { handleError } from '../../../helper/helper';
import { ColumnsType } from 'antd/es/table';
import { RootState, AppDispatch } from '../../../store'

const defaultPosts: ICategory[] = [];



/**
 * ListCategory
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
const ListCategory: React.FC = () => {


  /*
  * Initial State For Component 
  */
  const [categories, setCategories]: [ICategory[], (category: ICategory[]) => void] = useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
  /*
  *  Get state from store
  */
  const Success = useSelector((state: RootState) => state.isSuccess)
  const Error = useSelector((state: RootState) => state.isError)
  const lsCategory = useSelector((state: RootState) => state.categories);
  /*
  * Initial Something For Component 
  */
  const { confirm } = Modal;
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();
  /*
  * Initial Function For Component 
  */
  const columns: ColumnsType<ICategory> = [
    {
      title: 'Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 100,
      ellipsis: true
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'id',
      render: (id: string) => (
        <Space size="middle">

          <Button type="primary" icon={<EditOutlined />} onClick={() => handleUpdateProduct(id)}>
            Update
                    </Button>
          <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => { return showDeleteConfirm(id) }} >Delete
                </Button>
        </Space>
      ),
      width: 100,
      align: "left"
    },

  ];
  /**
   * handleConfirmRecord
   * @param Error 
   */
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
        dispatch(retrieveCategories())
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /**
   * handleUpdateProduct
   * @param id 
   */
  const handleUpdateProduct = (id: string) => {
    categoriesService.get(id)
      .then(response => {
        history.push(`/admin/category/update/${id}`);
      })
      .catch(error => {
        const message = handleError(error)
        handleConfirmRecord(message)
      })
  }

  /**
   * showDeleteConfirm
   * @param id 
   */
  function showDeleteConfirm(id: string) {
    confirm({
      title: 'Are you sure delete this category?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      autoFocusButton: "cancel",
      cancelText: 'No',
      onOk() {
        console.log('OK');
        handleDeleteCategory(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const handleDeleteCategory = async (id: string) => {
    if (id) {
      await dispatch(deleteCategory(id))
      await dispatch(retrieveCategories())
    }
  }
  useEffect(() => {
    dispatch(retrieveCategories())
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (lsCategory) setCategories(lsCategory);
    if (Error) {
      handleConfirmRecord(Error)
      dispatch(clearState());
    }
    if (Success) {
      toast.success(Success);
      dispatch(clearState());
    }
  }, [lsCategory, Success, Error]);
  const onReset = () => {
    form.resetFields();
    dispatch(retrieveCategories())
  }

  const onFinish = async (values: any) => {
    const productName = values.inputSearch;
    // dispatch(findByName(productName));
  };

  const onFinishFailed = (errorInfo: any) => {
    toast.warning(errorInfo);
  };
  return (


    <div className="listProduct">
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
          <Link to="/admin/category/add">Add Category</Link>
        </Button>
      </div>
      <Table
        loading={loading}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 5,
          responsive: true,
          // showSizeChanger: true,
          // pageSizeOptions: ['5', '10', '20', '100']
        }}
        // scroll={{y:700}}
        title={() => 'List Category'}
        footer={() => ''}
        rowKey={(categories: any) => categories.id}
        columns={columns} dataSource={categories} >
      </Table>

    </div>

  )
}

ListCategory.propTypes = {

}

export default ListCategory
