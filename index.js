const express = require("express");
const cors = require("cors");

const app = express();

app.listen(5500, () => console.log("Rodando na porta 5500"));

app.use(cors());

app.use(express.json());

let users = [
  // {
  //   id: 1,
  //   name: "Jakeliny Gracielly",
  //   avatar: "https://avatars.githubusercontent.com/u/17316392?v=4",
  //   city: "São Paulo",
  // },
];
/*
id: req.body.id,
    name: req.body.name,
    types: req.body.types,
    abilities: req.body.abilities,
    sprites: req.body.sprites,
     */

let pkmnsFav = [];

app.route("/api").get((req, res) =>
  res.json({
    pkmnsFav,
  })
);

app.route("").get((req, res) =>
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

/*
{
    id: 6,
    name: "Charizard",
    types: [
      {
        slot: 1,
        type: { name: "fire", url: "https://pokeapi.co/api/v2/type/10/" },
      },
      {
        slot: 2,
        type: { name: "flying", url: "https://pokeapi.co/api/v2/type/3/" },
      },
    ],
    abilities: [
      {
        ability: {
          name: "blaze",
          url: "https://pokeapi.co/api/v2/ability/66/",
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: "solar-power",
          url: "https://pokeapi.co/api/v2/ability/94/",
        },
        is_hidden: true,
        slot: 2,
      },
    ],
    sprites: {
      other: {
        home: {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/6.png",
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/6.png",
        },
      },
    },
    stats: [
      (slot = {
        base_stat: 78,

        stat: {
          name: "hp",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      }),
    ],
    moves: [
      {
        move: {
          name: "mega-punch",
          url: "https://pokeapi.co/api/v2/move/5/",
        },
      },
      {
        move: {
          name: "fire-punch",
          url: "https://pokeapi.co/api/v2/move/7/",
        },
      },
      {
        move: {
          name: "thunder-punch",
          url: "https://pokeapi.co/api/v2/move/9/",
        },
      },
    ],
  },
*/
