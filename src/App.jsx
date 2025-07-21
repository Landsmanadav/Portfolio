import { Routes, Route } from "react-router-dom";
import Intro from "./components/Intro/Intro";
import Layout from "./layout/Layout";
import HomepageLayout from "./layout/HomepageLayout";
import "./App.scss";
import { UiProvider } from "./context/UiContext";
function App() {
  return (
    <>
      <UiProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Intro />} />
            <Route path="/homepage" element={<HomepageLayout />}></Route>
          </Route>
        </Routes>
      </UiProvider>
    </>
  );
}

export default App;
