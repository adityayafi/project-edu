import { Button, Card } from "antd";
import { Rupiah } from "../../utils";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { saveCart } from "../../api/cart";

const Cart = () => {

    const cart = useSelector((state) => state.cart);
    const user = JSON.parse(localStorage.getItem('auth'));
    const product = useSelector((state) => state.cart.products)

    useEffect(async() => {
        const prodData = product.map((data) => ({
            product: data,
            qty: data.qty
        }));

        const updateCart = await saveCart(user.token, prodData);
        const result = console.log("Cart Updated");
    },[product])

    const col = [
        {
            name: <div>Gambar</div>,
            selector: row => row.pict
        },
        {
            name: 'Barang',
            selector: row => row.item
        },
        {
            name: 'Harga',
            selector: row => row.price
        },
        {
            name: 'Qty',
            selector: row => row.qty
        }
    ]

    const data = [
        {
            id: 1,
            pict: 'Foto Produk',
            item: 'Nama produk',
            price: `${Rupiah('2500')}`,
            qty: <div className="flex items-center">
                <Button type="primary" htmlType="" className="px-2"><FontAwesomeIcon icon={faMinus}/></Button>
                <span className="px-4">1</span>
                <Button type="primary" htmlType="" className="px-2"><FontAwesomeIcon icon={faPlus}/></Button>
            </div>
        }
    ]

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 block justify-center">
            <Card title="Keranjang Belanja" className="mt-8" size="small">
                <span className="text-xl">Sub Total: {Rupiah(64000)}</span>
                <DataTable columns={col} data={data} className="text-center"/>
            </Card>
        </div>
    )
}

export default Cart;