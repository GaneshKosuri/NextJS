function UserProfilePage(props) {

    return <p>{props.username}</p>

}

export default UserProfilePage

export async function getServerSideProps(context) {
    const { params, req, res } = context
    console.log("Server side code")
    return {
        props: {
            username: "Ganesh"
        }
    }
}