import express from 'express';
const app = express();
app.set('view engine', 'ejs');

app.get('/greeting', (req, res) => {
    const name = "Carlos";
    res.render('greeting', { name });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});