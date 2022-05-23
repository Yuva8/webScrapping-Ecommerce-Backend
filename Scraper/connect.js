const {MongoClient} = require('mongodb');

module.exports = {
    SelectedDB : {},
    async connect (){
        try{
              const client =  await MongoClient.connect(process.env.MONGO_DB_URL,{ useNewUrlParser: true});
              this.SelectedDB = client.db('Ecommerce');
              console.log(this.SelectedDB);
        }
        catch(err){
            console.log(err);
        }
    }
       
}