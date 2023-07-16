import { use, useEffect, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { useRef, useState, WheelEvent } from "react";
import { motion } from "framer-motion";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import * as THREE from "three";
import { useRouter } from "next/router";

const RoomModel = (props: {
  rotation: number;
  setRotation: (rt: number) => void;
}) => {
  const gltf = useLoader(GLTFLoader, "Model/Room3d.gltf");

  const { rotation } = props;
  const { camera } = useThree();
  const cameraPosition = useRef([-10.9, 0.88, 11]);

  useFrame(() => {
    if (rotation !== 3)
      camera.position.set(
        cameraPosition.current[0],
        cameraPosition.current[1],
        cameraPosition.current[2]
      );
  });

  useEffect(() => {
    if (rotation < -11) props.setRotation(-11.1);
    cameraPosition.current = [
      -10.9,
      rotation < 0 ? 0.888888 : rotation + 0.888888,
      (rotation < 0 ? 0 : (rotation * 3.6666666).toFixed(2)) as number,
    ];
  }, [rotation]);

  useEffect(() => {
    gltf.scene.scale.set(0.3, 0.3, 0.3);
    gltf.scene.position.set(0, -0.85, 0.11);
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const childMaterial = child.material as THREE.MeshStandardMaterial;
        if (childMaterial.envMapIntensity !== undefined) {
          childMaterial.envMapIntensity = 20;
        }
        if (child.name.includes("Cube007")) {

        }
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};

export default function Room() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(3);
  const wheelDeltaBuffer = useRef<number[]>([]);
  const router = useRouter();

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    wheelDeltaBuffer.current.push(e.deltaY);
    if (wheelDeltaBuffer.current.length > 3) wheelDeltaBuffer.current.shift();
    const averageDeltaY =
      wheelDeltaBuffer.current.reduce((acc, value) => acc + value, 0) /
      wheelDeltaBuffer.current.length;

    const rotateSpeed = 0.05;
    const rotationDelta = averageDeltaY * rotateSpeed * 0.02;
    setRotation((prevRotation) => {
      const newRotation = prevRotation + rotationDelta;
      if (newRotation > 3) return 3;
      return newRotation;
    });
  };

  useEffect(()=> {
	rotation.toFixed(0) === '-11' ? router.push('/login') : null
	
  } , [rotation])
  useEffect(() => {
    // @ts-ignore
    containerRef.current?.addEventListener("wheel", handleWheel);
    return () => {
      // @ts-ignore
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="w-full h-full items-center justify-center flex-col bg-[#1B2436]">
      <motion.div
        style={{ y: 10, opacity: rotation < -3.2 ? 0 : 1 }}
        whileInView={{
          y: rotation * 45,
          transition: { duration: rotation === 3 ? 1 : 0.1 },
        }}
        className="absolute z-10 text-white flex items-center justify-center flex-col space-y-8 w-full "
      >
        <div className="text-3xl sm:text-5xl md:text-7xl font-bold">
          WHIFF-WHAFF
        </div>
        <div className=" text-white  text-2xl sm:text-3xl md:text-4xl font-light text-center">
          Futuristic ping pong at its finest. Unleash skills, challenge friends,{" "}
        </div>
      </motion.div>

      <motion.div
        whileInView={{ y: 0, transition: { duration: 1.9 } }}
        style={{ y: 650 }}
        ref={containerRef}
        className="flex w-full h-full items-center justify-center flex-col"
      >
        <Canvas style={{ width: "100%", height: "100%" }} shadows>
          <PerspectiveCamera
            makeDefault
            position={[
              -10.9,
              rotation < 0 ? 0.888888 : rotation + 0.888888,
              (rotation < 0 ? 0 : (rotation * 3.6666666).toFixed(2)) as number,
            ]}
            fov={34 + (rotation < -11 ? -32.5 : rotation * 3)}
          />
          <color attach="background" args={["#1B2436"]} />
          <OrbitControls
            minZoom={0}
            maxZoom={0}
            enableZoom={false}
            enableRotate={rotation === 3 ? true : false}
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
            intensity={1.6}
            position={[-4, 5, 3]}
            angle={0.63}
            penumbra={1}
            shadow-normalBias={0.05}
            shadow-bias={0.0001}
          />
          <spotLight
            angle={0.0014}
            position={[
              224.5967712402344, -1304.24398803710938, 224.5648803710938,
            ]}
            color={"yellow"}
            intensity={2}
            penumbra={0.4}
          />
          <RoomModel rotation={rotation} setRotation={setRotation} />
        </Canvas>
      </motion.div>
    </div>
  );
}
