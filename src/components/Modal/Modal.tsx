import React from "react";
import { format } from "date-fns";
interface ModalProps {
	timeDate: Date;
	green: boolean;
	yellow: boolean;
	grey: boolean;
	handleClose: () => void;
}

function Modal({ timeDate, green, yellow, grey, handleClose }: ModalProps) {
	return (
		<div
			className="absolute p-4 w-full h-full  top-0 left-0 pt-36 z-10 flex justify-center items-start backdrop-filter backdrop-blur-sm"
			onClick={handleClose}
		>
			<div className=" rounded-lg w-72 h-auto shadow box-border relative top-0">
				<button
					type="button"
					onClick={() => handleClose()}
					className="absolute top-1 right-1 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
					data-modal-toggle="popup-modal"
				>
					<svg
						aria-hidden="true"
						className={`w-5 h-5 ${grey || green ? "text-white" : "text-black"}`}
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						></path>
					</svg>
					<span className="sr-only">Close modal</span>
				</button>
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
						<p className="py-2 px-3 shadow-sm bg-white rounded-md">No data</p>
					))}
			</div>
		</div>
	);
}

export default Modal;
