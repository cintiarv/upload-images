import * as dotenv from 'dotenv'
dotenv.config()

export default {
    s3: {
        credentials: {
            accesKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccesKey: process.env.AWS_SECRET_ACCES_KEY

        },
        region: process.env.AWS_REFION,
        httpOptions:{
            timeout:90000
        },
        params: {
            ACL: 'public-read',
            Bucket: process.env.AWS_BUCKET_NAME
        }
    }
}