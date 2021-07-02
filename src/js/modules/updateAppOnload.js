import calcfreeSpace from "./calcFreeSpace";
import fetchData from "./fetchData";
import * as formPageContent from "./formPageContent";
import formURL from "./formURL";

const updateAppOnload = () => {
	formPageContent.addLoadScreen();
	let appSettings = localStorage.getItem('app-settings');
	window.addEventListener('load', () => {
		const columnSettings = JSON.parse(localStorage.getItem('column-settings'));
		if (columnSettings && columnSettings.free_space) return;
		calcfreeSpace();
	}, {once: true});


	if (appSettings === null || !appSettings) {
		localStorage.setItem('app-settings', JSON.stringify({}));
	}
	
	appSettings = JSON.parse(localStorage.getItem('app-settings'));
	if (appSettings.q) {
		delete appSettings.q;
		localStorage.setItem('app-settings', JSON.stringify(appSettings));
	}
	fetchData({
		method: 'GET',
		url: formURL(),
		callback: callbackFunc,
		headers: {
			'accept': 'application/json'
		}
	});
	
	function callbackFunc(data) {
		const columnSettings = JSON.parse(localStorage.getItem('column-settings'));

		formPageContent.formUserList(data);
		formPageContent.changsUserListColumns({
			setWidth: true,
			setOrder: true,
			setDisplay: true
		});
		if (appSettings.sort_by) {
			formPageContent.formColumnHeaders();
		}
		if (columnSettings.order || columnSettings.display || columnSettings.width) {
			formPageContent.formColumnsFilterBar();
			formPageContent.formNavBar();
		}
		if (appSettings.payment_status) {
			formPageContent.formPaymentStatusFilter();
		}
		if (appSettings.status === true || appSettings.status === false) {
			formPageContent.formUserStatusFilter();
		}
		formPageContent.formPagination(data);
	}	
};

export default updateAppOnload;
