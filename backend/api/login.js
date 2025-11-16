import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  res.json({ message: "Login successful" });
  res.json({ message: email });
  res.json({ message: password });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
