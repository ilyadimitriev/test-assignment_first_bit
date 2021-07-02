import fetchData from "./fetchData";
import * as formPageContent from "./formPageContent";
import formURL from "./formURL";

const handleUserStatusFilter = () => {
	const userStatusFilter = document.querySelector('.selection__user-status-selector');
	const filters = [...userStatusFilter.querySelectorAll('.user-status-selector__input')];

	userStatusFilter.addEventListener('change', event => {
		const target = event.target.closest('.user-status-selector__input');
		if (target) {
			const appSettings = JSON.parse(localStorage.getItem('app-settings'));
			appSettings.page = 1;
			if (!target.checked) {
				delete appSettings.status;
			} else {
				if (target === filters[0]) {
					filters[1].checked = false;
					appSettings.status = true;
				} else {
					filters[0].checked = false;
					appSettings.status = false;
				}
			}
			localStorage.setItem('app-settings', JSON.stringify(appSettings));
			formPageContent.addLoadScreen();
			fetchData({
				method: 'GET',
				url: formURL(),
				callback: callbackFunc,
				headers: {
					'accept': 'application/json'
				}
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
	});
};

export default handleUserStatusFilter;
