const express = require("express");
const fs = require("fs");
const app = express();

const jsonData = JSON.parse(fs.readFileSync("abc.json", "utf-8"));
console.log(jsonData);

//  CRUD Operations
// C: Create
// R: Read
// U: Update -> Put and Patch
// D: Delete

app.get("/api/v1/abc/", (req, res) => {
  res.status(200).json({
    status: "success",
    length: jsonData.length,
    data: {
      jsonData,
    },
  });
});

// single data
app.get("/api/v1/abc/single/:id", (req, res) => {
  const id = req.params.id * 1;
  let singleData = jsonData.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      singleData,
    },
  });
});

const PORT_NO = 9000;
app.listen(PORT_NO, () => {
  console.log("Server is running on port on http://localhost:" + PORT_NO);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
