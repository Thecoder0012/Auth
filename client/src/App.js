import { Routes, Route} from "react-router-dom";
import { Signup } from './components/Signup';
import { Login } from "./components/Login";
import { Homepage } from "./components/Homepage.js";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {

  const[auth,setAuth] = useState(false);
    useEffect(() => {
    axios.get("http://localhost:8080/login", {
        withCredentials: true,
    }).then(result => {
      console.log(result.data);
      setAuth(result.data.authenticated)});
    },[])

  return (
   <div>
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
    { auth && <Route path="homepage" element={<Homepage/>}/> }
    </Routes>
   </div>
  );
}

export default App;
