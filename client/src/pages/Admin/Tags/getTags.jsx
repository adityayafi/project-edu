import { Button, Card, Col, Row, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { currentUser } from "../../../utils";

const GetTags = () => {

    const {token} = currentUser ? JSON.parse(currentUser) : null;
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [tags, setTags] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [toUpdate, setToUpdate] = useState({})
    const [tagData, setTagData] = useState('');
    const [tagUpdate, setTagUpdate] = useState('');

    const fetchTagData = async () => {
        const resp = await axios.get(`${BASE_URL}/api/tags`)
        setTags(resp.data)
    }

    const handleToUpdate = (data) => {
        setIsUpdate(true);
        setToUpdate(data)
    }

    const handleNewTag = async (e) => {
        e.preventDefault()
        let body = {
            name: tagData,
        }
        const resp = await axios.post(`${BASE_URL}/api/tags`, body, {
            headers:{'Authorization': `Bearer ${token}`}
        })
        fetchTagData();
        setTagData('');
        e.target.reset();
    }

    const handleDeleteTag = async (id) => {
        const resp = await axios.delete(`${BASE_URL}/api/tags/${id}`, {
            headers:{'Authorization': `Bearer ${token}`}
        })
        fetchTagData();
    }

    const handleUpdateTag = async (id, e) => {
        e.preventDefault();

        let body = {
            name: tagUpdate,
        }

        const resp = await axios.put(`${BASE_URL}/api/tags/${id}`, body, {
            headers:{'Authorization': `Bearer ${token}`}
        })

        console.log(resp);
        fetchTagData();
        setTagUpdate('');
        setToUpdate([])
        e.target.reset();
    }

    useEffect(() => {
        fetchTagData();
    },[])
    

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
                    <Button type="primary" htmlType="" className="mx-2" danger onClick={() => handleDeleteTag(record._id)}>Delete</Button>
                </div>
            ),
            align: 'center',
        }
    ]

    return (
    <div className="px-4 py-3 w-screen">
        <Row>
            <Col span={12} className="pr-1">
                <Table columns={col} dataSource={tags} />     
            </Col>
            <Col span={12} className="pl-1">
                <Card title='Add Categories' size="small">
                    <form onSubmit={e => handleNewTag(e)}>
                        <label htmlFor="cat">Nama Tag</label>
                        <input 
                        type="text" 
                        name="cat" 
                        className="border border-slate-300 rounded flex h-8 w-full mt-2 p-3"
                        onChange={(e) => setTagData(e.target.value)}
                        />
                        <Button type="primary" htmlType="submit" className="mt-6 bg-[#1677ff]">Simpan</Button>
                    </form>
                </Card>
                <Card title='Update Categories' size="small" className="mt-4">
                    <form onSubmit={(e) => handleUpdateTag(toUpdate._id, e)}>
                        <label htmlFor="cat">Nama Tag</label>
                        <input 
                        type="text" 
                        name="cat" 
                        defaultValue={toUpdate.name} 
                        className="border border-slate-300 rounded flex h-8 w-full mt-2 p-3" 
                        disabled={!isUpdate}
                        onChange={(e) => setTagUpdate(e.target.value)}
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

export default GetTags;