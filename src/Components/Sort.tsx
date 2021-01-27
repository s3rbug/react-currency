import React from 'react'
import { combineStyles } from '../utils/helpers'
import classes from './Sort.module.css'

type PropsType = {
    sortByBuy?: () => void;
    sortBySell?: () => void;
    className?: string;
}

const Sort = ({sortByBuy, sortBySell, className}:PropsType) => {
    return <div className={combineStyles(classes.wrapper, className)}>
        <div><span onClick={sortByBuy}>Купівля</span></div>
        <div><span onClick={sortBySell}>Продаж</span></div>
    </div>
}

export default Sort