import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './HeaderAdmin.css'
import { Affix, Badge, Button, Dropdown, Menu } from 'antd'
import { BellOutlined, LogoutOutlined, MailOutlined, NotificationOutlined, SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import Avatar from 'antd/lib/avatar/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../actions/auth'
import { isAuth, signout } from '../../../helper/auth'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'
import { AppDispatch } from '../../../store'


/**
 * HeaderAdmin
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
const HeaderAdmin: React.FC = () => {
  /*
  * Initial State For Component 
  */
  const userAdmin: any = isAuth();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory()

  /*
  * Initial Function For Component 
  */
  const logOut = () => {
    signout(() => {
      history.push("/login");
      window.location.reload();
      toast.success("Sign out Successfully");
    });
    dispatch(logout());
  };
  const menu = (

    <Menu>
      <Menu.Item>
        <Button
          type="link"
          onClick={() => history.push("/admin/profile")}
          icon={<UserOutlined />}
          style={{ color: "black" }}
        >Profiles
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="link"
          icon={<LogoutOutlined />}
          style={{ color: "black" }}
          onClick={logOut}
        >Log out
        </Button>
      </Menu.Item>
    </Menu>
  );


  const notification = (
    <Menu>
      <Menu.Item icon={<MailOutlined />}>
        <a tabIndex={-1} target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st notification item
        </a>
      </Menu.Item>
      <Menu.Item icon={<MailOutlined />}>
        <a tabIndex={-1} target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd notification item
        </a>
      </Menu.Item>
      <Menu.Item icon={<MailOutlined />}>
        <a tabIndex={-1} target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd notification item
        </a>
      </Menu.Item>
    </Menu>
  );
  return (
    <Affix offsetTop={0}>


      <div className="headerAdmin">
        <Dropdown  className="headerAdmin__notification" overlay={notification} placement="bottomRight" arrow>
          <Badge  size="default" count={0} dot >
            <BellOutlined />
          </Badge>
        </Dropdown>

        <Dropdown overlayClassName="headerAdmin__dropdown" overlay={menu} placement="bottomLeft" arrow>
          <Avatar src="https://cdn.dribbble.com/users/146798/screenshots/5811891/dribbble.png" />
        </Dropdown>
        <div className="headerAdmin__info">
          <span>{userAdmin.username}</span>
          <span>{userAdmin.roles[0]}</span>
        </div>
      </div>
    </Affix>
  )
}

HeaderAdmin.propTypes = {

}

export default HeaderAdmin

