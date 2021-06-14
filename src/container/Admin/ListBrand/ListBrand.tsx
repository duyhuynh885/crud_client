import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Button, Modal, Input, Form } from 'antd';
import { ClearOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import '../ListProduct/ListProduct.css';
import { toast } from 'react-toastify';
import { IBrand } from '../../../interfaces'
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from 'app/redux/store';
import { retrieveBrands, clearState, deleteBrand } from '../../../actions/brand'
import { Link, useHistory } from 'react-router-dom';
import brandService from '../../../services/BrandService';
import "../../../pages/Admin/Admin.css";
import { handleError } from '../../../helper/helper';
import { ColumnsType } from 'antd/es/table';
import { RootState, AppDispatch } from '../../../store'

/**
 * ListProduct
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
const defaultPosts: IBrand[] = [];
const ListBrand: React.FC = () => {
  /*
  * Initial State For Component 
  */
  const [brands, setBrands]: [IBrand[], (category: IBrand[]) => void] = useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
  /*
  *  Get state from store
  */
  const Success = useSelector((state: RootState) => state.isSuccess)
  const Error = useSelector((state: RootState) => state.isError)
  const lsBrands = useSelector((state: RootState) => state.brands);
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
  const columns: ColumnsType<IBrand> = [
    {
      title: 'Name',
      dataIndex: 'brandName',
      key: 'brandName',
      width: 100,
      ellipsis: true
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'id',
      render: (id: string) => (
        <Space size="middle">

          <Button type="primary" icon={<EditOutlined />} onClick={() => handleUpdateBrands(id)}>
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
  const handleConfirmRecord = (Error: string) => {
    confirm({
      title: Error,
      content: "Do you want to reload page",
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      autoFocusButton:"cancel",
      cancelText: 'No',
      onOk() {
        dispatch(retrieveBrands())
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const handleUpdateBrands = (id: string) => {
    brandService.get(id)
      .then(response => {
        history.push(`/admin/brand/update/${id}`);
      })
      .catch(error => {
        const message = handleError(error)
        handleConfirmRecord(message)
      })
  }

  function showDeleteConfirm(id: string) {
    confirm({
      title: 'Are you sure delete this brand?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      okType: 'danger',
      autoFocusButton:"cancel",
      cancelText: 'No',
      onOk() {
        console.log('OK');
        handleDeleteBrand(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const handleDeleteBrand = async (id: string) => {
    if (id) {
      await dispatch(deleteBrand(id))
      await dispatch(retrieveBrands())
    }
  }
  useEffect(() => {
    dispatch(retrieveBrands())
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (lsBrands) setBrands(lsBrands);
    if (Error) {
      handleConfirmRecord(Error)
      dispatch(clearState());
    }
    if (Success) {
      toast.success(Success);
      dispatch(clearState());
    }
  }, [lsBrands, Success, Error]);
  const onReset = () => {
    form.resetFields();
    dispatch(retrieveBrands())
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
          <Link to="/admin/brand/add">Add Category</Link>
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
        title={() => 'List Brand'}
        footer={() => ''}
        rowKey={(categories: any) => categories.id}
        columns={columns} dataSource={brands} >
      </Table>

    </div>

  )
}

ListBrand.propTypes = {

}

export default ListBrand
