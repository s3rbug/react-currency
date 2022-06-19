import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { useTypedSelector } from "../redux/reduxStore";
import { CurrencyType } from "../types/index_d";
import classes from "./CurrencyHeader.module.css";

type BankPropsType = {
	href: string;
	time: string;
	alt: string;
	image: string;
};

const Bank = ({ href, alt, time, image }: BankPropsType) => {
	return (
		<div className={classes.block}>
			<a href={href} target="_blank" rel="noreferrer">
				<img className={classes.image} src={image} alt={alt} />
			</a>
			<span className={classes.time}>Станом на {time}</span>
			<a
				className={classes.link}
				href={href}
				rel="noreferrer"
				target="_blank">
				{alt}
			</a>
		</div>
	);
};

type PropsType = {
	className: string;
	currencyType: CurrencyType;
};

const CurrencyHeader = ({ className, currencyType }: PropsType) => {
	const isMobile = useMediaQuery({
		query: "(max-width: 990px)"
	})
	const banks = useTypedSelector((state) => state.currency.banksOrder);
	const mobileBanks = useTypedSelector(state => state.currency.mobileBanksOrder)
	if(!isMobile)
		return (
			<div className={className}>
				<div className={clsx(classes.wrapper, className)}>{
				banks.map((bank) => {
						return (
							<Bank
								key={bank.alt}
								href={bank.href}
								alt={bank.alt}
								time={bank.time}
								image={bank.image}
							/>
						);
					})}
				</div>
			</div>
		);
	else
		return (
			<div className={className}>
				<div className={clsx(classes.wrapper, className)}>{
					mobileBanks.map((banks, banksId) => {
						if(currencyType === banksId){
							return (
								banks.map((bank) => {
									return <Bank
											key={bank.alt + banksId}
											href={bank.href}
											alt={bank.alt}
											time={bank.time}
											image={bank.image}
								/>
								})
							)
						}
						else
							return null
					})
				}
				</div>
			</div>
		); 
};

export default CurrencyHeader;
