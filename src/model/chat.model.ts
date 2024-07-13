import mongoose, {Schema, Document, Types} from "mongoose";

export interface ChatType extends Document{
    name: string,
    isGroupChat: boolean,
    groupAvatar: string,
    admin: Types.ObjectId[],
    lastMessage: Types.ObjectId | null,
    members: Types.ObjectId[],
}

const ChatSchema: Schema<ChatType> = new Schema({
    name: {
        type: String,
        required: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    groupAvatar: {
        type: String,
        default: "https://res.cloudinary.com/sourav78/image/upload/v1720806850/whishper/users/rdhsvkyz6aow3lfoxutm.png"
    },
    admin: [
        {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "messages",
        default: null
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    ]
}, { timestamps: true })

const ChatModel = mongoose.models?.chats as mongoose.Model<ChatType> || mongoose.model<ChatType>("chats", ChatSchema)

export default ChatModel