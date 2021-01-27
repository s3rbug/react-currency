import React from "react";
import { combineStyles } from "../utils/helpers";
import classes from "./CurrencyHeader.module.css";

type PropsType = {
    className: string;
};

type BankPropsType = {
    src: string;
    time: string;
    alt: string;
    link: string;
};

const Bank = ({ src, alt, time, link }: BankPropsType) => {
    return (
        <div className={classes.block}>
            <img className={classes.image} src={src} alt={alt} />
            <span className={classes.time}>Станом на {time}</span>
            <a
                className={classes.link}
                href={link}
                rel="noreferrer"
                target="_blank"
            >
                {alt}
            </a>
        </div>
    );
};

const CurrencyHeader = ({ className }: PropsType) => {
    return (
        <div className={className}>
            <div className={combineStyles(classes.wrapper, className)}>
                <Bank
                    src="https://rates.ideil.com/static/src/img/gover@3x.png"
                    alt="Говерла"
                    time="03:03"
                    link="https://goverla.ua/"
                />
                <Bank
                    src="https://rates.ideil.com/static/src/img/gover@3x.png"
                    alt="Говерла"
                    time="03:03"
                    link="https://goverla.ua/"
                />
                <Bank
                    src="https://rates.ideil.com/static/src/img/gover@3x.png"
                    alt="Говерла"
                    time="03:03"
                    link="https://goverla.ua/"
                />
            </div>
        </div>
    );
};

export default CurrencyHeader;
