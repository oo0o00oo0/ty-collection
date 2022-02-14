function LightRig() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[20, 100, 50]} color="hotpink" intensity={2} />
      <pointLight position={[20, -100, 50]} color="lightblue" intensity={2} />
    </>
  )
}

export default LightRig
