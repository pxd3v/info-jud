import express from "express";
import routes from "./routes";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.static(path.join(__dirname, "..", "..", "web", "build")));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
