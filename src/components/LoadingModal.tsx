function LoadingModal() {
  return (
    <>
      <div className="w-[100vw] h-[100vh] fixed z-50 bg-overlay flex justify-center items-center  drop-shadow-2xl">
        <div className="square-loader"></div>
      </div>
    </>
  );
}

export default LoadingModal;
