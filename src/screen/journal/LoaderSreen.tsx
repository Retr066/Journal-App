import { TailSpin } from "react-loader-spinner";

export const LoaderSreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
      className="animate__animated animate__fadeIn "
    >
      <div
        style={{
          backgroundSize: "cover",
          backgroundImage:
            "url(https://res.cloudinary.com/dsulcam/image/upload/v1624776603/skueresoft_qoczsy.png)",
          width: "570px",
          height: "400px",
        }}
      ></div>
      <TailSpin color="black" ariaLabel="loading-indicator" />
    </div>
  );
};
