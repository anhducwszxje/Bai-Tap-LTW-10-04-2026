const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Mini Shop server is running at http://localhost:${PORT}`);
});
