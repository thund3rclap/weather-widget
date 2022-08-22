// Core
import React from 'react';

// Components
import {
    Filter, Head, Weather, Forecast,
} from './components';

// Instruments


export const App = () => {
    return (
        <main>
            <Head />
            <Filter />
            <Weather />
            <Forecast />
        </main>
    );
};

