import { clinicClient } from '@/common/apis/client';
import { useQuery } from 'react-query';

export const getAppHome = () => {
  return clinicClient.post('/api/appHome');
};
export const useGetAppHome = () => {
  return useQuery('home', getAppHome);
};
