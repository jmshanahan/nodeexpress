import express, { Request, Response, NextFunction } from "express";
import todosRoutes from "./routes/Todos";
import { json } from "body-parser";
const app = express();

app.use(json());
app.use("/todos", todosRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({ message: err.message });
});
app.listen(3000);
