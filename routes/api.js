const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "bdJSON/db.json"); //caminho para acessar o arquivo de banco de dados
const readFile = fs.readFileSync(dbPath, "utf-8"); // leitor do banco de dados
const db = JSON.parse(readFile); //Re-converção do arquivo lido em JSON

router.use(bodyParser.json()); //chamando a biblioteca rounter

//Insere Ordem Serviço
router.post("/os", (req, res) => {
  try {
    const novaOs = req.body;

    novaOs.id = Math.floor(Math.random() * 100000);
    novaOs.numero = Math.floor(Math.random() * 1000);
    novaOs.Descricao = "Ordem " + novaOs.id;

    db.OrdemServico.push(novaOs);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");

    res.status(201).json(novaOs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "500: Erro ao adicionar um novo registro" });
  }
});

//Busca OS por Numero
router.get("/os/:numero/", (req, res) => {
  let pN = JSON.parse(req.params.numero);
  const porNumero = db.OrdemServico.find((os) => os.numero === pN);

  if (porNumero) {
    res.json(porNumero);
  } else {
    res
      .status(404)
      .json({ error: "404: Erro ao buscar o registro pelo numero" });
  }
});

//Busca Todos os Registros
router.get("/os", (req, res) => {
  res.json(db);
});

//Insere Equipamento por Numero vinculado a OS
router.post("/os/:numero/equipamento", (req, res) => {
  try {
    let pN = JSON.parse(req.params.numero);
    const porNumero = db.OrdemServico.find((os) => os.numero === pN);

    if (porNumero) {
      const novoEquipamento = req.body;

      novoEquipamento.id = Math.floor(Math.random() * 10);
      novoEquipamento.numero = pNumero;
      novoEquipamento.indice = Math.floor(Math.random() * 10);
      novoEquipamento.Descricao = "Notebook " + novoEquipamento.id;
      novoEquipamento.Problema = "Problema Técnico";

      db.Equipamento.push(novoEquipamento);
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");

      res.status(201).json(novoEquipamento);
    }
  } catch {
    res.status(500).json({
      error: "500: Não há registro com o numero digitado" + porNumero,
    });
  }
});

//Busca OS por Numero e Equipamento por Indice
router.get("/os/:numero/equipamento/:indice", (req, res) => {
  const pN = JSON.parse(req.params.numero);
  const pIndice = JSON.parse(req.params.indice);

  const OrdemServico = db.OrdemServico.find((os) => os.numero === pN);

  if (!OrdemServico) {
    res
      .status(404)
      .json({ error: "404: Erro ao buscar o registro pelo numero:" });
  }

  const Equipamento = db.Equipamento.find(
    (equipamento) => equipamento.indice === pIndice
  );

  if (!Equipamento) {
    res
      .status(404)
      .json({ error: "404: Erro ao buscar o equipamento pelo indice: " });
  }

  res.json({ OrdemServico, Equipamento });
});

//Busca Equipamento por Numero vinculado a OS
router.get("/os/:numero/equipamento", (req, res) => {
  let pNumero = JSON.parse(req.params.numero);
  const EQPorNumero = db.Equipamento.filter(
    (equipamento) => equipamento.numero === pNumero
  );

  if (EQPorNumero) {
    res.json(EquipPorNumero);
  } else {
    res
      .status(404)
      .json({ error: "404: Erro ao buscar o registro pelo numero" });
  }
});

//Busca Equipamento por Descrição
router.get("/os/equipamento/:desc", (req, res) => {
  try {
    const pDescricao = JSON.parse(req.params.descricao);
    const EQporDesc = db.Equipamento.filter(
      (equipamento) => equipamento.descricao === pDescricao
    );

    res.json(EQporDesc);
  } catch (error) {
    console.error(error);
    res.status(404).json({
      error: "404: Erro ao buscar o registro pela descrição" + pDescricao,
    });
  }
});

module.exports = router;
