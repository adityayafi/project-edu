import { Table } from "antd";
import { Rupiah } from "../../utils";

const Confirm = ({data, subtotal,deliveryFee}) => {
    return (
        <div className="max-w-7xl mx-auto pt-8 px-4 sm:px-6 lg:px-8 block justify-center">
            <table className="w-full text-sm">
                <tbody>
                    <tr className="border-y-2">
                        <td className="py-3 pl-2 w-2/4">Alamat</td>
                        <td className="py-3 pl-2">
                            <table>
                                <tr>{data.name}</tr>
                                <tr>{`${data.prov}, ${data.kab}, ${data.kec}, ${data.kel}`}</tr>
                                <tr>{data.det}</tr>
                            </table>
                        </td>
                    </tr>
                    <tr className="border-y-2">
                        <td className="py-3 pl-2">Sub Total</td>
                        <td className="py-3 pl-2">{Rupiah(subtotal)}</td>
                    </tr>
                    <tr className="border-y-2">
                        <td className="py-3 pl-2">Ongkir</td>
                        <td className="py-3 pl-2">{Rupiah(deliveryFee)}</td>
                    </tr>
                    <tr className="border-y-2">
                        <td className="py-3 pl-2 font-bold">Total</td>
                        <td className="py-3 pl-2 font-bold">{Rupiah(subtotal + deliveryFee)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Confirm;