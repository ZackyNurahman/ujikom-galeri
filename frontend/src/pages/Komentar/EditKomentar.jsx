import { useContext, useEffect, useState } from "react";
import { Col, Row } from "../../components/Grid";
import Input from "../../components/Input";
import Navbar from "../../components/Navbar";
import DataContext from "../../variabels/Context";
import { useNavigate, useParams } from "react-router-dom";
import ConfigAxios from "../../variabels/ConfigAxios";

export default function EditKomentar () {
    const [komentar,setKomentar] = useState();
    const {checkMsg} = useContext(DataContext);
    const komentarId = useParams().id;
    
    useEffect(() => {
        getKomentar();
    },[])

    async function getKomentar () {
        const response = await ConfigAxios.get("/komentar/" + komentarId);
        if(checkMsg(response)){
            setKomentar(response.data.data);
        }
    }

    async function sendData (e) {
        e.preventDefault()
        const formData = new FormData(e.target);
        const response = await ConfigAxios.put("/komentar/" + komentarId,formData);
        if(checkMsg(response)){
            history.back();
        }
    }

    return <Navbar>
        {komentar ? 
        <Row justify="center">
            <Col pc="5" hp="11">
                <form onSubmit={sendData} className="border p-3 rounded shadow">
                    <h2 className="text-center" >Edit Komentar</h2>
                    <div className="mb-3">
                        <label className={`form-label`} >Komentar</label>
                        <textarea name="isi" defaultValue={komentar.isi} id="komentar" required={true} className="form-control" placeholder="Masukkan Deskripsi" ></textarea>
                    </div>
                    <button className="text-center btn btn-primary mt-2 shadow w-100" >Update</button>
                </form>
            </Col>
        </Row>
        : undefined}
    </Navbar>
}