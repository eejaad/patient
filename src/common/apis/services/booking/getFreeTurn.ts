import { clinicClient } from '@/common/apis/client';
import { formData } from '@/common/utils/formData';
import { getCookie } from 'cookies-next';
import { useMutation } from '@tanstack/react-query';
import { setTerminal } from '../auth/setTerminal';

interface Params {
  center_id: string;
  user_center_id: string;
  service_id: string;
  type: 'web' | 'app';
}

export const getFreeTurn = (params: Params) => {
  setTerminal();

  return clinicClient.post(
    '/api/getFreeTurn',
    formData({
      ...params,
      terminal_id: getCookie('terminal_id'),
    }),
  );
};

export const useGetFreeTurn = () => {
  return useMutation(getFreeTurn);
};
