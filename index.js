const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const path = require('path');
const firebase = require('firebase');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 3000;

const crops = [];
const news = [];

const firebaseConfig = {
  apiKey: 'AIzaSyAh_1zYTaP3jeDjJzC5LM_Bc2ZeLWlGYR8',
  authDomain: 'agriseva-fb852.firebaseapp.com',
  databaseURL: 'https://agriseva-fb852.firebaseio.com',
  projectId: 'agriseva-fb852',
  storageBucket: 'agriseva-fb852.appspot.com',
  messagingSenderId: '165433753207',
  appId: '1:165433753207:web:2e386cbb7fe411d5e51072',
  measurementId: 'G-JHG3CK6CEE',
};

const serviceAccount = require('./src/config/agriseva-fb852-firebase-adminsdk-psr8o-2ebb9d9dc7');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://agriseva-fb852.firebaseio.com',
});

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const ref = db.ref('/crops');
ref.once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    crops.push(childSnapshot.val());
  });
});

const newsRef = db.ref('/news');
newsRef.once('value', (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    news.push(childSnapshot.val());
  });
});
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const cropRouter = require('./src/routes/cropRouter')(crops);
const contactRouter = require('./src/routes/contactRouter')(db);
const adminRouter = require('./src/routes/adminRouter')(serviceAccount);
const newsRouter = require('./src/routes/newsRouter')(news);
const weatherRouter = require('./src/routes/weatherRouter')();
const aboutRouter = require('./src/routes/aboutRouter')();

app.post('/submit-form', (req, res) => {
  const { name } = req.body;
  const { phone } = req.body;
  const { desc } = req.body;

  const send = {
    name,
    phone,
    desc,
  };

  const formRef = db.ref('/contact');
  formRef.push(send);
  debug(`${send}updated`);
  res.redirect('/contact');
  res.end();
  // debug(send);
});

app.use('/crops', cropRouter);
app.use('/contact', contactRouter);
app.use('/admin', adminRouter);
app.use('/news', newsRouter);
app.use('/weather', weatherRouter);
app.use('/about', aboutRouter);

app.get('/', (req, res) => {
  res.render(
    'indexn',
    { title: 'AgriSeva' },
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
