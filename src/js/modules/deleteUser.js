import fetchData from "./fetchData";
import formURL from "./formURL";
import * as formPageContent from "./formPageContent";

const deleteUser = (id, callback = false) => {
	const user = document.getElementById('user-' + id);
	user.classList.add('delete');
	
	if (callback) {
		fetchData({
			url: `https://test-assignment.bitrx24.com/user/${id}/`,
			method: 'DELETE',
			headers: {
				'accept': 'application/json'
			},
			callback: updatePage
		});

		function updatePage() {
			formPageContent.addLoadScreen();
			fetchData({
				url: formURL(),
				method: 'GET',
				headers: {
					'accept': 'application/json'
				},
				callback: callbackFunc
			});
		
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
	} else {
		fetchData({
			url: `https://test-assignment.bitrx24.com/user/${id}/`,
			method: 'DELETE',
			headers: {
				'accept': 'application/json'
			}
		});

	}
};



export default deleteUser;
