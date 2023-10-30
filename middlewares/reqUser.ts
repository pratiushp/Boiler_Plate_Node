import { User } from "../models/User.model";
import { Request } from "express";

export interface ReqUser<p, q, r, s> extends Request<p, q, r, s> {
  user?: User;
}
