const express = require("express");
const cors = require("cors");

const app = express();

app.listen(5500, () => console.log("Rodando na porta 5500"));

app.use(cors());

app.use(express.json());

let users = [];
let fechamentoCaixa = [
  {
    id: 1,
    evento: "Show",
    terminal: "POs",
    abertura: "25-01-2022",
    fechamento: "26-01-2022",
    valor: "5489,54",
    dinheiro: "50",
    cartao: "5000,84",
    cortesia: "0",
    pix: "439",
    outros: "0",
    sincronizacao: "Sas",
  },
  {
    id: 2,
    evento: "Show",
    terminal: "POs",
    abertura: "25-01-2022",
    fechamento: "26-01-2022",
    valor: "5489,54",
    dinheiro: "50",
    cartao: "5000,84",
    cortesia: "0",
    pix: "439",
    outros: "0",
    sincronizacao: "Sas",
  },
  {
    id: 3,
    evento: "Show",
    terminal: "POs",
    abertura: "25-01-2022",
    fechamento: "26-01-2022",
    valor: "5489,54",
    dinheiro: "50",
    cartao: "5000,84",
    cortesia: "0",
    pix: "439",
    outros: "0",
    sincronizacao: "Sas",
  },
  {
    id: 4,
    evento: "Show",
    terminal: "POs",
    abertura: "25-01-2022",
    fechamento: "26-01-2022",
    valor: "5489,54",
    dinheiro: "50",
    cartao: "5000,84",
    cortesia: "0",
    pix: "439",
    outros: "0",
    sincronizacao: "Sas",
  },
];
let pkmnsFav = [];

app.route("/users").get((req, res) =>
  res.json({
    users,
  })
);

app.route("/users/:id").get((req, res) => {
  const userId = req.params.id;

  const user = users.find((user) => Number(user.id) === Number(userId));

  if (!user) {
    return res.json("Usuário não encontrado!");
  }

  res.json(user);
});

app.route("/users").post((req, res) => {
  let lastId = 0;

  if (users.length > 0) {
    lastId = users[users.length - 1].id;
  }

  users.push({
    id: lastId + 1,
    name: req.body.name,
    password: req.body.password,
    date: req.body.date,
    admin: req.body.admin,
  });

  res.json("Usuário adicionado");
});

app.route("/users/:id").put((req, res) => {
  const userId = req.params.id;

  const user = users.find((user) => Number(user.id) === Number(userId));

  if (!user) {
    return res.json("Usuário não encontrado!");
  }

  const updatedUser = {
    ...user,
    id: req.body.id,
    name: req.body.name,
    password: req.body.password,
    date: req.body.date,
    admin: req.body.admin,
  };

  users = users.map((user) => {
    if (Number(user.id) === Number(userId)) {
      user = updatedUser;
    }
    return user;
  });

  res.json("Usuário atualizado");
});

app.route("/users/:id").delete((req, res) => {
  const userId = req.params.id;

  users = users.filter((user) => Number(user.id) !== Number(userId));

  res.json("Usuário removido!");
});

//////////////////
//////////////////
//////////////////
//////////////////
//////////////////

app.route("/fechamento_caixa").get((req, res) => {
  res.json({
    fechamentoCaixa,
  });
});

app.route("/fechamento_caixa/:id").get((req, res) => {
  const caixaId = req.params.id;

  const user = fechamentoCaixa.find(
    (user) => Number(user.id) === Number(caixaId)
  );

  if (!user) {
    return res.json("Fechamento não encontrado");
  }

  res.json(user);
});

app.route("/fechamento_caixa").post((req, res) => {
  let lastId = 0;

  if (fechamentoCaixa.length > 0) {
    lastId = fechamentoCaixa[fechamentoCaixa.length - 1].id;
  }

  fechamentoCaixa.push({
    id: lastId + 1,
    evento: req.body.evento,
    terminal: req.body.terminal,
    abertura: req.body.abertura,
    fechamento: req.body.fechamento,
    valor: req.body.valor,
    dinheiro: req.body.dinheiro,
    cartao: req.body.cartao,
    cortesia: req.body.cortesia,
    pix: req.body.pix,
    outros: req.body.outros,
    sincronizacao: req.body.sincronizacao,
  });

  res.json("Fechamento adicionado");
});

app.route("/fechamento_caixa/:id").put((req, res) => {
  const caixaId = req.params.id;

  const caixa = fechamentoCaixa.find(
    (caixa) => Number(caixa.id) === Number(caixaId)
  );

  if (!caixa) {
    res.json("Fechamento não encontrado!");
  }

  const updatedCaixa = {
    ...caixa,
    id: req.body.id,
    evento: req.body.evento,
    terminal: req.body.terminal,
    abertura: req.body.abertura,
    fechamento: req.body.fechamento,
    valor: req.body.valor,
    dinheiro: req.body.dinheiro,
    cartao: req.body.cartao,
    cortesia: req.body.cortesia,
    pix: req.body.pix,
    outros: req.body.outros,
    sincronizacao: req.body.sincronizacao,
  };

  fechamentoCaixa = fechamentoCaixa.map((caixa) => {
    if (Number(caixa.id) === Number(caixaId)) {
      caixa = updatedCaixa;
    }
    return caixa;
  });

  res.json("Fechamento atualizado");
});

app.route("/fechamento_caixa/:id").delete((req, res) => {
  const caixaId = req.params.id;

  fechamentoCaixa = fechamentoCaixa.filter(
    (caixa) => Number(caixa.id) !== Number(caixaId)
  );

  res.json("Fechamento excluído");
});

//////////////////
//////////////////
//////////////////
//////////////////
//////////////////

app.route("/api").get((req, res) =>
  res.json({
    pkmnsFav,
  })
);

app.route("/api/:id").get((req, res) => {
  const userId = req.params.id;

  const user = pkmnsFav.find((user) => Number(user.id) === Number(userId));

  if (!user) {
    return res.json("Pokémon não encontrado!");
  }

  res.json(user);
});

app.route("/api").post((req, res) => {
  let lastId = 0;
  if (pkmnsFav.length > 0) {
    lastId = pkmnsFav[pkmnsFav.length - 1].id;
  }
  pkmnsFav.push({
    id: req.body.id,
    name: req.body.name,
    types: req.body.types,
    abilities: req.body.abilities,
    sprites: req.body.sprites,
    stats: req.body.stats,
    moves: req.body.moves,
    species: req.body.species,
  });
  res.json("Pokémon adicionado");
});

app.route("/api/:id").put((req, res) => {
  const userId = req.params.id;

  const user = pkmnsFav.find((user) => Number(user.id) === Number(userId));

  if (!user) {
    return res.json("Pokémon não encontrado!");
  }

  const updatedUser = {
    ...user,
    id: req.body.id,
    name: req.body.name,
    types: req.body.types,
    abilities: req.body.abilities,
    sprites: req.body.sprites,
    stats: req.body.stats,
    moves: req.body.moves,
    species: req.body.species,
  };

  users = pkmnsFav.map((user) => {
    if (Number(user.id) === Number(userId)) {
      user = updatedUser;
    }
    return user;
  });

  res.json("Pokémon atualizado");
});

app.route("/api/:id").delete((req, res) => {
  const userId = req.params.id;

  pkmnsFav = pkmnsFav.filter((user) => Number(user.id) !== Number(userId));

  res.json("Pokémon removido");
});
