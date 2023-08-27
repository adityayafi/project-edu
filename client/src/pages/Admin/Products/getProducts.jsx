import { useEffect, useState } from "react";
import { getProduct } from "../../../api/product";
import { Button, Col, Input, Popconfirm, Row, Table, message } from "antd";
import { Rupiah, currentUser } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../../features/query/querySlice";
import ConfirmButton from "../../../components/ConfirmButton";

const GetProduct = () => {

    const {token} = currentUser ? JSON.parse(currentUser) : null
    const query = useSelector(state => state.query)
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setcurrentPage] = useState(1);

    const fetchProducts = async () => {
        try {
            const res = await getProduct(`q=${query.q}&skip=${(currentPage - 1) * 5}&limit=${5}`)
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
    },[currentPage, query])

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
                    <ConfirmButton 
                        title='Update Product'
                        desc='Are you sure want to update this data'
                        onCancel={() => message.error('Update data cancelled')}
                        onConfirm={() => handleUpdateProduct(record._id)}
                        buttonClass='mx-2'
                        buttonTitle='Update'                        
                    />
                    <ConfirmButton 
                        title='Delete Product'
                        description='Are you sure want to delete this data?'
                        onCancel={() => message.error('Delete data cancelled')}
                        onConfirm={() => handleDeleteProduct(record._id)}
                        buttonClass='mx-2'
                        buttonTitle='Delete'
                        danger={true}
                    />
                </div>
            ),
            align: 'center',
        }
    ]
    

    return (
        <div className="px-4 py-3 w-screen">
            <Row>
                <Col span={12}>
                    <Link to={'/account/admin/products/add'}>
                        <Button className="mb-8" type="primary" htmlType="">Tambah Produk</Button>
                    </Link>
                </Col>
                <Col span={12}>
                    <Input placeholder="Search product here..." className="border border-slate-400" onChange={(e) => dispatch(setQuery({q:e.target.value}))}/>                  
                </Col>
            </Row>
            <Table columns={col} dataSource={products} pagination={{current: currentPage, defaultPageSize: 5, total: totalPage, onChange: (page) => {setcurrentPage(page); console.log(currentPage)}}}/>
        </div>
    )
}

export default GetProduct;