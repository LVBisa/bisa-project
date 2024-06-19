import 'dotenv/config';
export default{
  "expo": {
    "scheme": "acme",
    "web": {
      "bundler": "metro"
    },
    "name": "bisa-project",
    "slug": "bisa-project",
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    }
  },
  
}
