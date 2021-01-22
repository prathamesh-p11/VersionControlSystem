const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const createRouter = require('./routes/create');
const labelRouter = require('./routes/label');
const checkinRouter = require('./routes/checkin');
const checkoutRouter = require('./routes/checkout');
const fetchData = require('./routes/fetchData');
const mergeOutRouter = require('./routes/mergeOut');
const mergeInRouter = require('./routes/mergeIn');

app.use('/create', createRouter);
app.use('/label', labelRouter);
app.use('/checkin', checkinRouter);
app.use('/checkout', checkoutRouter);
app.use('/fetch_data', fetchData);
app.use('/merge-out', mergeOutRouter);
app.use('/merge-in', mergeInRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
