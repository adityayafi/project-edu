import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { Badge, Dropdown } from 'antd';
import { getCategories } from '../../api/product';
import {useDispatch, useSelector} from 'react-redux';
import { currentUser } from '../../utils';
import { logoutUser } from '../../api/auth';
import { setQuery } from '../../features/query/querySlice';


const AppHeader = () => {
    // const {user} = localStorage.getItem('auth')
    const pathname = window.location.pathname;
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const totalItem = useSelector((state) => state.cart.totalItem);

    const getCategory = async () => {
        try {
            const response = await getCategories();
            const result = response.data;
            setCategory(result)
        } catch (err) {
            console.log(err)
        }
    }

    const handleLogout = async () => {
        await logoutUser();
    }

    useEffect(() => {
        getCategory();
    },[])

    const [items] = useState(() => {
        if (!currentUser) {
            return [
                {
                    key: '1',
                    label: (
                    <Link className='w-40 flex' onClick={() => window.location.assign('/login')}>
                        Login
                    </Link>
                    ),
                },
                {
                    key: '2',
                    label: (
                    <Link className='w-40 flex' onClick={() => window.location.assign('/register')}>
                        Register
                    </Link>
                    ),
                }
            ]
        }
        return [
            {
                key: '1',
                label: (
                <a className='w-40 flex' href="account">
                    Profil
                </a>
                ),
            },
            {
                key: '2',
                label: (
                <a className='w-full flex' onClick={() => handleLogout()}>
                    Logout
                </a>
                ),
            }
        ]
    })

    const handleCategory = (e, value) => {
        e.preventDefault();
        dispatch(setQuery({ categories: value}));
    }

    const excludeNavMenu = ['/account', '/account/profile', '/account/order', '/account/address', '/login', '/register', '/cart', '/checkout', '/admin']

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="text-white text-xl">
                            <Link onClick={() => window.location.assign('/')}>Restaurant</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {
                            !excludeNavMenu.includes(pathname) &&
                                    category.map((cat, i) => {
                                        return <a href='' className="p-2 mx-2 text-slate-300 hover:text-white" onClick={(e) => handleCategory(e, cat.name)} key={i}>{cat.name}</a>
                                    })                                    
                        }
                        <div style={{borderLeft: '1px solid rgb(203 213 225)', height:'40px'}}></div>
                        <a className="p-2 mx-2 " href='/cart'>
                            <Badge size='small' count={totalItem}>
                                <FontAwesomeIcon icon={faCartShopping} className=' text-slate-300 hover:text-white'/>
                            </Badge>
                        </a>
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow
                            trigger={['click']}
                            >
                            <a className="p-2 ml-2 text-slate-300 hover:text-white"><FontAwesomeIcon icon={faUser}/></a>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AppHeader;