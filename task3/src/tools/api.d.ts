import { AxiosInstance } from 'axios';

declare module '@/tools/api' {
  const useAxiosInstance: () => AxiosInstance;
  export default useAxiosInstance;
}