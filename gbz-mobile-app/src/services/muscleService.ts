import api from '../api/axios';

export async function getAllMuscles() {
  const response = await api.get('/muscles');
  return response.data;
}
