const toggleDetailHint = () => {

	document.querySelector('.main').addEventListener('mouseover', event => {
		const target = event.target.closest('.user-details__section-detail .user-details__header');
		if (target) {
			const section = event.target.closest('.user-details__section-detail');
			const popupDetails = section.querySelector('.popup-details');
			popupDetails.classList.add('active');
		} else {
			const popupDetails = document.querySelector('.popup-details.active');
			if (popupDetails) {
				popupDetails.classList.remove('active');
			}
		}
	});
};

export default toggleDetailHint;
