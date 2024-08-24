import express from 'express';
import { calcAsync, getResults } from './sumRequest.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

app.use(express.json());

// app.get("/status", (request, response) => {
//   const status = {
//     Status: "Runnning",
//   };

//   response.send(status);
// });

app.get("/GetResults", async (req, res) => {
  const sumObject = await getResults('find');
  res.send(sumObject);
});

app.post("/CalcAsync", async (req, res) => {
  const sumObject = req.body;
  await calcAsync(sumObject)
  res.send({ message: 'Numbers sent for sum'});
});
