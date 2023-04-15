const profilePicture = document.querySelector('.profile-picture');
const postsPicture = document.querySelectorAll('.post-picture');
const userName = document.querySelector('.user-name');
const userEmail = document.querySelector('.user-email');
const userPhone = document.querySelector('.user-phone');
const userLocation = document.querySelector('.user-location');
const userWall = document.querySelector('.user-wall');
const postAuthor = document.querySelectorAll('.post-author');
const renderUserButton = document.querySelector('.render-new-user');
const header = document.querySelector('.header');
const postBodyOne = document.querySelector('.post-one');
const postBodyTwo = document.querySelector('.post-two');
console.log(postBodyOne, postBodyTwo);

const generateRandomUser = () => {
	fetch('https://randomuser.me/api/')
		.then((res) => res.json())
		.then((data) => {
			const user = data.results[0];
			renderUser(user);
		});
};

const getPosts = () => {
	fetch('js/posts.json')
		.then((res) => res.json())
		.then((data) => {
			const randomPostOne = Math.floor(Math.random() * data.length);
			const randomPostTwo = Math.floor(Math.random() * data.length);
			postBodyOne.textContent = data[randomPostOne].body;
			postBodyTwo.textContent = data[randomPostTwo].body;
		});
};

const renderUser = (user) => {
	displayUserData(user);
	displayUserPosts(user);
	generateRandomBackgroundImage();
};

const displayUserData = (user) => {
	profilePicture.src = user.picture.large;
	userName.innerHTML = `<span class="bold"> Name: </span> ${user.name.first} ${user.name.last}`;
	userEmail.innerHTML = `<span class="bold"> Email: </span> ${user.email}`;
	userPhone.innerHTML = `<span class="bold"> Phone: </span> ${user.phone}`;
	userLocation.innerHTML = `<span class="bold"> City: </span> ${user.location.city}, ${user.location.country}`;
};

const displayUserPosts = (user) => {
	userWall.textContent = `${user.name.first} ${user.name.last}'s Posts`;
	postsPicture.forEach((post) => {
		post.src = user.picture.thumbnail;
	});
	postAuthor.forEach((title) => {
		title.textContent = `${user.name.first} ${user.name.last}`;
	});

	getPosts();
};

const generateRandomBackgroundImage = () => {
	const randomIndex = Math.floor(Math.random() * 10 + 1);
	header.style.backgroundImage = `url(../../dist/assets/images/background-${randomIndex}.jpg)`;
};

window.addEventListener('DOMContentLoaded', generateRandomUser);
renderUserButton.addEventListener('click', generateRandomUser);
