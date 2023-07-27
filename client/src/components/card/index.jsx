import { ShowTag, TagLabel } from "../../components/tag";
import {Button, Card, Col} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus} from '@fortawesome/free-solid-svg-icons'
import { Rupiah } from "../../utils";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProdToCart } from "../../features/cart/cartSlice";


const Cards = ({items, keyCard}) => {

    let user = localStorage.getItem('auth');
    const dispatch = useDispatch();

    const handleCart = () => {
        if(!user) return window.location.assign('/login');
        dispatch(addProdToCart(items));
    }   

    return (
    <Col className="gutter-row mb-4" span={6} key={keyCard}>
        <Card className="w-68 border-slate-300" size="small"
        cover={<img src={`${import.meta.env.VITE_BACKEND_URL}/public/${items.image_url}`} className="border border-slate-300" style={{height: '200px', width: '300px'}}  alt="" />}
        >
            <h1 className="font-bold text-lg text-slate-600">{items.name}</h1>
            <p className="font-medium text-slate-400">{items.category.name}</p>
            <div className="">
                {items.tags.map((tag, i) => {return <TagLabel key={i}  name={tag.name} keys={tag._id}/>})}
            </div>
            <span className="flex font-medium text-slate-500">{Rupiah(items.price)}</span>
            <Button type="primary" className="bg-[#1677ff] mt-4 hover:bg-[#1677ff]-" onClick={() => handleCart(items)}><FontAwesomeIcon icon={faCartPlus} className="text-white"/></Button>
        </Card>                    
    </Col>
    )
}

export default Cards;