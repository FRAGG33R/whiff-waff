import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useState, WheelEvent } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import PrimaryButton from "../ui/buttons/primaryButton";
import AnimatedScroll from "./animatedScroll";
import RoomModel from "./roomModel";
import ProgressCounter from "./progressCounter";

export default function Room() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotation, setRotation] = useState(3);
  const wheelDeltaBuffer = useRef<number[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();
  const [progressBar, setProgressBar] = useState<number>(0);
  const progressRef = useRef(0);

  progressRef.current = progressBar;

  const updateProgress = (loader: GLTFLoader) => {
    loader.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      let i = 0;
      const setInter = setInterval(() => {
        setProgressBar(i++);
        if (i > (itemsLoaded / itemsTotal) * 100) {
          clearInterval(setInter);
        }
      }, 15);
    };
  };

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

  useEffect(() => {
	console.log(rotation.toFixed(0));
	
    rotation.toFixed(0) === "-1" ? router.push("/login") : null;
  }, [rotation]);

  useEffect(() => {
    if (window.innerWidth < 700) setIsMobile(true);
    // @ts-ignore
    containerRef.current?.addEventListener("wheel", handleWheel);
    return () => {
      // @ts-ignore
      containerRef.current?.removeEventListener("wheel", handleWheel);
    };
  }, [isMobile]);
  return (
    <div className="w-full h-full items-center justify-center flex-col bg-[#121A28] overflow-y-hidden">
      <div
        className={`w-full h-full items-center justify-center overflow-y-hidden ${
          progressRef.current == 100 ? "visible" : "invisible"
        }`}
      >
        <motion.div
          style={{ y: 10, opacity: rotation < -3.2 ? 0 : 1 }}
          whileInView={{
            y: rotation * (isMobile ? 14 : 45),
            transition: { duration: rotation === 3 ? 1 : 0.1 },
          }}
          className="absolute z-10 text-white flex items-center justify-center flex-col space-y-4 w-full "
        >
          <div className="text-6xl md:text-7xl font-bold font-teko tracking-wider">
            WHIFF-WHAFF
          </div>
          <div className=" text-white md:w-full w-10/12 text-lg sm:text-2xl md:text-3xl  font-extralight text-center font-poppins">
            Futuristic ping pong at its finest. Unleash skills, challenge
            friends{" "}
          </div>
        </motion.div>
        <motion.div
          ref={containerRef}
          className="flex w-full h-full items-center justify-center flex-col"
        >
          <Canvas shadows className={` `}>
            <PerspectiveCamera
              makeDefault
              position={[
                -10.9,
                rotation < 0 ? 0.888888 : rotation + 0.888888,
                (rotation < 0
                  ? 0
                  : (rotation * 3.6666666).toFixed(2)) as number,
              ]}
              fov={(isMobile ? 52 : 10) + (rotation < -1 ? -12.5 : rotation * 10)}
            />
            <color attach="background" args={["#121A28"]} />
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

            <spotLight
              intensity={0.45}
              position={[-20, 20, 20]}
              penumbra={0.2}
            />
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
            <RoomModel
              rotation={rotation}
              setRotation={setRotation}
              updateProgress={updateProgress}
            />
          </Canvas>
          <div className="absolute bottom-24 w-full h-12 flex items-center justify-center md:hidden">
            <PrimaryButton
              text="Get started"
              onClick={() => {
                router.push("/login");
              }}
            />
          </div>
          <AnimatedScroll rotation={rotation} />
        </motion.div>
      </div>
      <div
        className={` w-full absolute  top-1/2 overflow-y-hidden ${
          progressRef.current == 100 ? "invisible " : "visible"
        }`}
      >
		<ProgressCounter progressValue={progressRef.current} />
      </div>
    </div>
  );
}
