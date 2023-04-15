const profilePicture = document.querySelector('.profile-picture');
const postsPicture = document.querySelectorAll('.post-picture');
console.log(postsPicture);

const generateRandomUser = () => {
	fetch('https://randomuser.me/api/')
		.then((res) => res.json())
		.then((data) => {
			const user = data.results[0];
			renderUser(user);
		});
};

const renderUser = (user) => {
	displayUserData(user);
	displayUserPosts(user);
};

const displayUserData = (user) => {
	profilePicture.src = user.picture.large;
};

const displayUserPosts = (user) => {
	postsPicture.forEach((post) => {
		post.src = user.picture.thumbnail;
	});
};

generateRandomUser();
