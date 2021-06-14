import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Tag, Space, Button, Image, Modal, Input, Form } from 'antd';
import { ClearOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FundViewOutlined, SearchOutlined } from '@ant-design/icons';
import '../ListProduct/ListProduct.css';
import { toast } from 'react-toastify';
import {  IProduct, IStock } from '../../../interfaces'
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from 'app/redux/store';
import { retrieveStocks, clearState, deleteStock } from '../../../actions/stock'
import { Dispatch } from "redux"
import { Link, useHistory } from 'react-router-dom';
import StockService from '../../../services/StockService';
import "../../../pages/Admin/Admin.css";
import { handleError } from '../../../helper/helper';
import { ColumnsType } from 'antd/es/table';
import { RootState, AppDispatch } from '../../../store'

const defaultPosts: IStock[] = [];

/**
 * ListStock
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
const ListStock: React.FC = () => {


  /*
  * Initial State For Component 
  */
  const [stocks, setStocks]: [IStock[], (category: IStock[]) => void] = useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
  /*
  *  Get state from store
  */
  const Success = useSelector((state: RootState) => state.isSuccess)
  const Error = useSelector((state: RootState) => state.isError)
  const lsStock = useSelector((state: RootState) => state.stocks);
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
  console.log(lsStock);
  
  const columns: ColumnsType<IStock> = [
    {
      title: 'Name',
      dataIndex: 'products',
      key: 'products',
      width: 50,
      ellipsis: true,
      render: (products:IProduct) =>  products?.productName
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
      width: 80,
      align: "right",
      ellipsis: true,
      render: (weight:any) =>  `${weight} (kg)`
    },
    {
      title: 'Stock Number',
      dataIndex: 'stockNumber',
      key: 'stockNumber',
      width: 80,
      align: "right",
      render: (stockNumber:any) =>  `${stockNumber} (pcs)`,
      ellipsis: true
    },
    {
      title: 'Saled Quanlity',
      dataIndex: 'saledQuanlity',
      key: 'saledQuanlity',
      width: 80,
      align: "right",
      render: (saledQuanlity:any) =>  `${saledQuanlity} (pcs)`,
      ellipsis: true
    },
    {
      title: 'Made In',
      dataIndex: 'madeIn',
      key: 'madeIn',
      width: 50,
      ellipsis: true,
      render: (madeIn:any) =>  !madeIn ? "BLANK" : madeIn
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
        dispatch(retrieveStocks())
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
    StockService.get(id)
      .then(response => {
        history.push(`/admin/stock/update/${id}`);
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
  /**
   * handleDeleteCategory
   * @param id 
   */
  const handleDeleteCategory = async (id: string) => {
    if (id) {
      await dispatch(deleteStock(id))
      await dispatch(retrieveStocks())
    }
  }
  /**
   * retrieveStocks
   */
  useEffect(() => {
    dispatch(retrieveStocks())
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (lsStock) setStocks(lsStock);
    if (Error) {
      handleConfirmRecord(Error)
      dispatch(clearState());
    }
    if (Success) {
      toast.success(Success);
      dispatch(clearState());
    }
  }, [lsStock, Success, Error]);
  const onReset = () => {
    form.resetFields();
    dispatch(retrieveStocks())
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
        title={() => 'List Stock'}
        footer={() => ''}
        rowKey={(lsStock: any) => lsStock.id}
        columns={columns} dataSource={stocks} >
      </Table>

    </div>

  )
}

ListStock.propTypes = {

}

export default ListStock
