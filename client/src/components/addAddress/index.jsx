import { Button, Col, Form, Input, Row } from "antd";
const { TextArea } = Input

const AddAddress = () => {
    return (
        <div className="pt-5">
            <Form layout="vertical">
                <Row>
                    <Col span={12} className="pr-2">
                        <Form.Item name="name" label="Nama">
                            <Input />
                        </Form.Item>
                        <Form.Item name="detail" label="Detil Alamat">
                            <TextArea
                            showCount
                            maxLength={100}
                            style={{
                                height: 205,
                                resize: 'none',
                            }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="prov" label="Provinsi">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item name="kab" label="Kabupaten">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item name="kec" label="Kecamatan">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item name="kel" label="Kelurahan">
                            <Input type="text"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Button className="w-full mt-4 h-9" type="primary" danger>Simpan</Button>                    
            </Form>
        </div>
    )
}

export default AddAddress;