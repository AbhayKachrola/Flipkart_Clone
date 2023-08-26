import mongoose from 'mongoose';

const Connection = async (username, password) => {
   
    const URL = `mongodb://${username}:${password}@ac-olods69-shard-00-00.d6rpc6j.mongodb.net:27017,ac-olods69-shard-00-01.d6rpc6j.mongodb.net:27017,ac-olods69-shard-00-02.d6rpc6j.mongodb.net:27017/E-commerce-web?ssl=true&replicaSet=atlas-mb796g-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};

export default Connection;