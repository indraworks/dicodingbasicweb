import React, { createContext, useState, useContext, useEffect } from "react";
import {
  login,
  register,
  getUserLogged,
  getAccessToken,
} from "../utils/network_data";
import { putAccessToken } from "../utils/network_data";

const userContext = createContext();

//nama function adalah nama function Provider
export const UserProvider = ({ children }) => {
  //state :user,setUser,accessToken,setAccessToken
  // initializing ,setInitialising initilalizasing nunngu data datang dari api
  // stlah login dapat token dari API dismpah di storage

  const [user, setUser] = useState(null);

  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );
  const [initializing, setInitializing] = useState(true);

  //mngecel perubahan di localstorage apapkah token berubah atau tidak
  useEffect(() => {
    const fetchUser = async () => {
      //jika ada access token maka kita ambil data yg masuk di API data user diapi name,email
      if (accessToken) {
        const { error, data } = await getUserLogged(); //ambil data stlah login
        //krn stlah login kita dapat data accessToken di LocaLStorage,accessToken berisi dan jalankan fetchUser() otomatis
        if (!error) setUser(data);
      }
    };
    fetchUser();
  }, [accessToken]);

  //pamakaian login func stlah post,jika !error maka dapat accessToken taruh diLocalStorage ,setState accessToken!
  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });
    if (!error) {
      putAccessToken(data.accessToken); //taru dilocalstorage
      setAccessToken(data.accessToken); //update state accessTOken
    }
    return error;
  };

  const onRegister = async ({ name, email, password }) => {
    return await register({ name, email, password });
  };

  const onLogout = () => {
    putAccessToken(""); //bersuhkan storage accessTOken
    setAccessToken(null); //clearkan state accessTOken
    setUser(null); //bersihkan state user/data user!
  };
  //buat provider utk wraping state & function yg disebar ke anak2 componentnya/pemakai/consumer
  return (
    <userContext.Provider
      value={{
        user,
        accessToken,
        initializing,
        //login adalah aliasnya tuk dipanggil idem yglain!
        login: onLogin,
        register: onRegister,
        logout: onLogout,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
//buat pemanggil utk consumer-nya
export function useUser() {
  return useContext(userContext);
}

/*
stiap file context kita declare buat variabel context 
buat function Provider 
dlm function provider buat state nya 
pada return function  buat tag /wraper yg merupakan variablecontext.namaProvider 
dan masukan state atau function yg dibuat  diwrapernya 
<namaCOntext.Provider value={{state,function }}
stlahnya buat customHook utk consumernya  agar chld2 component bisa gunakan variableContext
dgn cara return useCOntext(variableCOntext)



*/

/*
catatan functuon network-data.js yg dipakai :
const BASE_URL = "https://notes-api.dicoding.dev/v1";

++++++++function getAccessToken() {
        return localStorage.getItem("accessToken");
}

++++++++function putAccessToken(accessToken) {
         return localStorage.setItem("accessToken", accessToken);
}

+++++++++ async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

++++++ async function login({ email, password }) {
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


++++++++ async function register({ name, email, password }) {
//   const response = await fetch(`${BASE_URL}/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, email, password }),
//   });

//   const responseJson = await response.json();

//   if (responseJson.status !== "success") {
//     alert(responseJson.message);
//     return { error: true };
//   }

//   return { error: false };
// }

/*
response register :
{
  "status": "success",
  "message": "User Created"
}


*/
