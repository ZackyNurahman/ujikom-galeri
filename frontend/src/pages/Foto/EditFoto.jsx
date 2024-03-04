import { useContext, useEffect, useState } from "react";
import { Col, Row } from "../../components/Grid";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../variabels/Context";
import ConfigAxios from "../../variabels/ConfigAxios";

export default function EditFoto () {
    const [foto,setFoto] = useState();
    const [albums,setAlbums] = useState([]);
    const {checkMsg} = useContext(DataContext);
    const fotoId = useParams().id;
    const nav = useNavigate();

    useEffect(() => {
        getAlbums()
        getFoto()
    },[]);

    async function getAlbums () {
        const response = await ConfigAxios.get("/album");
        if(checkMsg(response)){
            setAlbums(response.data.data);
        }
    }

    async function getFoto () {
        const response = await ConfigAxios.get("/foto/" + fotoId);
        if(checkMsg(response)){
            setFoto(response.data.data.foto);
        }
    }

    async function updateFoto (e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const response = await ConfigAxios.put("/foto/" + fotoId,formData);
        if(checkMsg(response)){
            nav("/foto/" + fotoId);
        }
    }

    return <Navbar>
        <Row justify="center">
            {foto ? 
            <Col pc="5" hp="11">
                <form onSubmit={updateFoto} className="border p-3 rounded shadow">
                    <h2 className="text-center" >Edit Foto</h2>
                    <img src={foto.url} alt="foto sebelum" className="border mb-3 rounded img-fluid" />
                    <div className="mb-3">
                        <Input type="file" name="foto" />
                    </div>
                    <div className="mb-3">
                        <Input type="text" value={foto.nama} required={true} name="nama" />
                    </div>
                    <div className="mb-3">
                        <label className={`form-label`} >Album</label>
                        <select defaultValue={foto.album_id} name="album_id" className="form-select" aria-label="Default select example">
                            <option value={0}>Pilih album</option>
                            {albums.map((album,index) => 
                                <option key={index} value={album.id} >{album.nama}</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className={`form-label`} >Deskripsi</label>
                        <textarea defaultValue={foto.deskripsi} name="deskripsi" id="deskripsi" required={true} className="form-control" placeholder="Masukkan Deskripsi" ></textarea>
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Update</button>
                </form>
            </Col>
            : undefined}
        </Row>
    </Navbar>
}