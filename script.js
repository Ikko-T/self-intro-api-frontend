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
