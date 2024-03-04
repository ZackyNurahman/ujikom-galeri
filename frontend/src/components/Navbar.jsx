import { Link, useLocation, useNavigate } from "react-router-dom"
import { Container } from "./Grid";
import { useContext, useEffect } from "react";
import DataContext from "../variabels/Context";

export default function Navbar ({children}) {
    const url = useLocation().pathname;
    const nav = useNavigate();
    const {userFunction,setCari} = useContext(DataContext);
    const cari = new URLSearchParams(window.location.search).get("cari") || "";

    useEffect(() => {
        document.body.removeAttribute("style");
    },[])

    return <>
    <nav className="navbar navbar-expand-md ">
        <div className="container-fluid">
            <button type="button" className="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title fs-2" id="offcanvasNavbarLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const search = new FormData(e.target).get("cari")
                    setCari(search)
                    nav("/?cari=" + search)
                    }} className="py-2 fw-bold navbar-nav me-auto d-flex gap-2" style={{ width:"100%" }}>
                    <Link to={"/user"} className="d-flex mx-2"  >
                        <img src="/img/avatar.png" className="rounded-circle" style={{ width:"48px" }} />
                    </Link>
                    <div className="d-flex w-100 ">
                        <div className="d-flex align-items-center ps-3 bg-secondary" style={{ borderRadius:"15px 0px 0px 15px" }}>
                            <i className="bi bi-search"></i>
                        </div>
                        <input type="search" name="cari" onSubmit={() => console.log("hai")}  style={{ borderRadius:"0px 15px 15px 0px" }} defaultValue={cari} className="form-control border-0 bg-secondary px-3 py-1" id="search" placeholder="Cari Foto" />
                    </div>
                    <NavLink active={url === "/"} text={`Beranda`} to={"/"}/>
                    <NavLink active={url === "/album"} text={"Album"} to={"/album"}/>
                    <div className="dropdown d-flex">
                        <button className={`btn  nav-link border-0 fw-bold`} style={{ borderRadius:"15px"}} type="button" data-bs-toggle="dropdown">
                            <i className="fs-5 bi bi-list"></i>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" onClick={() => nav("/user")} ><i className="bi bi-person-circle pe-1"></i> Lihat Profil</a></li>
                            <li><a className="dropdown-item" onClick={() => nav("/foto/create")} ><i className="bi bi-card-image pe-1"></i> Upload Foto</a></li>
                            <li><a className="dropdown-item" onClick={() => nav("/album/create")} ><i className="bi bi-images pe-1"></i> Tambah Album</a></li>
                            <li><a className="dropdown-item" onClick={() => userFunction.remove()} ><i className="bi bi-box-arrow-right pe-1"></i> Logout</a></li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    </nav>
    <div className="container-fluid">
        {children}
    </div>
    </>
}

function NavLink ({active,text,to}){
    return <li className={`nav-item ${active ? "bg-primary fw-bold p-1" : "p-1"}`} style={{ borderRadius:"15px"}} >
        <Link className={`nav-link px-2 ${active ? "text-light" : ""}`} to={to}>{text}</Link>
    </li>
}