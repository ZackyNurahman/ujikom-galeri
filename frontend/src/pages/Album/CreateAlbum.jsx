import { useContext } from "react";
import { Col, Row } from "../../components/Grid";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import DataContext from "../../variabels/Context";
import ConfigAxios from "../../variabels/ConfigAxios";
import { useNavigate } from "react-router-dom";

export default function CreateAlbum () {
    const {checkMsg} = useContext(DataContext);
    const nav = useNavigate();

    async function sendData (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await ConfigAxios.post("/album",formData);
        if(checkMsg(response)){
            nav("/album");
        }
    }

    return <Navbar>
        <Row justify="center">
            <Col pc="5" hp="11">
                <form onSubmit={sendData} className="border p-3 rounded shadow">
                    <h2 className="text-center" >Buat Album</h2>
                    <div className="mb-3">
                        <Input type="text" required={true} name="nama" />
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