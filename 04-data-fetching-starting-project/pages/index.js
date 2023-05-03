import path from "path"
import fs from "fs"

import Link from "next/link"

function HomePage(props) {
  const { products } = props
  return (
    <ul>
      {products.map((eachProduct) => <li key={eachProduct.id}>
        <Link href={`/products/${eachProduct.id}`}>{eachProduct.title}</Link>
      </li>)}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("regenerating server.....")
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json")
  const jsonData = await fs.readFileSync(filePath)
  const data = JSON.parse(jsonData)

  if (!data.products) {
    return {
      redirect: {
        destination: "/no-data"
      }
    }
  }

  if (!data.products.length) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  }
}

export default HomePage;
