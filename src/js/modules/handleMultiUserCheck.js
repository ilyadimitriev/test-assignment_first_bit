const handleMultiUserCheck = () => {
	const wrapper = document.querySelector('.wrapper');
	const multiChangePopup = document.querySelector('.popup-multi_data_change');

	wrapper.addEventListener('change', event => {
		const targetCheckBox = event.target.closest('input[name="user-checkbox"]');
		if (targetCheckBox) {

			//close all editBars, if any exist
			if (document.querySelector('.user-edit')) {
				const users = [...document.querySelectorAll('.user')];
				let userEdit;
				users.forEach(elem => {
					userEdit = elem.querySelector('.user-edit');
					if (userEdit) {
						userEdit.addEventListener('transitionend', event => {
							event.target.remove();
						}, { once: true });
						userEdit.classList.remove('active');
						elem.querySelector('.user-info').classList.add('active');
					}
				});
			}

			multiChangePopup.style.transition = `300ms`;

			const checkBoxes = [...document.querySelectorAll('input[name="user-checkbox"]')];
			if (targetCheckBox === checkBoxes[0]) {
				if (targetCheckBox.checked) {
					checkBoxes.forEach(elem => {
						elem.checked = true;
						multiChangePopup.classList.add('active');
					});
				} else {
					checkBoxes.forEach(elem => {
						elem.checked = false;
						multiChangePopup.classList.remove('active');
					});
				}
			} else {
				if (!targetCheckBox.checked) {
					checkBoxes[0].checked = false;
					multiChangePopup.classList.remove('active');
				} else {
					if (!checkBoxes.some((elem, index) => {
						if (index === 0) return;
						if (!elem.checked) {
							return true;
						}
					})) {
						checkBoxes[0].checked = true;
					}
				}
				if (checkBoxes.some(elem => {
					if (elem.checked) {
						return true;
					}
				})) {
					multiChangePopup.classList.add('active');
				} else {
					multiChangePopup.classList.remove('active');
				}
			}
		} else return;
	});
};

export default handleMultiUserCheck;
