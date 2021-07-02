import fetchData from "./fetchData";
import formURL from "./formURL";
import * as formPageContent from "./formPageContent";

const deleteUser = (id, callback = false) => {
	fetchData({
		url: `https://test-assignment.bitrx24.com/user/${id}/`,
		method: 'DELETE',
		headers: {
			'accept': 'application/json'
		}
	});
	const user = document.getElementById('user-' + id);
	if (callback) {
		updatePage(user);
	}
	user.classList.add('delete');
};

function updatePage(user) {
	user.addEventListener('transitionstart', () => {
		fetchData({
			url: formURL(),
			method: 'GET',
			headers: {
				'accept': 'application/json'
			},
			callback: callbackFunc
		});
	}, {once: true});

	function callbackFunc(data) {
		formPageContent.formUserList(data);
		formPageContent.changsUserListColumns({
			setWidth: true,
			setOrder: true,
			setDisplay: true
		});
		formPageContent.formPagination(data);
	}
}


export default deleteUser;
