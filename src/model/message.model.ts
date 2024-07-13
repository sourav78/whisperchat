import mongoose, { Schema, Document, Types } from "mongoose";

interface AttachmentType extends Document {
    publicId: string,
    url: string
}

export interface MessageType extends Document {
    content: string,
    sender: Types.ObjectId,
    attachments: AttachmentType[],
    chat: Types.ObjectId
}

const MessageSchema: Schema<MessageType> = new Schema({
    content: {
        type: String
    },
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    attachments: [
        {
            publicId: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    chat: {
        type: Schema.Types.ObjectId,
        ref: "chats",
        required: true
    }
}, { timestamps: true })

const MessageModel = mongoose.models?.messages as mongoose.Model<MessageType> || mongoose.model<MessageType>("messages", MessageSchema)

export default MessageModel