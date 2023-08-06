import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
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
export const getThumbnailURL = (profileurl) => {
  const cid = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const image = cid.image(profileurl);
  return image.toURL();
};

/**
 * Resized Thumbnail URL
 * @param {String} profileurl
 * @returns String URL of the Image
 */
export const getResizedThumbnailURL = (profileurl) => {
  const cid = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUD_NAME },
  });
  const image = cid.image(profileurl).resize(thumbnail(140, 140));
  return image.toURL();
};
