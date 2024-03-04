export default function Page404 ({text}) {
    return <div className="d-flex align-items-center" style={{ flexDirection:"column" }} >
        <img src="/img/kosong.jpg" alt="kosong" className="img-fluid kosong" />
        <h5 className="text-secondary text-center" >{text || "404"}</h5>
    </div>
}