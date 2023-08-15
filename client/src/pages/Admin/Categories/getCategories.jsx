import { Button, Card, Col, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { currentUser } from "../../../utils";

const GetCategories = () => {

    const {token} = currentUser ? JSON.parse(currentUser) : null
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [categories, setCategories] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [toUpdate, setToUpdate] = useState({})
    const [catData, setCatData] = useState('');
    const [catUpdate, setCatUpdate] = useState('');

    const fetchCatData = async () => {
        const resp = await axios.get(`${BASE_URL}/api/categories`)
        setCategories(resp.data)
    }

    const handleToUpdate = (data) => {
        setIsUpdate(true);
        console.log(data);

        setToUpdate(data)
    }

    const handleNewCat = async (e) => {
        e.preventDefault()
        let body = {
            name: catData
        }
        const resp = await axios.post(`${BASE_URL}/api/categories`, body, {
            headers:{'Authorization': `Bearer ${token}`}
        })
        fetchCatData();
        setCatData('');
        e.target.reset();
    }

    const handleDeleteCat = async (id) => {
        const resp = await axios.delete(`${BASE_URL}/api/categories/${id}`, {
            headers:{'Authorization': `Bearer ${token}`}
        })

        console.log(resp);
        fetchCatData();
    }

    const handleUpdateCat = async (id, e) => {
        e.preventDefault()
        let body = {
            name: catUpdate
        }

        const resp = await axios.put(`${BASE_URL}/api/categories/${id}`, body, {
            headers:{'Authorization': `Bearer ${token}`}
        })

        console.log(resp);
        fetchCatData();
        setCatUpdate('');
        setToUpdate({})
        e.target.reset();
    }
    console.log(toUpdate)

    const col = [
        {
            title: 'Nama Kategori',
            dataIndex:'name',
            key:"name",
        },
        {
            title: 'Actions',
            key: 'actions',
            render:(record)=> (
                <div>
                    <Button type="primary" htmlType="" className="mx-2" onClick={() => handleToUpdate(record)}>Update</Button>
                    <Button type="primary" htmlType="" className="mx-2" danger onClick={() => handleDeleteCat(record._id)}>Delete</Button>
                </div>
            ),
            align: 'center',
        }
    ]

    useEffect(() => {
        fetchCatData();
    },[])

    
    return (
        <div className="px-4 py-3 w-screen">
        <Row>
            <Col span={12} className="pr-1">
                <Table columns={col} dataSource={categories} />     
            </Col>
            <Col span={12} className="pl-1">
                <Card title='Add Categories' size="small">
                    <form onSubmit={e => handleNewCat(e)}>
                        <label htmlFor="cat">Nama Kategori</label>
                        <input 
                        type="text" 
                        name="cat" 
                        className="border border-slate-300 rounded flex h-8 w-full mt-2 p-3"
                        onChange={(e) => setCatData(e.target.value)}
                        />
                        <Button type="primary" htmlType="submit" className="mt-6 bg-[#1677ff]">Simpan</Button>
                    </form>
                </Card>
                <Card title='Update Categories' size="small" className="mt-4">
                    <form onSubmit={(e) => handleUpdateCat(toUpdate._id, e)}>
                        <label htmlFor="cat">Nama Kategori</label>
                        <input 
                        type="text" 
                        name="cat" 
                        defaultValue={toUpdate.name} 
                        className="border border-slate-300 rounded flex h-8 w-full mt-2 p-3" 
                        disabled={!isUpdate}
                        onChange={(e) => setCatUpdate(e.target.value)}
                        />
                        <Button type="primary" htmlType="submit" className="bg-[#1677ff]" disabled={!isUpdate} >Simpan</Button>
                        <Button type="primary" htmlType="" className="ml-2 mt-6" disabled={!isUpdate} onClick={() => {setIsUpdate(false); setToUpdate({})}} danger>Batal</Button>
                    </form>
                </Card>
            </Col>
        </Row>
    </div>
    )
}

export default GetCategories;