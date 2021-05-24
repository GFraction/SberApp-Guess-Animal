import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export async function getRandomAnimal(solvedQuestions) {
  const { data: answer } = await axios.get(API_URL + "randomAnimal/", {
    params: {
      solvedQuestions: solvedQuestions,
    },
  });
  console.log("приходит", solvedQuestions);
  return answer;
}
