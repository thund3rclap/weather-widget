import { useQuery } from 'react-query';
import { api } from '../api/api';

export const useGetWeather = () => {
    const { data, isFetched } = useQuery('weather', () => api.getWeather('/forecast'));

    return {
        data: data || [],
        isFetched,
    };
};
