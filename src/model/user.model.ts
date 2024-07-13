import mongoose, {Schema, Document} from "mongoose";

export interface UserType extends Document{
    name: string,
    username: string,
    password: string,
    bio: string,
    avatar: string
}

const UserSchema: Schema<UserType> = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    bio: {
        type: String
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/sourav78/image/upload/v1720806850/whishper/users/dmrfftkzammnayfczffx.png"
    }
}, {
    timestamps: true
})

const UserModel = mongoose.models?.users as mongoose.Model<UserType> || mongoose.model<UserType>("users", UserSchema)

export default UserModel