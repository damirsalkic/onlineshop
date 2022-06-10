//podesavanje baze 
const MONGO_PASS = '';
const MONGODB_URL = `mongodb+srv://damirsalkic:${MONGO_PASS}@onlineshop.ni5o8.mongodb.net/?retryWrites=true&w=majority`;
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

module.exports = {
  MONGO_PASS: MONGO_PASS,
  MONGODB_URL: MONGODB_URL,
  mongooseOptions: mongooseOptions
};