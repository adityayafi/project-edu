import { Table } from "antd";

const SlcAddress = ({col, data, select}) => {

    return (
        <div>
            <Table columns={col} dataSource={data} rowSelection={select}/>
        </div>
    )
}

export default SlcAddress;