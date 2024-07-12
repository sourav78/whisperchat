import mongoose, {Schema, Document} from "mongoose";

export interface ChatType extends Document{
    name: string,
    isGroupChat: boolean,
    groupAvatar: string,
    admin: mongoose.Types.ObjectId[],
    lastMessage: mongoose.Types.ObjectId | null,
    members: mongoose.Types.ObjectId[],
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
            ref: "user"
        }
    ],
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: "",
        default: null
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ]
}, { timestamps: true })

const ChatModel = mongoose.models?.chat as mongoose.Model<ChatType> || mongoose.model<ChatType>("chat", ChatSchema)

export default ChatModel