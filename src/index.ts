import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
dotenv.config();

import sendMail from "./sendMail";
import fileFilter from "./fileFilter";
import { fetchMessages } from './imap';
import showList from './showList';


const app = express();
const storage = multer.memoryStorage();
const attachments = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/mailbox", async (req, res) => {
  const data = await fetchMessages();

  showList(data);
});

app.get("/send", (req, res) => {
  res.send("Hi");
});

app.post("/send", attachments.single("file"), async (req, res) => {
  const data = req.body;
  const file = req.file;

  try {
    file ? await sendMail(res, data, file) : await sendMail(res, data);
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));
