import { useContext, useEffect, useState } from "react";
import { Col, Row } from "../../components/Grid";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import ConfigAxios from "../../variabels/ConfigAxios";
import DataContext from "../../variabels/Context";
import { useNavigate } from "react-router-dom";

export default function CreateFoto () {
    const [albums,setAlbums] = useState([]);
    const {checkMsg} = useContext(DataContext);
    const nav = useNavigate();

    useEffect(() => {
        getAlbums();
    },[]);

    async function getAlbums () {
        const response = await ConfigAxios.get("/album");
        if(checkMsg(response)){
            setAlbums(response.data.data);
        }
    }

    async function sendData (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        if(formData.get("album_id") === 0) formData.delete("album_id");
        const response = await ConfigAxios.post("/foto",formData);
        if(checkMsg(response)){
            nav("/user")
        }
    }

    return <Navbar>
        <Row justify="center">
            <Col pc="5" hp="11">
                <form onSubmit={sendData} className="border p-3 rounded shadow">
                    <h2 className="text-center" >Buat Foto</h2>
                    
                    <div className="mb-3">
                        <Input type="file" required={true} name="foto" />
                    </div>
                    <div className="mb-3">
                        <Input type="text" required={true} name="nama" />
                    </div>
                    <div className="mb-3">
                        <label className={`form-label`} >Album</label>
                        <select name="album_id" className="form-select" aria-label="Default select example">
                            <option value={0}>Pilih album</option>
                            {albums.map((album,index) => 
                                <option key={index} value={album.id} >{album.nama}</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className={`form-label`} >Deskripsi</label>
                        <textarea name="deskripsi" id="deskripsi" required={true} className="form-control" placeholder="Masukkan Deskripsi" ></textarea>
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Buat</button>
                </form>
            </Col>
        </Row>
    </Navbar>
}