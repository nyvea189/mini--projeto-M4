3 rotas GET:

/api/ – listar todos os locais

/api/id/:id – buscar local por ID

/api/status/:status – buscar por status

1 rota POST para adicionar um local

1 rota DELETE para remover um local por ID

E ao final, um exemplo de arquivo README.md.

📁 Estrutura de Arquivos Sugerida
bash
Copiar
Editar
/api-locais
├── index.js
├── db.js
├── routes.js
├── .env
├── package.json
└── README.md
📄 index.js
js
Copiar
Editar
require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
📄 db.js
js
Copiar
Editar
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
📄 routes.js
js
Copiar
Editar
const express = require('express');
const router = express.Router();
const db = require('./db');

// GET - todos os locais
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM locais');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - local por ID
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM locais WHERE id = $1', [id]);
    res.json(result.rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - local por status
router.get('/status/:status', async (req, res) => {
  const { status } = req.params;
  try {
    const result = await db.query('SELECT * FROM locais WHERE status = $1', [status]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - adicionar local
router.post('/', async (req, res) => {
  const { nome, status } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO locais (nome, status) VALUES ($1, $2) RETURNING *',
      [nome, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - deletar local por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM locais WHERE id = $1', [id]);
    res.json({ message: 'Local deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
📝 README.md
md
Copiar
Editar
# 🌱 API de Locais - Meio Ambiente

Esta API permite o gerenciamento de locais associados ao meio ambiente, incluindo listagem, inserção, busca por status e exclusão.

## 🔧 Tecnologias

- Node.js
- Express
- PostgreSQL (Neon)
- dotenv

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/api-locais.git
cd api-locais
npm install
Crie um arquivo .env com sua string de conexão PostgreSQL (Neon):

ini
Copiar
Editar
DATABASE_URL=postgres://usuario:senha@ep-...neon.tech/db
PORT=3000
🚀 Inicialização
bash
Copiar
Editar
node index.js
📚 Rotas
GET /api/
Retorna todos os locais.

GET /api/id/:id
Retorna um local pelo seu ID.

GET /api/status/:status
Retorna locais com o status informado (ativo, inativo, etc).

POST /api/
Adiciona um novo local.

Body (JSON):

json
Copiar
Editar
{
  "nome": "Parque das Águas",
  "status": "ativo"
}
DELETE /api/:id
Remove um local por ID.

🛠 Exemplo de Tabela PostgreSQL
sql
Copiar
Editar
CREATE TABLE locais (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  status TEXT NOT NULL
);
📩 Contribuição
Sinta-se à vontade para contribuir! Crie uma issue ou PR.

📄 Licença
MIT

yaml
Copiar
Editar

--
