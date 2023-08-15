import { Col, Row, Select, Table, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Rupiah, currentUser, ISOtoObj } from "../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faUser } from "@fortawesome/free-solid-svg-icons";

const GetInvoice = () => {

    const {token} = currentUser ? JSON.parse(currentUser) : null;
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [invoice, setInvoice] = useState([]);

    const fetchInvoice = async () => {
        try {
            const resp = await axios.get(`${BASE_URL}/api/invoice`, {
                headers: {
                    Authorization:`Bearer ${token}`
                }
            })
            // console.log(resp.data)
            setInvoice(resp.data);
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchInvoice();
    },[])

    const col = [
        {
            title: 'Order ID',
            key: 'orderid',
            render: (record) => <span>#{record.order_number}</span>,
            
        },
        {
            title: 'Total',
            key: 'total',
            render: (record) => <span>{Rupiah(record.total)}</span>
        },
        {
            title: 'Payment Status',
            key: 'payment_status',
            render: (record) => 
            <Tag 
                color={record.payment_status === 'paid' ? 'green' : 'red'}
            >
                {record.payment_status === 'paid' ? 'Paid' : 'Waiting For Payment'}
            </Tag>
        },
        {
            title: 'Order Status',
            key:'order_status',
            render: (record) => 
            <Tag
                color={record.order_status === 'waiting_for_payment' ? 'red' : 'orange'}
            >
                {record.order_status === 'waiting_for_payment' ? 'Waiting For Payment' : 'Processing'}
            </Tag>
        }
    ]

    const data = 
        invoice.map(items => ({
            key: items._id,
            order_number: items.order.order_number,
            order_id: items.order._id,
            order_date: items.createdAt,
            total: items.total,
            order_status: items.order.status,
            payment_status: items.payment_status,
            order: items.order.order_items.map(item => ({
                barang: item.name,
                jumlah: item.qty,
                total_hrg: item.price,
            })),
            delivery_address: `${items.delivery_address.detail}, ${items.delivery_address.kelurahan}, ${items.delivery_address.kecamatan},
                ${items.delivery_address.kabupaten}, ${items.delivery_address.provinsi}`,
            user: items.user.full_name,
            email: items.user.email,
        }))

        const expcol = [
            {
                title: 'Barang',
                dataIndex: 'barang',
                key: 'barang',
            },
            {
                title: 'Jumlah',
                dataIndex: 'jumlah',
                key: 'jumlah',
            },
            {
                title: 'Total Harga',
                key: 'total_harga',
                render: (record) => <span>{Rupiah(record.total_hrg)}</span>
            }
        ]

        const option = [
            {
                value: 'waiting_for_payment',
                label: 'Waiting For Payment',
            },
            {
                value: 'paid',
                label: 'Paid',
            }
        ]

        const handleChange = async (invoice_id, order_id, {value}) => {
            let order_status  = 'processing'
            if (value === 'waiting_for_payment'){
                order_status ='waiting_for_payment'
            }
            try {
                await axios.put(`${BASE_URL}/api/invoice/${invoice_id}`, {payment_status: value}, {
                    headers : {
                        Authorization:`Bearer ${token}`
                    }
                })
                await axios.put(`${BASE_URL}/api/orders/${order_id}`, {status: order_status}, {
                    headers : {
                        Authorization:`Bearer ${token}`
                    }
                })

                fetchInvoice()
            } catch (err) {
                console.log(err)
            }
        }
    
        const expandedRow = {
            expandedRowRender: (record) => (
                <div className="w-full">
                    <span className="text-lg font-bold justify-center flex my-4">Ringkasan Pesanan</span>
                    <span>Waktu Pemesanan : {ISOtoObj(record.order_date)}</span>
                    <Row className="mb-4">
                        <Col span={8} className="flex p-5">
                            <div>
                                <FontAwesomeIcon icon={faUser} className="bg-slate-300 text-lg p-4 rounded-full"/>
                            </div>
                            <div className="ml-4">
                                <span><b>Data Pemesan</b></span><br />
                                <span>{record.user}</span><br />
                                <span>{record.email}</span>
                            </div>
                        </Col>
                        <Col span={8} className="flex p-5">
                            <div>
                                <FontAwesomeIcon icon={faTruckFast} className="bg-slate-300 text-lg p-4 rounded-full"/>
                            </div>
                            <div className="ml-4">
                                <span><b>Alamat pengiriman</b></span><br />
                                <span>{record.delivery_address}</span>
                            </div>
                        </Col>
                        <Col span={8} className="flex p-5">
                            <div className="ml-4">
                                <span><b>Ubah Status Pembayaran</b></span><br />
                                <Select labelInValue options={option} onChange={(e) => handleChange(record.key, record.order_id, e)} defaultValue={record.payment_status === 'paid' ? 'Paid' : 'Waiting For Payment'} className="w-48"/>
                            </div>
                        </Col>
                    </Row>
                    <Table columns={expcol} dataSource={record.order} pagination={false} bordered/>
                </div>
            ),
            rowExpandable: (record) => record.order_number,
        }
    

    return (
        <div className="p-4 w-full">
            <Table columns={col} dataSource={data} expandable={expandedRow}/>
        </div>
    )
    
}

export default GetInvoice;