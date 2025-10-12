import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);







// POST
// export const authenticate = async(username) => {
//     try {
//         return await API.post('/auth/authenticate', { username })
//     } catch (error) {
//         return { error : "Username doesn't exist...!"}
//     }
// }

// register user
export const register = async (credentials) => {
  try {
    // send register request
    const { data, status } = await API.post("/auth/register", credentials);

    // destructure credentials
    const { username, email } = credentials;

    // send register mail if success
    if (status === 201) {
      await API.post("/auth/register-mail", {
        username,
        userEmail: email,
        text: data.message,
      });
    }
    return data;
  } catch (err) {
    throw err.response.data
  }
};


export const updataUser = async (response) => {
  try {
    const token = await localStorage.getItem("token");
    const data = await API.put("/user/", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (err) {
    return Promise.reject({ error: "Couldn't updata profile " });
  }
};
// export const registerMail = async (mailData) =>
//   await API.post("/auth/register-mail", mailData);
export const authenticate = async (username) =>
  await API.post("/auth/authenticate", {username});

export const generateOTP = async (username) => {
  try {
    const {
      data: { code },
      status,
    } = await API.get("/auth/generate-OTP", { params: { username } });

    if (status === 201) {
      let {
        data: { email },
      } = await getUser(username);

      const text = `Your Password recoverey OTP is ${code}, Verify and recover your password.`;
      await API.post("/auth/register-mail", {
        username,
        userEmail: email,
        text,
        subject: "Password recovery OTP",
      });

      return Promise.resolve({ code });
    }
  } catch (error) {
    return Promise.reject({ error });
  }
};

export const verifyOTP = async (username, code) => {
  try {
    const { data, status } = await API.get("/auth/verify-OTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (err) {
    return Promise.reject(err);
  }
};

export const resetPassword = async ({ username, password }) => {
  try {
    const { data, status } = await API.put("auth/resetPassword", {
      username,
      password,
    });

    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject(error);
  }
};

// GET
// export const generateOTP = async () => await API.get("/auth/generate-OTP");
// export const verifyOTP = async (code) =>
//   await API.get("/auth/verify-OTP", { params: { code } });
// export const resetSession = async () => await API.get("/auth/reset-session");
// export const logout = async () => await API.get("/auth/logout");

// PUT
// export const resetPassword = async (userInfo) =>
//   await API.put("/auth/reset-password", userInfo); //comment

// USER
export const getUser = async (username) => await API.get(`/user/${username}`); // keep
// export const updateProfile = async (userData) =>
//   await API.put("/user", userData); //comment
