import { Table } from "antd"

const TableAddress = ({col, data}) => {

    const pathname = window.location.pathname;
    const diff = ['/account/address'];

    return (
        <div>
            {
                diff.includes(pathname) &&
                <Table columns={col} dataSource={data} className="mt-8"/>
            }
            {
                !diff.includes(pathname)&&
                <Table columns={columns} dataSource={address} className="mt-8"/>
            }
        </div>

    )
}

export default TableAddress;