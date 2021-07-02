const fetchData = ({ url, method = 'GET', headers, body, callback }) => {
	fetch(url, {
		method: method,
		headers: headers,
		body: body
	})
		.then(response => {
			if (response.status === 422 || response.ok) {
				return response.json();
			}
		})
		.then(data => {
			if (callback) {
				callback(data);
			}
		});
};

export default fetchData;
