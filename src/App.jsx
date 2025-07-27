import { Routes, Route } from "react-router-dom";
import Intro from "./components/Intro/Intro";
import Layout from "./layout/Layout";
import HomepageLayout from "./layout/HomepageLayout";
import "./App.scss";
import { UiProvider } from "./context/UiContext";
import HomePage from "./components/Homepage/HomePage";
function App() {
  return (
    <>
      <UiProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Intro />} />
            <Route path="/homepage" element={<HomepageLayout />}>
              <Route index element={<HomePage />}></Route>
            </Route>
          </Route>
        </Routes>
      </UiProvider>
    </>
  );
}

export default App;
