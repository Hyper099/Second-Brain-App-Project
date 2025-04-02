import express from 'express';

const app = express();
app.use(express.json());

//? Routes
//* auth routes
app.post('api/v1/signup', (req, res) => { });

app.post('/api/v1/signin', (req, res) => { });


//*ccontent routes
app.post('/api/v1/content', (req, res) => { });

app.get('/api/v1/content', (req, res) => { });

app.delete('/api/v1/content', (req, res) => { });

app.post('api/v1/brain/share', (req, res) => { });

app.get('/api/v1/brain/:sharelink', (req, res) => { });


// !function
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});