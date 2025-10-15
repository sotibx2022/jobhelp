const _config = {
    groqSecretKey: process.env.GROQ_SECRET_KEY!,
    websiteUrl: process.env.WEBSITEURL!,
    google: {
        apiKey: process.env.GOOGLE_API_KEY!,
        cxid: process.env.GOOGLE_CX,
        apiurl: process.env.GOOGLE_API_URL,
    },
    dbConnection: process.env.MONGODB_CONNECTION_URL,
    passwordSecret:process.env.JWT_SECRET
}
export const config = Object.freeze(_config)