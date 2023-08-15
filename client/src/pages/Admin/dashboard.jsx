import CountUp from 'react-countup';
import { faBoxOpen, faList, faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, Col, Row } from "antd";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {

    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const [countProduct, setCountProduct] = useState(null);
    const [countCat, setCountCat] = useState(null);
    const [countTags, setCountTags] = useState(null);

    const fetchProduct = async () => {
        const res = await axios.get(`${BASE_URL}/api/products`);
        setCountProduct(res.data.count);
    }

    const fetchCat = async () => {
        const res = await axios.get(`${BASE_URL}/api/categories`);
        setCountCat(res.data.length)
    }

    const fetchTags = async () => {
        const res = await axios.get(`${BASE_URL}/api/tags`);
        setCountTags(res.data.length)
    }

    useEffect(() => {
        fetchProduct();
        fetchCat();
        fetchTags();
    })

    return (
        <div className="px-4 py-3 w-screen">
            <Row gutter={16} className='pt-4'>
                <Col span={8}>
                    <Card size="small">
                        <Row>
                            <Col span={12}>
                                <span className="font-bold text-xl">Products</span>
                                <br />
                                <span className='font-bold text-2xl'>{countProduct}</span>                        
                            </Col>
                            <Col span={6} offset={6} className='items-center justify-center right-0 flex text-3xl'>
                                <FontAwesomeIcon icon={faBoxOpen} className='float-right'/>                        
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small">
                        <Row>
                            <Col span={12}>
                                <span className="font-bold text-xl">Categories</span>
                                <br />
                                <span className='font-bold text-2xl'>{countCat}</span>                        
                            </Col>
                            <Col span={6} offset={6} className='items-center justify-center right-0 flex text-3xl'>
                                <FontAwesomeIcon icon={faList} className='float-right'/>                        
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size="small">
                        <Row>
                            <Col span={12}>
                                <span className="font-bold text-xl">Tags</span>
                                <br />
                                <span className='font-bold text-2xl'>{countTags}</span>                        
                            </Col>
                            <Col span={6} offset={6} className='items-center justify-center right-0 flex text-3xl'>
                                <FontAwesomeIcon icon={faTags} className='float-right'/>                        
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard;

