import { Routes, Route} from "react-router-dom";
import { Signup } from './components/Signup';
import { Login } from "./components/Login";
import { Homepage } from "./components/Homepage";

function App() {
  return (
   <div>
    <Routes>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="homepage" element={<Homepage/>}/>
    </Routes>
   </div>
  );
}

export default App;
