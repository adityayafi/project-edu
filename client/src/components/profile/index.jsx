import { Card } from "antd"
import DataTable from 'react-data-table-component';


const Profile = () => {
    let {user} = JSON.parse(localStorage.getItem('auth'))
    console.log(user.full_name)

    const col = [
        {
            name: 'Nama',
            selector: row => row.nama
        },
        {
            name: 'Email',
            selector: row => row.email
        }
    ];

    const data = [
        {
            id: 1,
            nama:'Nama',
            email: user.full_name
        },
        {
            id: 2,
            nama:'Email',
            email: user.email
        }
    ]
    return (
        <div className="px-4 py-3 w-screen">
            <Card title="Biodata User">
                <DataTable columns={col} data={data} noTableHead className="border-t border-b"/>
            </Card>
        </div>
    )
}

export default Profile;