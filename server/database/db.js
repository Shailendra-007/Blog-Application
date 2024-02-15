import mongoose from 'mongoose'



//it is async function that means it will return promise , 
// so we use await keyword before mongoose.connect() to wait for the response.
const Connection = async(USERNAME , PASSWORD) =>{
    const URL =`mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.rbfzwpt.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL , {useNewUrlParser : true , useUnifiedTopology: true,});
        console.log('DataBase connected Successfully');
    } catch (error) {
        console.log('Error while connectig with DataBase', error);
    }
}
export default Connection;