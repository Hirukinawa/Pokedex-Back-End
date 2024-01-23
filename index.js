const express = require("express");
const cors = require("cors");

const app = express();

app.listen(5500, () => console.log("Rodando na porta 5500"));

app.use(cors());

app.use(express.json());

let users = [];
let logos = [];
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
