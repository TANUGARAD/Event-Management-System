require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/career", require("./routes/careerRoute"));
app.use("/api/contact", require("./routes/contactRoute"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
