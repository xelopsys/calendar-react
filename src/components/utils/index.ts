import { data } from "../../data/data";
import { isEqual } from "date-fns";
const getData = (date: string) => {
	const dateArray = date.split(".");
	const year = parseInt(dateArray[1]);
	const month = parseInt(dateArray[0]) - 1;
	const startDate = new Date(year, month);
	return { year, month, startDate };
};
export const { year, month, startDate } = getData(data.date);

export function green(day: Date) {
	return data.green.find((item) => {
		if (item.startsWith("0")) {
			return isEqual(new Date(year, month, parseInt(item.split("")[1])), day);
		}
		return isEqual(new Date(year, month, parseInt(item)), day);
	});
}
export function yellow(day: Date) {
	return data.yellow.find((item) => {
		if (item.startsWith("0")) {
			return isEqual(new Date(year, month, parseInt(item.split("")[1])), day);
		}
		return isEqual(new Date(year, month, parseInt(item)), day);
	});
}
export function grey(day: Date) {
	return data.grey.find((item) => {
		if (item.startsWith("0")) {
			return isEqual(new Date(year, month, parseInt(item.split("")[1])), day);
		}
		return isEqual(new Date(year, month, parseInt(item)), day);
	});
}
