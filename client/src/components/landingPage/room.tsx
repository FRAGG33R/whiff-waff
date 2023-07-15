import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  BoxGeometry,
  LinearEncoding,
  MeshBasicMaterial,
  RepeatWrapping,
  SphereGeometry,
} from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

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
        <PerspectiveCamera makeDefault position={[-8.8, 2, 8]} fov={50} />
        <color attach="background" args={["#E4E5E7"]} />
        <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
        <ambientLight intensity={0.31} />
        <spotLight position={[1, 7, -11]} angle={0.15} penumbra={1.2} />
        <pointLight position={[-10, -10, -10]} />
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
        <RoomModel />
      </Canvas>
    </div>
  );
}
