import { TagLabel } from "../../components/tag";
import {Button, Card, Col, Skeleton} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus} from '@fortawesome/free-solid-svg-icons'
import { Rupiah, currentUser } from "../../utils";
import { useDispatch } from "react-redux";
import { addProdToCart } from "../../features/cart/cartSlice";
import SkeletonImage from "antd/es/skeleton/Image";
const {Meta} = Card;


const Cards = ({items, keyCard}) => {

    const dispatch = useDispatch();

    const handleCart = () => {
        if(!currentUser) return window.location.assign('/login');
        dispatch(addProdToCart(items));
    }   

    return (
    <Col className="gutter-row mb-4" span={6} key={keyCard}>
        <Card className="w-68 border-slate-300" size="small"
        cover={<img src={`${import.meta.env.VITE_BACKEND_URL}/public/${items.image_url}`} className="border border-slate-300" style={{height: '200px', width: '300px'}}  alt="" />}
        
        >
            <h1 className="font-bold text-lg text-slate-600">{items.name}</h1>
            <p className="font-medium text-slate-400">{items.category.name}</p>
            <div >
                {items.tags.map((tag, i) => {return <TagLabel key={i}  name={tag.name} keys={tag._id}/>})}
            </div>
            <span className="flex font-medium text-slate-500">{Rupiah(items.price)}</span>
            <Button type="primary" className="bg-[#1677ff] mt-4 hover:bg-[#1677ff]" onClick={() => handleCart(items)}><FontAwesomeIcon icon={faCartPlus} className="text-white"/></Button>
        </Card>                    
    </Col>
    )
}

export function CardSkeleton () {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
        // <Skeleton loading={loading} active>
            <Col className="gutter-row mb-4" span={6} key={i}>
                <Card className="w-68 border-slate-300" size="small"
                cover={<SkeletonImage style={{width: '291px', height: '200px'}} active/>}
                >
                    <Skeleton active>
                        <Meta
                            title="Card title"
                            description="This is the description"
                        />
                    </Skeleton>
                </Card>
            </Col>  
        // </Skeleton>
    ))
}

export default Cards;