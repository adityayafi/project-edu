// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faClipboardList, faLocationDot, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { Link, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Profile from '../../components/profile';
import Order from '../../components/order';
import { logoutUser } from '../../api/auth';

const Account = () => {

    const navigate = useNavigate();

    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
    }

    const items = [
        getItem('Profil', 'profile', <FontAwesomeIcon icon={faCartPlus} className="text-white"/>),
        getItem('Pemesanan', 'order', <FontAwesomeIcon icon={faClipboardList} className="text-white"/>),
        getItem('Alamat', 'address', <FontAwesomeIcon icon={faLocationDot} className="text-white"/>),
        getItem('Home', '/', <FontAwesomeIcon icon={faRightFromBracket} className="text-white"/>),
        getItem('Log Out', 'logout', <FontAwesomeIcon icon={faRightFromBracket} className="text-white"/>),

    ];

    const onClick = ({key}) => {
        if (key === 'logout'){
            logoutUser()
        }else{
            navigate(key)
        }
      };

    return (
        <div className='flex'>
            <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            defaultSelectedKeys={['profile']}
            defaultOpenKeys={['profile']}
            mode="inline"
            items={items}
            className='min-h-screen'
            />       
            <Outlet/>
        </div>
    )
}

export default Account;