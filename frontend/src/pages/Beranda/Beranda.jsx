import { Link } from "react-router-dom";
import { Col, Row } from "../../components/Grid";
import Navbar from "../../components/Navbar";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../variabels/Context";
import ConfigAxios from "../../variabels/ConfigAxios";
import Page404 from "../404";
import Loading from "../../components/Loading";


export default function Beranda () {
    const [fotos,setFotos] = useState([]);
    const {cari} = useContext(DataContext);
    const {checkMsg} = useContext(DataContext);

    useEffect(() => {
        getFotos();
    },[cari]);

    async function getFotos () {
        const response = await ConfigAxios.get("/fotos?cari=" + cari);
        if(checkMsg(response)){
            setFotos(response.data.data);
        }
    }

    return <Navbar>
        <div class="bg-image" 
            >
</div>
        <Row>
            {fotos ? fotos.length > 0 ? fotos.map((foto,index) => 
            <Col pc="3" hp="12" key={index} className=" mb-4" >
                <Link to={`/foto/${foto.id}`} className="card border-0">
                    <img src={foto.url} className="w-100 rounded shadow img-fluid  bg-dark" alt={foto.nama} style={{height:"400px",objectFit:"cover"}} />
                </Link>
            </Col>
            ) : <Page404 text={`Tidak ada Foto ${cari}`} /> : <Loading />}
        </Row>
    </Navbar>
}