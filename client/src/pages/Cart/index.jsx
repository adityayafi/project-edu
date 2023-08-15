import { Button, Card } from "antd";
import { Rupiah, currentUser } from "../../utils";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCart } from "../../api/cart";
import { decrementProd, incrementProd } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = JSON.parse(currentUser);
    const product = useSelector((state) => state.cart.products)

    useEffect(() => {
        const prodData = product.map((data) => ({
            product: data,
            qty: data.qty
        }));

        saveCart(user.token, prodData);
    },[product, user])

    const col = [
        {
            name: <div>Gambar</div>,
            selector: (row) => <img src={`${import.meta.env.VITE_BACKEND_URL}/public/${row.image_url}`} className="w-32 h-20"/>
        },
        {
            name: 'Barang',
            selector: row => row.name
        },
        {
            name: 'Harga',
            selector: row => Rupiah(row.price)
        },
        {
            name: 'Qty',
            selector: row => (<div>
                                <Button type="primary" htmlType="" className="px-2" onClick={() => handleDecrement(row._id)}><FontAwesomeIcon icon={faMinus}/></Button>
                                <span className="px-4">{row.qty}</span>
                                <Button type="primary" htmlType="" className="px-2" onClick={() => handleIncrement(row._id)}><FontAwesomeIcon icon={faPlus}/></Button>
                            </div>)
        }
    ]

    const handleDecrement = (id) => {
        dispatch(decrementProd(id))
    }

    const handleIncrement = (id) => {
        dispatch(incrementProd(id))
    }

    console.log(cart.products)
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 block justify-center">
            <Card title="Keranjang Belanja" className="mt-8" size="small">
                <span className="text-2xl">Sub Total: {Rupiah(cart.totalPrice)}</span>
                <DataTable columns={col} data={cart.products} className="text-center"/>
            </Card>
            <Link to={'/checkout'}>
                <Button type="primary" className="my-4 w-full" danger>Checkout</Button>
            </Link>
        </div>
    )
}

export default Cart;