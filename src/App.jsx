import Api from "./API/Api.jsx"
import { Route, Routes } from "react-router-dom";
import MovieDetail from "./supports/movieDetail.jsx";


function App() {
  return(<>
    <Routes>
        <Route path="/" element={<Api/>}/>
        
        <Route path="/movie/:id" element={<MovieDetail/>}/>
        
        <Route path="*" element={<h1>Page Not Found</h1>}/>
        
    </Routes>
  </>);
}

export default App
