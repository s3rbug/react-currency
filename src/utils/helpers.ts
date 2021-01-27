export const combineStyles = (...styles: Array<string | undefined>) => {
	return styles.reduce((style, cur) => (cur ? style + " " + cur : style));
};