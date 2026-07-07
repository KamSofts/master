import Users from "./react-http/Users";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { linkList, routeList } from "./react-router/Index";

function App() {
  return (
    <BrowserRouter>
      {linkList}
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
        <Route path="/http" element={<Users />} />
        {routeList}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
