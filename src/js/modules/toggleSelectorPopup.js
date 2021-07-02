const toggleSelectorPopup = () => {
	document.addEventListener('click', event => {
		const targetPopup = event.target.closest('.popup-selector');
		const activePopup = document.querySelector('.popup-selector.active');
		const activeBtn = document.querySelector('.user-edit__payment-status-selector span.active');
		const targetBtn = event.target.closest('.user-edit__payment-status-selector span');


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
			if (targetBtn.classList.contains('active')) {
				activePopup.classList.remove('active');
				activeBtn.classList.remove('active');
				return;
			}
			targetBtn.classList.add('active');
			user = event.target.closest('.user');
			const popup = user.querySelector('.popup-selector');
			popup.classList.add('active');
			return;
		}

		if (activePopup) {
			const activePopupBtn = event.target.closest('.popup-selector label');
			if (activePopupBtn) {
				activeBtn.textContent = activePopupBtn.textContent;
			}
		}
	});
};

export default toggleSelectorPopup;
