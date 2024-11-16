import Feature from "../components/Feature";
import Header from "../components/Header";
import NewProducts from "../components/NewProducts";
import {mongooseConnect} from '../lib/mongoose'
import {Product} from '../models/Products'

export default function Home({featureProduct,newProducts}) {
  return (
    <div>
      <Header/>
      <Feature featureProduct={featureProduct} />
      <NewProducts newProducts={newProducts}/>
    </div>
  )
}

export async function getServerSideProps(){
  const featureProductId = '647836d7400455889e8200cf';

  await mongooseConnect();
  const featureProduct = await Product.findById(featureProductId)
  const newProducts = await Product.find({},null, {sort:{"_id":-1},limit:10})
  return {

    props:{
      newProducts:(JSON.parse(JSON.stringify(newProducts))),
      featureProduct:(JSON.parse(JSON.stringify(featureProduct)))
    }
  }
}