import { useContext, useEffect, useState } from "react";
import { Col, Row } from "../../components/Grid";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import ConfigAxios from "../../variabels/ConfigAxios";
import DataContext from "../../variabels/Context";

export default function EditAlbum () {
    const [album,setAlbum] = useState({});
    const {checkMsg} = useContext(DataContext);
    const nav = useNavigate();
    const albumId = useParams().id;

    useEffect(() => {
        getAlbum()
    },[]);

    async function getAlbum () {
        const response = await ConfigAxios.get("/album/" + albumId);
        if(checkMsg(response)){
            setAlbum(response.data.data);
        }
    }

    async function sendData (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await ConfigAxios.put("/album/" + albumId,formData);
        if(checkMsg(response)){
            nav("/album/" + albumId);
        }
    }

    return <Navbar>
        <Row justify="center">
            <Col pc="5" hp="11">
                <form onSubmit={sendData} className="border p-3 rounded shadow">
                    <h2 className="text-center" >Edit Album</h2>
                    <div className="mb-3">
                        <Input type="text" value={album.nama} required={true} name="nama" />
                    </div>
                    <div className="mb-3">
                        <label className={`form-label`} >Deskripsi</label>
                        <textarea name="deskripsi" id="deskripsi" defaultValue={album.deskripsi} required={true} className="form-control" placeholder="Masukkan Deskripsi" ></textarea>
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Update</button>
                </form>
            </Col>
        </Row>
    </Navbar>
}