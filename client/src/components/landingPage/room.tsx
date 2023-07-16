import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { useThree } from "@react-three/fiber";
import { useRef, useState, WheelEvent } from "react";
import { motion } from "framer-motion";

const RoomModel = (props: { rotation: number }) => {
  const gltf = useLoader(GLTFLoader, "Model/Room3d.gltf");
  const { rotation } = props;

  useEffect(() => {
    gltf.scene.scale.set(0.3, 0.3, 0.3);
    gltf.scene.position.set(0, -0.8, 0.11);
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

  const [rotation, setRotation] = useState(3);

  const wheelDeltaBuffer = useRef<number[]>([]);
  
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
	
	wheelDeltaBuffer.current.push(e.deltaY);
	
    if (wheelDeltaBuffer.current.length > 3) {
      wheelDeltaBuffer.current.shift();
    }


    const averageDeltaY =
      wheelDeltaBuffer.current.reduce((acc, value) => acc + value, 0) /
      wheelDeltaBuffer.current.length;


    const rotateSpeed = 0.001;
	const rotationDelta = averageDeltaY * rotateSpeed;
	
	setRotation((prevRotation) => {

		const newRotation = prevRotation + rotationDelta;
		return newRotation;
	});

  };

  useEffect(() => {
	// @ts-ignore
    containerRef.current?.addEventListener("wheel", handleWheel);
    return () => {
	// @ts-ignore
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <motion.div
	whileInView={{ y: 0, transition: { duration: 1.9 } }}
	style={{ y: 650  }}

      ref={containerRef}
      className="flex w-full h-full items-center justify-center"
    >
      <Canvas style={{ width: "100%", height: "100%" } } shadows>
        <PerspectiveCamera
          makeDefault
          position={[
            -10.9,
            rotation < 0 ? 0 : rotation + 0.888888,
            (rotation < 0 ? 0 : (rotation * 3.6666666).toFixed(2)) as number,
          ]}
          fov={36 + rotation}
        />
        <color attach="background" args={["black"]} />
        <OrbitControls
		minZoom={0}
		maxZoom={0}
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
          intensity={1.6}
          position={[-4, 5, 3]}
          angle={0.63}
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
        <RoomModel rotation={rotation} />
      </Canvas>
    </motion.div>
  );
}
