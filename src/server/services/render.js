const axios = require('axios');


exports.homeRoutes = (req, res) => {
    //Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response) {
            res.render('index.ejs', { users: response.data })
        })
        .catch(err => {
            res.send(err);
        })
}

exports.add_user = (req, res) => {
    res.render('add_user.ejs');
}

exports.update_user = (req, res) => {
    res.render('update_user.ejs');
}