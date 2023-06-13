const path = require("path");
// Home page controller
exports.homePage = (req, res) => {
    res.send('Welcome to the home page');
};

// About page controller
exports.aboutPage = (req, res) => {
    res.send('About us');
};

// Contact page controller
exports.contactPage = (req, res) => {
    res.send('Contact us');
};


exports.track = (req, res) => {
    return res.sendFile(path.resolve(__dirname + '/../views/socket.html'));
}