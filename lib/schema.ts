import { ObjectId } from "mongodb";

export interface Message {
  _id: ObjectId;
  message: string;
  date: Date;
}
