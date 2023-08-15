import { Button, Col, Form, Input, Modal, Row, Skeleton, Upload } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { currentUser } from "../../../utils";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
const { TextArea } = Input;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const initialError = {
    name: [],
    desc: [],
    price: [],
    image: [],
    cat: [],
    tags: [],
}

const UpdateProduct = () => {

    const {token} = JSON.parse(currentUser);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const {id} = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(initialError)
    const [loading, setLoading] = useState(true);
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
        setNewData({...newData, image_url: newFileList[0].originFileObj});
    }

    // const handleChange = (e) => {
    //     console.log(e.target.files[0])
    // }

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
        setLoading(false);
    }
    // console.log(newData)

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
        if(newData.name)

        try {
            const resp = await axios.put(`${BASE_URL}/api/products/${id}`, newData, {
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

    const formValidator = () => {
        if(!document.forms['updateForm']['name'].value){
            setError((error) => ({...error, name: [...error.name, 'This field is required !']}))
        }
        // if(document.forms['updateForm']['name'].value.length() < 3){
        //     setError((error) => ({...error, name: [...error.name, 'Minimum name is 3 character !']}))
        // }
        if(!document.forms['updateForm']['desc'].value){
            setError((error) => ({...error, desc: [...error.desc, 'This field is required !']}))
        }
        if(!document.forms['updateForm']['price'].value){
            setError((error) => ({...error, price: [...error.price, 'This field is required !']}))
        }
        // if(!document.forms['updateForm']['image'].newFileList){
        //     setError((error) => ({...error, image: [...error.image, 'This field is required !']}))
        // }
        if(!document.forms['updateForm']['cat'].value){
            setError((error) => ({...error, cat: [...error.cat, 'This field is required !']}))
        }
        if(!document.forms['updateForm']['tags'].value){
            setError((error) => ({...error, tags: [...error.tags, 'This field is required !']}))
        }

        if (!document.forms['updateForm']['name'].value || document.forms['updateForm']['name'].value < 3
        || !document.forms['updateForm']['desc'].value || !document.forms['updateForm']['price'].value 
        || !document.forms['updateForm']['image'].value || !document.forms['updateForm']['cat'].value || !document.forms['updateForm']['tags'].value) return;
    }

    // console.log(document.forms['updateForm']['desc'].length())

    const CatOpt = 
        category.map(item => ({
            label: item.name,
            value: item.name
        }))

    const TagOpt = 
        tags.map(item => ({
            label: item.name,
            value: item.name
        }))

        // console.log(data);

    return (
        <div className="px-4 py-3 w-screen">
            <form name="updateForm" onSubmit={handleUpdate}>
                <Row>
                    <Col span={12} className="pr-2">
                        <div className="mb-7">
                            <label htmlFor="">Nama Produk</label><br/>
                            <input 
                                name="name" 
                                type="text" 
                                defaultValue={data.name} 
                                className="border border-slate-300 rounded flex h-8 w-full mt-2 p-3"
                                onChange={e => setNewData({...newData, name: e.target.value})}
                            />
                            {error.name && error.name.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Deskripsi Produk</label><br/>
                            <textarea 
                                name="desc" 
                                type="text" 
                                defaultValue={data.desc} 
                                className="border border-slate-300 rounded flex w-full mt-2 p-3" 
                                style={{height: 297, resize: 'none'}}
                                onChange={e => setNewData({...newData, desc: e.target.value})}                                
                            />
                            {error.desc && error.desc.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="mb-7">
                            <label htmlFor="">Harga Produk</label><br/>
                            <input 
                                name="price" 
                                type="number" 
                                defaultValue={data.price} 
                                className="border border-slate-300 rounded flex h-8 w-full mt-2 p-3"
                                onChange={e => setNewData({...newData, price: e.target.value})}
                            />
                            {error.price && error.price.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="">Foto Produk</label><br/>
                            <Row>
                                <Col span={6}>
                                    {
                                        loading? 
                                        <Skeleton.Image 
                                            active 
                                            className="mt-1" 
                                            style={{height: '100.4px', width: '100.4px'}}
                                        />
                                        :
                                        <div >
                                            <img 
                                                src={`${BASE_URL}/public/${data.image_url}`} 
                                                style={{height: '100.4px', width: '100.4px'}} 
                                                className="rounded-lg border border-slate-300 mt-2"
                                            />
                                            {/* <span>Current Picture</span> */}
                                        </div>
                                    }
                                </Col>
                                <Col span={6}>
                                    <Upload
                                        name="image" 
                                        listType="picture-card"
                                        onPreview={handlePreview}
                                        beforeUpload={() => {return false}}
                                        onChange={handleChange}                                        
                                        className="mt-2"                                        
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
                                    {error.image && error.image.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}                                                           
                                </Col>
                            </Row>
                        </div>
                        <div className="mb-7">
                            <label htmlFor="">Kategori Produk</label><br/>
                            <Select
                                name="cat" 
                                className="mt-2" 
                                defaultValue={data.cat} 
                                options={CatOpt} 
                                key={data.cat}
                                onChange={e => setNewData({...newData, category: e.value})}
                            />
                            {error.cat && error.cat.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        </div>
                        <div className="mb-7">
                            <label htmlFor="">Tag Produk</label><br/>
                            <Select 
                                name="tags"
                                className="mt-2" 
                                defaultValue={data.tags} 
                                isMulti 
                                options={TagOpt} 
                                key={data.tags}
                                delimiter=","                                
                                onChange={e => setNewData({...newData, tags: e.map(tag => tag.value).toString()})}
                            />
                            {error.tags && error.tags.map(err => <span style={{fontSize: '13px', color: 'red', marginTop: '-15px'}} key={err}>* {err}</span>)}
                        </div>
                    </Col>
                </Row>
                <Button 
                    className="w-full mt-4 h-9" 
                    type="primary" 
                    htmlType="submit" 
                    danger
                >
                    Simpan
                </Button>
            </form>

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