// Core
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { store } from '../../lib/mobx';

export const Filter = observer(() => {
    const Ref = useRef();
    const {
        setType,
        setMinTemperature,
        setMaxTemperature,
        applyFilter,
        isFormBlocked,
        isFiltered,
        resetFilter,
    } = store;

    const filter = useForm({
        mode: 'onTouched',
    });

    const onSubmit = filter.handleSubmit((options) => {
        event.preventDefault();
        applyFilter(options);
    });


    const checkboxHandler = (event) => {
        event.preventDefault();
        const { target } = event;
        if (target.id === 'cloudy') {
            target.classList.add('selected');
            filter.register('type', { value: 'cloudy' });
            Ref.current.children.sunny.classList.remove('selected');
            setType(target.id);
        } else {
            target.classList.add('selected');
            filter.register('type', { value: 'sunny' });
            Ref.current.children.cloudy.classList.remove('selected');
            setType(target.id);
        }
    };

    const inputHandler = () => {
        const { target } = event;
        if (target.id === 'min-temperature') {
            setMinTemperature(target.value);
        } else if (target.id === 'max-temperature') {
            setMaxTemperature(target.value);
        }
    };

    const clearFilter = () => {
        Ref.current.children.cloudy.classList.remove('selected');
        Ref.current.children.sunny.classList.remove('selected');
        filter.reset();
        resetFilter();
    };

    return (
        <form
            onSubmit = { onSubmit }
            className = 'filter'
            ref = { Ref }>
            <span
                id = 'cloudy'
                className = 'checkbox'
                onClick = { !isFiltered ? checkboxHandler : null }>Облачно</span>
            <span
                id = 'sunny'
                className = 'checkbox'
                onClick = { !isFiltered ? checkboxHandler : null }>Солнечно</span>


            <p className = 'custom-input'>
                <label htmlFor = 'min-temperature'>Минимальная Температура</label>
                <input
                    id = 'min-temperature' type = 'number'
                    disabled = { isFiltered }
                    { ...filter.register('min-temperature') } onInput = { inputHandler }></input>
            </p>
            <p className = 'custom-input'>
                <label htmlFor = 'max-temperature'>Максимальная Температура</label>
                <input
                    id = 'max-temperature' type = 'number'
                    disabled = { isFiltered }
                    { ...filter.register('max-temperature') } onInput = { inputHandler }></input>
            </p>
            { isFiltered && <button onClick = { clearFilter }> Сбросить </button> }
            { !isFiltered && <button disabled = { isFormBlocked }> Отфильтровать </button> }
        </form>
    );
});
