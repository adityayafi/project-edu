import { Button, Col, Form, Input, Row, Select } from "antd";
// import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input

const AddAddress = () => {
    let {token} = JSON.parse(localStorage.getItem('auth'))
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

    const fetchProvinsi = () => {
        axios.get(`https://adityayafi.github.io/api-wilayah-indonesia/api/provinces.json`)
        .then(({data}) => setProvinsi(data))
    }

    const fetchKab = () => {
        axios.get(`https://adityayafi.github.io/api-wilayah-indonesia/api/regencies/${selectedProv.value}.json`)
        .then(({data}) => setKabupaten(data))
    }

    const fetchKec = () => {
        axios.get(`https://adityayafi.github.io/api-wilayah-indonesia/api/districts/${selectedKab.value}.json`)
        .then(({data}) => setKecamatan(data))
    }

    const fetchKel = () => {
        axios.get(`https://adityayafi.github.io/api-wilayah-indonesia/api/villages/${selectedKec.value}.json`)
        .then(({data}) => setKelurahan(data))
    }

    useEffect(() => {
        fetchProvinsi();
        if(selectedProv !== '' || selectedKab !== '' || selectedKec !== ''){
            fetchKab();
            fetchKec();
            fetchKel();
        }
    },[selectedProv, selectedKab, selectedKec])

    const handleChangeProv = (key) => {
        // console.log(key)
        setSelectedProv(key);
    }

    const handleChangeKab = (key) => {
        // console.log(key)
        setSelectedKab(key);
    }

    const handleChangeKec = (key) => {
        // console.log(key)
        setSelectedKec(key);
    }

    const handleAddAddress = async () => {
        let body = {
            name: nama,
            kelurahan: kel.label,
            kecamatan: kec.label,
            kabupaten: kab.label,
            provinsi: prov.label,
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
    // console.log(token)

    // console.log(selectedProv.value)
    // console.log(nama, detail, prov.label, kab.label, kec.label, kel.label)
    
    return (
        <div className="px-4 py-3 w-screen">
            <Form layout="vertical" form={form}>
                <Row>
                    <Col span={12} className="pr-2">
                        <Form.Item name={"name"} label="Nama">
                            <Input type="text"/>
                        </Form.Item>
                        <Form.Item name={"detail"} label="Detil Alamat">
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
                        <Form.Item name={"prov"} label="Provinsi">
                            <Select labelInValue options={provinsi.map((provinsi) => ({
                                label: provinsi.name,
                                value: provinsi.id
                            }))} onChange={handleChangeProv}/>
                        </Form.Item>
                        <Form.Item name={"kab"} label="Kabupaten">
                            <Select labelInValue options={kabupaten.map((kab) => ({
                                label: kab.name,
                                value: kab.id
                            }))} onChange={handleChangeKab}/>
                        </Form.Item>
                        <Form.Item name="kec" label="Kecamatan">
                            <Select labelInValue options={kecamatan.map((kec) => ({
                                label: kec.name,
                                value: kec.id
                            }))} onChange={handleChangeKec}/>
                        </Form.Item>
                        <Form.Item name="kel" label="Kelurahan">
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