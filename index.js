// index.js
const express = require('express');
const app = express();
const connection = require('./db.js')
const PORT = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());

app.get('/', (req, res) => {

res.send ('hello world')

});

app.get('/isa', (req, res) => {

    res.json (['tudo bem?'])
    
    });



// Exemplo: GET /contatos/1 → retorna os contatos do usuário com ID 1
app.get('/telefone_by_userid/:id', (req, res) => {
    const userId = req.params.id;
  
    const query = 'SELECT * FROM telefone WHERE contato_id = ? ';
  
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Erro ao buscar contatos:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.json(results);
      }
    });
  });

app.get('/todos_os_contatos', (req, res) => {
  
    const query = 'SELECT * FROM contatos ';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao buscar contatos:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        res.json(results);
      }
    });
  });

  app.post('/contatos', (req, res) => {

    const { nome } = req.body;

    if (nome == null){
       return res.status(400).json({ error: 'campo nome é obrigatório' });
    }
  
    const query = 'INSERT INTO contatos (nome) VALUES (?)  ';
  
    connection.query(query, [nome], (err, results) => {
      if (err) {
        console.error('Erro ao inserir contatos:', err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
         res.status(201).json({
            message: 'Contato inserido com sucesso'
          //  contatoId: result.insertId
          });
      }
    });
  });


// iniciando servidor
app.listen(PORT,() => {
    console.log(`servidor rodando na porta ${PORT}`);

})

