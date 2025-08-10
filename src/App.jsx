import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { UiProvider } from "./context/UiContext";
import { TypingProvider } from "./context/TypingContext";
import Layout from "./layout/Layout";
import HomePageLayout from "./layout/HomepageLayout";
import Intro from "./components/Intro/Intro";
import HomeSection from "./components/Homepage/HomeSection";
import AboutSection from "./components/Homepage/AboutSection";
import ProjectsSection from "./components/Homepage/ProjectsSection";
import CvSection from "./components/Homepage/CvSection";
import RouteFade from "@/layout/RouteFade";

export default function App() {
  const location = useLocation();

  return (
    <UiProvider>
      <TypingProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <RouteFade>
                    <Intro />
                  </RouteFade>
                }
              />
              <Route element={<HomePageLayout />}>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route
                  path="/home"
                  element={
                    <RouteFade>
                      <HomeSection />
                    </RouteFade>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <RouteFade>
                      <AboutSection />
                    </RouteFade>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <RouteFade>
                      <ProjectsSection />
                    </RouteFade>
                  }
                />
                <Route
                  path="/cv"
                  element={
                    <RouteFade>
                      <CvSection />
                    </RouteFade>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </AnimatePresence>
      </TypingProvider>
    </UiProvider>
  );
}
