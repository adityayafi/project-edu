// import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartPlus, faClipboardList, faFileInvoice, faHome, faList, faLocationDot, faRightFromBracket, faTags, faUserGear} from '@fortawesome/free-solid-svg-icons'
import { Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../api/auth';
import { currentUser } from '../../utils';

const Account = () => {

    const {user} = currentUser ? JSON.parse(currentUser) : null;
    const navigate = useNavigate();

    function getItem(label, key, icon, children) {
        return {
          key,
          icon,
          label,
          children,
        };
    }

    const items = [
        getItem('Profil', '/account', <FontAwesomeIcon icon={faCartPlus} className="text-white"/>),
        getItem('Pemesanan', '/account/order', <FontAwesomeIcon icon={faClipboardList} className="text-white"/>),
        getItem('Alamat', '/account/address', <FontAwesomeIcon icon={faLocationDot} className="text-white"/>),
        getItem('Home', '/', <FontAwesomeIcon icon={faHome} className="text-white"/>),
        getItem('Log Out', 'logout', <FontAwesomeIcon icon={faRightFromBracket} className="text-white"/>),

    ];

    if (user.role === 'admin') {
        items.splice(4, 0, getItem('Menu Admin', 'sub1', <FontAwesomeIcon icon={faUserGear} className="text-white"/>, [
            getItem('Products', '/account/admin/products', <FontAwesomeIcon icon={faBoxOpen}/>),
            getItem('Categories', '/account/admin/categories', <FontAwesomeIcon icon={faList}/>),
            getItem('Tags', '/account/admin/tags', <FontAwesomeIcon icon={faTags}/>),
            getItem('Invoices', '/account/admin/invoice', <FontAwesomeIcon icon={faFileInvoice}/>),
          ])
        )
    }

    const onClick = ({key}) => {
        if (key === 'logout'){
            logoutUser()
        }else{
            navigate(key)
        }
      };

      console.log(window.location.pathname)

    return (
        <div className='flex'>
            <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            selectedKeys={window.location.pathname}
            defaultSelectedKeys={['/account']}
            defaultOpenKeys={['/account']}
            mode="inline"
            items={items}
            className='min-h-screen'
            />       
            <Outlet/>
        </div>
    )
}

export default Account;