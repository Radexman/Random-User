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
const createPostButton = document.querySelector('.create-post-button');
const newPost = document.querySelector('.new-post');
const newPostInput = document.querySelector('#post-body');
const postButton = document.querySelector('.button-post');
const cancelButton = document.querySelector('.button-cancel');

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

const closePostWindow = (e) => {
	e.preventDefault();
	newPost.classList.add('new-post');
};

const createPost = (e) => {
	newPost.classList.remove('new-post');
};

const post = (e) => {
	if (!newPostInput.value) {
		e.preventDefault();
		alert('Please write post or cancel');
	} else {
		const newPost = document.createElement('div');
		newPost.classList.add('post');
		newPost.innerHTML = `<div class="post__title">
						<img src="${user.picture.thumbnail}" alt="User's profile picture" width="50" class="post-picture" />
						<h2 class="post-author"> ${user.name.first} ${user.name.last} </h2>
					</div>
					<div class="post__body post-one">
						${newPostInput.value}
					</div>`;
	}

	document.querySelector('.main__user-posts').appendChild(newPost);
};

window.addEventListener('DOMContentLoaded', generateRandomUser);
renderUserButton.addEventListener('click', generateRandomUser);
createPostButton.addEventListener('click', createPost);
postButton.addEventListener('click', post);
cancelButton.addEventListener('click', closePostWindow);
