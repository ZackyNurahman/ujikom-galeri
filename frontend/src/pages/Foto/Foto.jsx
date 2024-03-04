import { Link } from "react-router-dom";
import { Col, Row } from "../../components/Grid";
import Navbar from "../../components/Navbar";
import { useContext, useEffect, useState } from "react";
import ConfigAxios from "../../variabels/ConfigAxios";
import DataContext from "../../variabels/Context";
import Page404 from "../404";
import Loading from "../../components/Loading";

export default function Foto () {
    const [fotos,setFotos] = useState();
    const [cari,setCari] = useState("");
    const {checkMsg,user} = useContext(DataContext);

    useEffect(() => {
        getFotos()
    },[]);

    async function getFotos () {
        const response = await ConfigAxios.get("/foto?cari=" + cari); 
        if(checkMsg(response)){
            setFotos(response.data.data);
        }
    }

    return <Navbar>
        <Row>
            <Col pc="12" className="d-flex mb-4 justify-content-center mt-2 align-items-center" style={{flexDirection:"column"}} >
                <img src="/img/avatar.png" className="rounded-circle" style={{ width:"120px"}} />
                <h1 className="m-0" >{user.nama}</h1>
                <h6 className="text-secondary" >{user.email}</h6>
            </Col>
        </Row>
        <Row    >
            {fotos ? fotos.length > 0 ? fotos.map((foto,index) => 
            <Col pc="3" hp="12" key={index} className="mb-4" >
                <Link to={`/foto/${foto.id}`} className="card border-0">
                    <img src={foto.url} className="w-100 rounded shadow img-fluid w-100 bg-dark" alt={foto.nama} style={{height:"400px",objectFit:"cover"}} />
                </Link>
            </Col>
            ) : undefined : <Loading />}
        </Row>
    </Navbar>
}