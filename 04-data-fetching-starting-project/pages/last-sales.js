import { useEffect, useState } from "react"
import useSWR from "swr"


const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales)
    const { data, isLoading } = useSWR("https://nextjs-course-dabb2-default-rtdb.firebaseio.com/sales.json", (url) => fetch(url).then(response => response.json()))

    useEffect(() => {
        if (data) {
            const updatedData = Object.entries(data).map(([key, value]) => ({ id: key, username: value.username, volume: value.volume }))
            setSales(updatedData)
        }
    }, [data])

    if (isLoading) {
        return <p>Loading...</p>
    }



    if (!sales || !data) {
        return <p>No Data</p>
    }


    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>
                <p>{sale.username}</p>
                <p>{sale.volume}</p>
            </li>)
            }
        </ul>
    )

}

export const getStaticProps = async () => {
    let updatedSales = []
    await fetch("https://nextjs-course-dabb2-default-rtdb.firebaseio.com/sales.json")
        .then(response => response.json())
        .then(data => {
            updatedSales = Object.entries(data).map(([key, value]) => ({ id: key, username: value.username, volume: value.volume }))
        })
    return {
        props: { sales: updatedSales }
    }
}


export default LastSalesPage