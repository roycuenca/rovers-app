import { addDays } from 'date-fns';
import { errorServiceHandler, formattedDate } from '../utils/helpers/Helpers';
import axiosInstance from './index';

const API_KEY = 'kYwxVZRdwghhliymoQ150F1lXgU7VF3rmMvplpgm';
const currentDate = new Date();
const lastDate = formattedDate(addDays(currentDate, -1));

const apiServices = {
  getRoverPhotos: async (page: number = 1) => {
    try {
      const response = await axiosInstance.get(`/rovers/curiosity/photos`, {
        params: {
          earth_date: lastDate,
          page,
          api_key: API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      errorServiceHandler(error);
    }
  },

  getRoverPhotosByFilter: async (
    roverName: string,
    cameraName: string,
    earthDate: string,
    page: number = 1
  ) => {
    try {
      const response = await axiosInstance.get(`/rovers/${roverName}/photos`, {
        params: {
          camera: cameraName,
          earth_date: earthDate,
          page: page,
          api_key: API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      errorServiceHandler(error);
    }
  },

  getRoverPhotosBySolDate: async (
    roverName: string,
    cameraName: string,
    earthDate: string,
    solDate: string,
    page: number = 1
  ) => {
    try {
      const response = await axiosInstance.get(`/rovers/${roverName}/photos`, {
        params: {
          camera: cameraName,
          earth_date: earthDate,
          sol: solDate,
          page: page,
          api_key: API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      errorServiceHandler(error);
    }
  },
};

export default apiServices;
