import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing"; 
import { useRef, useState, useEffect } from "react";
import { TextureLoader, Vector2, Vector3 } from "three";

const MOON_TEXTURE_URL = import.meta.env.VITE_MOON;

// Moon component that moves in 3D based on cursor
function Moon() {
  const moonRef = useRef();
  const [ready, setReady] = useState(false);
  const moonTexture = new TextureLoader().load(MOON_TEXTURE_URL);
  const mouse = useRef(new Vector2(0, 0));

  useEffect(() => {
    if (moonRef.current) setReady(true);

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3D movement inside Canvas
  useFrame(() => {
    if (!moonRef.current) return;

    const target = new Vector3(
      mouse.current.x * 3,
      mouse.current.y * 2 + 5,
      -5 + mouse.current.x * 1
    );

    moonRef.current.position.lerp(target, 0.02);
  });

  return (
    <>
      <mesh ref={moonRef} scale={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>

      {ready && (
        <EffectComposer>
          <Bloom intensity={0} luminanceThreshold={0.5} luminanceSmoothing={0.9} />
        </EffectComposer>
      )}
    </>
  );
}

export default function LensFlareCustom() {
  return (
    <Canvas camera={{ position: [0, 0, 35], fov: 25 }} style={{ background: "#0b0c17" }} width="100%" height="100%">
      {/* <Moon /> */}
          {/* <Stars radius={50} depth={100} count={1500} factor={4} fade speed={2} /> */}
      <ambientLight intensity={1} />
    </Canvas>
  );
}
