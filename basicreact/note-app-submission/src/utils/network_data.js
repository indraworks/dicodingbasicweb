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

/*
Penjelasan isi OPTIONS yg ada pada fetch apa saja setelah adress url,
berisai object properties ,apa saja? 

Here's how to use fetch() with options:
JavaScript

fetch(url, options)
  .then(response => {
    // Handle the response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Or .text(), .blob(), etc.
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  1)BERIKUT commons atau yg seringkali diapaki adalah : { method: CRUD} -> dimana 
  bisa berisi : {method:'POST'},{method:'PUT'},{method:'GET'},{method:'DELETE'}
Common options properties:
method: The HTTP method for the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').

2) headers jadi tanda kurung kurawal stlah url bisa : {headers: {'Content-type':'application/json',
                                                                  'Authorization':'Bearer '$OUR_TOKEN}}



3) body : ini data form yg kita kirim-ambil ke/dan dari  end-point API :
    The data to send in the request body, typically for POST, PUT, 
    or PATCH requests. This can be a String, FormData, Blob, ArrayBuffer, etc.

    

    Example utk smua multiple options stlah fetch(url,{options}) berikut :

    fetch('https://api.example.com/items', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({ item: 'new item' }),
  mode: 'cors',
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

 tapi kebiasaan kita pakai async dan await lebih clear ! 


*/

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
