import { Card } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Inovice = () => {

    const {token} = JSON.parse(localStorage.getItem('auth'));
    const [invoice, setInvoice] = useState(null);
    const {id} = useParams();
    // const id = '64c88ae225c5407a247b21ef';
    console.log(id)

    const fetchInvoices = async () => {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/invoice/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        // console.log(res.data);
        setInvoice(res.data);
    }

    useEffect(() => {
        fetchInvoices()
    }, [])

    // console.log(invoice)

    return (
        <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 block justify-center">
            <Card title="Invoices" className="my-8" size="small">
                <table className="w-full text-sm mt-8">
                    {invoice !== null ? (
                        <tbody>
                            <tr className="border-t-2">
                                <td className="py-3 pl-2 w-2/4">Status</td>
                                <td className="py-3 pl-2 w-2/4">{invoice.payment_status}</td>
                            </tr>
                            <tr className="border-t-2">
                                <td className="py-3 pl-2 w-2/4">Order Id</td>
                                <td className="py-3 pl-2 w-2/4">#{invoice.order.order_number}</td>
                            </tr>
                            <tr className="border-t-2">
                                <td className="py-3 pl-2 w-2/4">Billed To</td>
                                <td className="py-3 pl-2 w-2/4">
                                    <table>
                                        <tr className="font-bold">{invoice.user.full_name}</tr>
                                        <tr>{invoice.user.email}</tr>
                                        <br />
                                        <tr>{`${invoice.delivery_address.provinsi}, ${invoice.delivery_address.kabupaten}, ${invoice.delivery_address.kecamatan}, ${invoice.delivery_address.kelurahan}`}</tr>
                                        <tr>({invoice.delivery_address.detail})</tr>
                                    </table>
                                </td>
                            </tr>
                            <tr className="border-t-2">
                                <td className="py-3 pl-2 w-2/4">Payment To</td>
                                <td className="py-3 pl-2 w-2/4">
                                    <table>
                                        <tr>Restaurant Owner</tr>
                                        <tr>Res_Owner@gmail.com</tr>
                                        <tr>BCA :</tr>
                                        <tr>xxx-xxx-xxx-x</tr>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <h4>Anda tidak memiliki Invoice, silakan melakukan pemesanan</h4>
                    )}
                </table>
            </Card>
        </div>
    )
}

export default Inovice;