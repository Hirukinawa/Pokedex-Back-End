const express = require("express");
const cors = require("cors");

const app = express();

app.listen(5500, () => console.log("Rodando na porta 5500"));

app.use(cors());

app.use(express.json());
let pkmnsFav = [];

app.route("/teste").get((req, res) => {
  res.json("Eae man");
});

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

  const pokemon = pkmnsFav.find(
    (pokemon) => Number(userId) === Number(pokemon.id)
  );

  if (!pokemon) {
    res.json("Pokémon não encontrado!");
  }

  pkmnsFav = pkmnsFav.filter((user) => Number(user.id) !== Number(userId));

  res.json("Pokémon removido");
});
