import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { useRef, useState, WheelEvent } from "react";

const RoomModel = (props: { deltaY: number }) => {
  const gltf = useLoader(GLTFLoader, "Model/Room3d.gltf");
  const { deltaY } = props;
  const { camera } = useThree();

  useEffect(() => {
    gltf.scene.scale.set(0.3, 0.3, 0.3);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const childMaterial = child.material as THREE.MeshStandardMaterial;
        if (childMaterial.envMapIntensity !== undefined) {
          childMaterial.envMapIntensity = 20;
        }
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};

export default function Room() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [deltaY, setDeltaY] = useState(0);
  const [rotation, setRotation] = useState(3);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDeltaY(e.deltaY);

    const rotateSpeed = 0.5;
    const rotationDelta = e.deltaY * rotateSpeed * 0.001;
    setRotation((prevRotation) => prevRotation + rotationDelta);
  };
  useEffect(() => {
    console.log(rotation < 0 ? 0 : rotation * 3.66);
	console.log(36 + (rotation < 0 ? rotation / 2 : rotation));
	
  }, [rotation]);

  useEffect(() => {
    containerRef.current?.addEventListener("wheel", handleWheel);
    return () => {
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex w-full h-full items-center justify-center"
    >
      <Canvas style={{ width: "100%", height: "100%" }} shadows>
        <PerspectiveCamera
          makeDefault
          position={[-10.9, 4, rotation < 0 ? 0 : rotation * 3.66]}
          fov={36 + (rotation < 0 ? rotation / 2 : rotation)}
        />
        <color attach="background" args={["#E4E5E7"]} />
        <OrbitControls
          enableZoom
          target={[0, 0.35, 0]}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={Math.PI / 24}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />

        <spotLight intensity={0.45} position={[-20, 20, 20]} penumbra={0.2} />
        <spotLight
          position={[2, 13, 5]}
          angle={0.1}
          penumbra={1.2}
          color="#FFFFB9"
        />
        <pointLight position={[-10, -10, -10]} intensity={0.35} />
        <spotLight
          castShadow
          color={"#8B8B8B"}
          intensity={1}
          position={[-4, 5, 3]}
          angle={0.6}
          penumbra={1}
          shadow-normalBias={0.05}
          shadow-bias={0.0001}
        />
        <spotLight
          angle={0.0009}
          position={[224.5967712402344, -594.24398803710938, 244.5648803710938]}
          color={"yellow"}
          intensity={2}
          penumbra={0.4}
        />

        <RoomModel deltaY={deltaY} />
      </Canvas>
    </div>
  );
}
