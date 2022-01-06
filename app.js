const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();
const port = 3000;

const sequelize = require('./util/database');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products').then((result) => {
//     console.log(result[0], result[1]);
// }).catch((error) => {
//     console.log(error);
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync().then((response) => {
    console.log(response);
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}).catch((err) => {
    console.log(err);
})