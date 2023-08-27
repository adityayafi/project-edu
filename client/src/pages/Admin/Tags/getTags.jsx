import { Button, Card, Col, Form, Input, Row, Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { currentUser } from "../../../utils";
import ConfirmButton from "../../../components/ConfirmButton";

const GetTags = () => {

    const {token} = currentUser ? JSON.parse(currentUser) : null;
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const [form] = Form.useForm()
    const [myForm] = Form.useForm()
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

    const handleNewTag = async () => {
        let body = {
            name: tagData,
        }
        const resp = await axios.post(`${BASE_URL}/api/tags`, body, {
            headers:{'Authorization': `Bearer ${token}`}
        })
        fetchTagData();
        
        setTagData('');        
        form.setFieldsValue({tag: ''})
        message.success('New tags have been added')
    }

    const handleDeleteTag = async (id) => {
        const resp = await axios.delete(`${BASE_URL}/api/tags/${id}`, {
            headers:{'Authorization': `Bearer ${token}`}
        })
        fetchTagData();
    }

    const handleUpdateTag = async (id, e) => {
        // e.preventDefault();

        let body = {
            name: tagUpdate,
        }

        const resp = await axios.put(`${BASE_URL}/api/tags/${toUpdate?._id}`, body, {
            headers:{'Authorization': `Bearer ${token}`}
        })

        console.log(resp);
        fetchTagData();
        setTagUpdate('');
        setToUpdate([]);
        setIsUpdate(false);
        myForm.setFieldsValue({UpdateTag: ''})
        message.success('Tag updated successfully')
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
                    <ConfirmButton 
                        title='Delete Tag'
                        description='Are you sure want to delete this tag?'
                        onCancel={() => message.error('Delete tag cancelled')}
                        onConfirm={() => handleDeleteTag(record._id)}
                        buttonClass='mx-2'
                        danger={true}
                        buttonTitle='Delete'

                    />
                    {/* <Button type="primary" htmlType="" className="mx-2" danger onClick={() => handleDeleteTag(record._id)}>Delete</Button> */}
                </div>
            ),
            align: 'center',
        }
    ]

    const initialValues = {
        UpdateTag: toUpdate.name,
    }
    console.log(toUpdate.name)

    return (
    <div className="px-4 py-3 w-screen">
        <Row>
            <Col span={12} className="pr-1">
                <Table columns={col} dataSource={tags} />     
            </Col>
            <Col span={12} className="pl-1">
                <Card title='Add Tag' size="small">
                    <Form layout="vertical" form={form}>
                        <Form.Item label='Nama Tag' name={'tag'} rules={[{required: true, message: 'Please input tag name'}]}>
                            <Input type="text" name="tag" className="h-8 w-full mt-2 p-3" onChange={(e) => setTagData(e.target.value)}/>
                        </Form.Item>
                        <ConfirmButton 
                            title='Add new tag'
                            description='Are you sure the data is correct?'
                            onCancel={() => message.error('Adding new tag cancelled')}
                            onConfirm={handleNewTag}
                            buttonClass='mt-6 bg-[#1677ff]'
                            buttonTitle='Simpan'
                            // buttonHtmlType='submit'                            
                        />
                    </Form>
                </Card>
                <Card title='Update Tag' size="small" className="mt-4">
                    {/* <form onSubmit={(e) => handleUpdateTag(toUpdate._id, e)}>
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
                    </form> */}

                    <Form layout="vertical" form={myForm} initialValues={initialValues} key={toUpdate} >
                        <Form.Item label='Nama Tag' name={'UpdateTag'} rules={[{required: true, message: 'Please input tag name'}]}>
                            <Input 
                                type="text"
                                className="h-8 w-full mt-2 p-3" 
                                disabled={!isUpdate} 
                                onChange={(e) => setTagUpdate(e.target.value)}
                            />
                        </Form.Item>
                        <ConfirmButton 
                            title='Update Tag'
                            description='Are you sure the data is correct?'
                            onCancel={() => message.error('Updating tag cancelled')}
                            onConfirm={handleUpdateTag}
                            disabled={!isUpdate}
                            buttonTitle='Simpan'
                        />

                        {/* <Button type="primary" htmlType="submit" className="bg-[#1677ff]" disabled={!isUpdate} >Simpan</Button> */}
                        <Button type="primary" htmlType="" className="ml-2 mt-6" disabled={!isUpdate} onClick={() => {setIsUpdate(false); setToUpdate({})}} danger>Batal</Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    </div>
    )
}

export default GetTags;