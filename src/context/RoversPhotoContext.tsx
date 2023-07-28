import React, { ReactNode, createContext, useEffect, useState } from 'react';

import type { RoversType } from '../../global.js';
import apiServices from '../api/apiServices';

type RoverPhotosContextType = {
  photos: RoversType[];
  loading: boolean;
  error: string | null;
  page: number;
  loadMorePhotos: () => void;
  fetchRoverPhotos: () => void;
  filterFetchByEarthDate: (
    roverName: string,
    cameraName: string,
    earthDate: string
  ) => void;
  filterFetchBySolDate: (
    roverName: string,
    cameraName: string,
    eartDate: string,
    sol: string
  ) => void;
  filterFromFavorite: (
    roverName: string,
    cameraName: string,
    eartDate: string,
    sol: string
  ) => void;
};

type RoverContextProps = {
  children: ReactNode;
};

const defaultContextValue: RoverPhotosContextType = {
  photos: [],
  loading: false,
  error: null,
  page: 1,
  loadMorePhotos: () => {},
  fetchRoverPhotos: () => {},
  filterFetchByEarthDate: () => {},
  filterFetchBySolDate: () => {},
  filterFromFavorite: () => {},
};

const RoverPhotosContext =
  createContext<RoverPhotosContextType>(defaultContextValue);

export const RoverPhotosProvider: React.FC<RoverContextProps> = ({
  children,
}) => {
  const [photos, setPhotos] = useState<RoversType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoverPhotos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiServices.getRoverPhotos(page);

      if (page === 1) {
        setPhotos(response.photos);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...response.photos]);
      }
    } catch (err) {
      setError('Error getting rover photos. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterFetchByEarthDate = async (
    roverName: string,
    cameraName: string,
    earthDate: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiServices.getRoverPhotosByFilter(
        roverName.toLocaleLowerCase(),
        cameraName.toLocaleUpperCase(),
        earthDate,
        1
      );

      setPhotos(response.photos);
    } catch (err) {
      setError(
        'Error getting rover photos by Earth Date. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const filterFetchBySolDate = async (
    roverName: string,
    cameraName: string,
    earthDate: string,
    sol: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiServices.getRoverPhotosBySolDate(
        roverName.toLocaleLowerCase(),
        cameraName.toLocaleUpperCase(),
        earthDate,
        sol,
        1
      );

      setPhotos(response.photos);
    } catch (err) {
      setError('Error getting rover photos by Sol. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filterFromFavorite = async (
    roverName: string,
    cameraName: string,
    earthDate: string,
    sol: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      setPhotos([]);

      if (Number(sol) === 0) {
        filterFetchByEarthDate(roverName, cameraName, earthDate);
      } else {
        filterFetchBySolDate(roverName, cameraName, earthDate, sol);
      }
    } catch (err) {
      setError(
        'Error getting rover photos by Favorite. Please try again later.'
      );
    }
  };

  useEffect(() => {
    fetchRoverPhotos();
  }, []);

  const loadMorePhotos = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <RoverPhotosContext.Provider
      value={{
        photos,
        loading,
        error,
        page,
        loadMorePhotos,
        fetchRoverPhotos,
        filterFetchByEarthDate,
        filterFetchBySolDate,
        filterFromFavorite,
      }}
    >
      {children}
    </RoverPhotosContext.Provider>
  );
};

export default RoverPhotosContext;
