



const {generateAsync} = require('./build/index');
const AWS = require('aws-sdk');
require('dotenv').config();

const credentials = {
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey : process.env.S3_SECRET_KEY
};

AWS.config.update({credentials: credentials, region: process.env.S3_REGION});
const s3 = new AWS.S3();


(async () => {

    try {
        const { res, images } = await generateAsync({
          prompt: 'car in the space',
          apiKey: "sk-5QC7ajN3GGvOY4C6ZQGrQIc2XDfJcIe8VS8J2m3kFcGnW0CM",
          width: 512,
          height: 512,
          noStore: true,
        })
        console.log(images);


        const uploadedImage = await s3.upload({
          Bucket: process.env.S3_BUCKET,
          Key: '2222.png',
          Body: images[0].buffer,
        }).promise();

        console.dir(uploadedImage);

      } catch (e) {
        console.error(e);
      }

})();