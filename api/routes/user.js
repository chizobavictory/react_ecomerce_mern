// import express from "express";
const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("user test is successfull");
});

export default router;
