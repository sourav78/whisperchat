import mongoose, { Schema, Document, Types } from "mongoose";

export interface RequestType extends Document{
    status: string,
    sender: Types.ObjectId,
    reciever: Types.ObjectId,
}

const RequestSchema: Schema<RequestType> = new Schema({
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"]
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    reciever: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true })

const RequestModel = mongoose.models?.requests as mongoose.Model<RequestType> || mongoose.model<RequestType>("requests", RequestSchema)

export default RequestModel