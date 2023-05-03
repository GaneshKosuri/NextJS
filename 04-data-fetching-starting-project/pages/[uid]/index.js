function UserDetails(props) {
    const { id } = props
    return (
        <div>
            <h1>User Details {id}</h1>
        </div>
    )

}

export default UserDetails

export async function getServerSideProps(context) {
    const { params } = context

    const userId = params.uid

    return {
        props: {
            id: userId
        }
    }
}