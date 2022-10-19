import React, { useState } from "react";
import { format } from "date-fns";
import Calendar from "./components/Calendar/Calendar";
import { data } from "./data/data";
import Modal from "./components/Modal/Modal";
function App() {
	const [timeDate, setTimeDate] = useState<Date>(new Date("2022-07-01"));
	const [green, setGreen] = useState<boolean>(false);
	const [yellow, setYellow] = useState<boolean>(false);
	const [grey, setGrey] = useState<boolean>(false);
	const [showModal, setShowModal] = useState<boolean>(false);

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<div className="pt-16 w-[100vw] h-[100vh] relative">
			<div
				className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6 "
				id="popup-modal"
			>
				<div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
					<Calendar
						data={data}
						setTimeDate={setTimeDate}
						setGreen={setGreen}
						setYellow={setYellow}
						setGrey={setGrey}
						setShowModal={setShowModal}
					/>
					{showModal && (
						<Modal
							timeDate={timeDate}
							green={green}
							yellow={yellow}
							grey={yellow}
							handleClose={handleClose}
						/>
					)}
					<section className="mt-12 md:mt-0 md:pl-14">
						<h2 className="font-semibold text-gray-900">
							Schedule for{" "}
							{timeDate && (
								<time dateTime={format(timeDate, "yyyy-MM-dd")}>
									{format(timeDate, "MMM dd, yyy")}
								</time>
							)}
						</h2>
						<ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
							{timeDate &&
								(green ? (
									<p className="bg-green-400 text-white py-2 px-3 rounded-md">{`Green ${format(
										timeDate,
										"yyyy-MM-dd"
									)}`}</p>
								) : yellow ? (
									<p className="bg-yellow-400 text-black py-2 px-3 rounded-md">{`Yellow ${format(
										timeDate,
										"yyyy-MM-dd"
									)}`}</p>
								) : grey ? (
									<p className="bg-gray-400 text-white py-2 px-3 rounded-md">{`Grey ${format(
										timeDate,
										"yyyy-MM-dd"
									)}`}</p>
								) : (
									<p>No data</p>
								))}
						</ol>
					</section>
				</div>
			</div>
		</div>
	);
}

export default App;
