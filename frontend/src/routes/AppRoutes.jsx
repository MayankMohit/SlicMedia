import Navbar from "../components/common/Navbar";
import Hero from "../pages/Hero";
import ThemeToggle from "../components/common/themeToggle";
import MouseTrailSVG from "../components/other/MouseTrail";

const AppRouter = () => {
  return (
    <div className="relative">
      <MouseTrailSVG
        points={20}
        stiffness={0.9}
        damping={0.2}
        width={4}
        colors={["#ffaaaa", "#ff00aa"]}
        glow
      />
      <Navbar />
      <Hero />
      <ThemeToggle />
    </div>
  );
};

export default AppRouter;
