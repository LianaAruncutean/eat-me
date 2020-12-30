const URL = "http://localhost:51607/api/Retrospective/";

export const getRetrospective = async (userId) => {
  const response = await fetch(`${URL}GetRetrospective/${userId}`);
  const json = await response.json();

  return json;
};
