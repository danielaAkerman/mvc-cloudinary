import { User, Product } from "../models";
import { cloudinary } from "../lib/cloudinary";

export async function updateProfile(updateData) {
  if (updateData.imageDataURL) {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        discard_original_filename: true,
        width: 1000,
      },
      function (error, result) {
        // URL de la imagen guardada
        console.log(result.secure_url);
      }
    );
  }
}
