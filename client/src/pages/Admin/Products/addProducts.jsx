import { Button, Col, Form, Input, Modal, Popconfirm, Row, Select, Upload, message } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { currentUser } from "../../../utils";
import { useNavigate } from "react-router-dom";
import ConfirmButton from "../../../components/ConfirmButton";
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddProduct = () => {

    const {token} = JSON.parse(currentUser);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState('');
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);

    const [form] = Form.useForm();
    const name = Form.useWatch('name', form);
    const desc = Form.useWatch('desc', form);
    const price = Form.useWatch('price', form);
    const image = Form.useWatch('image', form);
    const cat = Form.useWatch('cat', form);
    const tag = Form.useWatch('tag', form);

    const fetchTags = async () => {
        const resp = await axios.get(`${BASE_URL}/api/tags`)
        const result = resp.data;
        setTags(result);
    }

    const fetchCat = async () => {
        const resp = await axios.get(`${BASE_URL}/api/categories`)
        const result = resp.data;
        setCategories(result);
    }

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
    }

    const handleAddProduct = async () => {

        if( !name || !desc || !price || !image || !cat || !tag ) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', desc);
        formData.append('price', price);
        formData.append('image', image.file);
        formData.append('category', cat);
        formData.append('tags', tag.toString());

        try {
            const resp = await axios.post(`${BASE_URL}/api/products`, formData, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                    "Authorization" : `Bearer ${token}`,
                }
            })
            console.log(resp)
            navigate('/account/admin/products')
        } catch (err) {
            console.log(err.response.data)
        }
    }

    useEffect (() => {
        fetchTags();
        fetchCat();
    }, [])

    return (
        <div className="px-4 py-3 w-screen">
            <Form layout="vertical" form={form}>
                <Row>
                    <Col span={12} className='pr-2'>
                        <Form.Item name='name' label='Nama Produk' rules={[{required: true, message: 'Please input the product name'}]} >
                            <Input type='text'/>
                        </Form.Item>
                        <Form.Item name='desc' label='Deskripsi Produk' rules={[{required: true, message: 'Please input the product description'}]} >
                            <TextArea
                            showCount
                            maxLength={1000}
                            style={{height: 283, resize: 'none'}}/>
                        </Form.Item>                       
                    </Col>
                    <Col span={12}>
                        <Form.Item name='price' label='Harga Produk' rules={[{required: true, message: 'Please input the product price'}]} >
                            <Input type='number'/>
                        </Form.Item>
                        <Form.Item name='image' label='Foto Produk' rules={[{required: true, message: 'Please input the product image'}]}>
                            <Upload
                            name="image" 
                            listType="picture-card"
                            onPreview={handlePreview}
                            // customRequest={info => setFileList(info.file)}
                            beforeUpload={() => {return false}}
                            onChange={handleChange}
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
                        <Form.Item name='cat' label='Kategori Produk' rules={[{required: true, message: 'Please input the product category'}]} >
                            <Select>
                                    {
                                        categories.map((items, i) => {
                                            return <Select.Option key={items._id} value={items.name}>{items.name}</Select.Option>
                                        })
                                    }
                            </Select>
                        </Form.Item>
                        <Form.Item name='tag' label='Tag Produk' rules={[{required: true, message: 'Please input the product tag'}]} >
                            <Select mode="tags">
                                {
                                    tags.map((items, i) => {
                                        return <Select.Option key={items._id} value={items.name}>{items.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>                     
                    </Col>
                </Row>

                <ConfirmButton 
                    title='Add New Product'
                    description='Are you sure the data is correct?'
                    onCancel={() => message.error('Adding new data cancelled')}
                    onConfirm={() => handleAddProduct}
                    buttonClass='w-full mt-4 h-9'
                    buttonTitle='Simpan'
                    buttonHtmlType='submit'
                    danger={true}
                />
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

export default AddProduct;