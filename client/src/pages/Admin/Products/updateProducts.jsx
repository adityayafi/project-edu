import { Button, Col, Form, Image, Input, Modal, Row, Select, Upload } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { currentUser } from "../../../utils";
import { useNavigate, useParams } from "react-router-dom";
// import Select from 'react-select';
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UpdateProduct = () => {

    const {token} = JSON.parse(currentUser);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const {id} = useParams();
    const navigate = useNavigate();

    // const [loading, setLoading] = useState(true);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState('');
    const [data, setData] = useState('');
    const [category, setCategory] = useState([]);
    const [tags, setTags] = useState([]);
    const [newData, setNewData] = useState('');

    const handlePreview = async (file) => {
        console.log(file)
        if(!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));        
    };

    const handleChange = ({fileList: newFileList}) => {
        setFileList(newFileList);
        setNewData({...newData, image_url: newFileList[0]?.originFileObj});
    }


    const fetchUpdateData = async () => {
        const resp = await axios.get(`${BASE_URL}/api/products/${id}`)

        setData({
            name: resp.data.name,
            desc: resp.data.description,
            price: resp.data.price,
            image_url: resp.data.image_url,
            cat: {
                label : resp.data.category.name,
                value : resp.data.category.name,
            },
            tags: resp.data.tags.map(tag => ({
                label: tag.name,
                value: tag.name,
            }))
        });
    }
    console.log(newData)

    const fetchCat = async () => {
        const resp = await axios.get(`${BASE_URL}/api/categories`)
        const result = resp.data;
        setCategory(result);
    }

    const fetchTags = async () => {
        const resp = await axios.get(`${BASE_URL}/api/tags`)
        const result = resp.data;
        setTags(result);
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        newData.name? formData.append('name', newData.name) : null;
        newData.desc? formData.append('description', newData.desc) : null;
        newData.price? formData.append('price', newData.price) : null;
        newData.image_url? formData.append('image', newData.image_url) : null;
        newData.category? formData.append('category', newData.category) : null;
        newData.tags? formData.append('tags', newData.tags) : null;

        // console.log(...formData)
        

        try {
            const resp = await axios.put(`${BASE_URL}/api/products/${id}`, formData, {
                headers: {
                    "Content-Type":'multipart/form-data',
                    Authorization : `Bearer ${token}`
                }
            })

            navigate('/account/admin/products')

            console.log(resp)
        } catch (err) {
            console.log(err)
        }

        // console.log(newData)
    }

    useEffect(() => {
        fetchUpdateData();
        fetchCat();
        fetchTags()

    },[])

    // console.log(document.forms['updateForm']['desc'].length())
    // let test = document.getElementsByName('updateForm')
    // console.log(test)


        // console.log(data);

    const prevValue = {
        name: data.name,
        desc: data.desc,
        price : data.price,
        image: data.image,
        cat: data.cat,
        tag: data.tags

    }

    return (
        <div className="px-4 py-3 w-screen">
            <Form layout="vertical" initialValues={prevValue} key={data}>
                <Row>
                    <Col span={12} className='pr-2'>
                        <Form.Item name='name' label='Nama Produk' rules={[{required: true, message: 'Please input the product name'}, {min: 3, message: 'Minimum name is 3 characters'}]} >
                            <Input type='text' onChange={e => setNewData({...newData, name: e.target.value})}/>
                        </Form.Item>
                        <Form.Item name='desc' label='Deskripsi Produk' rules={[{required: true, message: 'Please input the product description'}]} >
                            <TextArea
                            showCount
                            maxLength={1000}
                            style={{height: 283, resize: 'none'}}
                            onChange={e => setNewData({...newData, desc: e.target.value})} 
                            />
                        </Form.Item>                       
                    </Col>
                    <Col span={12}>
                        <Form.Item name='price' label='Harga Produk' rules={[{required: true, message: 'Please input the product price'}]} >
                            <Input type='number' onChange={e => setNewData({...newData, price: e.target.value})} />
                        </Form.Item>
                        <Row>
                            <Col span={6}>
                                <Form.Item label='Foto Produk Saat Ini'>
                                    <Image src={`${BASE_URL}/public/${data.image_url}`} style={{height: '100.4px', width: '100.4px'}}/>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name='image' label='Foto Produk'>
                                    <Upload
                                    name="image" 
                                    listType="picture-card"
                                    onPreview={handlePreview}
                                    // customRequest={info => setFileList(info.file)}
                                    beforeUpload={() => {return false}}
                                    onChange={handleChange}
                                    onRemove={() => delete newData.image_url}
                                    >
                                        {
                                            fileList.length <= 0  ? 
                                            <div> 
                                                <FontAwesomeIcon icon={faPlus} />
                                                <div
                                                    style={{
                                                    marginTop: 8,
                                                    }}
                                                >
                                                    Upload
                                                </div>
                                            </div>
                                            : null
                                        }
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>                        
                        <Form.Item name='cat' label='Kategori Produk' rules={[{required: true, message: 'Please input the product category'}]} >
                            <Select onChange={e => setNewData({...newData, category: e})}>
                                    {
                                        category.map((items) => {
                                            return <Select.Option key={items._id} value={items.name}>{items.name}</Select.Option>
                                        })
                                    }
                            </Select>
                        </Form.Item>
                        <Form.Item name='tag' label='Tag Produk' rules={[{required: true, message: 'Please input the product tag'}]} >
                            <Select mode="tags" onChange={e => setNewData({...newData, tags: e.map(tag => tag).toString()})} >
                                {
                                    tags.map((items, i) => {
                                        return <Select.Option key={items._id} value={items.name}>{items.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>                     
                    </Col>
                </Row>
                <Button className="w-full mt-4 h-9" type="primary" htmlType="submit" danger onClick={handleUpdate}>Simpan</Button>                 
            </Form>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img
                alt="example"
                style={{
                    width: '100%',
                }}
                src={previewImage}
                />
            </Modal>
        </div>
    )
}

export default UpdateProduct;