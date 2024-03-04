import { useContext } from "react";
import { Col, Row } from "../../components/Grid";
import Navbar from "../../components/Navbar";
import DataContext from "../../variabels/Context";
import ConfigAxios from "../../variabels/ConfigAxios";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateKomentar () {
    const {checkMsg} = useContext(DataContext);
    const nav = useNavigate();
    const fotoId = useParams().id;


    async function sendData (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.set("foto_id",fotoId);
        const response = await ConfigAxios.post("/komentar",formData);
        if(checkMsg(response)){
            nav("/foto/" + fotoId);
        }
    }

    return <Navbar>
        <Row justify="center">
            <Col pc="5" hp="11">
                <form onSubmit={sendData} className="border p-3 rounded shadow">
                    <h2 className="text-center" >Buat Komentar</h2>
                    <div className="mb-3">
                        <label className={`form-label`} >Komentar</label>
                        <textarea name="isi" id="komentar" required={true} className="form-control" placeholder="Masukkan Deskripsi" ></textarea>
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Buat</button>
                </form>
            </Col>
        </Row>
    </Navbar>
}   