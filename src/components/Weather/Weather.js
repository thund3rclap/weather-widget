// Core
import { observer } from 'mobx-react-lite';
import { useGetWeather } from '../../hooks/useGetWeather';
import { store } from '../../lib/mobx';


export const Weather = observer(() => {
    const { data } = useGetWeather();
    const { selectedDayId } = store;
    const currentDay = data?.filter((day) => selectedDayId === day.id);

    if (!currentDay.length) {
        return null;
    }

    return (
        <div className = 'current-weather'>
            <p className = 'temperature'>{ currentDay[ 0 ]?.temperature }</p>
            <p className = 'meta'>
                <span className = 'rainy'>{ '%' }{ currentDay[ 0 ]?.rain_probability }</span>
                <span className = 'humidity'>{ '%' }{ currentDay[ 0 ]?.humidity }</span>
            </p>
        </div>
    );
});
