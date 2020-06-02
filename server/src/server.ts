import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  console.log("listagem de usuários");
  res.json([
    'Julianne',
    'Anne'
  ])
})
app.listen(3333, (req, res) => {
  console.log("Servidor está rodando");
})

// Node só entende javascript