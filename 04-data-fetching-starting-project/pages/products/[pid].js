import path from "path"
import fs from "fs"

function ProductDetailsPage(props) {
    const { product } = props

    if (!product) {
        return <p>Loading...</p>
    }

    const { title, description } = product
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}

async function getData() {
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json")
    const jsonData = await fs.readFileSync(filePath)
    const data = JSON.parse(jsonData)

    return data
}


export async function getStaticPaths() {
    const data = await getData()
    const pathsWithParams = data.products.map(({ id }) => ({ params: { pid: id } }))
    return {
        paths: pathsWithParams,
        fallback: true
    }
}


export async function getStaticProps(context) {
    const { params } = context
    const productId = params.pid
    const data = await getData()
    const product = data.products.find(product => product.id === productId)

    if (!product) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            product
        }
    }

}

export default ProductDetailsPage