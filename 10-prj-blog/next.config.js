const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')


module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_connection_string: 'mongodb+srv://ganeshkosuri:IFBiP8nfLxk2Tsy0@cluster0.c2bxomv.mongodb.net/my-blog-dev?retryWrites=true&w=majority'
            }
        }
    }
    return {
        env: {
            mongodb_connection_string: 'mongodb+srv://ganeshkosuri:IFBiP8nfLxk2Tsy0@cluster0.c2bxomv.mongodb.net/my-blog?retryWrites=true&w=majority'
        }
    }
}