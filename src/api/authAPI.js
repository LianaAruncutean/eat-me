const URL = "http://localhost:51607/api/Auth/";

export const login = async (email, password) => {
  const credentials = {
    Email: email,
    Password: password,
  };

  const response = await fetch(`${URL}Login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response;
};
