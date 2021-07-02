import deleteUser from "./deleteUser";
import { openUserEdit } from "./toggleUserEdit";

const handleMultiChangePopup = () => {
	const popup = document.querySelector('.popup-multi_data_change');
	popup.addEventListener('click', event => {
		const targetBtn = event.target.closest('.popup-multi_data_change__btn');
		if (targetBtn) {
			const checkBoxes = [...document.querySelectorAll('input[name="user-checkbox"]')];

			if (targetBtn.classList.contains('popup-multi_data_change__edit-btn')) {
				popup.classList.remove('active');
				checkBoxes.forEach((elem, index) => {
					if (index === 0) {
						elem.checked = false;
						return;
					};
					if (elem.checked) {
						elem.checked = false;
						const intId = +elem.id.replace(/[\D]/gi, '');
						openUserEdit(intId);
					}
				});
			} else if (targetBtn.classList.contains('popup-multi_data_change__delete-btn')) {
				popup.classList.remove('active');
				const activeCheckBoxes = [...document.querySelectorAll('input[name="user-checkbox"]:checked')];

				activeCheckBoxes.forEach((elem, index) => {
					// elem.checked = false;
					if (elem.id === 'main-user-checkbox') return;
					const intId = +elem.id.replace(/[\D]/gi, '');
					if (index !== activeCheckBoxes.length - 1) {
						deleteUser(intId);
					} else {
						deleteUser(intId, true);
					}
				});
			} else return;
		}
	});
};

export default handleMultiChangePopup;
