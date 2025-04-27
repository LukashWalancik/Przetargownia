const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));
const { sequelize } = require('./models/index');
const mainRouter = require('./routes/main_router');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', mainRouter);

const tenderRouter = require('./routes/tender_router');
app.use('/tenders', tenderRouter);

const offerRouter = require('./routes/offer_router');
app.use('/offers', offerRouter)

const { Tender } = require('./models/index');

sequelize.sync({ force: false })
  .then(() => {
    console.log('Połączono z bazą danych i zsynchronizowano modele.');
  })
  .catch((err) => {
    console.error('Błąd połączenia z bazą danych:', err);
  });

  // sequelize.sync({ force: false })
  // .then(async () => {
  //   console.log('Połączono z bazą danych i zsynchronizowano modele.');
  //   const count = await Tender.count();
  //   if (count === 0) {
  //     await Tender.create({
  //       title: 'Przetarg na budowę mostu',
  //       description: 'Budowa nowoczesnego mostu o długości 500 metrów.',
  //       institution: 'Uniwersytet Jagielloński',
  //       start_date: new Date(),
  //       deadline: new Date(2025, 11, 31),
  //       budget: 400,
  //     });
  //     await Tender.create({
  //       title: 'Przetarg na zniszczenie mostu',
  //       description: 'Znisczenie nowoczesnego mostu o długości 500 metrów.',
  //       institution: 'Akademia Gurniczo Hótnicza',
  //       start_date: new Date(),
  //       deadline: new Date(2025, 11, 31),
  //       budget: 100,
  //     });
  //     console.log('Dodano przykładowy przetarg.');
  //   }
  // })
  // .catch((err) => {
  //   console.error('Błąd połączenia z bazą danych:', err);
  // });

app.listen(port, () => {
  console.log(`Tutaj słucham, zapraszam: ${port}`)
})
