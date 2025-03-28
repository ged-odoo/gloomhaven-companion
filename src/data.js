export const CLASS_NAME = {
  void_warden: "Gardienne du Néant",
  red_guard: "Garde Rouge",
  axe_thrower: "Lanceur de Haches",
  artificer: "Artificier",
};

export const MAX_HP_MAP = {
  void_warden: [6, 7, 8, 9, 10, 11, 12, 13, 14],
  red_guard: [10, 12, 14, 16, 18, 20, 22, 24, 26],
  axe_thrower: [8, 9, 11, 12, 14, 15, 17, 18, 20],
  artificer: [8, 9, 11, 12, 14, 15, 17, 18, 20],
};

export const MAX_CARD_MAP = {
  void_warden: 11,
  red_guard: 10,
  artificer: 9,
  axe_thrower: 10,
};

function removeCard(cards, effect) {
  let index = cards.findIndex((id) => {
    let card = MONSTER_MODIFIERS_DECK.find((c) => c.id === id);
    return card.effects[0] === effect;
  });
  if (index >= 0) {
    cards.splice(index, 1);
  } else {
    throw new Error("nope");
  }
}

function addCard(cards, id) {
  if (!ATTACK_MODS.find((c) => c.id === id)) {
    throw new Error("boom");
  }
  cards.push(id);
}

export const ATTACK_MODS = [
  {
    id: "+2confusion",
    effects: ["+2", "confusion"],
    recycled: false,
    color: false,
  },
  {
    id: "+0heal",
    effects: ["+0", "soin 1 allié"],
    recycled: false,
    color: false,
  },
  {
    id: "+0poison",
    effects: ["+0", "poison"],
    recycled: false,
    color: false,
  },
  {
    id: "+0stun",
    effects: ["+0", "étourdissement"],
    recycled: false,
    color: false,
  },
  {
    id: "+1",
    effects: ["+1"],
    recycled: false,
    color: false,
  },
  {
    id: "+1heal",
    effects: ["+1", "soin 1 allié"],
    recycled: false,
    color: false,
  },
  {
    id: "+1stun",
    effects: ["+1", "étourdissement"],
    recycled: false,
    color: false,
  },
  {
    id: "+1poison",
    effects: ["+1", "poison"],
    recycled: false,
    color: false,
  },
  {
    id: "+1wound",
    effects: ["+1", "blessure"],
    recycled: false,
    color: false,
  },
  {
    id: "+1immobilisation",
    effects: ["+1", "immobilisation"],
    recycled: false,
    color: false,
  },
  {
    id: "+1dark",
    effects: ["+1", "obscurité"],
    recycled: false,
    color: false,
  },
  {
    id: "+1frost",
    effects: ["+1", "glace"],
    recycled: false,
    color: false,
  },
  {
    id: "+1push",
    effects: ["+1", "poussée 2"],
    recycled: false,
    color: false,
  },
  {
    id: "+1shield",
    effects: ["+1", "bouclier 1"],
    recycled: false,
    color: false,
  },
  {
    id: "+1curse",
    effects: ["+1", "malédiction"],
    recycled: false,
    color: false,
  },
  {
    id: "+1feulum",
    effects: ["+1", "feu", "lumiere"],
    recycled: false,
    color: false,
  },
  {
    id: "+2",
    effects: ["+2"],
    recycled: false,
    color: false,
  },
  {
    id: "+2earth",
    effects: ["+2", "terre"],
    recycled: false,
    color: false,
  },
  {
    id: "+2fire",
    effects: ["+2", "feu"],
    recycled: false,
    color: false,
  },
  {
    id: "+2air",
    effects: ["+2", "air"],
    recycled: false,
    color: false,
  },
  {
    id: "+2light",
    effects: ["+2", "lumiere"],
    recycled: false,
    color: false,
  },
  {
    id: "+0boom",
    effects: ["+0", "1degat enn. adj."],
    recycled: false,
    color: false,
  },
  {
    id: "+3",
    effects: ["+3"],
    recycled: false,
    color: false,
  },
];

export const PERKS = {
  artificer: [
    {
      id: 1,
      text: "Retirer quatre carte (+0)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        removeCard(cards, "+0");
        removeCard(cards, "+0");
        removeCard(cards, "+0");
      },
    },
    {
      id: 2,
      text: "Retirer deux cartes (-1)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "-1");
        removeCard(cards, "-1");
      },
    },
    {
      id: 3,
      text: "Retirer une carte (-2) et une carte (+1)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "-2");
        removeCard(cards, "+1");
      },
    },
    {
      id: 4,
      text: "Remplacer une carte (+0) par une carte (+2) (CONFUSION)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+2confusion");
      },
    },
    {
      id: 5,
      text: "Remplacer une carte (-1) par une carte (+0) (EMPOISONNEMENT)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "-1");
        addCard(cards, "+0poison");
      },
    },
    {
      id: 6,
      text: "Ajouter une carte (+2)",
      arity: 3,
      apply(cards) {
        addCard(cards, "+2");
      },
    },
    {
      id: 7,
      text: "Remplacer une carte (+1) par une carte (+2) (terre)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "+1");
        addCard(cards, "+2earth");
      },
    },
    {
      id: 8,
      text: "Remplacer une carte (+1) par une carte (+2) (feu)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "+1");
        addCard(cards, "+2fire");
      },
    },
    {
      id: 9,
      text: "Ajouter une carte (+0) (1degat enn. adj.)",
      arity: 2,
      apply(cards) {
        addCard(cards, "+0boom");
      },
    },
  ],
  axe_thrower: [
    {
      id: 1,
      text: "Retirer deux cartes (-1)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "-1");
        removeCard(cards, "-1");
      },
    },
    {
      id: 2,
      text: "Remplacer une carte (+0) par une carte (+2) (CONFUSION)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+2confusion");
      },
    },
    {
      id: 3,
      text: "Remplacer une carte (+0) par une carte (+1) (EMPOISONNEMENT)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+1poison");
      },
    },
    {
      id: 4,
      text: "Remplacer une carte (+0) par une carte (+1) (BLESSURE)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+1wound");
      },
    },
    {
      id: 5,
      text: "Remplacer une carte (+0) par une carte (+1) (IMMOBILISATION)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+1immobilisation");
      },
    },
    {
      id: 6,
      text: "Remplacer une carte (+0) par une carte (+1) (POUSSEE 2)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+1push");
      },
    },
    {
      id: 7,
      text: "Remplacer une carte (+0) par une carte (+0) (ETOURDISSEMENT)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+0stun");
      },
    },
    {
      id: 8,
      text: "Remplacer une carte (+1) par une carte (+1) (ETOURDISSEMENT)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+1");
        addCard(cards, "+1stun");
      },
    },
    {
      id: 9,
      text: "Ajouter une carte (+2) (air)",
      arity: 3,
      apply(cards) {
        addCard(cards, "+2air");
      },
    },
    {
      id: 10,
      text: "Remplacer une carte (+1) par une carte (+3)",
      arity: 3,
      apply(cards) {
        removeCard(cards, "+1");
        addCard(cards, "+3");
      },
    },
  ],
  red_guard: [
    {
      id: 1,
      text: "Retirer quatre carte (+0)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        removeCard(cards, "+0");
        removeCard(cards, "+0");
        removeCard(cards, "+0");
      },
    },
    {
      id: 2,
      text: "Retirer deux cartes (-1)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "-1");
        removeCard(cards, "-1");
      },
    },
    {
      id: 3,
      text: "Retirer une carte (-2) et une carte (+1)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "-2");
        removeCard(cards, "+1");
      },
    },
    {
      id: 4,
      text: "Remplacer une carte (-1) par une carte (+1)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "-1");
        addCard(cards, "+1");
      },
    },
    {
      id: 5,
      text: "Remplacer une carte (+1) par une carte (+2) (feu)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "+1");
        addCard(cards, "+2fire");
      },
    },
    {
      id: 6,
      text: "Remplacer une carte (+1) par une carte (+2) (lumière)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "+1");
        addCard(cards, "+2light");
      },
    },
    {
      id: 7,
      text: "Ajouter une carte (+1) (feu) (lumiere)",
      arity: 2,
      apply(cards) {
        addCard(cards, "+1feulum");
      },
    },
    {
      id: 8,
      text: "Ajouter une carte (+1) (bouclier 1)",
      arity: 2,
      apply(cards) {
        addCard(cards, "+1shield");
      },
    },
    {
      id: 9,
      text: "Remplacer une carte (+0) par une carte (+1) (IMMOBILISATION)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+1immobilisation");
      },
    },
    {
      id: 10,
      text: "Remplacer une carte (+0) par une carte (+1) (BLESSURE)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+1wound");
      },
    },
  ],
  void_warden: [
    {
      id: 1,
      text: "Retirer deux cartes (-1)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "-1");
        removeCard(cards, "-1");
      },
    },
    {
      id: 2,
      text: "Retirer une carte (-2)",
      arity: 1,
      apply(cards) {
        removeCard(cards, "-2");
      },
    },
    {
      id: 3,
      text: "Remplacer une carte (+0) par une carte (+1) (obscurité)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+1dark");
      },
    },
    {
      id: 4,
      text: "Remplacer une carte (+0) par une carte (+1) (glace)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "+0");
        addCard(cards, "+1frost");
      },
    },
    {
      id: 5,
      text: "Remplacer une carte (-1) par une carte (+0) (soin 1 allié)",
      arity: 2,
      apply(cards) {
        removeCard(cards, "-1");
        addCard(cards, "+0heal");
      },
    },
    {
      id: 6,
      text: "Ajouter une carte (+1) (soin 1 allié)",
      arity: 3,
      apply(cards) {
        addCard(cards, "+1heal");
      },
    },
    {
      id: 7,
      text: "Ajouter une carte (+1) (empoisonnement)",
      arity: 1,
      apply(cards) {
        addCard(cards, "+1poison");
      },
    },
    {
      id: 8,
      text: "Ajouter une carte (+3)",
      arity: 1,
      apply(cards) {
        addCard(cards, "+3");
      },
    },
    {
      id: 9,
      text: "Ajouter une carte (+1) (malédiction)",
      arity: 2,
      apply(cards) {
        addCard(cards, "+1curse");
      },
    },
  ],
};

const BOSS_ACTIONS = [
  {
    id: 1,
    name: "Puissance Accélérée",
    initiative: 11,
    recycled: false,
    effects: ["Spécial 2"],
  },
  {
    id: 2,
    name: "Puissance Accélérée",
    initiative: 14,
    recycled: false,
    effects: ["Spécial 2"],
  },
  {
    id: 3,
    name: "Puissance Accélérée",
    initiative: 17,
    recycled: true,
    effects: ["Spécial 2"],
  },
  {
    id: 4,
    name: "Force Durable",
    initiative: 85,
    recycled: true,
    effects: ["Spécial 1"],
  },
  {
    id: 5,
    name: "Force Durable",
    initiative: 79,
    recycled: false,
    effects: ["Spécial 1"],
  },
  {
    id: 6,
    name: "Force Durable",
    initiative: 73,
    recycled: false,
    effects: ["Spécial 1"],
  },
  {
    id: 7,
    name: "Rien de Particulier",
    initiative: 36,
    recycled: false,
    effects: ["Déplacement +0", "Attaque +0"],
  },
  {
    id: 8,
    name: "Projectiles Jumeaux",
    initiative: 54,
    recycled: false,
    effects: ["Déplacement -1", "Attaque -1, portée 3, cible 2"],
  },
];

export const ENEMIES = [
  // MARK: reanimated corpse
  {
    id: "reanimated_corpse",
    name: "Cadavre Réanimé",
    normalHp: [5, 7, 9, 10, 11, 13, 14, 16],
    eliteHp: [10, 11, 14, 14, 16, 18, 23, 29],
    normalMove: [1, 1, 1, 1, 2, 2, 2, 2],
    eliteMove: [1, 1, 1, 2, 2, 2, 2, 2],
    normalAttack: [3, 3, 3, 4, 4, 4, 4, 5],
    eliteAttack: [3, 4, 4, 5, 5, 6, 6, 6],
    normalModifiers: [
      "",
      "",
      "",
      "",
      "",
      "",
      "empoisonnement",
      "empoisonnement",
    ],
    eliteModifiers: [
      "",
      "",
      "",
      "",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "Empoisonnement",
    ],
    actions: [
      {
        id: 1,
        name: "Étreinte Putride",
        initiative: 21,
        recycled: false,
        effects: [
          "Déplacement +1",
          "Confusion, immobilisation (cible un adversaire adjacent)",
          "[terre]: la cible subit aussi 2 dégats",
        ],
      },
      {
        id: 2,
        name: "Claque Violente",
        initiative: 32,
        recycled: false,
        effects: [
          "Attaque +2, poussée 1",
          "Si cette attaque est effectuée, le Cadavre Réanimé subit 1 dégat",
        ],
      },
      {
        id: 3,
        name: "Assaut Précipité",
        initiative: 47,
        recycled: false,
        effects: ["Déplacement +1", "Attaque -1"],
      },
      {
        id: 4,
        name: "Rien de Particulier",
        initiative: 68,
        recycled: true,
        effects: ["Déplacement +0", "Attaque +0"],
      },
      {
        id: 5,
        name: "Rien de Particulier",
        initiative: 68,
        recycled: true,
        effects: ["Déplacement +0", "Attaque +0"],
      },
      {
        id: 6,
        name: "Émission de Gaz",
        initiative: 71,
        recycled: false,
        effects: [
          "Déplacement +0",
          "Attaque +1",
          "Empoisonnement (cible tous les adversaires adjacents)",
          "Infuse: Terre",
        ],
      },
      {
        id: 7,
        name: "Coup Calculé",
        initiative: 81,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1"],
      },
      {
        id: 8,
        name: "Charge Téméraire",
        initiative: 91,
        recycled: false,
        effects: [
          "Déplacement +2",
          "Si ce déplacement est effectué, le cadavre subit 1 dégat",
        ],
      },
    ],
  },
  // MARK: chaos demon
  {
    id: "chaos_demon",
    name: "Démon du Chaos",
    normalHp: [7, 8, 11, 12, 15, 16, 20, 22],
    eliteHp: [10, 12, 14, 18, 21, 26, 30, 35],
    normalMove: [3, 3, 3, 3, 4, 4, 4, 4],
    eliteMove: [4, 4, 4, 5, 5, 5, 5, 5],
    normalAttack: [2, 3, 3, 4, 4, 5, 5, 6],
    eliteAttack: [3, 4, 5, 5, 6, 6, 7, 8],
    normalModifiers: [
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
    ],
    eliteModifiers: [
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
    ],
    actions: [
      {
        id: 1,
        name: "Souffle Glacial",
        initiative: 13,
        recycled: false,
        effects: [
          "Déplacement -1",
          "Attaque +0, cible 2 hex voisins adjacents",
          "[Glace]: chaque fois qu'un personnage attaque le démon, le personnage subit 2 dégats",
        ],
      },
      {
        id: 2,
        name: "Déflagration de Chaleur",
        initiative: 1,
        recycled: false,
        effects: ["Déplacement -1", "Attaque -1, portée 3", "[Feu]: blessure"],
      },
      {
        id: 3,
        name: "Coup Sismique",
        initiative: 67,
        recycled: false,
        effects: [
          "Déplacement -2",
          "Attaque +1, poussée 2",
          "[Terre]: cible 2 hex adjacents voisins",
        ],
      },
      {
        id: 4,
        name: "Tourbillon",
        initiative: 20,
        recycled: false,
        effects: [
          "Déplacement +0",
          "Attaque -1, portée 2, cible 3 hex adjacents voisins",
          "[Air]: bouclier 2",
        ],
      },
      {
        id: 5,
        name: "Griffes Soudaines",
        initiative: 41,
        recycled: false,
        effects: [
          "Déplacement +0",
          "Attaque +0, avantage",
          "[Lumière]: soin 4 sur lui-même",
        ],
      },
      {
        id: 6,
        name: "Vrilles Noires",
        initiative: 52,
        recycled: false,
        effects: [
          "Déplacement -1",
          "Attaque +1",
          "[Obscurité]: tous les adversaires adjacents à la cible subissent 1 dégat",
        ],
      },
      {
        id: 7,
        name: "Explosion de Mana",
        initiative: 76,
        recycled: true,
        effects: [
          "Déplacement +0",
          "Attaque +0",
          "Infuse Feu, Glace, Air, Terre, Lumière, Obscurité",
        ],
      },
      {
        id: 8,
        name: "Gueule Affamée",
        initiative: 98,
        recycled: true,
        effects: ["Attaque -1", "[n'importe quel élément]: désarmement"],
      },
    ],
  },
  // MARK: blood demon
  {
    id: "blood_demon",
    name: "Diablotin de Sang",
    normalHp: [3, 4, 5, 5, 7, 8, 9, 12],
    eliteHp: [4, 6, 7, 10, 11, 13, 17, 21],
    normalMove: [2, 2, 3, 3, 3, 4, 4, 4],
    eliteMove: [2, 2, 3, 3, 3, 4, 4, 4],
    normalAttack: [1, 1, 1, 2, 2, 2, 3, 3],
    eliteAttack: [2, 2, 2, 2, 3, 3, 4, 4],
    normalModifiers: [
      "",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
    ],
    eliteModifiers: [
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
      "confusion",
    ],
    actions: [
      {
        id: 1,
        name: "Hors Phase",
        initiative: 5,
        recycled: false,
        effects: ["Bouclier 5", "Soin 1 sur lui même", "Infuse 1 élément"],
      },
      {
        id: 2,
        name: "Faire Pencher la Balance",
        initiative: 24,
        recycled: false,
        effects: [
          "Renforcement, cible tous les alliés à portée 2 et lui-même",
          "Confusion, cible tous les adversaires à portée 2",
        ],
      },
      {
        id: 3,
        name: "Rien de Particulier",
        initiative: 37,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0, portée 3"],
      },
      {
        id: 4,
        name: "Rien de Particulier",
        initiative: 37,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0, portée 3"],
      },
      {
        id: 5,
        name: "Récupération",
        initiative: 42,
        recycled: true,
        effects: ["Déplacement +1", "Soin 2, portée 3"],
      },
      {
        id: 6,
        name: "Estropier",
        initiative: 42,
        recycled: true,
        effects: [
          "Déplacement +0",
          "Attaque -1, portée 3, cible 2, empoisonnement",
        ],
      },
      {
        id: 7,
        name: "Sombre Charme",
        initiative: 42,
        recycled: false,
        effects: [
          "Déplacement +0",
          "Attaque -1, portée 3, cible 2, malédiction",
        ],
      },
      {
        id: 8,
        name: "Coup Calculé",
        initiative: 76,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1, portée 3"],
      },
    ],
  },
  // MARK: black imp
  {
    id: "black_imp",
    name: "Diablotin Noir",
    normalHp: [3, 4, 5, 5, 7, 9, 10, 13],
    eliteHp: [4, 6, 8, 8, 11, 14, 15, 19],
    normalMove: [1, 1, 1, 1, 1, 1, 1, 1],
    eliteMove: [1, 1, 1, 1, 1, 1, 1, 1],
    normalAttack: [1, 1, 1, 2, 2, 2, 3, 3],
    eliteAttack: [2, 2, 2, 3, 3, 3, 4, 4],
    normalModifiers: [
      "",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
    ],
    eliteModifiers: [
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement, attaquants gagnent désavantage",
      "empoisonnement, attaquants gagnent désavantage",
      "empoisonnement, attaquants gagnent désavantage",
      "empoisonnement, attaquants gagnent désavantage",
      "empoisonnement, attaquants gagnent désavantage",
    ],
    actions: [
      {
        id: 1,
        name: "Hors Phase",
        initiative: 5,
        recycled: false,
        effects: ["Bouclier 5", "Soin 1 sur lui même", "Infuse 1 élément"],
      },
      {
        id: 2,
        name: "Faire Pencher la Balance",
        initiative: 24,
        recycled: false,
        effects: [
          "Renforcement, cible tous les alliés à portée 2 et lui-même",
          "Confusion, cible tous les adversaires à portée 2",
        ],
      },
      {
        id: 3,
        name: "Rien de Particulier",
        initiative: 37,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0, portée 3"],
      },
      {
        id: 4,
        name: "Rien de Particulier",
        initiative: 37,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0, portée 3"],
      },
      {
        id: 5,
        name: "Récupération",
        initiative: 42,
        recycled: true,
        effects: ["Déplacement +1", "Soin 2, portée 3"],
      },
      {
        id: 6,
        name: "Estropier",
        initiative: 42,
        recycled: true,
        effects: [
          "Déplacement +0",
          "Attaque -1, portée 3, cible 2, empoisonnement",
        ],
      },
      {
        id: 7,
        name: "Sombre Charme",
        initiative: 42,
        recycled: false,
        effects: [
          "Déplacement +0",
          "Attaque -1, portée 3, cible 2, malédiction",
        ],
      },
      {
        id: 8,
        name: "Coup Calculé",
        initiative: 76,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1, portée 3"],
      },
    ],
  },
  // MARK: vermling scout
  {
    id: "vermling_scout",
    name: "Éclaireur Vermling",
    normalHp: [2, 3, 3, 5, 6, 8, 10, 13],
    eliteHp: [4, 5, 5, 7, 8, 11, 13, 17],
    normalMove: [3, 3, 3, 3, 3, 3, 4, 4],
    eliteMove: [3, 3, 4, 4, 4, 4, 5, 5],
    normalAttack: [1, 1, 2, 2, 3, 3, 3, 3],
    eliteAttack: [2, 2, 3, 3, 4, 4, 4, 4],
    normalModifiers: ["", "", "", "", "", "", "", ""],
    eliteModifiers: ["", "", "", "", "", "", "", ""],
    actions: [
      {
        id: 1,
        name: "Arc Court",
        initiative: 29,
        recycled: false,
        effects: ["Déplacement -1", "Attaque -1, portée 3"],
      },
      {
        id: 2,
        name: "Assaut Précipité",
        initiative: 40,
        recycled: false,
        effects: ["Déplacement +1", "Attaque -1"],
      },
      {
        id: 3,
        name: "Rien de Particulier",
        initiative: 53,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0"],
      },
      {
        id: 4,
        name: "Flèche Rance",
        initiative: 53,
        recycled: false,
        effects: ["Déplacement -2", "Attaque +0, portée 3, empoisonnement"],
      },
      {
        id: 5,
        name: "Coup Calculé",
        initiative: 69,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1"],
      },
      {
        id: 6,
        name: "Lame Délétère",
        initiative: 92,
        recycled: true,
        effects: ["Attaque +2, empoisonnement"],
      },
      {
        id: 7,
        name: "Carreaux Rapides",
        initiative: 78,
        recycled: false,
        effects: ["Attaque -1, portée 4, cible 2"],
      },
      {
        id: 8,
        name: "Avidité",
        initiative: 40,
        recycled: true,
        effects: ["Déplacement +1, saut", "Pillage 1"],
      },
    ],
  },
  // MARK: reanimated spirit
  {
    id: "reanimated_spirit",
    name: "Esprit Réanimé",
    normalHp: [3, 4, 5, 6, 6, 8, 9, 12],
    eliteHp: [5, 5, 7, 8, 8, 11, 13, 17],
    normalMove: [2, 2, 3, 3, 3, 3, 3, 3],
    eliteMove: [3, 3, 4, 4, 4, 4, 4, 4],
    normalAttack: [2, 2, 2, 3, 3, 3, 4, 4],
    eliteAttack: [3, 3, 3, 4, 4, 4, 5, 5],
    normalModifiers: [
      "Bouclier 1",
      "Bouclier 1",
      "Bouclier 1",
      "Bouclier 1",
      "Bouclier 2",
      "Bouclier 2",
      "Bouclier 2",
      "Bouclier 2",
    ],
    eliteModifiers: [
      "Bouclier 1",
      "Bouclier 2",
      "Bouclier 2",
      "Bouclier 2",
      "Bouclier 3",
      "Bouclier 3",
      "Bouclier 3",
      "Bouclier 3",
    ],
    actions: [
      {
        id: 1,
        name: "Saper l'Énergie",
        initiative: 22,
        recycled: true,
        effects: ["Déplacement -1", "Attaque -1, portée 4, confusion"],
      },
      {
        id: 2,
        name: "Cri Retentissant",
        initiative: 33,
        recycled: true,
        effects: [
          "Déplacement +0",
          "Attaque -1, cible tous les adversaires à portée 2",
        ],
      },
      {
        id: 3,
        name: "Rien de Particulier",
        initiative: 48,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0, portée 3"],
      },
      {
        id: 4,
        name: "Rien de Particulier",
        initiative: 48,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0, portée 3"],
      },
      {
        id: 5,
        name: "Chaine Couplée",
        initiative: 61,
        recycled: false,
        effects: ["Attaque +0, portée 3, cible 2"],
      },
      {
        id: 6,
        name: "Aspirer la Chaleur",
        initiative: 75,
        recycled: false,
        effects: [
          "Déplacement -1",
          "Attaque +1, portée 3",
          "Soin 1 sur lui-même",
          "Infuse Glace",
        ],
      },
      {
        id: 7,
        name: "Hurlement de Colère",
        initiative: 55,
        recycled: false,
        effects: [
          "Déplacement +0",
          "Malédiction, cible tous les adversaires à portée 3",
          "Infuse Glace",
        ],
      },
      {
        id: 8,
        name: "Regard Glacial",
        initiative: 67,
        recycled: false,
        effects: [
          "Déplacement -1",
          "Attaque +1, portée 3",
          "[Glace]: désarmement",
        ],
      },
    ],
  },
  // MARK: stone golem
  {
    id: "stone_golem",
    name: "Golem de Pierre",
    normalHp: [10, 10, 11, 11, 12, 13, 16, 16],
    eliteHp: [10, 11, 13, 14, 16, 18, 20, 21],
    normalMove: [1, 1, 1, 1, 2, 2, 2, 2],
    eliteMove: [2, 2, 2, 2, 2, 3, 3, 3],
    normalAttack: [3, 3, 4, 4, 4, 5, 5, 5],
    eliteAttack: [4, 4, 5, 5, 6, 6, 7, 7],
    normalModifiers: [
      "",
      "Bouclier 1",
      "Bouclier 1",
      "Bouclier 2",
      "Bouclier 2",
      "Bouclier 2",
      "Bouclier 2",
      "Bouclier 3",
    ],
    eliteModifiers: [
      "Bouclier 1",
      "Bouclier 2",
      "Bouclier 2",
      "Bouclier 3",
      "Bouclier 3",
      "Bouclier 3",
      "Bouclier 3",
      "Bouclier 4",
    ],
    actions: [
      {
        id: 1,
        name: "Progression Éprouvante",
        initiative: 28,
        recycled: false,
        effects: [
          "Déplacement +1",
          "Attaque +0",
          "Si la capacité de déplacement a été effectuée, le golem subit 1 dégat",
        ],
      },
      {
        id: 2,
        name: "Assaut Précipité",
        initiative: 51,
        recycled: true,
        effects: ["Déplacement +1", "Attaque -1"],
      },
      {
        id: 3,
        name: "Marteler le Sol",
        initiative: 83,
        recycled: false,
        effects: [
          "Déplacement +0",
          "Attaque -1, cible tous les adversaires adjacents",
        ],
      },
      {
        id: 4,
        name: "Coup Calculé",
        initiative: 90,
        recycled: true,
        effects: ["Déplacement -1", "Attack +1"],
      },
      {
        id: 5,
        name: "Réaction Runique",
        initiative: 10,
        recycled: false,
        effects: [
          "Chaque fois qu'un personnage attaque le golem, le personnage subit 3 dégats",
        ],
      },
      {
        id: 6,
        name: "Attraction Runique",
        initiative: 28,
        recycled: false,
        effects: [
          "Déplacement +1",
          "Attaque -2, portée 3, traction 2, immobilisation",
        ],
      },
      {
        id: 7,
        name: "Rien de Particulier",
        initiative: 64,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0"],
      },
      {
        id: 8,
        name: "Lancer Sacrificiel",
        initiative: 72,
        recycled: false,
        effects: [
          "Attaque +1, portée 3. Si cette attaque est effectuée, le golem subit 2 dégats",
        ],
      },
    ],
  },
  // MARK: monstruosité de sang
  {
    id: "blood_monster",
    name: "Monstruosité de Sang",
    normalHp: [7, 9, 10, 12, 12, 13, 17, 20],
    eliteHp: [12, 12, 15, 18, 18, 20, 23, 23],
    normalMove: [2, 2, 2, 3, 3, 3, 3, 3],
    eliteMove: [2, 2, 2, 3, 3, 3, 3, 3],
    normalAttack: [2, 2, 3, 3, 3, 4, 4, 5],
    eliteAttack: [3, 3, 4, 4, 4, 5, 6, 6],
    normalModifiers: [
      "à sa mort, tous les personnages adjacents subissent 1 dégats",
      "à sa mort, tous les personnages adjacents subissent 2 dégats",
      "à sa mort, tous les personnages adjacents subissent 2 dégats",
      "à sa mort, tous les personnages adjacents subissent 3 dégats",
      "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
      "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
      "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
      "à sa mort, tous les personnages adjacents subissent 4 dégats, Bouclier 1",
    ],
    eliteModifiers: [
      "à sa mort, tous les personnages adjacents subissent 1 dégats",
      "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
      "à sa mort, tous les personnages adjacents subissent 3 dégats, Bouclier 1",
      "à sa mort, tous les personnages adjacents subissent 4 dégats, Bouclier 1",
      "à sa mort, tous les personnages adjacents subissent 4 dégats, Bouclier 2",
      "à sa mort, tous les personnages adjacents subissent 5 dégats, Bouclier 2",
      "à sa mort, tous les personnages adjacents subissent 5 dégats, Bouclier 2",
      "à sa mort, tous les personnages adjacents subissent 5 dégats, Bouclier 3",
    ],
    actions: [
      {
        id: 1,
        name: "Bulles Explosives",
        initiative: 9,
        recycled: true,
        effects: [
          "Déplacement +1",
          "Chaque fois qu'un personnage attaque la monstruosité, le personnage subit 2 dégats",
        ],
      },
      {
        id: 2,
        name: "Nuée",
        initiative: 21,
        recycled: false,
        effects: [
          "Déplacement +1",
          "Attaque -1",
          "+1 à attaque si cible adjacente à un allié de la monstruosité",
        ],
      },
      {
        id: 3,
        name: "Nuée",
        initiative: 21,
        recycled: false,
        effects: [
          "Déplacement +1",
          "Attaque -1",
          "+1 à attaque si cible adjacente à un allié de la monstruosité",
        ],
      },
      {
        id: 4,
        name: "Morsure Affaiblissante",
        initiative: 34,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0, confusion"],
      },
      {
        id: 5,
        name: "Rien de Particulier",
        initiative: 39,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0"],
      },
      {
        id: 6,
        name: "Égratignure Incertaine",
        initiative: 52,
        recycled: true,
        effects: [
          "Déplacement +0",
          "Attaque +1",
          "Si l'attaque est effectuée, la monstruosité subit 1 dégat",
        ],
      },
      {
        id: 7,
        name: "Coup Calculé",
        initiative: 60,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1"],
      },
      {
        id: 8,
        name: "Frénésie Incertaine",
        initiative: 74,
        recycled: false,
        effects: [
          "Déplacement +0",
          "la Monstruosité subit 1 dégat",
          "Attaque +1, cible tous les adversaires adjacents",
        ],
      },
    ],
  },
  // MARK: monstruosité ratine
  {
    id: "rat_monster",
    name: "Monstruosité ratine",
    normalHp: [4, 4, 5, 6, 8, 10, 12, 12],
    eliteHp: [6, 7, 8, 10, 12, 13, 14, 16],
    normalMove: [1, 1, 2, 2, 2, 3, 3, 3],
    eliteMove: [1, 1, 1, 2, 2, 2, 3, 3],
    normalAttack: [1, 2, 2, 3, 3, 3, 3, 4],
    eliteAttack: [2, 2, 3, 3, 3, 4, 4, 5],
    normalModifiers: [
      "à sa mort, tous les personnages adjacents subissent 1 dégats",
      "à sa mort, tous les personnages adjacents subissent 1 dégats",
      "à sa mort, tous les personnages adjacents subissent 1 dégats",
      "à sa mort, tous les personnages adjacents subissent 2 dégats",
      "à sa mort, tous les personnages adjacents subissent 2 dégats",
      "à sa mort, tous les personnages adjacents subissent 2 dégats",
      "à sa mort, tous les personnages adjacents subissent 3 dégats",
      "à sa mort, tous les personnages adjacents subissent 3 dégats",
    ],
    eliteModifiers: [
      "à sa mort, tous les personnages adjacents subissent 1 dégats",
      "à sa mort, tous les personnages adjacents subissent 2 dégats, avantage",
      "à sa mort, tous les personnages adjacents subissent 2 dégats, avantage",
      "à sa mort, tous les personnages adjacents subissent 2 dégats, avantage",
      "à sa mort, tous les personnages adjacents subissent 3 dégats, avantage",
      "à sa mort, tous les personnages adjacents subissent 3 dégats, avantage",
      "à sa mort, tous les personnages adjacents subissent 3 dégats, avantage",
      "à sa mort, tous les personnages adjacents subissent 4 dégats, avantage",
    ],
    actions: [
      {
        id: 1,
        name: "Bulles explosives",
        initiative: 9,
        recycled: true,
        effects: [
          "Déplacement +1",
          "Chaque fois qu'un héro attaque la monstruosité, le héro subit 2 dégats",
        ],
      },
      {
        id: 2,
        name: "Nuée",
        initiative: 21,
        recycled: false,
        effects: [
          "Déplacement +1",
          "Attaque -1",
          "+1 à attaque si cible adjacente à un allié de la monstruosité",
        ],
      },
      {
        id: 3,
        name: "Nuée",
        initiative: 21,
        recycled: false,
        effects: [
          "Déplacement +1",
          "Attaque -1",
          "+1 à attaque si cible adjacente à un allié de la monstruosité",
        ],
      },
      {
        id: 4,
        name: "Morsure affaiblissante",
        initiative: 34,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0, confusion"],
      },
      {
        id: 5,
        name: "Rien de Particulier",
        initiative: 39,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0"],
      },
      {
        id: 6,
        name: "Égratignure incertaine",
        initiative: 52,
        recycled: true,
        effects: [
          "Déplacement +0",
          "Attaque +1",
          "Si l'attaque est effectuée, la monstruosité subit 1 dégat",
        ],
      },
      {
        id: 7,
        name: "Coup Calculé",
        initiative: 60,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1"],
      },
      {
        id: 8,
        name: "Frénésie incertaine",
        initiative: 74,
        recycled: false,
        effects: [
          "Déplacement +0",
          "la monstruosité subit 1 dégat",
          "Attaque +1, cible tous les adversaires adjacents",
        ],
      },
    ],
  },
  // MARK: base vermling bandit
  {
    id: "base_vermling_bandit",
    name: "Pillard Vermling de Base",
    normalHp: [4, 5, 9, 11, 12, 15, 17, 19],
    eliteHp: [8, 10, 14, 16, 19, 23, 27, 31],
    normalMove: [1, 1, 2, 3, 3, 3, 4, 4],
    eliteMove: [1, 1, 3, 3, 4, 4, 4, 4],
    normalAttack: [2, 2, 2, 2, 3, 3, 3, 4],
    eliteAttack: [2, 2, 3, 4, 4, 4, 5, 6],
    normalModifiers: ["", "", "", "", "", "", "", ""],
    eliteModifiers: ["", "", "", "", "", "", "", ""],
    actions: [
      {
        id: 1,
        name: "Hurlements",
        initiative: 85,
        recycled: true,
        effects: [
          "Poussée 1, ciblez tous les adversaires adjacents",
          "Attaque +1, portée 2",
        ],
      },
      {
        id: 2,
        name: "Lancer Précis",
        initiative: 36,
        recycled: false,
        effects: ["Déplacement +0", "Attaque -1, portée 2"],
      },
      {
        id: 3,
        name: "Double Dagues",
        initiative: 59,
        recycled: false,
        effects: ["Attaque +0, portée 2, cible 2"],
      },
      {
        id: 4,
        name: "Rien de Particulier",
        initiative: 50,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0"],
      },
    ],
  },
  // MARK: vermling bandit
  {
    id: "vermling_bandit",
    name: "Pillard Vermling",
    normalHp: [4, 5, 9, 11, 12, 15, 17, 19],
    eliteHp: [8, 10, 14, 16, 19, 23, 27, 31],
    normalMove: [1, 1, 2, 3, 3, 3, 4, 4],
    eliteMove: [1, 1, 3, 3, 4, 4, 4, 4],
    normalAttack: [2, 2, 2, 2, 3, 3, 3, 4],
    eliteAttack: [2, 2, 3, 4, 4, 4, 5, 6],
    normalModifiers: ["", "", "", "", "", "", "", ""],
    eliteModifiers: ["", "", "", "", "", "", "", ""],
    actions: [
      {
        id: 1,
        name: "Fosse à Pointes",
        initiative: 20,
        recycled: false,
        effects: [
          "Attaque +0, portée 4",
          "Créez un piège à 3 dégats sur l'hexaxone vide adjacent le plus proche d'un adversaire",
        ],
      },
      {
        id: 2,
        name: "Panser les Blessures",
        initiative: 30,
        recycled: true,
        effects: ["Déplacement +1", "Soin 3 sur lui-même"],
      },
      {
        id: 3,
        name: "Lancer Précis",
        initiative: 36,
        recycled: false,
        effects: ["Déplacement +0", "Attaque -1, portée 4"],
      },
      {
        id: 4,
        name: "Rien de Particulier",
        initiative: 50,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0"],
      },
      {
        id: 5,
        name: "Doubles Dagues",
        initiative: 59,
        recycled: false,
        effects: ["Attaque +0, portée 3, cible 2"],
      },
      {
        id: 6,
        name: "Parade",
        initiative: 70,
        recycled: false,
        effects: ["Déplacement +0", "Attaque -1, désarmement"],
      },
      {
        id: 7,
        name: "Méchant Épieu",
        initiative: 77,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +0, portée 3, blessure"],
      },
      {
        id: 8,
        name: "Hurlements Repoussants",
        initiative: 85,
        recycled: true,
        effects: [
          "Poussée 1, ciblez tous les adversaires adjacents",
          "Attaque +1, portée 2",
        ],
      },
    ],
  },
  // MARK: black vase
  {
    id: "black_vase",
    name: "Vase Noire",
    normalHp: [4, 5, 7, 8, 9, 10, 12, 16],
    eliteHp: [8, 9, 11, 11, 13, 15, 16, 18],
    normalMove: [1, 1, 1, 1, 2, 2, 2, 2],
    eliteMove: [1, 1, 1, 2, 2, 3, 3, 3],
    normalAttack: [2, 2, 2, 3, 3, 3, 4, 4],
    eliteAttack: [2, 2, 3, 3, 4, 4, 4, 5],
    normalModifiers: [
      "",
      "Bouclier 1",
      "Bouclier 1",
      "Bouclier 1",
      "Bouclier 1",
      "Bouclier 1",
      "Bouclier 1, empoisonnement",
      "Bouclier 1, empoisonnement",
    ],
    eliteModifiers: [
      "",
      "Bouclier 1",
      "Bouclier 1",
      "Bouclier 1, empoisonnement",
      "Bouclier 1, empoisonnement",
      "Bouclier 1, empoisonnement",
      "Bouclier 2, empoisonnement",
      "Bouclier 2, empoisonnement",
    ],
    actions: [
      {
        id: 1,
        name: "Assaut Précipité",
        initiative: 36,
        recycled: false,
        effects: ["Déplacement +1", "Attaque -1, portée 3"],
      },
      {
        id: 2,
        name: "Rien de Particulier",
        initiative: 57,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0, portée 2"],
      },
      {
        id: 3,
        name: "Explosion Toxique",
        initiative: 57,
        recycled: false,
        effects: [
          "Attaque +0, portée 2, cible 2, empoisonnement",
          "[Terre]: +1 cible",
        ],
      },
      {
        id: 4,
        name: "Coup Calculé",
        initiative: 66,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1, portée 3"],
      },
      {
        id: 5,
        name: "Repas",
        initiative: 66,
        recycled: false,
        effects: [
          "Déplacement +0",
          "Pillage 1",
          "Soin 2 sur elle-même",
          "[Obscurité]: +1 soin",
        ],
      },
      {
        id: 6,
        name: "Sceau Plasmique",
        initiative: 85,
        recycled: false,
        effects: [
          "Poussée 1, empoisonnement, cible tous les adversaires adjacents",
          "Attaque +1, portée 2",
        ],
      },
      {
        id: 7,
        name: "Noire Damnation",
        initiative: 85,
        recycled: true,
        effects: [
          "L'adversaire en ligne de vue le plus proche, sans considération de portée, subit 1+NS/2 dégats (arrondis au supérieur)",
          "Soin 1 sur elle-même",
          "Infuse Obscurité",
        ],
      },
      {
        id: 8,
        name: "Damnation Infectieuse",
        initiative: 85,
        recycled: true,
        effects: [
          "L'adversaire en ligne de vue le plus proche, sans considération de portée, subit 1+NS/2 dégats (arrondis au supérieur)",
          "Soin 1 sur elle-même",
          "Infuse Terre",
        ],
      },
    ],
  },
  // MARK: base giant viper
  {
    id: "base_giant_viper",
    name: "Vipère Géante de Base",
    normalHp: [2, 3, 4, 4, 6, 7, 8, 10],
    eliteHp: [3, 5, 7, 8, 11, 13, 14, 18],
    normalMove: [2, 2, 3, 3, 3, 3, 4, 4],
    eliteMove: [2, 2, 3, 3, 3, 4, 4, 4],
    normalAttack: [1, 1, 1, 2, 2, 3, 3, 3],
    eliteAttack: [2, 2, 2, 3, 3, 3, 4, 4],
    normalModifiers: [
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
    ],
    eliteModifiers: [
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
    ],
    actions: [
      {
        id: 1,
        name: "Constriction",
        initiative: 58,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1, immobilisation"],
      },
      {
        id: 2,
        name: "Crocs Rapides",
        initiative: 33,
        recycled: false,
        effects: ["Déplacement +1, saut", "Attaque +0, cible 2"],
      },
      {
        id: 3,
        name: "À couvert",
        initiative: 18,
        recycled: false,
        effects: [
          "Déplacement +1, saut",
          "Attaque -1",
          "Toutes les attaques ciblant la vipère gagnent désavantage ce round",
        ],
      },
      {
        id: 4,
        name: "Frénésie Toxique",
        initiative: 43,
        recycled: true,
        effects: [
          "Déplacement +1, saut",
          "Attaque -1, cible tous les adversaires adjacents",
        ],
      },
    ],
  },
  // MARK: giant viper
  {
    id: "giant_viper",
    name: "Vipère Géante",
    normalHp: [2, 3, 4, 4, 6, 7, 8, 10],
    eliteHp: [3, 5, 7, 8, 11, 13, 14, 18],
    normalMove: [2, 2, 3, 3, 3, 3, 4, 4],
    eliteMove: [2, 2, 3, 3, 3, 4, 4, 4],
    normalAttack: [1, 1, 1, 2, 2, 3, 3, 3],
    eliteAttack: [2, 2, 2, 3, 3, 3, 4, 4],
    normalModifiers: [
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
    ],
    eliteModifiers: [
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
      "empoisonnement",
    ],
    actions: [
      {
        id: 1,
        name: "Crocs Rapides",
        initiative: 33,
        recycled: false,
        effects: ["Déplacement +1, saut", "Attaque +0, cible 2"],
      },
      {
        id: 2,
        name: "À couvert",
        initiative: 18,
        recycled: false,
        effects: [
          "Déplacement +1, saut",
          "Attaque -1",
          "Toutes les attaques ciblant la vipère gagnent désavantage ce round",
        ],
      },
      {
        id: 3,
        name: "Coup Calculé",
        initiative: 58,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1"],
      },
      {
        id: 4,
        name: "Frénésie Toxique",
        initiative: 43,
        recycled: false,
        effects: [
          "Déplacement +1, saut",
          "Attaque -1, cible tous les adversaires adjacents",
        ],
      },
      {
        id: 5,
        name: "Cerner",
        initiative: 32,
        recycled: true,
        effects: [
          "Déplacement +0",
          "Attaque +0",
          "Ajoute +2 attaque si la cible est adjacente à un allié de la vipère",
        ],
      },
      {
        id: 6,
        name: "Cerner",
        initiative: 32,
        recycled: true,
        effects: [
          "Déplacement +0",
          "Attaque +0",
          "Ajoute +2 attaque si la cible est adjacente à un allié de la vipère",
        ],
      },
      {
        id: 7,
        name: "Coup Défensif",
        initiative: 11,
        recycled: false,
        effects: ["Bouclier 1", "Attaque +0"],
      },
      {
        id: 8,
        name: "Constriction",
        initiative: 23,
        recycled: false,
        effects: ["Déplacement -1", "Attaque -1, immobilisation", "Attaque -1"],
      },
    ],
  },
  // MARK: base_zealot
  {
    id: "base_zealot",
    name: "Zélote de Base",
    normalHp: [4, 6, 7, 8, 10, 12, 14, 16],
    eliteHp: [7, 8, 11, 13, 17, 18, 22, 26],
    normalMove: [2, 2, 3, 3, 3, 4, 4, 4],
    eliteMove: [2, 2, 3, 3, 3, 4, 4, 4],
    normalAttack: [2, 2, 3, 3, 3, 3, 4, 5],
    eliteAttack: [3, 3, 3, 4, 4, 5, 6, 7],
    normalModifiers: [
      "",
      "",
      "",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
    ],
    eliteModifiers: [
      "",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
    ],
    actions: [
      {
        id: 1,
        name: "Sang Bouillant",
        initiative: 46,
        recycled: false,
        effects: ["Attaque +1, portée 2, confusion"],
      },
      {
        id: 2,
        name: "Fouet de Damnation",
        initiative: 19,
        recycled: false,
        effects: ["Déplacement +0", "Attaque -1, malédiction"],
      },
      {
        id: 3,
        name: "Drain de Vie",
        initiative: 27,
        recycled: true,
        effects: [
          "Soin 1 sur lui-même",
          "Déplacement +1",
          "Attaque -1, portée 2",
        ],
      },
      {
        id: 4,
        name: "Fléau Infame",
        initiative: 77,
        recycled: false,
        effects: ["Déplacement -1", "Attaque -1, empoisonnement"],
      },
    ],
  },
  // MARK: zealot
  {
    id: "zealot",
    name: "Zélote",
    normalHp: [4, 6, 7, 8, 10, 12, 14, 16],
    eliteHp: [7, 8, 11, 13, 17, 18, 22, 26],
    normalMove: [2, 2, 3, 3, 3, 4, 4, 4],
    eliteMove: [2, 2, 3, 3, 3, 4, 4, 4],
    normalAttack: [2, 2, 3, 3, 3, 3, 4, 5],
    eliteAttack: [3, 3, 3, 4, 4, 5, 6, 7],
    normalModifiers: [
      "",
      "",
      "",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
    ],
    eliteModifiers: [
      "",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
      "blessure",
    ],
    actions: [
      {
        id: 1,
        name: "Fouet de Damnation",
        initiative: 19,
        recycled: false,
        effects: [
          "Déplacement +1, saut",
          "Attaque -1, malédiction",
          "infuse Air",
        ],
      },
      {
        id: 2,
        name: "Drain de Vie",
        initiative: 27,
        recycled: true,
        effects: [
          "Déplacement +0",
          "Attaque -1, portée 2",
          "Soin X sur lui-même (X=montant dégats attaque)",
          "infuse Obscurité",
        ],
      },
      {
        id: 3,
        name: "Assaut Précipité",
        initiative: 35,
        recycled: false,
        effects: ["Déplacement +1", "Attaque -1"],
      },
      {
        id: 4,
        name: "Sang Bouillant",
        initiative: 46,
        recycled: false,
        effects: [
          "Attaque -1, portée 2, cible 2, confusion",
          "[Feu]: +2 portée",
        ],
      },
      {
        id: 5,
        name: "Rien de Particulier",
        initiative: 50,
        recycled: false,
        effects: ["Déplacement +0", "Attaque +0"],
      },
      {
        id: 6,
        name: "Coup Calculé",
        initiative: 65,
        recycled: false,
        effects: ["Déplacement -1", "Attaque +1"],
      },
      {
        id: 7,
        name: "Fléau Infame",
        initiative: 77,
        recycled: false,
        effects: [
          "Déplacement -1",
          "Attaque -1, empoisonnement (cible 2 hexes adjacents voisins",
          "[Air]: +1 attaque",
        ],
      },
      {
        id: 8,
        name: "Flamme impie",
        initiative: 82,
        recycled: true,
        effects: ["Attaque +1, portée 3", "Infuse Feu"],
      },
    ],
  },
  // MARK: horreur de sang
  {
    id: "blood_horror",
    name: "Horreur de sang",
    boss: true,
    hp: [
      (a) => 7 * a,
      (a) => 10 * a,
      (a) => 12 * a,
      (a) => 15 * a,
      (a) => 17 * a,
      (a) => 20 * a,
      (a) => 23 * a,
      (a) => 28 * a,
    ],
    move: [3, 3, 4, 4, 5, 5, 5, 5],
    attack: [
      (a) => a - 1,
      (a) => a,
      (a) => a,
      (a) => a + 1,
      (a) => a + 1,
      (a) => a + 2,
      (a) => a + 3,
      (a) => a + 4,
    ],
    immunities: [
      "immobilisation",
      "désarmement",
      "confusion",
      "étourdissement",
    ],
    special1: [
      () =>
        `saute jusqu'au zélote mort le plus éloigné et le ressuscite, ou saute jusqu'a l'aventurier le plus éloigné et Attaque +0`,
      () =>
        `saute jusqu'au zélote mort le plus éloigné et le ressuscite, ou saute jusqu'a l'aventurier le plus éloigné et Attaque +0`,
      () =>
        `saute jusqu'au zélote mort le plus éloigné et le ressuscite, ou saute jusqu'a l'aventurier le plus éloigné et Attaque +0`,
      () =>
        `saute jusqu'au zélote mort le plus éloigné et le ressuscite, ou saute jusqu'a l'aventurier le plus éloigné et Attaque +0`,
      () =>
        `saute jusqu'au zélote mort le plus éloigné et le ressuscite, ou saute jusqu'a l'aventurier le plus éloigné et Attaque +0`,
      () =>
        `saute jusqu'au zélote mort le plus éloigné et le ressuscite, ou saute jusqu'a l'aventurier le plus éloigné et Attaque +0`,
      () =>
        `saute jusqu'au zélote mort le plus éloigné et le ressuscite, ou saute jusqu'a l'aventurier le plus éloigné et Attaque +0`,
      () =>
        `saute jusqu'au zélote mort le plus éloigné et le ressuscite, ou saute jusqu'a l'aventurier le plus éloigné et Attaque +0`,
    ],
    special2: [
      () =>
        `déplacement +0, attaque +0. ressuscite tous les zélotes morts dans la salle`,
      () =>
        `déplacement +0, attaque +0. ressuscite tous les zélotes morts dans la salle`,
      () =>
        `déplacement +0, attaque +0. ressuscite tous les zélotes morts dans la salle`,
      () =>
        `déplacement +0, attaque +0. ressuscite tous les zélotes morts dans la salle`,
      () =>
        `déplacement +0, attaque +0. ressuscite tous les zélotes morts dans la salle`,
      () =>
        `déplacement +0, attaque +0. ressuscite tous les zélotes morts dans la salle`,
      () =>
        `déplacement +0, attaque +0. ressuscite tous les zélotes morts dans la salle`,
      () =>
        `déplacement +0, attaque +0. ressuscite tous les zélotes morts dans la salle`,
    ],
    actions: BOSS_ACTIONS,
  },
  // MARK: primat de l'ordre
  {
    id: "primat_de_ordre",
    name: "Primat de l'Ordre",
    boss: true,
    hp: [
      (a) => 10 * a,
      (a) => 14 * a,
      (a) => 17 * a,
      (a) => 20 * a,
      (a) => 24 * a,
      (a) => 28 * a,
      (a) => 32 * a,
      (a) => 36 * a,
    ],
    move: [2, 2, 2, 2, 3, 3, 3, 3],
    attack: [
      () => 3,
      () => 4,
      () => 4,
      () => 5,
      () => 5,
      () => 6,
      () => 7,
      () => 8,
    ],
    immunities: [
      "immobilisation",
      "désarmement",
      "confusion",
      "étourdissement",
      "malédiction",
    ],
    special1: [
      (a) =>
        `tous les adversaires à portée 2 subissent 2 dégats, générez ${a / 2} diablotins de sang`,
      (a) =>
        `tous les adversaires à portée 2 subissent 2 dégats, générez ${a / 2} diablotins de sang`,
      (a) =>
        `tous les adversaires à portée 2 subissent 2 dégats, générez ${a / 2} diablotins de sang`,
      (a) =>
        `tous les adversaires à portée 2 subissent 2 dégats, générez ${a / 2} diablotins de sang`,
      (a) =>
        `tous les adversaires à portée 2 subissent 2 dégats, générez ${a / 2} diablotins de sang`,
      (a) =>
        `tous les adversaires à portée 2 subissent 2 dégats, générez ${a / 2} diablotins de sang`,
      (a) =>
        `tous les adversaires à portée 2 subissent 2 dégats, générez ${a / 2} diablotins de sang`,
      (a) =>
        `tous les adversaires à portée 2 subissent 2 dégats, générez ${a / 2} diablotins de sang`,
    ],
    special2: [
      () =>
        `attaque +0, attaque -1 à portée 2 de la cible, attaque -2 à portée 2 de la cible`,
      () =>
        `attaque +0, attaque -1 à portée 2 de la cible, attaque -2 à portée 2 de la cible`,
      () =>
        `attaque +0, attaque -1 à portée 2 de la cible, attaque -2 à portée 2 de la cible`,
      () =>
        `attaque +0, attaque -1 à portée 2 de la cible, attaque -2 à portée 2 de la cible`,
      () =>
        `attaque +0, attaque -1 à portée 2 de la cible, attaque -2 à portée 2 de la cible`,
      () =>
        `attaque +0, attaque -1 à portée 2 de la cible, attaque -2 à portée 2 de la cible`,
      () =>
        `attaque +0, attaque -1 à portée 2 de la cible, attaque -2 à portée 2 de la cible`,
      () =>
        `attaque +0, attaque -1 à portée 2 de la cible, attaque -2 à portée 2 de la cible`,
    ],
    actions: BOSS_ACTIONS,
  },
  // MARK: tumeur de sang
  {
    id: "tumeur_de_sang",
    name: "Tumeur de Sang",
    boss: true,
    hp: [
      (a) => 7 * a,
      (a) => 10 * a,
      (a) => 12 * a,
      (a) => 15 * a,
      (a) => 17 * a,
      (a) => 20 * a,
      (a) => 23 * a,
      (a) => 28 * a,
    ],
    move: [0, 0, 0, 0, 0, 0, 0, 0],
    attack: [
      (a) => a - 1,
      (a) => a,
      (a) => a,
      (a) => a + 1,
      (a) => a + 1,
      (a) => a + 2,
      (a) => a + 2,
      (a) => a + 3,
    ],
    immunities: ["désarmement", "confusion", "étourdissement"],
    special1: [
      (a) => `Soin ${a} sur elle-même`,
      (a) => `Soin ${a} sur elle-même`,
      (a) => `Soin ${a + 1} sur elle-même`,
      (a) => `Soin ${a + 1} sur elle-même`,
      (a) => `Soin ${a + 2} sur elle-même`,
      (a) => `Soin ${a + 2} sur elle-même`,
      (a) => `Soin ${a + 3} sur elle-même`,
      (a) => `Soin ${a + 3} sur elle-même`,
    ],
    special2: [
      () => `Soin 2 sur tous les alliés`,
      () => `Soin 2 sur tous les alliés`,
      () => `Soin 3 sur tous les alliés`,
      () => `Soin 3 sur tous les alliés`,
      () => `Soin 4 sur tous les alliés`,
      () => `Soin 4 sur tous les alliés`,
      () => `Soin 5 sur tous les alliés`,
      () => `Soin 5 sur tous les alliés`,
    ],
    actions: BOSS_ACTIONS,
  },
];

export const ENEMIES_MAP = {};
for (let enemies of ENEMIES) {
  ENEMIES_MAP[enemies.id] = enemies;
}

export const BATTLE_GOALS = [
  {
    id: 1,
    title: "Maraudeur",
    description:
      "Effectuer deux actions présentant l'icone Perdue durant le même round",
  },
  {
    id: 2,
    title: "Reclus",
    description: "Ne jamais terminer votre tour adjacent à un de vos alliés",
  },
  {
    id: 3,
    title: "Vite sur pied",
    description:
      "Terminer le scénario avec un nombre de points de vie égal à votre valeur maximale de points de vie",
  },
  {
    id: 4,
    title: "Feinteur",
    description:
      "Éliminer un monstre qui ne vous est pas adjacent alors que vous êtes adjacent à un autre",
  },
  {
    id: 5,
    title: "Tête brûlée",
    description:
      "Effectuer deux actions présentant l'icone Perdue avant votre premier repos",
  },
  {
    id: 6,
    title: "Insomniaque",
    description:
      "Subir des dégâts d'une attaque intervenant le même round où vous prenez un repos long",
  },
  {
    id: 7,
    title: "Pacifiste",
    description: "Éliminer au maximum trois monstres",
  },
  {
    id: 8,
    title: "Acrobate",
    description: "Perdre une carte pour éviter de subir 5 dégats ou plus",
  },
  {
    id: 9,
    title: "Abstinent",
    description: "Ne jamais consommer de potion",
  },
  {
    id: 10,
    title: "Fin de match",
    description: "Être le dernier à éliminer un monstre lors de ce scénario",
  },
  {
    id: 11,
    title: "Conservateur",
    description: "Ne jamais perdre une carte pour éviter de subir des dégats",
  },
  {
    id: 12,
    title: "Dur à cuire",
    description:
      "Ne jamais laisser votre nombre de points de vie descendre sous la moitié de votre valeur maximale de points de vie (arrondie au supérieur)",
  },
  {
    id: 13,
    title: "Compétiteur",
    description: "Ne jamais quitter un hexagone adjacent à un monstre",
  },
  {
    id: 14,
    title: "Vol à la tire",
    description:
      "Ramasser au moins un pion Monnaie en effectuant une action Pillage lorsque vous êtes sur un hexagone adjacents à deux monstres ou plus",
  },
  {
    id: 15,
    title: "Pelote à épingles",
    description:
      "Être la cible d'attaque d'au moins trois monstres durant le même round",
  },
  {
    id: 16,
    title: "Plébéien",
    description: "Ne jamais éliminer un monstre d'élite ou un boss",
  },
  {
    id: 17,
    title: "Égoiste",
    description: "Amasser plus de pions Monnaie que tout autre aventurier",
  },
  {
    id: 18,
    title: "Vecteur",
    description:
      "Appliquer un état négatif à un monstre alors que vous êtes vous-même sous le coup d'un état négatif",
  },
  {
    id: 19,
    title: "Gringalet",
    description: "Finir épuisé avant tout autre aventurier",
  },
  {
    id: 20,
    title: "Joueur",
    description: "Éliminer un monstre grâce à une attaque avec désavantage",
  },
  {
    id: 21,
    title: "Pionnier",
    description:
      "Ouvrir une porte et terminer le même tour dans la salle révélée",
  },
  {
    id: 22,
    title: "Traînard",
    description: "Ne jamais prendre de repos court",
  },
  {
    id: 23,
    title: "Assistant",
    description:
      "Éliminer un monstre précédemment attaqué par un de vos alliés durant le même round",
  },
  {
    id: 24,
    title: "Altruiste",
    description: "Amasser moins de pions monnaie que tout autre aventurier",
  },
  {
    id: 25,
    title: "Spécialiste",
    description: "Ne jamais entreprendre d'action par défaut",
  },
  {
    id: 26,
    title: "Agoraphobe",
    description: "Terminer tous vos tours adjacent à un mur ou à un obstacle",
  },
  {
    id: 27,
    title: "Hyperactif",
    description: "Ne jamais prendre un repos long",
  },
  {
    id: 28,
    title: "Ombre",
    description: "Terminer tous vos tours adjacents à un de vos alliés",
  },
  {
    id: 29,
    title: "Sadique",
    description: "Éliminer au moins cinq monstres",
  },
  {
    id: 30,
    title: "Masochiste",
    description: "Terminer le scénario avec 3 points de vie au maximum",
  },
  {
    id: 31,
    title: "Premier sang",
    description: "Être le premier à éliminer un monstre lors de ce scénario",
  },
  {
    id: 32,
    title: "Coupe-jarret",
    description:
      "Éliminer un monstre et piller le pion Monnaie qu'il laisse tomber au cours du même tour",
  },
];

export const MONSTER_MODIFIERS_DECK = [
  {
    id: 1,
    effects: ["+0"],
    recycled: false,
    color: false,
  },
  {
    id: 2,
    effects: ["+0"],
    recycled: false,
    color: false,
  },
  {
    id: 3,
    effects: ["+0"],
    recycled: false,
    color: false,
  },
  {
    id: 4,
    effects: ["+0"],
    recycled: false,
    color: false,
  },
  {
    id: 5,
    effects: ["+0"],
    recycled: false,
    color: false,
  },
  {
    id: 6,
    effects: ["+0"],
    recycled: false,
    color: false,
  },
  {
    id: 7,
    effects: ["-1"],
    recycled: false,
    color: "#fff0f0",
  },
  {
    id: 8,
    effects: ["-1"],
    recycled: false,
    color: "#fff0f0",
  },
  {
    id: 9,
    effects: ["-1"],
    recycled: false,
    color: "#fff0f0",
  },
  {
    id: 10,
    effects: ["-1"],
    recycled: false,
    color: "#fff0f0",
  },
  {
    id: 11,
    effects: ["-1"],
    recycled: false,
    color: "#fff0f0",
  },
  {
    id: 12,
    effects: ["-2"],
    recycled: false,
    color: "#fff0f0",
  },
  {
    id: 13,
    effects: ["+1"],
    recycled: false,
    color: "#ebfceb",
  },
  {
    id: 14,
    effects: ["+1"],
    recycled: false,
    color: "#ebfceb",
  },
  {
    id: 15,
    effects: ["+1"],
    recycled: false,
    color: "#ebfceb",
  },
  {
    id: 16,
    effects: ["+1"],
    recycled: false,
    color: "#ebfceb",
  },
  {
    id: 17,
    effects: ["+1"],
    recycled: false,
    color: "#ebfceb",
  },
  {
    id: 18,
    effects: ["x0"],
    recycled: true,
    color: "#ffffd9",
  },
  {
    id: 19,
    effects: ["x2"],
    recycled: true,
    color: "#ffc7ff",
  },
  {
    id: 20,
    effects: ["+2"],
    recycled: false,
    color: "#ebfceb",
  },
];
