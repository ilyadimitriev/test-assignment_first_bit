import deleteUser from "./deleteUser";
import removeMultiUserCheck from "./removeMultiUserCheck";
import { openUserEdit } from "./toggleUserEdit";

const handleOptionsPopup = () => {
	document.addEventListener('click', event => {
		const targetPopup = event.target.closest('.popup-options');
		const activePopup = document.querySelector('.popup-options.active');
		const activeBtn = document.querySelector('.user-info__btn-options.active');
		const targetBtn = event.target.closest('.user-info__btn-options');


		if (!targetPopup || (targetBtn && activeBtn)) {
			if (targetBtn && targetBtn.classList.contains('active')) {
				activePopup.classList.remove('active');
				activeBtn.classList.remove('active');
				return;
			}
			if (activePopup && !targetPopup) {
				activePopup.classList.remove('active');
				activeBtn.classList.remove('active');
			}
		}

		let user;

		if (targetBtn) {
			removeMultiUserCheck();
			if (targetBtn.classList.contains('active')) {
				activePopup.classList.remove('active');
				activeBtn.classList.remove('active');
				return;
			}
			targetBtn.classList.add('active');
			user = event.target.closest('.user');
			const popup = user.querySelector('.popup-options');
			popup.classList.add('active');
			return;
		}

		if (activePopup && targetPopup) {
			const editBtn = event.target.closest('.popup-options__edit');
			const deleteBtn = event.target.closest('.popup-options__delete');
			user = event.target.closest('.user');
			const intId = +user.id.replace(/[\D]/gi, '');
			if (editBtn) {
				openUserEdit(intId);
			} else if (deleteBtn) {
				deleteUser(intId, true);
			} else {
				return;
			}
		}
	});
};

export default handleOptionsPopup;
