import { useEffect, useState } from "react";
import { getProduct } from "../../../api/product";
import { Button, Table } from "antd";
import { Rupiah, currentUser } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const GetProduct = () => {

    const {token} = currentUser ? JSON.parse(currentUser) : null
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);

    const fetchProducts = async () => {
        try {
            const res = await getProduct(`skip=${(currentPage - 1) * 5}&limit=${5}`)
            setProducts(res.data.data);
            setTotalPage(res.data.count);
            if (res.data.count <= 5 ){
                setcurrentPage(1)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchProducts();
    },[currentPage])

    const handleDeleteProduct = async (id) => {
        // console.log(id)
        await axios.delete(`${BASE_URL}/api/products/${id}`, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        fetchProducts();
    }

    const handleUpdateProduct = (id) => {
        navigate(`/account/admin/products/update/${id}`)
    }

    const col = [
        {
            title: 'Gambar',
            key: 'pict',
            render: (record) => <img src={`${import.meta.env.VITE_BACKEND_URL}/public/${record.image_url}`} className="w-32 h-32 mx-auto"/>,
            align: 'center',            
        },
        {
            title: 'Nama',
            key: 'name',
            dataIndex: 'name',
            align: 'center',
        },
        {
            title: 'Price',
            key: 'price',
            render: (record) => <span>{Rupiah(record.price)}</span>,
            align: 'center',
        },
        {
            title: 'Actions',
            key: 'actions',
            render:(record)=> (
                <div>
                    <Button type="primary" htmlType="" className="mx-2" onClick={() => handleUpdateProduct(record._id)}>Update</Button>
                    <Button type="primary" htmlType="" className="mx-2" danger onClick={() => handleDeleteProduct(record._id)}>Delete</Button>
                </div>
            ),
            align: 'center',
        }
    ]
    // console.log(currentPage)
    

    return (
        <div className="px-4 py-3 w-screen">
            <Link to={'/account/admin/products/add'}>
                <Button className="mb-8" type="primary" htmlType="">Tambah Produk</Button>
            </Link>
            <Table columns={col} dataSource={products} pagination={{current: currentPage, defaultPageSize: 5, total: totalPage, onChange: (page) => {setcurrentPage(page); console.log(currentPage)}}}/>
        </div>
    )
}

export default GetProduct;