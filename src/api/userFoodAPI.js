const URL = "http://localhost:51607/api/UserFood/";

export const getUserFoods = async (userId) => {
  const response = await fetch(`${URL}GetUserFoods/${userId}`);
  const json = await response.json();

  return json;
};

export const addUserFood = async (userId, foodId, quantity) => {
  const foodDetail = {
    UserId: Number(userId),
    FoodId: foodId,
    Quantity: quantity,
  };
  const response = await fetch(`${URL}AddUserFood`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(foodDetail),
  });

  return response;
};
