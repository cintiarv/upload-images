import AWS from 'aws-sdk'
import {S3Client} from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer -s3'
import config from '../libs/s3/config.js'

AWS.config.update({
    accesKeyId: config.s3.credentials.accesKeyId,
    secretAccessKey: config.s3.credentials.secretAccesKey,
    region: config.s3.region
})


const S3Client = new S3Client(config.s3)

const multers3Config = multerS3({
    s: S3Client,
    bucket: config.s3.params.Bucket,
    metdata: function(req, file, cb) {
        cb(null, {fieldName: file.originalname})
    },
    key: function (req, file, cb){
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})

export const upload = multer({storage: multers3Config})