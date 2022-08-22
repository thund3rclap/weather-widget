import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const getDayFromDate = (date) => {
    if (date) {
        return format(date, 'eeee', { locale: ru });
    }
};


export const getMonthFromDate = (date) => {
    if (date) {
        return format(date, 'LLL', { locale: ru });
    }
};

export const getDayOfMonthFromDate = (date) => {
    if (date) {
        return format(date, 'd', { locale: ru });
    }
};
