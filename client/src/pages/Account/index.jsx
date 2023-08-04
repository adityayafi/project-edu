// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faClipboardList, faHome, faLocationDot, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/auth';

const Account = () => {

    const navigate = useNavigate();

    function getItem(label, key, icon) {
        return {
          key,
          icon,
          label,
        };
    }

    const items = [
        getItem('Profil', 'profile', <FontAwesomeIcon icon={faCartPlus} className="text-white"/>),
        getItem('Pemesanan', 'order', <FontAwesomeIcon icon={faClipboardList} className="text-white"/>),
        getItem('Alamat', 'address', <FontAwesomeIcon icon={faLocationDot} className="text-white"/>),
        getItem('Home', '/', <FontAwesomeIcon icon={faHome} className="text-white"/>),
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