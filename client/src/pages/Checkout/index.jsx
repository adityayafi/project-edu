import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, Card, Steps } from "antd";
import { useEffect, useState } from 'react';
import SlcAddress from './selectAddress';
import axios from 'axios';
import Confirm from './confirmOrder';
import { useDispatch, useSelector } from 'react-redux';
import { clearProd } from '../../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = JSON.parse(localStorage.getItem('auth'))
    const [current, setCurrent] = useState(0);
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [error, setError] = useState('');
    const subtotal = useSelector((state) => state.cart.totalPrice);
    const deliveryFee = 20000;

    const fetchAddress = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/delivery-addresses`,{
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const {data} = res.data;
            setAddress(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAddress()
    }, [token])

    const data = 
        address.map((data) => ({
            key: data._id,
            name: data.name,
            kel: data.kelurahan,
            kec: data.kecamatan,
            kab: data.kabupaten,
            prov: data.provinsi,
            det: data.detail,
        }))
    
    const columns = [
        {
            title: 'Nama',
            dataIndex: "name",
            render: (text, record) => <span>{record.name}</span>
        },
        {
            title: 'Detail Alamat',
            key: 'detail',
            render: (text, record) => <span>{record.det+', '+record.kel+', '+record.kec+', '+record.kab+', '+record.prov}</span> 
        }
    ]

    const rowSelection = {
        type:'radio',
        selectedRow: selectedAddress,
        onSelect: (record) => {
            setSelectedAddress(record)
        },
        
    }

    console.log(selectedAddress)
    const items = [
        {
            title: 'Pilih Alamat Pengiriman',
            content: <SlcAddress col={columns} data={data} select={rowSelection}/>,
            icon: <FontAwesomeIcon icon={faLocationDot} />,
        },
        {
            title: 'Konfirmasi Pesanan',
            content: <Confirm data={selectedAddress} subtotal={subtotal} deliveryFee={deliveryFee}/>,
            icon: <FontAwesomeIcon icon={faClipboardList} />,
        },
    ]

    const next = () => {
        if (selectedAddress){
            setCurrent(current + 1);
            setError('')
        }else{
            setError('Silahkan Pilih Alamat Pengiriman Terlebih Dahulu !');
        }
    }

    const prev = () => {
        setCurrent(current - 1);
        setSelectedAddress('');
    }

    // const handleCheckout = () => {
    //     navigate('/invoices/' + res.data._id)
    // }

    const handleCheckout = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
                delivery_fee: deliveryFee,
                delivery_address: address
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (res.data.error !== 1){
                localStorage.removeItem('cart');
                dispatch(clearProd());
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/carts`, {items: []});
                console.log(res.data)
                navigate(`/inovices/${res.data._id}`);
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 block justify-center">
            {error.length > 0 && 
            <Alert message={error} type='error' className='mt-8'/>}
            <Card title="Checkout" className="mt-8" size="small">
                <Steps items={items} current={current} className='w-3/4 my-4 mx-auto'/>
                <div>{items[current].content}</div>
            </Card>
            {current < items.length -1 && (
                <Button type="primary" htmlType='' className='my-4 float-right' onClick={() => next()}>Selanjutnya</Button>
            )}

            {current === items.length -1 && (
                <div>
                    <Button htmlType='' className='mt-4 float-left' onClick={() => prev()}>Kembali</Button>
                    <Button type="primary" htmlType='' className='my-4 float-right' onClick={() => handleCheckout()}>Bayar</Button>
                </div>
            )}
        </div>
    )
}

export default Checkout;