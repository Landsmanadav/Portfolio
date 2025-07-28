import { Routes, Route, Navigate } from "react-router-dom";
import { UiProvider } from "./context/UiContext";
import Layout from "./layout/Layout";
import Intro from "./components/Intro/Intro";

import HomePageLayout from "./layout/HomepageLayout";
import HomeSection from "./components/Homepage/HomeSection";
import AboutSection from "./components/Homepage/AboutSection";
import ProjectsSection from "./components/Homepage/ProjectsSection";
import CvSection from "./components/Homepage/CvSection";
import { TypingProvider } from "./context/TypingContext";

export default function App() {
  return (
    <UiProvider>
      <TypingProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Intro />} />
            <Route element={<HomePageLayout />}>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomeSection />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/projects" element={<ProjectsSection />} />
              <Route path="/cv" element={<CvSection />} />
            </Route>
          </Route>
        </Routes>
      </TypingProvider>
    </UiProvider>
  );
}
