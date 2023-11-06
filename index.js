const express = require("express");

const app = express();

const routes = require("./routes/api");

app.use("/api/v1", routes);

const PORT = process.env.PORT || 3000; // Port
app.listen(PORT, () => {
  console.log(`Server: ${PORT}`);
});
