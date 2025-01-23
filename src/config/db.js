const mongoose=require('mongoose')

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.DB_CONNECTION_STRING,{
            useNewUrlparser:true,
            useUnifiedTopology:true,
        });
        console.log('MongoDB Connected...')
    } catch(e){
        console.log(e.message)
        process.exit(1)
    }
};

module.exports=connectDb 
