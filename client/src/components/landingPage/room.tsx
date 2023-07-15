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
        <PerspectiveCamera makeDefault position={[-9.9, 4, 11]} fov={40} />
        <color attach="background" args={["#E4E5E7"]} />
        <OrbitControls
          target={[0, 0.35, 0]}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={Math.PI / 24}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI  / 2}
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
        <RoomModel />
      </Canvas>
    </div>
  );
}
