const formURL = url => {
	let newURL;
	if (!url) {
		newURL = 'https://test-assignment.bitrx24.com/user/?';
	}
	
	const appSettings = JSON.parse(localStorage.getItem('app-settings'));
	for (let key in appSettings) {
		if (key === 'payment_status') {
			appSettings[key].forEach((elem, index) => {
				newURL+= `payment_status%5B%5D=${elem}`;
				if (appSettings[key].length - 1 !== index) {
					newURL+= '&';
				}
			});
		} else {
			newURL+= `${key}=${appSettings[key]}`;
		}
		const lastKey = Object.keys(appSettings)[Object.keys(appSettings).length - 1];
		if (key !== lastKey) {
			newURL+= '&'
		}
	}
	return newURL;
}

export default formURL;
