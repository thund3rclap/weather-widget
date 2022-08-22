// Core
import React, { useEffect } from 'react';

// Context
import { observer } from 'mobx-react-lite';

// Hooks
import { useGetWeather } from '../../hooks/useGetWeather';

// Helpers
import { getDayFromDate } from '../../helpers';
import { store } from '../../lib/mobx';


export const Forecast = observer(() => {
    const { data } = useGetWeather();
    const {
        filteredDays, isFiltered, selectedDayId, setSelectedDayId,
    } = store;

    const forecastJsx = data?.slice(0, 7).map((day) => {
        const dateSelectingHandler = () => {
            setSelectedDayId(day?.id);
        };

        return (
            <div
                key = { day?.id } className = { `day ${day?.type} ${selectedDayId === day?.id ? 'selected' : ''}` }
                onClick = { dateSelectingHandler }>
                <p>{ getDayFromDate(day?.day) }</p>
                <span>{ day?.temperature }</span>
            </div>
        );
    });

    const filteredDaysJsx = filteredDays(data)?.slice(0, 7).map((day) => {
        const dateSelectingHandler = () => {
            setSelectedDayId(day?.id);
        };


        return (
            <div
                key = { day?.id } className = { `day ${day?.type} ${selectedDayId === day?.id ? 'selected' : ''}` }
                onClick = { dateSelectingHandler }>
                <p>{ getDayFromDate(day?.day) }</p>
                <span>{ day?.temperature }</span>
            </div>
        );
    });

    useEffect(() => {
        if (isFiltered) {
            setSelectedDayId(filteredDays(data)[ 0 ]?.id);
        } else {
            setSelectedDayId(data[ 0 ]?.id);
        }
    }, [data, isFiltered]);

    return (
        <div className = 'forecast'>
            { !isFiltered && forecastJsx }
            { isFiltered && filteredDaysJsx }
            { isFiltered && !filteredDaysJsx.length
            && <h1>По заданным критериям нет доступных дней</h1> }
        </div>
    );
});
