var express = require('express');
var app = express();

// Configure the server
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(express.urlencoded({limit:'1kb'}));
app.use(express.static(__dirname+'/statics'));

// Enable sessions
app.use(express.cookieParser());
app.use(express.session({secret:'CS 340 3/6/2014'}));

app.get('/', require('./routes/index')); // Goes to the home page not being logged in

// the login route and the login route after the login button is clicked.
app.get('/login', require('./routes/login'));
app.post('/login', require('./routes/post_login'));

// The logout route
app.get('/logout', require('./routes/logout'));

// The register route
app.get('/register', require('./routes/register'));
app.post('/register', require('./routes/post_register'));

// The post route for going to the post form and where to go after the submit button is pressed
app.get('/post', require('./routes/post'));
app.post('/submit', require('./routes/submit'));

// Logging in as an admin user
app.get('/admin', require('./routes/profile'));

// Routes the user to his/her profile page after login
app.get('/profile', require('./routes/profile'));

// Routes the user to the posts that a user has posted
app.get('/my_posts', require('./routes/my_posts'));

// Route for subscribe is working and puts the subscriber/subscribee pair into the database.
app.post('/subscribe/:username', require('./routes/subscribe'));
app.post('/unsubscribe/:username', require('./routes/unsubscribe'));

// Route is for removing posts
app.post('/removep/:id', require('./routes/removep'));

// Route to go to the page to ban a user and the route that brings you to the page after banning a user
//   or unbanning a user depending on the form that is submit.
app.get('/ban', require('./routes/ban'));
app.post('/ban', require('./routes/post_ban'));
app.post('/unban', require('./routes/post_unban'));

//routes for vote functions
app.post('/upvote/:id', require('./routes/upvote'));
app.post('/downvote/:id', require('./routes/downvote'));

// Default route for any other mistyped urls...
app.get('*', require('./routes/default'));


// Port thank the server is listenning for requests on
app.listen(8089);
console.log('Server is up.');
