import { Card, Table } from "antd"
import { currentUser } from "../../utils";

const Profile = () => {

    const {user} = JSON.parse(currentUser);

    return (
        <div className="px-4 py-3 w-screen">
            <Card title="Biodata User">
                <table className="w-full">
                    <tr className="border-y-2">
                        <td className="py-3">Nama</td>
                        <td>{user.full_name}</td>
                    </tr>
                    <tr className="border-t-2">
                        <td className="py-3">Email</td>
                        <td>{user.email}</td>
                    </tr>
                </table>
            </Card>
        </div>
    )
}

export default Profile;