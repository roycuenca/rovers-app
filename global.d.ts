export type RoversType = {
  camera: CameraType;
  earth_date: Date;
  id: number;
  img_src: string;
  rover: Rover;
  sol: number;
};

export type CameraType = {
  full_name: string;
  id: number;
  name: string;
  rover_id: number;
};

export type Rover = {
  cameras: any[];
  id: number;
  name: string;
  status: string;
};
