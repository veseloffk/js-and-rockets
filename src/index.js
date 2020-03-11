import { prepareData, renderData } from "./solution";

const URL = "https://api.spacexdata.com/v3/launches/past";

const getData = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

getData()
  .then(prepareData)
  .then(renderData)
  .catch(e => console.log("e", e));

console.log("Hello from %csrc/index.js", "font-weight:bold");
