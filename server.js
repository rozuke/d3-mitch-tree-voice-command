const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Sirve archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, "public")));

// Endpoint para servir el archivo data.json
app.get("/data", (req, res) => {
  res.sendFile(path.join(__dirname, "data.json"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
