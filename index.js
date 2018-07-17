const express = require("express")();

const port = process.env.PORT || 5050;

express
  .get("/", (req, res) => {
    res.json({ message: "connected like a boss!" });
  })
  .listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
