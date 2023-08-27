import { Button, Card, Col, Form, Input, Row, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { currentUser } from "../../../utils";
import ConfirmButton from "../../../components/ConfirmButton";

const GetCategories = () => {

    const {token} = currentUser ? JSON.parse(currentUser) : null
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const [form] = Form.useForm();
    const [myForm] = Form.useForm();

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
        form.setFieldsValue({cat: ''})
    }

    const handleDeleteCat = async (id) => {
        const resp = await axios.delete(`${BASE_URL}/api/categories/${id}`, {
            headers:{'Authorization': `Bearer ${token}`}
        })

        console.log(resp);
        fetchCatData();
    }

    const handleUpdateCat = async () => {

        let body = {
            name: catUpdate
        }

        const resp = await axios.put(`${BASE_URL}/api/categories/${toUpdate._id}`, body, {
            headers:{'Authorization': `Bearer ${token}`}
        })

        console.log(resp);
        fetchCatData();
        setCatUpdate('');
        setToUpdate({})
        setIsUpdate(false);
        myForm.setFieldsValue({UpdateCat: ''})
        message.success('Category updated successfully')
    }
    // console.log(toUpdate)

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
                    <ConfirmButton 
                        title='Delete Category'
                        description='Are you sure want to delete this category?'
                        onCancel={() => message.error('Delete category cancelled')}
                        onConfirm={() => handleDeleteCat(record._id)}
                        danger={true}
                        buttonClass='mx-2'
                        buttonTitle='Delete'                      
                    />                    
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
                    <Form form={form} layout="vertical">
                        <Form.Item label='Nama Kategori' name='cat' rules={[{required: true, message: 'Please input category name !'}]}>
                            <Input type="text" onChange={(e) => setCatData(e.target.value)}/>
                        </Form.Item>
                        <ConfirmButton 
                            title='Add new category'
                            description='Are you sure the data is correct?'
                            onCancel={() => message.error('Adding new category cancelled')}
                            onConfirm={handleNewCat}
                            buttonClass='mt-6'
                            buttonTitle='Simpan'                            
                        />
                    </Form>
                </Card>
                <Card title='Update Categories' size="small" className="mt-4">
                    <Form layout="vertical" form={myForm} initialValues={{UpdateCat: toUpdate.name}} key={{toUpdate}}>
                        <Form.Item label='Nama Kategori' name='UpdateCat' rules={[{required: true, message: 'Please input category name !'}]}>
                            <Input type="text" disabled={!isUpdate} onChange={(e) => setCatUpdate(e.target.value)}/>
                        </Form.Item>
                        <ConfirmButton 
                            title='Update category'
                            description='Are you sure the data is correct?'
                            onCancel={() => message.error('Updating category cancelled')}
                            onConfirm={handleUpdateCat}
                            disabled={!isUpdate}
                            buttonTitle='Simpan'

                        />
                        <Button type="primary" htmlType="" className="ml-2 mt-6" disabled={!isUpdate} onClick={() => {setIsUpdate(false); setToUpdate({})}} danger>Batal</Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    </div>
    )
}

export default GetCategories;