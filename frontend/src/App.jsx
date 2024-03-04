import { BrowserRouter, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Loading from "./components/Loading";
import Page404 from "./pages/404";
import DataContext from "./variabels/Context.js"
import Middleware from "./components/Midleware.jsx"
import UserFunction from "./functions/UserFuntion.js";
import Foto from "./pages/Foto/Foto.jsx";
import ShowFoto from "./pages/Foto/ShowFoto.jsx";
import Beranda from "./pages/Beranda/Beranda.jsx";
import Album from "./pages/Album/Album.jsx";
import ShowAlbum from "./pages/Album/ShowAlbum.jsx";
import CreateFoto from "./pages/Foto/CreateFoto.jsx";
import EditFoto from "./pages/Foto/EditFoto.jsx";
import CreateAlbum from "./pages/Album/CreateAlbum.jsx";
import EditAlbum from "./pages/Album/EditAlbum.jsx";
import CreateKomentar from "./pages/Komentar/CreateKomentar.jsx";
import EditKomentar from "./pages/Komentar/EditKomentar.jsx";

export default function App () {
  const [user,setUser] = useState();
  const [cari,setCari] = useState(new URLSearchParams(window.location.search).get("cari") || "");
  const userFunction = new UserFunction(user,setUser);

  const globalVariabel = {
    user,
    setUser,
    cari,
    setCari,
    userFunction,
    checkMsg:userFunction.checkMsg,
  }

  useEffect(() => {
    userFunction.get();
  },[])

  return <BrowserRouter>
    <DataContext.Provider value={globalVariabel} >

      <Middleware next={user == undefined} >
        <Route path="*" element={<Loading />} />
      </Middleware>

      <Middleware next={user == false} >
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />  
        <Route path="*" element={<Login />} />
      </Middleware>

      <Middleware next={user} >
        <Route path="/" element={<Beranda />} />

        <Route path="/album" element={<Album />} />
        <Route path="/album/create" element={<CreateAlbum />} />
        <Route path="/album/edit/:id" element={<EditAlbum />} />
        <Route path="/album/:id" element={<ShowAlbum />} />

        <Route path="/user" element={<Foto />} />
        <Route path="/foto/create" element={<CreateFoto />} />
        <Route path="/foto/edit/:id" element={<EditFoto />} />
        <Route path="/foto/:id" element={<ShowFoto />} />

        <Route path="/komentar/create/:id" element={<CreateKomentar />} />
        <Route path="/komentar/edit/:id" element={<EditKomentar />} />

        <Route path="*" element={<Page404 />} />
      </Middleware>
      
    </DataContext.Provider>
  </BrowserRouter>
}