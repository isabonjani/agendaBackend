// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const connection = require('./db.js')
const PORT = 3000;

// Middleware para permitir JSON no corpo das requisições
app.use(express.json());
app.use(cors());

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

  app.get('/contatos/:id', (req, res) => {
    const userId = req.params.id;
  
    const query = 'SELECT nome, data_nasc FROM contatos WHERE id = ? ';
  
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

    const { nome, dataNasc } = req.body;

    if (nome == null){
       return res.status(400).json({ error: 'campo nome é obrigatório' });
    }
  
    if (dataNasc == null){
      return res.status(400).json({ error: 'campo data de nascimento é obrigatório' });
   }
    const query = 'INSERT INTO contatos (nome, data_nasc) VALUES (?,?)  ';
  
    connection.query(query, [nome, dataNasc], (err, results) => {
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

  app.put('/contatos', (req, res) => {

    const { userid, nome, dataNasc } = req.body;

    if (nome == null){
       return res.status(400).json({ error: 'campo nome é obrigatório' });
    }
  if (userid == null){
    return res.status(400).json({ error: 'campo userid é obrigatório' });
  }
  if (dataNasc == null){
    return res.status(400).json({ error: 'campo data de nascimento é obrigatório' });
  }
    const query = 'UPDATE contatos SET nome = ?, data_nasc = ? WHERE id= ?  ';    
  
    connection.query(query, [ nome, dataNasc, userid], (err, results) => {
      if (err) {
        console.error('Erro ao atualizar contatos:', err);
        return res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
         res.status(200).json({
            message: 'Contato atualizado com sucesso'
          //  contatoId: result.insertId
          });
      }
    });
  });

  app.delete('/contatos/:id', (req, res) => {
    const userId = req.params.id;
  
    const query = 'DELETE from contatos WHERE id = ? ';
  
    connection.query(query, [userId], (err, results) => {
      if (err) {hfdt
        console.error('Erro ao deletar contatos:', err);njdgfh
        res.status(500).json({ error: 'Erro interno do servidor' });
      } else {
        // res.json(results);
        if (results.affectedRows > 0){
          res.json({mensagem:"Registro deletado com sucesso!"});
        }else{
          res.status(400).json({mensagem:"Registro não encontrado"});
        }
      }
    });
  });



// iniciando servidor
app.listen(PORT,() => {
    console.log(`servidor rodando na porta ${PORT}`);

})

