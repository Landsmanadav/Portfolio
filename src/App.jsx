import { Routes, Route } from "react-router-dom";
import Intro from "./components/Intro/Intro";
import Layout from "./layout/Layout";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Intro />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
