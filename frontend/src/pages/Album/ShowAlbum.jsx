import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "../../components/Grid";
import Navbar from "../../components/Navbar";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../variabels/Context";
import ConfigAxios from "../../variabels/ConfigAxios";
import Page404 from "../404";
import Loading from "../../components/Loading";

export default function ShowAlbum () {
    const [album,setAlbum] = useState({});
    const [fotos,setFotos] = useState([]);
    const {checkMsg,user} = useContext(DataContext);
    const albumId = useParams().id
    const nav = useNavigate();

    useEffect(() => {
        getAlbum()
    },[]);

    async function getAlbum () {
        const response = await ConfigAxios.get("/album/" + albumId);
        if(checkMsg(response)){
            setAlbum(response.data.data);
            setFotos(response.data.data.fotos);
        }
    }


    async function destroyAlbum (e,id) {
        const response = await ConfigAxios.delete("/album/" + id);
        if(checkMsg(response)){
            nav("/album")
        }
    }

    return <Navbar>
        {/* <Row justify="center" >
            <Col pc="5" className="mb-2" >
                <div className="card border-0">
                    <img src="/img/album.jpg" alt="fotoAlbum" className="img-fluid rounded" />
                    <div id="bodyAlbum2" className="position-absolute d-flex border w-100 h-100 justify-content-center rounded align-items-center " >
                        <h2 className="fw-bold" >{album.nama}</h2>
                    </div>
                </div>
            </Col>
        </Row>
        <Row justify="center" >
            <Col pc="5" className="mb-2" >
                <div className="border p-2 rounded">
                    <div className="d-flex align-items-center gap-2">
                        <img src="/img/avatar.png" alt="avatar" className="rounded-circle" style={{ width:"40px"}} />
                        <h4 className="mt-2 fw-bold" >{user.nama}</h4>
                    </div>
                    <p className="mt-3" >{album.deskripsi}</p>
                </div>
            </Col>
        </Row> */}
        {/* {fotos.length > 0 ?
        <h3 className="text-center my-3" >Foto-foto dari album {album.nama}</h3>
        : undefined} */}
        <Row className="py-3" >
            <Col pc="10" className="" >
                <h1 className="fw-bold" >{album.nama}</h1>
                <h6>{album.deskripsi}</h6>
            </Col>
            <Col pc="2" className=" h-100" >
                <div className="h-100 d-flex align-items-center justify-content-end gap-2 p-2">
                    <button className="btn btn-primary" onClick={(e) => nav(`/album/edit/${album.id}`)} ><i className="bi bi-pencil-square"></i> Edit</button>
                    <button className="btn btn-primary" onClick={(e) => confirm("Yakin ingin menghapus" + album.nama) ? destroyAlbum(e,album.id) : undefined } ><i className="bi bi-trash"></i> Hapus</button>
                </div>
            </Col>
        </Row>
        <Row className="" >
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