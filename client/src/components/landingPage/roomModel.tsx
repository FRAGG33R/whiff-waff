import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

export default function RoomModel (props: {
	rotation: number;
	setRotation: (rt: number) => void;
	updateProgress: (loader: GLTFLoader) => void;
  }) {
	const gltf = useLoader(GLTFLoader, "Model/Room3d.gltf", props.updateProgress);
  
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
	  if (rotation.toFixed(1) as unknown as number <  -2.3) props.setRotation(-2.4);
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