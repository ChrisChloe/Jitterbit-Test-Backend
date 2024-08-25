import express from 'express';
import { calcAsync, getResults } from './sumRequest.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// app.get("/status", (request, response) => {
//   const status = {
//     Status: "Runnning",
//   };

//   response.send(status);
// });

app.get("/GetResults/:id", async (req, res) => {
  const sumObject = await getResults(req.params.id);
  res.send(sumObject);
});

app.post("/CalcAsync", async (req, res) => {
  const sumObject = req.body;
  const result = await calcAsync(sumObject)
  res.send({ insertedId: result.insertedId });
});
