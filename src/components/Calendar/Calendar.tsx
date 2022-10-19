import React, { useState } from "react";
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	format,
	getDay,
	isEqual,
	isSameMonth,
	isToday,
	parse,
} from "date-fns";
import { Data } from "../../data/data";
let colStartClasses = [
	"col-start-7",
	"",
	"col-start-2",
	"col-start-3",
	"col-start-4",
	"col-start-5",
	"col-start-6",
];
function classNames<T>(...classes: T[]) {
	return classes.filter(Boolean).join(" ");
}

interface CalendarProps {
	data: Data;
	setTimeDate: React.Dispatch<React.SetStateAction<Date>>;
	setYellow: React.Dispatch<React.SetStateAction<boolean>>;
	setGreen: React.Dispatch<React.SetStateAction<boolean>>;
	setGrey: React.Dispatch<React.SetStateAction<boolean>>;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Calendar({
	data,
	setTimeDate,
	setYellow,
	setGreen,
	setGrey,
	setShowModal,
}: CalendarProps) {
	const getData = (date: string) => {
		const dateArray = date.split(".");
		const year = parseInt(dateArray[1]);
		const month = parseInt(dateArray[0]) - 1;
		const startDate = new Date(year, month);
		return { year, month, startDate };
	};
	const { year, month, startDate } = getData(data.date);
	const [selectday, setSelectday] = useState<Date>(startDate);
	const [currentMonth, setCurrentMonth] = useState(
		format(startDate, "MMM-yyyy")
	);
	const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

	let days = eachDayOfInterval({
		start: firstDayCurrentMonth,
		end: endOfMonth(firstDayCurrentMonth),
	});
	function green(day: Date) {
		return data.green.find((item) => {
			if (item.startsWith("0")) {
				return isEqual(new Date(year, month, parseInt(item.split("")[1])), day);
			}
			return isEqual(new Date(year, month, parseInt(item)), day);
		});
		// return false;
	}
	function yellow(day: Date) {
		return data.yellow.find((item) => {
			if (item.startsWith("0")) {
				return isEqual(new Date(year, month, parseInt(item.split("")[1])), day);
			}
			return isEqual(new Date(year, month, parseInt(item)), day);
		});
	}
	function grey(day: Date) {
		return data.grey.find((item) => {
			if (item.startsWith("0")) {
				return isEqual(new Date(year, month, parseInt(item.split("")[1])), day);
			}
			return isEqual(new Date(year, month, parseInt(item)), day);
		});
	}
	const handleClick = (day: Date) => {
		setSelectday(day);
		setTimeDate(day);
		setYellow(yellow(day) ? true : false);
		setGreen(green(day) ? true : false);
		setGrey(grey(day) ? true : false);
		setShowModal(true);
	};
	console.log("day", getDay(days[2]));

	function previousMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	function nextMonth() {
		let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}
	// useEffect(() => {
	// 	setTimeDate(selectday);
	// }, [selectday, setTimeDate]);

	return (
		<div className="md:pr-14">
			<div className="flex items-center">
				<h2 className="flex-auto font-semibold text-gray-900">
					{format(firstDayCurrentMonth, "MMMM yyyy")}
				</h2>
				<button
					type="button"
					onClick={previousMonth}
					className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-black-400 hover:text-gray-500"
				>
					<span className="sr-only">Previous month</span>
					{"<"}
				</button>
				<button
					onClick={nextMonth}
					type="button"
					className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-black hover:text-gray-500"
				>
					<span className="sr-only">Next month</span>
					{">"}
				</button>
			</div>
			<div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
				<div>M</div>
				<div>T</div>
				<div>W</div>
				<div>T</div>
				<div>F</div>
				<div>S</div>
				<div>S</div>
			</div>
			<div className="grid grid-cols-7 mt-2 text-sm">
				{days.map((day, dayIdx) => {
					return (
						<div
							key={dayIdx}
							className={classNames(
								dayIdx === 0 && colStartClasses[getDay(day)],
								"py-1.5"
							)}
						>
							<button
								type="button"
								onClick={() => handleClick(day)}
								className={classNames(
									// isEqual(day, selectday) && "text-white",
									!isEqual(day, selectday) &&
										!isToday(day) &&
										isSameMonth(day, firstDayCurrentMonth) &&
										"text-gray-400",
									getDay(day) === 0 && "text-red-500",
									isEqual(day, selectday) &&
										isToday(day) &&
										"text-red-400 bg-black",
									isEqual(day, selectday) &&
										!isToday(day) &&
										"text-white bg-gray-900",
									!isEqual(day, selectday) && "hover:bg-gray-200",
									(isEqual(day, selectday) || isToday(day)) && "font-semibold",
									green(day) &&
										"bg-green-500 text-white shadow-sm hover:bg-green-700",
									yellow(day) &&
										"bg-yellow-500 text-white shadow-sm hover:bg-yellow-700",
									grey(day) &&
										"bg-white text-black shadow-sm border hover:bg-grey-400",
									"mx-auto flex h-8 w-8 items-center justify-center rounded-full"
								)}
							>
								<time dateTime={format(day, "yyyy-MM-dd")}>
									{format(day, "d")}
								</time>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Calendar;
