import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "../components/Grid";
import Input from "../components/Input";
import ConfigAxios from "../variabels/ConfigAxios";
import { useContext } from "react";
import DataContext from "../variabels/Context";

export default function Register () {
    const {checkMsg} = useContext(DataContext);
    const nav = useNavigate();

    async function sendData (e) {
        e.preventDefault();
        const response = await ConfigAxios.post("/api/user",new FormData(e.target));
        if(checkMsg(response)){
            nav("/");
        }
    }

    return(
        <section className="vh-100 d-flex align-items-center justify-content-center">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <div className="border rounded shadow-lg p-4">
                <h2 className="p-2 dt">Register</h2>
                <form   onSubmit={sendData}>
                  <div className="d-flex  flex-row align-items-center justify-content-center justify-content-lg-start"></div>
                  <div className="form-outline mb-4">
                      <Input
                       type="nama"
                       required={true}
                       name="nama"
                    />
                 
                  </div>
                  <div className="form-outline mb-4">
                      <Input
                       type="email"
                       required={true}
                       name="email"
                    />
                 
                  </div>
      
                  <div className="form-outline mb-3">
                  <Input
                      type="password"
                      required={true}
                      name="password"
                    />
                    
                  </div>
      
                  <div className="d-flex justify-content-between align-items-center"></div>
      
                  <div className="text-center text-lg-start">
                  <button className="text-center btn btn-primary mt-2 shadow w-100">Masuk</button>
      
                  <h6 className="text-center d-block mt-3" style={{ fontSize:"14px" }} >Sudah punya akun bisa langsung <Link to={"/"} >masuk</Link></h6>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
    //  <Container>
    // //     <Row justify="center" >
    // //         <Col pc="6" className="mt-5" >
    // //             <form onSubmit={sendData} className="border p-3 rounded shadow">
    // //                 <h2 className="text-center" >Register</h2>
    // //                 <div className="mb-3">
    // //                     <Input type="nama" required={true} name="nama" />
    // //                 </div>
    // //                 <div className="mb-3">
    // //                     <Input type="email" required={true} name="email" />
    // //                 </div>
    // //                 <div className="mb-3">
    // //                     <Input type="password" required={true} name="password" />
    // //                 </div>
    // //                 <button className="text-center btn btn-primary mt-2 shadow w-100" >Buat</button>
    // //                 <h6 className="text-center d-block mt-3" style={{ fontSize:"14px" }} >Sudah punya akun bisa langsung <Link to={"/"} >masuk</Link></h6>
    // //             </form>
    // //         </Col>
    // //     </Row>
    // // </Container>
}