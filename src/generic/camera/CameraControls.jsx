import { extend, useThree, useFrame } from "@react-three/fiber"
import { Vector3 } from "three"
import { memo, useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

extend({ OrbitControls })

function CameraControls() {
  const controls = useRef()

  const {
    camera,
    gl: { domElement },
  } = useThree()

  useFrame(({ clock, camera }) => {
    controls.current.update()
  })

  return (
    <>
      <orbitControls
        enableZoom={true}
        enablePan={true}
        enableDamping={true}
        maxPolarAngle={Math.PI / 2 - 0.35}
        minPolarAngle={0.4}
        ref={controls}
        args={[camera, domElement]}
        // minPan={new Vector3(0, 0, 0)}
        // manPan={new Vector3(0, 0, 0)}
        // maxDistance={65000}
        // minDistance={6000}
        // maxAzimuthAngle={1}
        // minAzimuthAngle={0.5}
      />
    </>
  )
}

export default memo(CameraControls)
