const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('../routes/router');
const app = express();


// consts
app.set('PORT', process.env.PORT || 3000);

// middlewares
/* app.use(morgan("dev")); */
app.use(express.static(path.join(__dirname, '../public')));

// routes
app.use(router);

// listen
app.listen(app.get('PORT'), ()=>{
    console.log('Server listen on port ' + app.get('PORT'));
});
