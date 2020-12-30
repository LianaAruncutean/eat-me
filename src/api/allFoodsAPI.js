const URL = "http://localhost:51607/api/Food/";

export const getAllFoods = async () => {
  const response = await fetch(`http://localhost:51607/api/Food/GetAllFoods/`);
  const json = await response.json();
  return json;
};

export const addFood = async (newFood) => {
  const food = {
    ...newFood,
    Category: newFood.Category.map((categoryName, index) => {
      return {
        CategoryId: index,
        Name: categoryName,
      };
    }),
    Id: 0,
  };
  const response = await fetch(`${URL}AddFood`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(food),
  });

  return response;
};

export const deleteFood = async (foodNames) => {
  const deleteFood = {
    FoodName: foodNames[0],
  };
  const response = await fetch(`${URL}DeleteFood`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deleteFood),
  });

  return response;
};
