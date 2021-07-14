import express from 'express';
import path from 'path';

const port = process.env.PORT || 8080;

const app = express();

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log(`Server started on port ${port}`);
console.log(`http://localhost:${port}`);