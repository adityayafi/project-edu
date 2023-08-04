import { Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Rupiah } from "../../utils";
import { useNavigate } from "react-router-dom";

const Order = () => {

    const navigate = useNavigate();
    const {token} = JSON.parse(localStorage.getItem('auth'));
    const [data, setData] = useState([]);

    const fetchOrderData = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/invoice`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(res.data)
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleInvoice = (id) => {
        navigate(`/invoices/${id}`)
    }

    useEffect(() => {
        fetchOrderData()
    }, [])

    const col = [
        {
            title: 'Order ID',
            key: 'orderid',
            render: (record) => <span>#{record.order_number}</span>
        },
        {
            title: 'Total',
            key: 'total',
            render: (record) => <span>{Rupiah(record.total)}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Invoice',
            key: 'invoice',
            render: (record) => <Button type="primary" htmlType="" onClick={() => handleInvoice(record.order_id)}>Invoice</Button>,
        }
    ]

    const orderData = 
        data.map(items => ({
            key: items._id,
            order_number: items.order.order_number,
            order_id: items.order._id,
            total: items.total,
            status: items.order.status,
            order: items.order.order_items.map(item => ({
                barang: item.name,
                jumlah: item.qty,
                total_hrg: item.price,
            })),
        }))

    const expcol = [
        {
            title: 'Barang',
            dataIndex: 'barang',
            key: 'barang',
            // render: (record) => <span>{record.order.barang}</span>
        },
        {
            title: 'Jumlah',
            dataIndex: 'jumlah',
            key: 'jumlah',
        },
        {
            title: 'Total Harga',
            // dataIndex: 'total_hrg',
            key: 'total_harga',
            render: (record) => <span>{Rupiah(record.total_hrg)}</span>
        }
    ]

    const expandedRow = {
        expandedRowRender: (record) => (
            <Table columns={expcol} dataSource={record.order} pagination={false}/>
            // console.log(record.order)
        ),
        rowExpandable: (record) => record.order_number,
    }

    return (
        <div className="p-4 w-full">
            <Table columns={col} dataSource={orderData} expandable={expandedRow}/>
        </div>
    )
}

export default Order;