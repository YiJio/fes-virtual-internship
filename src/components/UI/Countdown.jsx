// packages
import React, { useEffect, useState } from 'react';

export const Countdown = ({ time }) => {
	const [ui_counter, setUiCounter] = useState(time);
	const [ui_time, setUiTime] = useState({});

	const calculateTime = (count) => {
		const diff = Math.floor((count - Date.now()) / 1000);
		let timeLeft = { h: 0, m: 0, s: 0 };
		if(diff > 0) {
			timeLeft = { h: Math.floor(diff / 3600), m: Math.floor((diff % 3600) / 60), s: diff % 60 };
		}
		return timeLeft;
	}

	useEffect(() => {
		let intervalId = setInterval(() => {
			let count = ui_counter - 1;
			setUiCounter((prev) => prev - 1);
			setUiTime(calculateTime(count));
		}, 1000);
		return () => { clearInterval(intervalId) }
	}, [time, ui_counter]);

	return (
		<>
			{time - Date.now() > 0 && <div className='de_countdown'>{ui_time.h}h {ui_time.m}m {ui_time.s}s</div>}
		</>
	);
}

export default Countdown;