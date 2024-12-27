import axios from 'axios';
import { MountainDay } from '../types/mountain-day';

export const getAllMountainDays = async () => {
  let data: MountainDay[] = [];
  try {
    const uri = 'http://localhost:5073/api/MountainDays/GetAll';
    const response = await axios.get(uri);
    data = response.data.value;
    return data;
  } catch (error) {
    return false;
  }
};

export const addMountainDay = async (d: MountainDay) => {
  try {
    const uri = 'http://localhost:5073/api/MountainDays/CreateEdit';
    const response = await axios.post(uri, d);
    return true;
  } catch (error) {
    return false;
  }
};
