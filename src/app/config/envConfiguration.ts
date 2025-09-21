const _config = {
    groqSecretKey: process.env.GROQ_SECRET_KEY!,
    websiteUrl: process.env.WEBSITEURL!,
}
export const config = Object.freeze(_config)