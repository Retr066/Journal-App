export const fileUpload = (file: any) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/duaj7oxcq/upload";

  const formData: any = new FormData();
  formData.append("upload_preset", "react_journal");
  formData.append("file", file);
  return new Promise(function (resolve, reject) {
    fetch(cloudUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => resolve(data.secure_url))
      .catch((e) => reject(e));
  });
};
