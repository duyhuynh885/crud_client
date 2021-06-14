import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Table, Tag, Space, Button, Modal, Input, Form, Tooltip } from 'antd';
import { ClearOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, FundViewOutlined, SearchOutlined } from '@ant-design/icons';
import '../ListProduct/ListProduct.css';
import { toast } from 'react-toastify';
import { IUser } from '../../../interfaces'
import { useDispatch, useSelector } from "react-redux";
import { retrieveUsers, clearState, deleteUser } from '../../../actions/users'
import { useHistory } from 'react-router-dom';
import UserService from '../../../services/UserService';
import "../../../pages/Admin/Admin.css";
import { isAuth } from '../../../helper/auth';
import ViewUser from '../../../components/Admin/ViewUser/ViewUser';
import { handleError } from '../../../helper/helper';
import { ColumnsType } from 'antd/es/table';
import { AppDispatch, RootState } from '../../../store';


const defaultPosts: IUser[] = [];
const handleViewRoles = (roles: Array<any>) => {
  switch (roles[0].name) {
    case "ROLE_ADMIN":
      return <Tag>ADMIN</Tag>
      break;
    case "ROLE_USER":
      return <Tag>USER</Tag>
      break;
    case "ROLE_MODERATOR":
      return <Tag>MOD</Tag>
      break;
  }
}



const ListCategory: React.FC = () => {

  /*
  * Initial State For Component 
  */
  const [users, setUsers]: [IUser[], (category: IUser[]) => void] = useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [viewUser, setViewUser] = useState<IUser | any>();
  /*
  *  Get state from store
  */
  const Success = useSelector((state: RootState) => state.isSuccess);
  const Error = useSelector((state: RootState) => state.isError);
  const lsUser = useSelector((state: RootState) => state.users);

  /*
  * Initial Something For Component 
  */
  const dispatch: AppDispatch = useDispatch();
  const [form] = Form.useForm();
  const userAdmin: any = isAuth();
  const history = useHistory();
  const { confirm } = Modal;
  /*
  * Initial Function For Component 
  */
  const showModal = async (id: string) => {
    if (id) {
      const result = await users.find((item: IUser) => item.id === id)
      await setViewUser(result);
      await setIsModalVisible(true)
    }
  };

  const columns: ColumnsType<IUser> = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 100,
      ellipsis: true,
      sorter: (a: any, b: any) => a.username.localeCompare(b.username),
      render: (value: string, record: IUser) => (
        <Tooltip placement="topLeft" title="Click to view User">
          <a style={{ cursor: "pointer", color: "black" }} onClick={() => showModal(record.id)} >{value}</a>
        </Tooltip>
      )
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
      ellipsis: true,
      sorter: (a: any, b: any) => a.email.localeCompare(b.email)
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      width: 100,
      ellipsis: true,
      render: (roles: Array<any>) => handleViewRoles(roles)
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'id',
      render: (id: string) => (
        <Space size="middle">
          <Button type="primary" icon={<FundViewOutlined />} onClick={() => showModal(id)} style={{ backgroundColor: "#73d13d", border: "#73d13d" }}>View
        </Button>
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

  const handleUpdateProduct = (id: string) => {
    UserService.get(id)
      .then(response => {
        history.push(`/admin/user/update/${id}`);
      })
      .catch(error => {
        const message = handleError(error)
        handleConfirmRecord(message)
      })
  }

  function showDeleteConfirm(id: string) {
    confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes',
      autoFocusButton: "cancel",
      okType: 'danger',
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
      await dispatch(deleteUser(id))
    }
  }
  useEffect(() => {
    dispatch(retrieveUsers())
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (lsUser) {
      const newLsUser = lsUser.filter((item: any) => item.id != userAdmin.id)
      setUsers(newLsUser)
    };
    if (Error) {
      handleConfirmRecord(Error);
      dispatch(clearState());
    }
    if (Success) {
      toast.success(Success);
      dispatch(clearState());
    }
  }, [lsUser, Success, Error]);
  const onReset = () => {
    form.resetFields();
    dispatch(retrieveUsers())
  }

  const onFinish = async (values: any) => {
    const productName = values.inputSearch;
    // dispatch(findByName(productName));
  };

  const onFinishFailed = (errorInfo: any) => {
    toast.warning(errorInfo);
  };
  //handle model 
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //--------------
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
        dispatch(retrieveUsers())
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (
    <div className="listProduct">
      <Modal
        centered
        visible={isModalVisible}
        closable={false}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        <ViewUser viewUser={viewUser} />
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
        title={() => 'List User'}
        footer={() => ''}
        rowKey={(users: any) => users.id}
        columns={columns} dataSource={users} >
      </Table>

    </div>

  )
}

ListCategory.propTypes = {

}

export default ListCategory
