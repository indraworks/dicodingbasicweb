const BASE_URL = "https://notes-api.dicoding.dev/v1";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}
/*
response login :

{
    "status": "success",
    "message": "User logged successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.
                         flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
    }
}
data.accessToken ini yg kita ambil kita masukan ke LocalStorage 

*/

async function register({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

/*
response register :
{
  "status": "success",
  "message": "User Created"
}


*/

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

/*
response getUserLogged :
{
    "status": "success",
    "message": "User retrieved",
    "data": {
        "id": "user-yj5pc_LARC_AgK61",
        "name": "John Doe",
        "email": "john@example.com"
    }
}



*/

async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

/*
response create/add note :
{
  "status": "success",
  "message": "Note created",
  "data": {
      "id": "notes-_O6A6TJcCYUWO7t4",
      "title": "Hello, Notes!",
      "body": "My new notes.",
      "owner": "user-l-wposXQYGosf0ZA",
      "archived": false,
      "createdAt": "2022-07-28T10:12:12.396Z"
  }
}



*/

async function getActiveNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

/*
response activeNotes:
{
  "status": "success",
  "message": "Notes retrieved",
  "data": [
      {
          "id": "notes-jT-jjsyz61J8XKiI",
          "title": "Welcome to Notes, Dimas!",
          "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
          "createdAt": "2022-07-28T10:03:12.594Z",
          "archived": false,
          "owner": "user-l-wposXQYGosf0ZA"
      }
  ]
}



*/
async function getArchivedNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}
/*

{
  "status": "success",
  "message": "Notes retrieved",
  "data": [
      {
          "id": "notes-jT-jjsyz61J8XKiI",
          "title": "Welcome to Notes, Dimas!",
          "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
          "createdAt": "2022-07-28T10:03:12.594Z",
          "archived": true,
          "owner": "user-l-wposXQYGosf0ZA"
      }
  ]
}


*/

async function getNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}
/* respomse songle notes

{
  "status": "success",
  "message": "Note retrieved",
  "data": {
      "id": "notes-jT-jjsyz61J8XKiI",
      "title": "Welcome to Notes, Dimas!",
      "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
      "createdAt": "2022-07-28T10:03:12.594Z",
      "archived": false,
      "owner": "user-l-wposXQYGosf0ZA"
  }
}



*/

async function archiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}
/*

{
  "status": "success",
  "message": "Note archived"
}

*/

async function unarchiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}
/*
{
  "status": "success",
  "message": "Note unarchived"
}

*/

async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

/*
{
  "status": "success",
  "message": "Note deleted"
}

*/

//tambahan utk editNote
async function editNote() {
  const response = await fetchWithToken(`$BASE_URL/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
  editNote,
};
