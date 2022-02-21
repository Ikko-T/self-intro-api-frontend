const baseUrl = 'http://localhost:3000';
const userList = document.getElementById('user-list');

const fetchUser = async () => {
  const url = `${baseUrl}/api/v1/users`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }

  const users = await response.json();
  return users;
};

const addUser = (user) => {
  const userProfile = `
  <div class="m-2 border border-3">
      <div class="card">
        <div class="card-body">
          <div id="users-${user.id}">
            <p>First name: ${user.first_name}</p>
            <p>Last name: ${user.last_name}</p>
            <p>Gender: ${user.gender}</p>
            <p>Age: ${user.age}</p>
            <p>Company: ${user.company}</p>
            <p>Email: ${user.email}</p>
            <p>Phone number: ${user.phone_number}</p>
            <p>Twitter: ${user.twitter}</p>
            <p>Message: ${user.message}</p>
          </div>
        </div>
      </div>
  </div>

  `;
  userList.insertAdjacentHTML('beforeend', userProfile);
};

const displayUsers = async () => {
  try {
    const users = await fetchUser();
    users.forEach((user) => addUser(user));
  } catch (e) {
    alert(e);
  }
};

displayUsers();

// =========================================================

const button = document.getElementById('user-button');
const firstNameElement = document.getElementById('user-first-name');
const lastNameElement = document.getElementById('user-last-name');
const ageElement = document.getElementById('user-age');
const companyElement = document.getElementById('user-company');
const emailElement = document.getElementById('user-email');
const phoneNumberElement = document.getElementById('user-phone-number');
const twitterElement = document.getElementById('user-twitter');
const messageElement = document.getElementById('user-message');

function selectGender() {
  let genderElements = document.getElementsByName('gender');
  let len = genderElements.length;
  let checkValue = '';

  for (let i = 0; i < len; i++) {
    if (genderElements[i].checked) {
      checkValue = genderElements[i].value;
    }
  }

  if (checkValue === '') {
    checkValue = genderElements[0].value;
  }
  return checkValue;
}
const genderElement = Number(selectGender());

const registerUser = async () => {
  const url = `${baseUrl}/api/v1/users`;
  const userParams = {
    user: {
      first_name: firstNameElement.value,
      last_name: lastNameElement.value,
      age: ageElement.value,
      company: companyElement.value,
      email: emailElement.value,
      phone_number: phoneNumberElement.value,
      twitter: twitterElement.value,
      message: messageElement.value,
      gender: genderElement,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userParams),
  });

  if (!response.ok) {
    throw new Error(`${response.status} (${response.statusText})`);
  }

  const user = await response.json();
  return user;
};

const userForm = async () => {
  try {
    const user = await registerUser();
    addUser(user);
    firstNameElement.value = '';
    lastNameElement.value = '';
    ageElement.value = '';
    companyElement.value = '';
    emailElement.value = '';
    phoneNumberElement.value = '';
    twitterElement.value = '';
    messageElement.value = '';
    genderElement.value = '';
  } catch (e) {
    alert(e);
  }
};

button.addEventListener('click', userForm);
