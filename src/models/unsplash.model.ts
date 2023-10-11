import { UnsplashResponse } from "../types/unsplash.types";

export const searchPhotos = async (search: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/search/photos?query=${search}&client_id=${
      import.meta.env.VITE_API_KEY
    }`
  );

  const data: UnsplashResponse = await response.json();

  return data;
};
