# Apps para executar

- Postman: Testar as rotas desenvolvidas<br/>
- Docker: Executar a imagem para rodar a aplicação<br/>

# Rotas

POST /api/v1/os<br/>
GET /api/v1/os/:numero<br/>
GET /api/v1/os/<br/>
POST /api/v1/os/:numero/equipamento<br/>
GET /api/v1/os/:numero/equipamento/:indice<br/>
GET /api/v1/os/:numero/equipamento/<br/>
GET /api/v1/os/equipamento/:desc<br/>

# Arquivos :

- bdJSON/db.JSON: Arquivo usado como banco de dados de extensão JSON.<br/>
- routes/api.js: Arquivo principal com os enredeços de rotas desenvolvidos<br/>
- /index.js: Arquivo de inicialização do servidor executado no DockerFile<br/>
- /API Gateway.postman_collection.json: Coleção com requests para teste.

# Execução

`npm install`

Comandos para executar container:<br/>
`docker build -t [nome-do-container] .` <br/>
`docker run -p 3000:3000 [nome-do-container]`
