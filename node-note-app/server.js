require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//declare masukan ke wariable app class express!
const app = express();
const PORT = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json());

//mySQL connection
