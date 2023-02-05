function main() {
  let imageDataURL;
  const myDropzone = new Dropzone(".profile-pic-container", {
    url: "/falsa",
    clickable: true,
    autoProcessQueue: false,
  });

  myDropzone.on("thumbnail", function (file) {
    // usando este evento pueden acceder al dataURL directamente
    imageDataURL = file;
  });

  const form = document.querySelector(".form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = e.target.fullname.value;
    const bio = e.target.bio.value;
    const imagen = imageDataURL.dataURL;
    console.log({nombre, bio, imagen});
  });
}

main();
