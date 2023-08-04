import { Link } from "react-router-dom";
import AddAddress from "../addAddress";
import { Button, Table } from "antd";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import axios from "axios";
import TableAddress from "./tableAddress";

const Address = () => {

    const {token} = JSON.parse(localStorage.getItem('auth'))
    const [address, setAddress] = useState([]);

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

    const columns = [
        {
            title: 'Nama',
            dataIndex: "name",
            key: "name",
        },
        {
            title: 'Detail Alamat',
            key: 'detail',
            render: (text, record) => <span>{record.detail+', '+record.kelurahan+', '+record.kecamatan+', '+record.kabupaten+', '+record.provinsi}</span> 
        }
    ]


    return (
        <div className="px-4 py-3 w-screen">
            <Link to={'/account/add'}>
                <Button type="primary" danger>Tambah Alamat</Button>
            </Link>

            <TableAddress col={columns} data={address}/>
        </div>
    )
}

export default Address;