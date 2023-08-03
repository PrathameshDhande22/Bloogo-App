import { Cloudinary } from "@cloudinary/url-gen";
import { max } from "@cloudinary/url-gen/actions/roundCorners";

/**
 * Returns the Image URL
 * @param {String} profileurl 
 * @returns String
 */
export const getImageURL = (profileurl) => {
  const cid = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const image = cid.image(profileurl).roundCorners(max());
  return image.toURL();
};

/**
 * Returns the Image URL
 * @param {String} profileurl 
 * @returns String
 */
export const getThumbnailURL=(profileurl)=>{
  const cid = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const image=cid.image(profileurl)
  return image.toURL();
}
