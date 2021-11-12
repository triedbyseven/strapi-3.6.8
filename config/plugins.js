module.exports = ({ env }) => ({
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID', process.env.AWS_ACCESS_KEY_ID),
      secretAccessKey: env('AWS_ACCESS_SECRET', process.env.AWS_ACCESS_SECRET),
      region: env('AWS_REGION', process.env.AWS_REGION),
      params: {
        Bucket: env('AWS_BUCKET_NAME', process.env.AWS_BUCKET_NAME),
      },
    },
  },
});