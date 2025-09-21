import mongoose, {Schema, schema} from 'mongoose'

const subscriptionSchema= schema({
    subscriber: {  //user which is subscribing 
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    channel: { //the user which is been subscribed by the subscriber
        type: Schema.Types.ObjectId,
        ref: "USer"
    }
},{timestamps: true})

export const Subscription= mongoose.model("Subscription",subscriptionSchema)