
const express= require('express')
const bodyParser= require('body-parser')
const { ObjectId } = require('mongodb');


const app= express();
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})
                            

                    // ===============mongodb connectionn=====================


                    const { MongoClient, ServerApiVersion } = require('mongodb');
const { log } = require('console');
                    const uri = "mongodb+srv://shadindb:shadindb@cluster1.wjj4omp.mongodb.net/titumir?retryWrites=true&w=majority";
                    
                    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
                    const client = new MongoClient(uri, {
                      serverApi: {
                        version: ServerApiVersion.v1,
                        strict: true,
                        deprecationErrors: true,
                      }
                    });
                    
                    async function run() {
                      try {
                        await client.connect();
                        // Connect the client to the server	(optional starting in v4.7)
                   
                      const productCollection= client.db('titumir').collection('college');


                   // ================post======================

                  app.post("/addProduct",(req,res)=>{
                   const product= req.body;
                 productCollection.insertOne(product)
                 .then(result=>{
                    console.log('data added succesfully');
                    res.send('succesfully added')
                 })
                   


                  })



                        // =========================post complete===========================

                          //  delete


         app.delete('/delete/:id',(req,res)=>{
          productCollection.deleteOne({_id: new  ObjectId(req.params.id) })
          .then(res=>{
            console.log(res);
          })


         })









                //    ==========================read===========================

                app.get('/products', async (req,res)=>{

                   const products= await productCollection.find({}).toArray()
                   res.send(products);

                })



                            //  sinlge producet load


   app.get('/product/:id',async (req,res)=>{
    const singleProduct = await productCollection.find({_id : new ObjectId(req.params.id)}).toArray()
    res.send(singleProduct[0])
   
   })                          


                //   update data


app.patch('/update/:id',(req,res)=>{
  productCollection.updateOne({_id: new ObjectId(req.params.id)},
  
  {
    $set:{product:req.body.product}
  }
 )
 .then(result=> console.log(result))
})





                  //    ==========================read= complete==========================



                        await client.db("admin").command({ ping: 1 });
                        console.log("Pinged your deployment. You successfully connected to MongoDB!");
                      } finally {
                        // Ensures that the client will close when you finish/error
                        
                      }
                    }
                    run().catch(console.dir);
                    




app.listen(3000);