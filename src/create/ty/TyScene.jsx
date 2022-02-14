import { OrbitControls, Stage, useGLTF, useTexture } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import { Suspense, useEffect } from "react"
import { sRGBEncoding } from "three"
import { Vector3 } from "three"
import { MeshBasicMaterial } from "three"
import CloudsLoader from "./CloudsLoader"
import { useStore } from "./store"
const camera = {
  zoom: 1,
  near: 1,
  far: 400,
  position: [3, 2, 0],
}

const jumbo_text = "src/create/ty/textures/jumbo_text.jpg"
const sampson_text = "src/create/ty/textures/sampson_text.jpg"
const meshUrl = "src/create/ty/models/all.glb"

function HandleLoad() {
  const setLoaded = useStore((state) => state.setLoaded)

  useEffect(() => {
    return () => setLoaded(true)
  }, [])
  return null
}

function TyScene() {
  return (
    <Canvas
      gl={{
        antialias: true,
      }}
      dpr={2}
      camera={camera}
    >
      TyScene
      <Suspense fallback={<HandleLoad />}>
        {/* <Suspense fallback={<HandleLoad />}> */}
        <Stage environment={null}>
          <Loader />
        </Stage>
        <CameraRig />
        <HandleLoad />
        <group rotation-y={Math.PI / 2}>
          <CloudsLoader />
        </group>
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

function CameraRig() {
  const camPos = new Vector3(20, 0, 0)
  const { camera } = useThree()

  useEffect(() => camera.position.set(), [])

  return null
}

function Loader() {
  const { nodes } = useGLTF(meshUrl)

  const jumboFur = useTexture(jumbo_text)
  const sampsonFur = useTexture(sampson_text)

  jumboFur.flipY = false
  sampsonFur.flipY = false

  jumboFur.encoding = sRGBEncoding
  sampsonFur.encoding = sRGBEncoding

  const jumboMat = new MeshBasicMaterial({
    map: jumboFur,
  })
  const sampsonMat = new MeshBasicMaterial({
    map: sampsonFur,
  })

  console.log(nodes)

  const nodesArr = Object.values(nodes)

  return (
    <>
      <group rotation-y={(Math.PI / 2) * -1}>
        {/* {nodesArr.map((o) => ( */}
        <TyElement o={nodesArr[0]} material={sampsonMat} />
        <TyElement o={nodesArr[1]} material={jumboMat} />
      </group>
      {/* ))} */}
    </>
  )
}

function TyElement({ o, material }) {
  const isJumbo = o.name === "jumbo"

  return (
    <mesh
      material={material}
      position={isJumbo ? [0, 0, 2] : [0, 0, 0]}
      geometry={o.geometry}
    />
  )
}

export default TyScene
