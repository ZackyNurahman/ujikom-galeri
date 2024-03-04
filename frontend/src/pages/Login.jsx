import {Container,Row,Col} from "../components/Grid"
import Input from "../components/Input";
import { Link } from "react-router-dom";
import ConfigAxios from "../variabels/ConfigAxios";
import { useContext } from "react";
import DataContext from "../variabels/Context";

export default function Login () {
    const {setUser,checkMsg} = useContext(DataContext);

    async function sendData (e) {
        e.preventDefault();
        const response = await ConfigAxios.post("/api/login",new FormData(e.target))
        if(checkMsg(response)){
            setUser(response.data.data)
        }
    }

    return (
        <section className="vh-100 d-flex align-items-center justify-content-center">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <div className="border rounded shadow-lg p-4">
                <h2 className="p-2 dt">Login</h2>
                <form   onSubmit={sendData}>
                  <div className="d-flex  flex-row align-items-center justify-content-center justify-content-lg-start"></div>
      
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
      
                    <p className="small fw-bold mt-2 pt-2 mb-0">
                      Belum punya akun?{" "}
                      <Link to="/register" className="link-danger">
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
    // <Container>

    
    //   <form
    //     onSubmit={sendData}
    //     className="max-w-md w-1 h-6 mx-auto p-44 bg-white border rounded-lg shadow-lg"
    //   >
    //     <h2 className="text-2xl font-bold mb-6">Feedback Form</h2>
  
    //     <div className="mb-4">
    //       <Input
    //         type="email"
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         required={true}
    //         name="email"
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <Input
    //         type="password"
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         required={true}
    //         name="password"
    //       />
    //     </div>
      
    //     <h6 className="text-center d-block mt-3" style={{ fontSize: "14px" }}>
    //       Tidak punya akun bisa <Link to={"/register"}>Buat akun</Link>
    //     </h6>
    //   </form>


  
    //   </Container>
    )
}