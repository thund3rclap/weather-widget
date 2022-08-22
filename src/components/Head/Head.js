// Core
import { observer } from 'mobx-react-lite';
import { store } from '../../lib/mobx';

// Hooks
import { useGetWeather } from '../../hooks/useGetWeather';

// Helpers
import { getDayFromDate, getDayOfMonthFromDate, getMonthFromDate } from '../../helpers';

export const Head = observer(() => {
    const { data } = useGetWeather();
    const { selectedDayId } = store;
    const currentDay = data?.filter((day) => selectedDayId === day.id);

    return (
        <div className = 'head'>
            <div className = { `icon ${currentDay[ 0 ]?.type}` }></div>
            <div className = 'current-date'>
                <p>{ getDayFromDate(currentDay[ 0 ]?.day) }</p>
                <span>{ getDayOfMonthFromDate(currentDay[ 0 ]?.day) } { ' ' }
                    { getMonthFromDate(currentDay[ 0 ]?.day) }</span>
            </div>
        </div>
    );
});
