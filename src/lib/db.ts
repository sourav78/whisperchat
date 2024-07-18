import mongoose from "mongoose";

type ConnectionType = {
    isConnect?: number
}

const connection: ConnectionType = {}

async function dbConnect(){
    if(connection.isConnect){
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "")
        connection.isConnect = db.connections[0].readyState

        console.log("Database connected.");
        
    } catch (error) {
        console.log("Database not connect", error);
        process.exit(1)
    }
}

export default dbConnect