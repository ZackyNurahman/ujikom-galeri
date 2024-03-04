import { Link, useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "../../components/Grid";
import Navbar from "../../components/Navbar";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../variabels/Context";
import ConfigAxios from "../../variabels/ConfigAxios";

export default function ShowFoto () {
    const [foto,setFoto] = useState(false);
    const [like,setLike] = useState(false);
    const {user,checkMsg} = useContext(DataContext);
    const fotoId = useParams().id;
    const nav = useNavigate();

    useEffect(() => {
        getFoto();
    },[]);

    async function getFoto () {
        const response = await ConfigAxios.get("/foto/" + fotoId);
        if(checkMsg(response)){
            setFoto(response.data.data.foto);
            setLike(response.data.data.like)
        }
    }

    async function destroyFoto () {
        const response = await ConfigAxios.delete("/foto/" + fotoId);
        if(checkMsg(response)){
            history.back()
        }
    }

    async function createLike () {
        const formData = new FormData();
        formData.set("foto_id",foto.id);
        const response = await ConfigAxios.post("/like",formData);
        if(checkMsg(response)){
            getFoto();
        }
    }

    async function destroyLike () {
        const response = await ConfigAxios.delete("/like/" + like.id);
        if(checkMsg(response)){
            getFoto();
        }
    }

    async function destroyKomentar (id) {
        const response = await ConfigAxios.delete("/komentar/" + id);
        if(checkMsg(response)){
            getFoto();
        }
    }

    
    async function sendData (e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.set("foto_id",fotoId);
        const response = await ConfigAxios.post("/komentar",formData);
        if(checkMsg(response)){
            e.target.reset()
           getFoto();
        }
    }

    return <Navbar>
        <Container>
        {foto ? 
        // <Row justify="between my-4 border m-0 rounded" >
        //     <Col pc="6" className="d-flex border justify-content-center p-0 rounded-start" >
        //         <img src={foto.url} className="shadow img-fluid rounded-start" alt="foto" />
        //     </Col>
        //     <Col pc="6" className="p-3 rounded-end">
        //         <div className="d-flex justify-content-between align-items-center ">
        //             <h2 className="fw-bold" >{foto.nama}</h2>
        //             <div className="d-flex">
        //                 <button onClick={() => !like ? createLike() : destroyLike()} className="btn btn-primary">
        //                     {!like ? <i className="bi bi-heart"></i> :  <i className="bi bi-heart-fill"></i>} Suka {foto.likes.length}
        //                 </button>
        //                 {foto.user_id === user.id ? 
        //                 <div className="dropdown">
        //                     <button className="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        //                         <i className="bi bi-three-dots-vertical"></i>
        //                     </button>
        //                     <ul className="dropdown-menu">
        //                         <li onClick={() => confirm("Yakin ingin menghapus foto ini") ? destroyFoto() : undefined} className="dropdown-item" href="#">Hapus</li>
        //                         <Link className="dropdown-item" to={`/foto/edit/${fotoId}`}>Edit</Link>
        //                     </ul>
        //                 </div>
        //                 : undefined}
        //             </div>
        //         </div>
        //         <p className="rounded p-2" >{foto.deskripsi}</p>
        //         <div className="d-flex align-items-center mb-4 gap-2">
        //             <img src="/img/avatar.png" alt="avatar" className="rounded-circle" style={{ width:"40px"}} />
        //             <h5 className="mt-2 fw-bold" >{foto.user.nama}</h5>
        //         </div>
        //     </Col>
        // </Row>
        <Row justify="center" >
            <Col pc="12" className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <img src="/img/avatar.png" alt="foto.user" className="img-fluid" style={{ width:"60px" }} />
                    <h4 className="mt-2" >{foto.user.nama}</h4>
                </div>
                <div className="d-flex gap-1">
                    <button className="btn btn-primary" onClick={() => !like ? createLike() : destroyLike()} >
                        {!like ? <i className="bi bi-heart"></i> :  <i className="bi bi-heart-fill"></i>} {foto.likes.length}
                    </button>
                    {foto.user_id === user.id ? <>
                    <button className="btn btn-primary" onClick={() => nav(`/foto/edit/${fotoId}`)}><i className="bi bi-pencil-square"></i></button>
                    <button className="btn btn-primary" onClick={() => confirm("Yakin ingin menghapus foto ini") ? destroyFoto() : undefined} ><i className="bi bi-trash"></i></button>
                    </> : undefined}
                </div>
            </Col>
            <Col pc="12" className="d-flex justify-content-center mt-4 " >
                <img src={foto.url} className="shadow img-fluid rounded" alt="foto"  style={{ height:"10%"}} />
            </Col>
            <Col pc="12" className="px-3 mt-5" >
                <h1>{foto.nama}</h1>
                <p className="px-1 text-secondary" >{foto.deskripsi}</p>
            </Col>
        </Row>
        : undefined}
        {foto ? 
        <Row>
            <Col className="mt-3" >
                <ul className="list-group">
                    <form onSubmit={sendData} className="list-group-item input-group p-0 border-0 d-flex align-items-center justify-content-between">
                        <input type="search" name="isi" className="form-control py-2" style={{ borderRadius:"10px 0 0 0" }} placeholder="Masukkan Komentar..."/>
                        <button className="btn btn-primary py-2" style={{ borderRadius:"0 10px 0 0" }}><i className="bi bi-send-arrow-down"></i></button>
                    </form>
                    {foto.komentars.length > 0 ? foto.komentars.map((komentar,index) => 
                    <li key={index} className="list-group-item">
                        <div className="fw-bold d-flex align-items-center justify-content-between" >
                            <div className="">
                                <img src="/img/avatar.png" alt="avatar" className="me-1 rounded-circle" style={{ width:"20px"}} />
                                {komentar.user.nama}
                            </div>
                                {komentar.user_id === user.id ? 
                            <div className="dropdown">
                                <button className="btn border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul className="dropdown-menu">
                                    <li className="dropdown-item" onClick={() => destroyKomentar(komentar.id)} >Hapus</li>
                                    <Link to={"/komentar/edit/" + komentar.id} className="dropdown-item" href="#">Edit</Link>
                                </ul>
                            </div>
                                : undefined}
                        </div>
                        <div className="mt-1">
                            {komentar.isi}
                        </div>
                    </li>
                    ) : <li className="list-group-item">
                        <h6 className="text-center mt-2" >Tidak ada komentar</h6>
                    </li>}
                </ul>
            </Col>
        </Row>
        : undefined}
        </Container>
    </Navbar>
}
