const {MongoClient} = require('mongodb');

module.exports = {
    SelectedDB : {},
    async connect (){
        try{
              const client =  await MongoClient.connect('mongodb+srv://yuvarajmuthu:IZSDrDyN0EnaezPw@cluster0.8ufr6.mongodb.net/?retryWrites=true&w=majority',{ useNewUrlParser: true});
              this.SelectedDB = client.db('Ecommerce');
              console.log(this.SelectedDB);
        }
        catch(err){
            console.log(err);
        }
    }
       
}