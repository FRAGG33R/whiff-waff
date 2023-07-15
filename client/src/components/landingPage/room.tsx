import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

const RoomModel = () => {
  const gltf = useLoader(GLTFLoader, "Model/Room3d.gltf");

  useEffect(() => {
    gltf.scene.scale.set(0.3, 0.3, 0.3);
    gltf.scene.position.set(0, 0, 0);
    gltf.scene.traverse((child) => {
      if (child.name.includes("lamp")) {
        console.log(child.position);
      }
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
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Canvas style={{ width: "100%", height: "100%" }} shadows>
        <PerspectiveCamera makeDefault position={[-8.8, 2, 8]} fov={50} />
        <color attach="background" args={["#E4E5E7"]} />
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
        <ambientLight intensity={0.31} />
        <spotLight
          position={[2, 13, 5]}
          angle={0.10}
          penumbra={1.2}
          color="#FFFFB9"
        />
        <pointLight position={[-10, -10, -10]}/>
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
          position={[224.5967712402344, -524.24398803710938, 274.5648803710938,]}
          color={"yellow"}
          intensity={2}
          penumbra={0.4}
        />
        <RoomModel />
      </Canvas>
    </div>
  );
}
