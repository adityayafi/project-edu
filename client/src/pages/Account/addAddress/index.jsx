import { Button, Col, Form, Input, Row, Select } from "antd";
// import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../../utils";
const { TextArea } = Input

const AddAddress = () => {
    let {token} = JSON.parse(currentUser)
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const nama = Form.useWatch('name', form);
    const prov = Form.useWatch('prov', form);
    const kab = Form.useWatch('kab', form);
    const kec = Form.useWatch('kec', form);
    const kel = Form.useWatch('kel', form);
    const detail = Form.useWatch('detail', form);

    const [provinsi, setProvinsi] = useState([]);
    const [kabupaten, setKabupaten] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);

    const [selectedProv, setSelectedProv] = useState([]);
    const [selectedKab, setSelectedKab] = useState([]);
    const [selectedKec, setSelectedKec] = useState([]);

    const fetchProvinsi = async () => {
        await axios.get(`https://adityayafi.github.io/api-wilayah-indonesia/api/provinces.json`)
        .then(({data}) => setProvinsi(data))
    }

    const fetchKab = async (id) => {
        await axios.get(`https://adityayafi.github.io/api-wilayah-indonesia/api/regencies/${id}.json`)
        .then(({data}) => setKabupaten(data))
    }

    const fetchKec = async (id) => {
        await axios.get(`https://adityayafi.github.io/api-wilayah-indonesia/api/districts/${id}.json`)
        .then(({data}) => setKecamatan(data))
    }

    const fetchKel = async (id) => {
        await axios.get(`https://adityayafi.github.io/api-wilayah-indonesia/api/villages/${id}.json`)
        .then(({data}) => setKelurahan(data))
    }

    useEffect(() => {
        fetchProvinsi();
    },[])

    const handleChangeProv = ({value, label}) => {
        setSelectedProv(label);
        fetchKab(value);
    }

    const handleChangeKab = ({value, label}) => {
        // console.log(key)
        setSelectedKab(label);
        fetchKec(value);
    }

    const handleChangeKec = ({value, label}) => {
        // console.log(key)
        setSelectedKec(label);
        fetchKel(value);
    }

    const handleAddAddress = async () => {

        if (!nama || !kel || !kec || !kab || !prov || !detail ) return;

        let body = {
            name: nama,
            kelurahan: kel,
            kecamatan: kec,
            kabupaten: kab,
            provinsi: prov,
            detail: detail,
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/delivery-addresses`, body, { 
            headers: {
                authorization: `Bearer ${token}`
            }})
            navigate('/account/address');
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div className="px-4 py-3 w-screen">
            <Form layout="vertical" form={form}>
                <Row>
                    <Col span={12} className="pr-2">
                        <Form.Item name="nama" label="Nama" rules={[{required: true, message: 'Please input your address name'}]}>
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item name="detail" label="Detil Alamat" rules={[{required: true, message: 'Please input your detail address'}]}>
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
                        <Form.Item name="prov" label="Provinsi" rules={[{required: true, message: 'Please select your province'}]}>
                            <Select labelInValue options={provinsi.map((provinsi) => ({
                                label: provinsi.name,
                                value: provinsi.id
                            }))} onChange={(e) => handleChangeProv(e)}/>
                        </Form.Item>
                        <Form.Item name="kab" label="Kabupaten" rules={[{required: true, message: 'Please select your district'}]}>
                            <Select labelInValue options={kabupaten.map((kab) => ({
                                label: kab.name,
                                value: kab.id
                            }))} onChange={handleChangeKab}/>
                        </Form.Item>
                        <Form.Item name="kec" label="Kecamatan" rules={[{required: true, message: 'Please select your sub-district'}]}>
                            <Select labelInValue options={kecamatan.map((kec) => ({
                                label: kec.name,
                                value: kec.id
                            }))} onChange={handleChangeKec}/>
                        </Form.Item>
                        <Form.Item name="kel" label="Kelurahan" rules={[{required: true, message: 'Please select your urban village'}]}>
                            <Select labelInValue options={kelurahan.map((kel) => ({
                                label: kel.name,
                                value: kel.id
                            }))}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Button className="w-full mt-4 h-9" type="primary" htmlType="submit" danger onClick={handleAddAddress}>Simpan</Button>                    
            </Form>
        </div>
    )
}

export default AddAddress;