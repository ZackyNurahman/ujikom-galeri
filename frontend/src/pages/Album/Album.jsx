import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "../../components/Grid";
import Navbar from "../../components/Navbar";
import { useContext, useEffect, useState } from "react";
import ConfigAxios from "../../variabels/ConfigAxios";
import DataContext from "../../variabels/Context";
import Page404 from "../404";
import Loading from "../../components/Loading";

export default function Album () {
    const [albums,setAlbums] = useState([]);
    const {checkMsg} = useContext(DataContext);

    useEffect(() => {
        getAlbums();
    },[]);
    
    async function getAlbums () {
        const response = await ConfigAxios.get("/album");
        if(checkMsg(response)){
            setAlbums(response.data.data);
        }
    }

    

    return <Navbar>
            <Row>
            {albums ? albums.length > 0 ? albums.map((album,index) => 
            <Col key={index} pc="4" hp="12" className="mb-3" >
                {/* <Link to={`/album/${album.id    }`} className="card border-0 text-decoration-none mb-3" >
                    <img src="/img/album.jpg" alt="fotoalbum" className="rounded" style={{ objectFit:"cover",height:"250px" }} />
                    <div className="card-body position-absolute bottom-0 w-100 rounded" id="bodyAlbum" >
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title fw-bold text-light">{album.nama}</h5>
                            <div className="dropdown">
                                <button className="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li onClick={(e) => {
                                        e.preventDefault()
                                        if(confirm("Yakin ingin menghapus album")){
                                            destroyAlbum(e,album.id)
                                        }}} className="dropdown-item">Hapus</li>
                                    <li onClick={(e) => {
                                        e.preventDefault();
                                        nav(`/album/edit/${album.id}`)
                                    }} className="dropdown-item">Edit</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Link> */}
                <Link  to={`/album/${album.id}`}  className="text-decoration-none">
                    <div className="d-flex shadow" style={{ borderRadius:"5px",height:"300px" }} >
                        <div className="">
                            <img src={album.fotos[0] ? album.fotos[0].url : "/img/album.jpg"} alt="fotoalbum" className="h-100 rounded-start border img-fluid" style={{  objectFit:"cover",width:"300px" }} />
                        </div>
                        <div className="d-flex justify-content-center align-items-center" style={{ flexDirection:"column" }} >
                            <div className="d-block">
                                <img src={album.fotos[1] ? album.fotos[1].url : "/img/album.jpg"} alt="fotoalbum" className="bg-secondary img-fluid border" style={{ objectFit:"cover",borderRadius:"0 5px 0 0",height:"150px",width:"200px"}} />
                            </div>
                            <div className="">
                                <img src={album.fotos[2] ? album.fotos[2].url : "/img/album.jpg"} alt="fotoalbum" className="border img-fluid" style={{ objectFit:"cover",borderRadius:"0 0 5px 0",height:"150px",width:"200px"}} />
                            </div>
                        </div>
                    </div>
                    <h4 className="fw-bold mt-3 px-2 text-dark" >{album.nama}</h4>
                    <h6 className="text-secondary px-2 " >{album.fotos.length} Foto</h6>
                </Link>
            </Col>
            ) : <Page404 text="Tidak ada album" /> : <Loading />}
        </Row>
    </Navbar>
}