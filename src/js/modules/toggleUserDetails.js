const toggleUserDetails = () => {

	document.querySelector('.main').addEventListener('click', event => {
		const target = event.target.closest('.user-info__show-more');
		if (target) {
			const user = event.target.closest('.user');
			const userDetails = user.querySelector('.user-details');

			if (target.classList.contains('active')) {
				target.classList.toggle('active');
				userDetails.classList.toggle('active');
			} else {
				target.classList.toggle('active');
				userDetails.classList.toggle('active');
			}
		}
	});

};

export default toggleUserDetails;
