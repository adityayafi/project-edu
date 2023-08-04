import { Table } from "antd";
import TableAddress from "../../components/address/tableAddress";

const SlcAddress = ({col, data, select}) => {

    return (
        <div>
            <Table columns={col} dataSource={data} rowSelection={select}/>
        </div>
    )
}

export default SlcAddress;