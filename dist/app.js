(() => {
  // src/data.js
  var CLASS_NAME = {
    void_warden: "Gardienne du N\xE9ant",
    red_guard: "Garde Rouge"
  };
  var MAX_HP_MAP = {
    void_warden: [6, 7, 8, 9, 10, 11, 12, 13, 14],
    red_guard: [10, 12, 14, 16, 18, 20, 22, 24, 26]
  };
  var MAX_CARD_MAP = {
    void_warden: 11,
    red_guard: 10
  };
  var BOSS_ACTIONS = [
    {
      id: 1,
      name: "Puissance Acc\xE9l\xE9r\xE9e",
      initiative: 11,
      recycled: false,
      effects: ["Sp\xE9cial 2"]
    },
    {
      id: 2,
      name: "Puissance Acc\xE9l\xE9r\xE9e",
      initiative: 14,
      recycled: false,
      effects: ["Sp\xE9cial 2"]
    },
    {
      id: 3,
      name: "Puissance Acc\xE9l\xE9r\xE9e",
      initiative: 17,
      recycled: true,
      effects: ["Sp\xE9cial 2"]
    },
    {
      id: 4,
      name: "Force Durable",
      initiative: 85,
      recycled: true,
      effects: ["Sp\xE9cial 1"]
    },
    {
      id: 5,
      name: "Force Durable",
      initiative: 79,
      recycled: false,
      effects: ["Sp\xE9cial 1"]
    },
    {
      id: 6,
      name: "Force Durable",
      initiative: 73,
      recycled: false,
      effects: ["Sp\xE9cial 1"]
    },
    {
      id: 7,
      name: "Rien de Particulier",
      initiative: 36,
      recycled: false,
      effects: ["D\xE9placement +0", "Attaque +0"]
    },
    {
      id: 8,
      name: "Projectiles Jumeaux",
      initiative: 54,
      recycled: false,
      effects: ["D\xE9placement -1", "Attaque -1, port\xE9e 3, cible 2"]
    }
  ];
  var ENEMIES = [
    // MARK: reanimated corpse
    {
      id: "reanimated_corpse",
      name: "Cadavre R\xE9anim\xE9",
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
        "empoisonnement"
      ],
      eliteModifiers: [
        "",
        "",
        "",
        "",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "Empoisonnement"
      ],
      actions: [
        {
          id: 1,
          name: "\xC9treinte Putride",
          initiative: 21,
          recycled: false,
          effects: [
            "D\xE9placement +1",
            "Confusion, immobilisation (cible un adversaire adjacent)",
            "[terre]: la cible subit aussi 2 d\xE9gats"
          ]
        },
        {
          id: 2,
          name: "Claque Violente",
          initiative: 32,
          recycled: false,
          effects: [
            "Attaque +2, pouss\xE9e 1",
            "Si cette attaque est effectu\xE9e, le Cadavre R\xE9anim\xE9 subit 1 d\xE9gat"
          ]
        },
        {
          id: 3,
          name: "Assaut Pr\xE9cipit\xE9",
          initiative: 47,
          recycled: false,
          effects: ["D\xE9placement +1", "Attaque -1"]
        },
        {
          id: 4,
          name: "Rien de Particulier",
          initiative: 68,
          recycled: true,
          effects: ["D\xE9placement +0", "Attaque +0"]
        },
        {
          id: 5,
          name: "Rien de Particulier",
          initiative: 68,
          recycled: true,
          effects: ["D\xE9placement +0", "Attaque +0"]
        },
        {
          id: 6,
          name: "\xC9mission de Gaz",
          initiative: 71,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "Attaque +1",
            "Empoisonnement (cible tous les adversaires adjacents)",
            "Infuse: Terre"
          ]
        },
        {
          id: 7,
          name: "Coup Calcul\xE9",
          initiative: 81,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1"]
        },
        {
          id: 8,
          name: "Charge T\xE9m\xE9raire",
          initiative: 91,
          recycled: false,
          effects: [
            "D\xE9placement +2",
            "Si ce d\xE9placement est effectu\xE9, le cadavre subit 1 d\xE9gat"
          ]
        }
      ]
    },
    // MARK: chaos demon
    {
      id: "chaos_demon",
      name: "D\xE9mon du Chaos",
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
        "confusion"
      ],
      eliteModifiers: [
        "confusion",
        "confusion",
        "confusion",
        "confusion",
        "confusion",
        "confusion",
        "confusion",
        "confusion"
      ],
      actions: [
        {
          id: 1,
          name: "Souffle Glacial",
          initiative: 13,
          recycled: false,
          effects: [
            "D\xE9placement -1",
            "Attaque +0, cible 2 hex voisins adjacents",
            "[Glace]: chaque fois qu'un personnage attaque le d\xE9mon, le personnage subit 2 d\xE9gats"
          ]
        },
        {
          id: 2,
          name: "D\xE9flagration de Chaleur",
          initiative: 1,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque -1, port\xE9e 3", "[Feu]: blessure"]
        },
        {
          id: 3,
          name: "Coup Sismique",
          initiative: 67,
          recycled: false,
          effects: [
            "D\xE9placement -2",
            "Attaque +1, pouss\xE9e 2",
            "[Terre]: cible 2 hex adjacents voisins"
          ]
        },
        {
          id: 4,
          name: "Tourbillon",
          initiative: 20,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "Attaque -1, port\xE9e 2, cible 3 hex adjacents voisins",
            "[Air]: bouclier 2"
          ]
        },
        {
          id: 5,
          name: "Griffes Soudaines",
          initiative: 41,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "Attaque +0, avantage",
            "[Lumi\xE8re]: soin 4 sur lui-m\xEAme"
          ]
        },
        {
          id: 6,
          name: "Vrilles Noires",
          initiative: 52,
          recycled: false,
          effects: [
            "D\xE9placement -1",
            "Attaque +1",
            "[Obscurit\xE9]: tous les adversaires adjacents \xE0 la cible subissent 1 d\xE9gat"
          ]
        },
        {
          id: 7,
          name: "Explosion de Mana",
          initiative: 76,
          recycled: true,
          effects: [
            "D\xE9placement +0",
            "Attaque +0",
            "Infuse Feu, Glace, Air, Terre, Lumi\xE8re, Obscurit\xE9"
          ]
        },
        {
          id: 8,
          name: "Gueule Affam\xE9e",
          initiative: 98,
          recycled: true,
          effects: ["Attaque -1", "[n'importe quel \xE9l\xE9ment]: d\xE9sarmement"]
        }
      ]
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
        "confusion"
      ],
      eliteModifiers: [
        "confusion",
        "confusion",
        "confusion",
        "confusion",
        "confusion",
        "confusion",
        "confusion",
        "confusion"
      ],
      actions: [
        {
          id: 1,
          name: "Hors Phase",
          initiative: 5,
          recycled: false,
          effects: ["Bouclier 5", "Soin 1 sur lui m\xEAme", "Infuse 1 \xE9l\xE9ment"]
        },
        {
          id: 2,
          name: "Faire Pencher la Balance",
          initiative: 24,
          recycled: false,
          effects: [
            "Renforcement, cible tous les alli\xE9s \xE0 port\xE9e 2 et lui-m\xEAme",
            "Confusion, cible tous les adversaires \xE0 port\xE9e 2"
          ]
        },
        {
          id: 3,
          name: "Rien de Particulier",
          initiative: 37,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0, port\xE9e 3"]
        },
        {
          id: 4,
          name: "Rien de Particulier",
          initiative: 37,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0, port\xE9e 3"]
        },
        {
          id: 5,
          name: "R\xE9cup\xE9ration",
          initiative: 42,
          recycled: true,
          effects: ["D\xE9placement +1", "Soin 2, port\xE9e 3"]
        },
        {
          id: 6,
          name: "Estropier",
          initiative: 42,
          recycled: true,
          effects: [
            "D\xE9placement +0",
            "Attaque -1, port\xE9e 3, cible 2, empoisonnement"
          ]
        },
        {
          id: 7,
          name: "Sombre Charme",
          initiative: 42,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "Attaque -1, port\xE9e 3, cible 2, mal\xE9diction"
          ]
        },
        {
          id: 8,
          name: "Coup Calcul\xE9",
          initiative: 76,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1, port\xE9e 3"]
        }
      ]
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
        "empoisonnement"
      ],
      eliteModifiers: [
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement, attaquants gagnent d\xE9savantage",
        "empoisonnement, attaquants gagnent d\xE9savantage",
        "empoisonnement, attaquants gagnent d\xE9savantage",
        "empoisonnement, attaquants gagnent d\xE9savantage",
        "empoisonnement, attaquants gagnent d\xE9savantage"
      ],
      actions: [
        {
          id: 1,
          name: "Hors Phase",
          initiative: 5,
          recycled: false,
          effects: ["Bouclier 5", "Soin 1 sur lui m\xEAme", "Infuse 1 \xE9l\xE9ment"]
        },
        {
          id: 2,
          name: "Faire Pencher la Balance",
          initiative: 24,
          recycled: false,
          effects: [
            "Renforcement, cible tous les alli\xE9s \xE0 port\xE9e 2 et lui-m\xEAme",
            "Confusion, cible tous les adversaires \xE0 port\xE9e 2"
          ]
        },
        {
          id: 3,
          name: "Rien de Particulier",
          initiative: 37,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0, port\xE9e 3"]
        },
        {
          id: 4,
          name: "Rien de Particulier",
          initiative: 37,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0, port\xE9e 3"]
        },
        {
          id: 5,
          name: "R\xE9cup\xE9ration",
          initiative: 42,
          recycled: true,
          effects: ["D\xE9placement +1", "Soin 2, port\xE9e 3"]
        },
        {
          id: 6,
          name: "Estropier",
          initiative: 42,
          recycled: true,
          effects: [
            "D\xE9placement +0",
            "Attaque -1, port\xE9e 3, cible 2, empoisonnement"
          ]
        },
        {
          id: 7,
          name: "Sombre Charme",
          initiative: 42,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "Attaque -1, port\xE9e 3, cible 2, mal\xE9diction"
          ]
        },
        {
          id: 8,
          name: "Coup Calcul\xE9",
          initiative: 76,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1, port\xE9e 3"]
        }
      ]
    },
    // MARK: vermling scout
    {
      id: "vermling_scout",
      name: "\xC9claireur Vermling",
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
          effects: ["D\xE9placement -1", "Attaque -1, port\xE9e 3"]
        },
        {
          id: 2,
          name: "Assaut Pr\xE9cipit\xE9",
          initiative: 40,
          recycled: false,
          effects: ["D\xE9placement +1", "Attaque -1"]
        },
        {
          id: 3,
          name: "Rien de Particulier",
          initiative: 53,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0"]
        },
        {
          id: 4,
          name: "Fl\xE8che Rance",
          initiative: 53,
          recycled: false,
          effects: ["D\xE9placement -2", "Attaque +0, port\xE9e 3, empoisonnement"]
        },
        {
          id: 5,
          name: "Coup Calcul\xE9",
          initiative: 69,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1"]
        },
        {
          id: 6,
          name: "Lame D\xE9l\xE9t\xE8re",
          initiative: 92,
          recycled: true,
          effects: ["Attaque +2, empoisonnement"]
        },
        {
          id: 7,
          name: "Carreaux Rapides",
          initiative: 78,
          recycled: false,
          effects: ["Attaque -1, port\xE9e 4, cible 2"]
        },
        {
          id: 8,
          name: "Avidit\xE9",
          initiative: 40,
          recycled: true,
          effects: ["D\xE9placement +1, saut", "Pillage 1"]
        }
      ]
    },
    // MARK: reanimated spirit
    {
      id: "reanimated_spirit",
      name: "Esprit R\xE9anim\xE9",
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
        "Bouclier 2"
      ],
      eliteModifiers: [
        "Bouclier 1",
        "Bouclier 2",
        "Bouclier 2",
        "Bouclier 2",
        "Bouclier 3",
        "Bouclier 3",
        "Bouclier 3",
        "Bouclier 3"
      ],
      actions: [
        {
          id: 1,
          name: "Saper l'\xC9nergie",
          initiative: 22,
          recycled: true,
          effects: ["D\xE9placement -1", "Attaque -1, port\xE9e 4, confusion"]
        },
        {
          id: 2,
          name: "Cri Retentissant",
          initiative: 33,
          recycled: true,
          effects: [
            "D\xE9placement +0",
            "Attaque -1, cible tous les adversaires \xE0 port\xE9e 2"
          ]
        },
        {
          id: 3,
          name: "Rien de Particulier",
          initiative: 48,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0, port\xE9e 3"]
        },
        {
          id: 4,
          name: "Rien de Particulier",
          initiative: 48,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0, port\xE9e 3"]
        },
        {
          id: 5,
          name: "Chaine Coupl\xE9e",
          initiative: 61,
          recycled: false,
          effects: ["Attaque +0, port\xE9e 3, cible 2"]
        },
        {
          id: 6,
          name: "Aspirer la Chaleur",
          initiative: 75,
          recycled: false,
          effects: [
            "D\xE9placement -1",
            "Attaque +1, port\xE9e 3",
            "Soin 1 sur lui-m\xEAme",
            "Infuse Glace"
          ]
        },
        {
          id: 7,
          name: "Hurlement de Col\xE8re",
          initiative: 55,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "Mal\xE9diction, cible tous les adversaires \xE0 port\xE9e 3",
            "Infuse Glace"
          ]
        },
        {
          id: 8,
          name: "Regard Glacial",
          initiative: 67,
          recycled: false,
          effects: [
            "D\xE9placement -1",
            "Attaque +1, port\xE9e 3",
            "[Glace]: d\xE9sarmement"
          ]
        }
      ]
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
        "Bouclier 3"
      ],
      eliteModifiers: [
        "Bouclier 1",
        "Bouclier 2",
        "Bouclier 2",
        "Bouclier 3",
        "Bouclier 3",
        "Bouclier 3",
        "Bouclier 3",
        "Bouclier 4"
      ],
      actions: [
        {
          id: 1,
          name: "Progression \xC9prouvante",
          initiative: 28,
          recycled: false,
          effects: [
            "D\xE9placement +1",
            "Attaque +0",
            "Si la capacit\xE9 de d\xE9placement a \xE9t\xE9 effectu\xE9e, le golem subit 1 d\xE9gat"
          ]
        },
        {
          id: 2,
          name: "Assaut Pr\xE9cipit\xE9",
          initiative: 51,
          recycled: true,
          effects: ["D\xE9placement +1", "Attaque -1"]
        },
        {
          id: 3,
          name: "Marteler le Sol",
          initiative: 83,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "Attaque -1, cible tous les adversaires adjacents"
          ]
        },
        {
          id: 4,
          name: "Coup Calcul\xE9",
          initiative: 90,
          recycled: true,
          effects: ["D\xE9placement -1", "Attack +1"]
        },
        {
          id: 5,
          name: "R\xE9action Runique",
          initiative: 10,
          recycled: false,
          effects: [
            "Chaque fois qu'un personnage attaque le golem, le personnage subit 3 d\xE9gats"
          ]
        },
        {
          id: 6,
          name: "Attraction Runique",
          initiative: 28,
          recycled: false,
          effects: [
            "D\xE9placement +1",
            "Attaque -2, port\xE9e 3, traction 2, immobilisation"
          ]
        },
        {
          id: 7,
          name: "Rien de Particulier",
          initiative: 64,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0"]
        },
        {
          id: 8,
          name: "Lancer Sacrificiel",
          initiative: 72,
          recycled: false,
          effects: [
            "Attaque +1, port\xE9e 3. Si cette attaque est effectu\xE9e, le golem subit 2 d\xE9gats"
          ]
        }
      ]
    },
    // MARK: monstruosité de sang
    {
      id: "blood_monster",
      name: "Monstruosit\xE9 de Sang",
      normalHp: [7, 9, 10, 12, 12, 13, 17, 20],
      eliteHp: [12, 12, 15, 18, 18, 20, 23, 23],
      normalMove: [2, 2, 2, 3, 3, 3, 3, 3],
      eliteMove: [2, 2, 2, 3, 3, 3, 3, 3],
      normalAttack: [2, 2, 3, 3, 3, 4, 4, 5],
      eliteAttack: [3, 3, 4, 4, 4, 5, 6, 6],
      normalModifiers: [
        "\xE0 sa mort, tous les personnages adjacents subissent 1 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 2 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 2 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats, Bouclier 1",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats, Bouclier 1",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats, Bouclier 1",
        "\xE0 sa mort, tous les personnages adjacents subissent 4 d\xE9gats, Bouclier 1"
      ],
      eliteModifiers: [
        "\xE0 sa mort, tous les personnages adjacents subissent 1 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats, Bouclier 1",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats, Bouclier 1",
        "\xE0 sa mort, tous les personnages adjacents subissent 4 d\xE9gats, Bouclier 1",
        "\xE0 sa mort, tous les personnages adjacents subissent 4 d\xE9gats, Bouclier 2",
        "\xE0 sa mort, tous les personnages adjacents subissent 5 d\xE9gats, Bouclier 2",
        "\xE0 sa mort, tous les personnages adjacents subissent 5 d\xE9gats, Bouclier 2",
        "\xE0 sa mort, tous les personnages adjacents subissent 5 d\xE9gats, Bouclier 3"
      ],
      actions: [
        {
          id: 1,
          name: "Bulles Explosives",
          initiative: 9,
          recycled: true,
          effects: [
            "D\xE9placement +1",
            "Chaque fois qu'un personnage attaque la monstruosit\xE9, le personnage subit 2 d\xE9gats"
          ]
        },
        {
          id: 2,
          name: "Nu\xE9e",
          initiative: 21,
          recycled: false,
          effects: [
            "D\xE9placement +1",
            "Attaque -1",
            "+1 \xE0 attaque si cible adjacente \xE0 un alli\xE9 de la monstruosit\xE9"
          ]
        },
        {
          id: 3,
          name: "Nu\xE9e",
          initiative: 21,
          recycled: false,
          effects: [
            "D\xE9placement +1",
            "Attaque -1",
            "+1 \xE0 attaque si cible adjacente \xE0 un alli\xE9 de la monstruosit\xE9"
          ]
        },
        {
          id: 4,
          name: "Morsure Affaiblissante",
          initiative: 34,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0, confusion"]
        },
        {
          id: 5,
          name: "Rien de Particulier",
          initiative: 39,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0"]
        },
        {
          id: 6,
          name: "\xC9gratignure Incertaine",
          initiative: 52,
          recycled: true,
          effects: [
            "D\xE9placement +0",
            "Attaque +1",
            "Si l'attaque est effectu\xE9e, la monstruosit\xE9 subit 1 d\xE9gat"
          ]
        },
        {
          id: 7,
          name: "Coup Calcul\xE9",
          initiative: 60,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1"]
        },
        {
          id: 8,
          name: "Fr\xE9n\xE9sie Incertaine",
          initiative: 74,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "la Monstruosit\xE9 subit 1 d\xE9gat",
            "Attaque +1, cible tous les adversaires adjacents"
          ]
        }
      ]
    },
    // MARK: monstruosité ratine
    {
      id: "rat_monster",
      name: "Monstruosit\xE9 ratine",
      normalHp: [4, 4, 5, 6, 8, 10, 12, 12],
      eliteHp: [6, 7, 8, 10, 12, 13, 14, 16],
      normalMove: [1, 1, 2, 2, 2, 3, 3, 3],
      eliteMove: [1, 1, 1, 2, 2, 2, 3, 3],
      normalAttack: [1, 2, 2, 3, 3, 3, 3, 4],
      eliteAttack: [2, 2, 3, 3, 3, 4, 4, 5],
      normalModifiers: [
        "\xE0 sa mort, tous les personnages adjacents subissent 1 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 1 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 1 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 2 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 2 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 2 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats"
      ],
      eliteModifiers: [
        "\xE0 sa mort, tous les personnages adjacents subissent 1 d\xE9gats",
        "\xE0 sa mort, tous les personnages adjacents subissent 2 d\xE9gats, avantage",
        "\xE0 sa mort, tous les personnages adjacents subissent 2 d\xE9gats, avantage",
        "\xE0 sa mort, tous les personnages adjacents subissent 2 d\xE9gats, avantage",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats, avantage",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats, avantage",
        "\xE0 sa mort, tous les personnages adjacents subissent 3 d\xE9gats, avantage",
        "\xE0 sa mort, tous les personnages adjacents subissent 4 d\xE9gats, avantage"
      ],
      actions: [
        {
          id: 1,
          name: "Bulles explosives",
          initiative: 9,
          recycled: true,
          effects: [
            "D\xE9placement +1",
            "Chaque fois qu'un h\xE9ro attaque la monstruosit\xE9, le h\xE9ro subit 2 d\xE9gats"
          ]
        },
        {
          id: 2,
          name: "Nu\xE9e",
          initiative: 21,
          recycled: false,
          effects: [
            "D\xE9placement +1",
            "Attaque -1",
            "+1 \xE0 attaque si cible adjacente \xE0 un alli\xE9 de la monstruosit\xE9"
          ]
        },
        {
          id: 3,
          name: "Nu\xE9e",
          initiative: 21,
          recycled: false,
          effects: [
            "D\xE9placement +1",
            "Attaque -1",
            "+1 \xE0 attaque si cible adjacente \xE0 un alli\xE9 de la monstruosit\xE9"
          ]
        },
        {
          id: 4,
          name: "Morsure affaiblissante",
          initiative: 34,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0, confusion"]
        },
        {
          id: 5,
          name: "Rien de Particulier",
          initiative: 39,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0"]
        },
        {
          id: 6,
          name: "\xC9gratignure incertaine",
          initiative: 52,
          recycled: true,
          effects: [
            "D\xE9placement +0",
            "Attaque +1",
            "Si l'attaque est effectu\xE9e, la monstruosit\xE9 subit 1 d\xE9gat"
          ]
        },
        {
          id: 7,
          name: "Coup Calcul\xE9",
          initiative: 60,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1"]
        },
        {
          id: 8,
          name: "Fr\xE9n\xE9sie incertaine",
          initiative: 74,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "la monstruosit\xE9 subit 1 d\xE9gat",
            "Attaque +1, cible tous les adversaires adjacents"
          ]
        }
      ]
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
            "Pouss\xE9e 1, ciblez tous les adversaires adjacents",
            "Attaque +1, port\xE9e 2"
          ]
        },
        {
          id: 2,
          name: "Lancer Pr\xE9cis",
          initiative: 36,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque -1, port\xE9e 2"]
        },
        {
          id: 3,
          name: "Double Dagues",
          initiative: 59,
          recycled: false,
          effects: ["Attaque +0, port\xE9e 2, cible 2"]
        },
        {
          id: 4,
          name: "Rien de Particulier",
          initiative: 50,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0"]
        }
      ]
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
          name: "Fosse \xE0 Pointes",
          initiative: 20,
          recycled: false,
          effects: [
            "Attaque +0, port\xE9e 4",
            "Cr\xE9ez un pi\xE8ge \xE0 3 d\xE9gats sur l'hexaxone vide adjacent le plus proche d'un adversaire"
          ]
        },
        {
          id: 2,
          name: "Panser les Blessures",
          initiative: 30,
          recycled: true,
          effects: ["D\xE9placement +1", "Soin 3 sur lui-m\xEAme"]
        },
        {
          id: 3,
          name: "Lancer Pr\xE9cis",
          initiative: 36,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque -1, port\xE9e 4"]
        },
        {
          id: 4,
          name: "Rien de Particulier",
          initiative: 50,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0"]
        },
        {
          id: 5,
          name: "Doubles Dagues",
          initiative: 59,
          recycled: false,
          effects: ["Attaque +0, port\xE9e 3, cible 2"]
        },
        {
          id: 6,
          name: "Parade",
          initiative: 70,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque -1, d\xE9sarmement"]
        },
        {
          id: 7,
          name: "M\xE9chant \xC9pieu",
          initiative: 77,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +0, port\xE9e 3, blessure"]
        },
        {
          id: 8,
          name: "Hurlements Repoussants",
          initiative: 85,
          recycled: true,
          effects: [
            "Pouss\xE9e 1, ciblez tous les adversaires adjacents",
            "Attaque +1, port\xE9e 2"
          ]
        }
      ]
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
        "Bouclier 1, empoisonnement"
      ],
      eliteModifiers: [
        "",
        "Bouclier 1",
        "Bouclier 1",
        "Bouclier 1, empoisonnement",
        "Bouclier 1, empoisonnement",
        "Bouclier 1, empoisonnement",
        "Bouclier 2, empoisonnement",
        "Bouclier 2, empoisonnement"
      ],
      actions: [
        {
          id: 1,
          name: "Assaut Pr\xE9cipit\xE9",
          initiative: 36,
          recycled: false,
          effects: ["D\xE9placement +1", "Attaque -1, port\xE9e 3"]
        },
        {
          id: 2,
          name: "Rien de Particulier",
          initiative: 57,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0, port\xE9e 2"]
        },
        {
          id: 3,
          name: "Explosion Toxique",
          initiative: 57,
          recycled: false,
          effects: [
            "Attaque +0, port\xE9e 2, cible 2, empoisonnement",
            "[Terre]: +1 cible"
          ]
        },
        {
          id: 4,
          name: "Coup Calcul\xE9",
          initiative: 66,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1, port\xE9e 3"]
        },
        {
          id: 5,
          name: "Repas",
          initiative: 66,
          recycled: false,
          effects: [
            "D\xE9placement +0",
            "Pillage 1",
            "Soin 2 sur elle-m\xEAme",
            "[Obscurit\xE9]: +1 soin"
          ]
        },
        {
          id: 6,
          name: "Sceau Plasmique",
          initiative: 85,
          recycled: false,
          effects: [
            "Pouss\xE9e 1, empoisonnement, cible tous les adversaires adjacents",
            "Attaque +1, port\xE9e 2"
          ]
        },
        {
          id: 7,
          name: "Noire Damnation",
          initiative: 85,
          recycled: true,
          effects: [
            "L'adversaire en ligne de vue le plus proche, sans consid\xE9ration de port\xE9e, subit 1+NS/2 d\xE9gats (arrondis au sup\xE9rieur)",
            "Soin 1 sur elle-m\xEAme",
            "Infuse Obscurit\xE9"
          ]
        },
        {
          id: 8,
          name: "Damnation Infectieuse",
          initiative: 85,
          recycled: true,
          effects: [
            "L'adversaire en ligne de vue le plus proche, sans consid\xE9ration de port\xE9e, subit 1+NS/2 d\xE9gats (arrondis au sup\xE9rieur)",
            "Soin 1 sur elle-m\xEAme",
            "Infuse Terre"
          ]
        }
      ]
    },
    // MARK: base giant viper
    {
      id: "base_giant_viper",
      name: "Vip\xE8re G\xE9ante de Base",
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
        "empoisonnement"
      ],
      eliteModifiers: [
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement"
      ],
      actions: [
        {
          id: 1,
          name: "Constriction",
          initiative: 58,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1, immobilisation"]
        },
        {
          id: 2,
          name: "Crocs Rapides",
          initiative: 33,
          recycled: false,
          effects: ["D\xE9placement +1, saut", "Attaque +0, cible 2"]
        },
        {
          id: 3,
          name: "\xC0 couvert",
          initiative: 18,
          recycled: false,
          effects: [
            "D\xE9placement +1, saut",
            "Attaque -1",
            "Toutes les attaques ciblant la vip\xE8re gagnent d\xE9savantage ce round"
          ]
        },
        {
          id: 4,
          name: "Fr\xE9n\xE9sie Toxique",
          initiative: 43,
          recycled: true,
          effects: [
            "D\xE9placement +1, saut",
            "Attaque -1, cible tous les adversaires adjacents"
          ]
        }
      ]
    },
    // MARK: giant viper
    {
      id: "giant_viper",
      name: "Vip\xE8re G\xE9ante",
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
        "empoisonnement"
      ],
      eliteModifiers: [
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement",
        "empoisonnement"
      ],
      actions: [
        {
          id: 1,
          name: "Crocs Rapides",
          initiative: 33,
          recycled: false,
          effects: ["D\xE9placement +1, saut", "Attaque +0, cible 2"]
        },
        {
          id: 2,
          name: "\xC0 couvert",
          initiative: 18,
          recycled: false,
          effects: [
            "D\xE9placement +1, saut",
            "Attaque -1",
            "Toutes les attaques ciblant la vip\xE8re gagnent d\xE9savantage ce round"
          ]
        },
        {
          id: 3,
          name: "Coup Calcul\xE9",
          initiative: 58,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1"]
        },
        {
          id: 4,
          name: "Fr\xE9n\xE9sie Toxique",
          initiative: 43,
          recycled: false,
          effects: [
            "D\xE9placement +1, saut",
            "Attaque -1, cible tous les adversaires adjacents"
          ]
        },
        {
          id: 5,
          name: "Cerner",
          initiative: 32,
          recycled: true,
          effects: [
            "D\xE9placement +0",
            "Attaque +0",
            "Ajoute +2 attaque si la cible est adjacente \xE0 un alli\xE9 de la vip\xE8re"
          ]
        },
        {
          id: 6,
          name: "Cerner",
          initiative: 32,
          recycled: true,
          effects: [
            "D\xE9placement +0",
            "Attaque +0",
            "Ajoute +2 attaque si la cible est adjacente \xE0 un alli\xE9 de la vip\xE8re"
          ]
        },
        {
          id: 7,
          name: "Coup D\xE9fensif",
          initiative: 11,
          recycled: false,
          effects: ["Bouclier 1", "Attaque +0"]
        },
        {
          id: 8,
          name: "Constriction",
          initiative: 23,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque -1, immobilisation", "Attaque -1"]
        }
      ]
    },
    // MARK: base_zealot
    {
      id: "base_zealot",
      name: "Z\xE9lote de Base",
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
        "blessure"
      ],
      eliteModifiers: [
        "",
        "blessure",
        "blessure",
        "blessure",
        "blessure",
        "blessure",
        "blessure",
        "blessure"
      ],
      actions: [
        {
          id: 1,
          name: "Sang Bouillant",
          initiative: 46,
          recycled: false,
          effects: ["Attaque +1, port\xE9e 2, confusion"]
        },
        {
          id: 2,
          name: "Fouet de Damnation",
          initiative: 19,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque -1, mal\xE9diction"]
        },
        {
          id: 3,
          name: "Drain de Vie",
          initiative: 27,
          recycled: true,
          effects: [
            "Soin 1 sur lui-m\xEAme",
            "D\xE9placement +1",
            "Attaque -1, port\xE9e 2"
          ]
        },
        {
          id: 4,
          name: "Fl\xE9au Infame",
          initiative: 77,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque -1, empoisonnement"]
        }
      ]
    },
    // MARK: zealot
    {
      id: "zealot",
      name: "Z\xE9lote",
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
        "blessure"
      ],
      eliteModifiers: [
        "",
        "blessure",
        "blessure",
        "blessure",
        "blessure",
        "blessure",
        "blessure",
        "blessure"
      ],
      actions: [
        {
          id: 1,
          name: "Fouet de Damnation",
          initiative: 19,
          recycled: false,
          effects: [
            "D\xE9placement +1, saut",
            "Attaque -1, mal\xE9diction",
            "infuse Air"
          ]
        },
        {
          id: 2,
          name: "Drain de Vie",
          initiative: 27,
          recycled: true,
          effects: [
            "D\xE9placement +0",
            "Attaque -1, port\xE9e 2",
            "Soin X sur lui-m\xEAme (X=montant d\xE9gats attaque)",
            "infuse Obscurit\xE9"
          ]
        },
        {
          id: 3,
          name: "Assaut Pr\xE9cipit\xE9",
          initiative: 35,
          recycled: false,
          effects: ["D\xE9placement +1", "Attaque -1"]
        },
        {
          id: 4,
          name: "Sang Bouillant",
          initiative: 46,
          recycled: false,
          effects: [
            "Attaque -1, port\xE9e 2, cible 2, confusion",
            "[Feu]: +2 port\xE9e"
          ]
        },
        {
          id: 5,
          name: "Rien de Particulier",
          initiative: 50,
          recycled: false,
          effects: ["D\xE9placement +0", "Attaque +0"]
        },
        {
          id: 6,
          name: "Coup Calcul\xE9",
          initiative: 0,
          recycled: false,
          effects: ["D\xE9placement -1", "Attaque +1"]
        },
        {
          id: 7,
          name: "Fl\xE9au Infame",
          initiative: 77,
          recycled: false,
          effects: [
            "D\xE9placement -1",
            "Attaque -1, empoisonnement (cible 2 hexes adjacents voisins",
            "[Air]: +1 attaque"
          ]
        },
        {
          id: 8,
          name: "Flamme impie",
          initiative: 82,
          recycled: true,
          effects: ["Attaque +1, port\xE9e 3", "Infuse Feu"]
        }
      ]
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
        (a) => 28 * a
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
        (a) => a + 4
      ],
      immunities: [
        "immobilisation",
        "d\xE9sarmement",
        "confusion",
        "\xE9tourdissement"
      ],
      special1: [
        () => `saute jusqu'au z\xE9lote mort le plus \xE9loign\xE9 et le ressuscite, ou saute jusqu'a l'aventurier le plus \xE9loign\xE9 et Attaque +0`,
        () => `saute jusqu'au z\xE9lote mort le plus \xE9loign\xE9 et le ressuscite, ou saute jusqu'a l'aventurier le plus \xE9loign\xE9 et Attaque +0`,
        () => `saute jusqu'au z\xE9lote mort le plus \xE9loign\xE9 et le ressuscite, ou saute jusqu'a l'aventurier le plus \xE9loign\xE9 et Attaque +0`,
        () => `saute jusqu'au z\xE9lote mort le plus \xE9loign\xE9 et le ressuscite, ou saute jusqu'a l'aventurier le plus \xE9loign\xE9 et Attaque +0`,
        () => `saute jusqu'au z\xE9lote mort le plus \xE9loign\xE9 et le ressuscite, ou saute jusqu'a l'aventurier le plus \xE9loign\xE9 et Attaque +0`,
        () => `saute jusqu'au z\xE9lote mort le plus \xE9loign\xE9 et le ressuscite, ou saute jusqu'a l'aventurier le plus \xE9loign\xE9 et Attaque +0`,
        () => `saute jusqu'au z\xE9lote mort le plus \xE9loign\xE9 et le ressuscite, ou saute jusqu'a l'aventurier le plus \xE9loign\xE9 et Attaque +0`,
        () => `saute jusqu'au z\xE9lote mort le plus \xE9loign\xE9 et le ressuscite, ou saute jusqu'a l'aventurier le plus \xE9loign\xE9 et Attaque +0`
      ],
      special2: [
        () => `d\xE9placement +0, attaque +0. ressuscite tous les z\xE9lotes morts dans la salle`,
        () => `d\xE9placement +0, attaque +0. ressuscite tous les z\xE9lotes morts dans la salle`,
        () => `d\xE9placement +0, attaque +0. ressuscite tous les z\xE9lotes morts dans la salle`,
        () => `d\xE9placement +0, attaque +0. ressuscite tous les z\xE9lotes morts dans la salle`,
        () => `d\xE9placement +0, attaque +0. ressuscite tous les z\xE9lotes morts dans la salle`,
        () => `d\xE9placement +0, attaque +0. ressuscite tous les z\xE9lotes morts dans la salle`,
        () => `d\xE9placement +0, attaque +0. ressuscite tous les z\xE9lotes morts dans la salle`,
        () => `d\xE9placement +0, attaque +0. ressuscite tous les z\xE9lotes morts dans la salle`
      ],
      actions: BOSS_ACTIONS
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
        (a) => 36 * a
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
        () => 8
      ],
      immunities: [
        "immobilisation",
        "d\xE9sarmement",
        "confusion",
        "\xE9tourdissement",
        "mal\xE9diction"
      ],
      special1: [
        (a) => `tous les adversaires \xE0 port\xE9e 2 subissent 2 d\xE9gats, g\xE9n\xE9rez ${a / 2} diablotins de sang`,
        (a) => `tous les adversaires \xE0 port\xE9e 2 subissent 2 d\xE9gats, g\xE9n\xE9rez ${a / 2} diablotins de sang`,
        (a) => `tous les adversaires \xE0 port\xE9e 2 subissent 2 d\xE9gats, g\xE9n\xE9rez ${a / 2} diablotins de sang`,
        (a) => `tous les adversaires \xE0 port\xE9e 2 subissent 2 d\xE9gats, g\xE9n\xE9rez ${a / 2} diablotins de sang`,
        (a) => `tous les adversaires \xE0 port\xE9e 2 subissent 2 d\xE9gats, g\xE9n\xE9rez ${a / 2} diablotins de sang`,
        (a) => `tous les adversaires \xE0 port\xE9e 2 subissent 2 d\xE9gats, g\xE9n\xE9rez ${a / 2} diablotins de sang`,
        (a) => `tous les adversaires \xE0 port\xE9e 2 subissent 2 d\xE9gats, g\xE9n\xE9rez ${a / 2} diablotins de sang`,
        (a) => `tous les adversaires \xE0 port\xE9e 2 subissent 2 d\xE9gats, g\xE9n\xE9rez ${a / 2} diablotins de sang`
      ],
      special2: [
        () => `attaque +0, attaque -1 \xE0 port\xE9e 2 de la cible, attaque -2 \xE0 port\xE9e 2 de la cible`,
        () => `attaque +0, attaque -1 \xE0 port\xE9e 2 de la cible, attaque -2 \xE0 port\xE9e 2 de la cible`,
        () => `attaque +0, attaque -1 \xE0 port\xE9e 2 de la cible, attaque -2 \xE0 port\xE9e 2 de la cible`,
        () => `attaque +0, attaque -1 \xE0 port\xE9e 2 de la cible, attaque -2 \xE0 port\xE9e 2 de la cible`,
        () => `attaque +0, attaque -1 \xE0 port\xE9e 2 de la cible, attaque -2 \xE0 port\xE9e 2 de la cible`,
        () => `attaque +0, attaque -1 \xE0 port\xE9e 2 de la cible, attaque -2 \xE0 port\xE9e 2 de la cible`,
        () => `attaque +0, attaque -1 \xE0 port\xE9e 2 de la cible, attaque -2 \xE0 port\xE9e 2 de la cible`,
        () => `attaque +0, attaque -1 \xE0 port\xE9e 2 de la cible, attaque -2 \xE0 port\xE9e 2 de la cible`
      ],
      actions: BOSS_ACTIONS
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
        (a) => 28 * a
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
        (a) => a + 3
      ],
      immunities: ["d\xE9sarmement", "confusion", "\xE9tourdissement"],
      special1: [
        (a) => `Soin ${a} sur elle-m\xEAme`,
        (a) => `Soin ${a} sur elle-m\xEAme`,
        (a) => `Soin ${a + 1} sur elle-m\xEAme`,
        (a) => `Soin ${a + 1} sur elle-m\xEAme`,
        (a) => `Soin ${a + 2} sur elle-m\xEAme`,
        (a) => `Soin ${a + 2} sur elle-m\xEAme`,
        (a) => `Soin ${a + 3} sur elle-m\xEAme`,
        (a) => `Soin ${a + 3} sur elle-m\xEAme`
      ],
      special2: [
        () => `Soin 2 sur tous les alli\xE9s`,
        () => `Soin 2 sur tous les alli\xE9s`,
        () => `Soin 3 sur tous les alli\xE9s`,
        () => `Soin 3 sur tous les alli\xE9s`,
        () => `Soin 4 sur tous les alli\xE9s`,
        () => `Soin 4 sur tous les alli\xE9s`,
        () => `Soin 5 sur tous les alli\xE9s`,
        () => `Soin 5 sur tous les alli\xE9s`
      ],
      actions: BOSS_ACTIONS
    }
  ];
  var ENEMIES_MAP = {};
  for (let enemies of ENEMIES) {
    ENEMIES_MAP[enemies.id] = enemies;
  }
  var BATTLE_GOALS = [
    {
      id: 1,
      title: "Maraudeur",
      description: "Effectuer deux actions pr\xE9sentant l'icone Perdue durant le m\xEAme round"
    },
    {
      id: 2,
      title: "Reclus",
      description: "Ne jamais terminer votre tour adjacent \xE0 un de vos alli\xE9s"
    },
    {
      id: 3,
      title: "Vite sur pied",
      description: "Terminer le sc\xE9nario avec un nombre de points de vie \xE9gal \xE0 votre valeur maximale de points de vie"
    },
    {
      id: 4,
      title: "Feinteur",
      description: "\xC9liminer un monstre qui ne vous est pas adjacent alors que vous \xEAtes adjacent \xE0 un autre"
    },
    {
      id: 5,
      title: "T\xEAte br\xFBl\xE9e",
      description: "Effectuer deux actions pr\xE9sentant l'icone Perdue avant votre premier repos"
    },
    {
      id: 6,
      title: "Insomniaque",
      description: "Subir des d\xE9g\xE2ts d'une attaque intervenant le m\xEAme round o\xF9 vous prenez un repos long"
    },
    {
      id: 7,
      title: "Pacifiste",
      description: "\xC9liminer au maximum trois monstres"
    },
    {
      id: 8,
      title: "Acrobate",
      description: "Perdre une carte pour \xE9viter de subir 5 d\xE9gats ou plus"
    },
    {
      id: 9,
      title: "Abstinent",
      description: "Ne jamais consommer de potion"
    },
    {
      id: 10,
      title: "Fin de match",
      description: "\xCAtre le dernier \xE0 \xE9liminer un monstre lors de ce sc\xE9nario"
    },
    {
      id: 11,
      title: "Conservateur",
      description: "Ne jamais perdre une carte pour \xE9viter de subir des d\xE9gats"
    },
    {
      id: 12,
      title: "Dur \xE0 cuire",
      description: "Ne jamais laisser votre nombre de points de vie descendre sous la moiti\xE9 de votre valeur maximale de points de vie (arrondie au sup\xE9rieur)"
    },
    {
      id: 13,
      title: "Comp\xE9titeur",
      description: "Ne jamais quitter un hexagone adjacent \xE0 un monstre"
    },
    {
      id: 14,
      title: "Vol \xE0 la tire",
      description: "Ramasser au moins un pion Monnaie en effectuant une action Pillage lorsque vous \xEAtes sur un hexagone adjacents \xE0 deux monstres ou plus"
    },
    {
      id: 15,
      title: "Pelote \xE0 \xE9pingles",
      description: "\xCAtre la cible d'attaque d'au moins trois monstres durant le m\xEAme round"
    },
    {
      id: 16,
      title: "Pl\xE9b\xE9ien",
      description: "Ne jamais \xE9liminer un monstre d'\xE9lite ou un boss"
    },
    {
      id: 17,
      title: "\xC9goiste",
      description: "Amasser plus de pions Monnaie que tout autre aventurier"
    },
    {
      id: 18,
      title: "Vecteur",
      description: "Appliquer un \xE9tat n\xE9gatif \xE0 un monstre alors que vous \xEAtes vous-m\xEAme sous le coup d'un \xE9tat n\xE9gatif"
    },
    {
      id: 19,
      title: "Gringalet",
      description: "Finir \xE9puis\xE9 avant tout autre aventurier"
    },
    {
      id: 20,
      title: "Joueur",
      description: "\xC9liminer un monstre gr\xE2ce \xE0 une attaque avec d\xE9saventage"
    },
    {
      id: 21,
      title: "Pionnier",
      description: "Ouvrir une porte et terminer le m\xEAme tour dans la salle r\xE9v\xE9l\xE9e"
    },
    {
      id: 22,
      title: "Tra\xEEnard",
      description: "Ne jamais prendre de repos court"
    },
    {
      id: 23,
      title: "Assistant",
      description: "\xC9liminer un monstre pr\xE9c\xE9demment attaqu\xE9 par un de vos alli\xE9s durant le m\xEAme round"
    },
    {
      id: 24,
      title: "Altruiste",
      description: "Amasser moins de pions monnaie que tout autre aventurier"
    },
    {
      id: 25,
      title: "Sp\xE9cialiste",
      description: "Ne jamais entreprendre d'action par d\xE9faut"
    },
    {
      id: 26,
      title: "Agoraphobe",
      description: "Terminer tous vos tours adjacent \xE0 un mur ou \xE0 un obstacle"
    },
    {
      id: 27,
      title: "Hyperactif",
      description: "Ne jamais prendre un repos long"
    },
    {
      id: 28,
      title: "Ombre",
      description: "Terminer tous vos tours adjacents \xE0 un de vos alli\xE9s"
    },
    {
      id: 29,
      title: "Sadique",
      description: "\xC9liminer au moins cinq monstres"
    },
    {
      id: 30,
      title: "Masochiste",
      description: "Terminer le sc\xE9nario avec 3 points de vie au maximum"
    },
    {
      id: 31,
      title: "Premier sang",
      description: "\xCAtre le premier \xE0 \xE9liminer un monstre lors de ce sc\xE9nario"
    },
    {
      id: 32,
      title: "Coupe-jarret",
      description: "\xC9liminer un monstre et piller le pion Monnaie qu'il laisse tomber au cours du m\xEAme tour"
    }
  ];
  var MONSTER_MODIFIERS_DECK = [
    {
      id: 1,
      effects: ["+0"],
      recycled: false,
      color: false
    },
    {
      id: 2,
      effects: ["+0"],
      recycled: false,
      color: false
    },
    {
      id: 3,
      effects: ["+0"],
      recycled: false,
      color: false
    },
    {
      id: 4,
      effects: ["+0"],
      recycled: false,
      color: false
    },
    {
      id: 5,
      effects: ["+0"],
      recycled: false,
      color: false
    },
    {
      id: 6,
      effects: ["+0"],
      recycled: false,
      color: false
    },
    {
      id: 7,
      effects: ["-1"],
      recycled: false,
      color: "#fff0f0"
    },
    {
      id: 8,
      effects: ["-1"],
      recycled: false,
      color: "#fff0f0"
    },
    {
      id: 9,
      effects: ["-1"],
      recycled: false,
      color: "#fff0f0"
    },
    {
      id: 10,
      effects: ["-1"],
      recycled: false,
      color: "#fff0f0"
    },
    {
      id: 11,
      effects: ["-1"],
      recycled: false,
      color: "#fff0f0"
    },
    {
      id: 12,
      effects: ["-2"],
      recycled: false,
      color: "#fff0f0"
    },
    {
      id: 13,
      effects: ["+1"],
      recycled: false,
      color: "#ebfceb"
    },
    {
      id: 14,
      effects: ["+1"],
      recycled: false,
      color: "#ebfceb"
    },
    {
      id: 15,
      effects: ["+1"],
      recycled: false,
      color: "#ebfceb"
    },
    {
      id: 16,
      effects: ["+1"],
      recycled: false,
      color: "#ebfceb"
    },
    {
      id: 17,
      effects: ["+1"],
      recycled: false,
      color: "#ebfceb"
    },
    {
      id: 18,
      effects: ["x0"],
      recycled: true,
      color: "#ffffd9"
    },
    {
      id: 19,
      effects: ["x2"],
      recycled: true,
      color: "#ffc7ff"
    },
    {
      id: 20,
      effects: ["+2"],
      recycled: false,
      color: "#ebfceb"
    }
  ];

  // src/utils.js
  function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  var isSleepPrevented = false;
  function preventSleep() {
    if ("wakeLock" in navigator && !isSleepPrevented) {
      isSleepPrevented = true;
      document.addEventListener(
        "click",
        () => {
          navigator.wakeLock.request("screen");
        },
        { once: true }
      );
    }
  }

  // src/game_state.js
  var GameState = class {
    nextId = 1;
    heroes = [];
    enemies = [];
    scenarioLevel = 1;
    round = 0;
    fire = 0;
    ice = 0;
    air = 0;
    earth = 0;
    light = 0;
    darkness = 0;
    monsterActions = {};
    enemyModifiers = {
      visible: 0,
      // number of discarded cards to show
      deck: shuffleArray(MONSTER_MODIFIERS_DECK.map((c) => c.id)),
      discardPile: []
    };
    battleGoals = {};
    turnTracker = {};
    activeEntity = false;
    config = {
      elements: true,
      turnTracker: true,
      battleGoals: true,
      enemyActions: true,
      attackModifiers: true
    };
    screens = ["START"];
    states = [null];
    get screen() {
      return this.screens.at(-1);
    }
    get state() {
      return this.states.at(-1);
    }
    setScreen(screen) {
      this.screens = [screen];
      this.states = [null];
    }
    pushScreen(screen, state = null) {
      this.screens.push(screen);
      this.states.push(state);
    }
    popScreen() {
      this.screens.pop();
      this.states.pop();
    }
    addHero(hero) {
      hero.id = this.nextId++;
      this.heroes.push(hero);
    }
    addEnemy(enemy) {
      enemy.id = this.nextId++;
      this.enemies.push(enemy);
      this.turnTracker[enemy.type] = false;
      if (!this.monsterActions[enemy.type]) {
        const deck = ENEMIES_MAP[enemy.type].actions.map((a) => a.id);
        shuffleArray(deck);
        this.monsterActions[enemy.type] = {
          deck,
          discardPile: [],
          active: false,
          initiative: false
        };
      }
    }
    getId() {
      return this.nextId++;
    }
    isNextRoundEnabled() {
      if (this.round === 0) {
        return true;
      }
      if (this.config.turnTracker) {
        for (let hero of this.heroes) {
          if (!this.turnTracker[hero.id]) {
            return false;
          }
        }
        for (let enemy of this.enemies) {
          if (!this.turnTracker[enemy.type]) {
            return false;
          }
        }
      }
      return true;
    }
    startTurn(entity) {
      const prevEntity = this.activeEntity;
      if (prevEntity) {
        this.endTurn(prevEntity);
      }
      this.activeEntity = entity;
      this.turnTracker[entity] = true;
    }
    endTurn(entity) {
      if (typeof entity === "number") {
        const hero = this.heroes.find((hero2) => hero2.id === entity);
        this.clearStatus(hero.status);
      } else {
        for (let enemy of this.enemies) {
          if (enemy.type === entity && !enemy.hasTurnEnded) {
            this.clearStatus(enemy.status);
          }
          enemy.hasTurnEnded = true;
        }
      }
    }
    clearStatus(status) {
      status.confusion = Math.max(0, status.confusion - 1);
      status.immobilisation = Math.max(0, status.immobilisation - 1);
      status.stunned = Math.max(0, status.stunned - 1);
      status.disarmed = Math.max(0, status.disarmed - 1);
      status.renforced = Math.max(0, status.renforced - 1);
    }
    incrementRound() {
      if (this.activeEntity) {
        this.endTurn(this.activeEntity);
      }
      this.round++;
      for (let elem of ["fire", "ice", "air", "earth", "light", "darkness"]) {
        if (this[elem] > 0) {
          this[elem]--;
        }
      }
      for (let type in this.monsterActions) {
        this.monsterActions[type].active = false;
        this.monsterActions[type].initiative = false;
        let shouldShuffle = false;
        for (let actionId of this.monsterActions[type].discardPile) {
          const action = ENEMIES_MAP[type].actions.find((a) => a.id === actionId);
          if (action.recycled) {
            shouldShuffle = true;
            break;
          }
        }
        if (shouldShuffle) {
          const deck = ENEMIES_MAP[type].actions.map((a) => a.id);
          shuffleArray(deck);
          this.monsterActions[type].deck = deck;
          this.monsterActions[type].discardPile = [];
        }
      }
      const mods = this.enemyModifiers;
      mods.visible = 0;
      mods.discardPile = mods.discardPile.filter((c) => typeof c === "number");
      const discardedMods = mods.discardPile.map(
        (id) => MONSTER_MODIFIERS_DECK.find((mod) => mod.id === id)
      );
      if (discardedMods.find((mod) => mod.recycled)) {
        while (mods.discardPile.length) {
          mods.deck.push(mods.discardPile.pop());
        }
        shuffleArray(mods.deck);
      }
      this.turnTracker = {};
      this.activeEntity = false;
      for (let enemy of this.enemies) {
        enemy.hasTurnEnded = false;
      }
    }
    addCurse() {
      const curses = this.enemyModifiers.deck.filter((id) => {
        return typeof id === "string" && id.startsWith("curse");
      });
      if (curses.length < 10) {
        this.enemyModifiers.deck.push(`curse${-this.nextId++}`);
        shuffleArray(this.enemyModifiers.deck);
      }
    }
    addBlessing() {
      const blessings = this.enemyModifiers.deck.filter((id) => {
        return typeof id === "string" && id.startsWith("blessing");
      });
      if (blessings.length < 10) {
        this.enemyModifiers.deck.push(`blessing${-this.nextId++}`);
        shuffleArray(this.enemyModifiers.deck);
      }
    }
  };

  // node_modules/@odoo/owl/dist/owl.es.js
  function filterOutModifiersFromData(dataList) {
    dataList = dataList.slice();
    const modifiers = [];
    let elm;
    while ((elm = dataList[0]) && typeof elm === "string") {
      modifiers.push(dataList.shift());
    }
    return { modifiers, data: dataList };
  }
  var config = {
    // whether or not blockdom should normalize DOM whenever a block is created.
    // Normalizing dom mean removing empty text nodes (or containing only spaces)
    shouldNormalizeDom: true,
    // this is the main event handler. Every event handler registered with blockdom
    // will go through this function, giving it the data registered in the block
    // and the event
    mainEventHandler: (data, ev, currentTarget) => {
      if (typeof data === "function") {
        data(ev);
      } else if (Array.isArray(data)) {
        data = filterOutModifiersFromData(data).data;
        data[0](data[1], ev);
      }
      return false;
    }
  };
  var VToggler = class {
    constructor(key, child) {
      this.key = key;
      this.child = child;
    }
    mount(parent, afterNode) {
      this.parentEl = parent;
      this.child.mount(parent, afterNode);
    }
    moveBeforeDOMNode(node, parent) {
      this.child.moveBeforeDOMNode(node, parent);
    }
    moveBeforeVNode(other, afterNode) {
      this.moveBeforeDOMNode(other && other.firstNode() || afterNode);
    }
    patch(other, withBeforeRemove) {
      if (this === other) {
        return;
      }
      let child1 = this.child;
      let child2 = other.child;
      if (this.key === other.key) {
        child1.patch(child2, withBeforeRemove);
      } else {
        child2.mount(this.parentEl, child1.firstNode());
        if (withBeforeRemove) {
          child1.beforeRemove();
        }
        child1.remove();
        this.child = child2;
        this.key = other.key;
      }
    }
    beforeRemove() {
      this.child.beforeRemove();
    }
    remove() {
      this.child.remove();
    }
    firstNode() {
      return this.child.firstNode();
    }
    toString() {
      return this.child.toString();
    }
  };
  function toggler(key, child) {
    return new VToggler(key, child);
  }
  var OwlError = class extends Error {
  };
  var { setAttribute: elemSetAttribute, removeAttribute } = Element.prototype;
  var tokenList = DOMTokenList.prototype;
  var tokenListAdd = tokenList.add;
  var tokenListRemove = tokenList.remove;
  var isArray = Array.isArray;
  var { split, trim } = String.prototype;
  var wordRegexp = /\s+/;
  function setAttribute(key, value) {
    switch (value) {
      case false:
      case void 0:
        removeAttribute.call(this, key);
        break;
      case true:
        elemSetAttribute.call(this, key, "");
        break;
      default:
        elemSetAttribute.call(this, key, value);
    }
  }
  function createAttrUpdater(attr) {
    return function(value) {
      setAttribute.call(this, attr, value);
    };
  }
  function attrsSetter(attrs) {
    if (isArray(attrs)) {
      if (attrs[0] === "class") {
        setClass.call(this, attrs[1]);
      } else {
        setAttribute.call(this, attrs[0], attrs[1]);
      }
    } else {
      for (let k in attrs) {
        if (k === "class") {
          setClass.call(this, attrs[k]);
        } else {
          setAttribute.call(this, k, attrs[k]);
        }
      }
    }
  }
  function attrsUpdater(attrs, oldAttrs) {
    if (isArray(attrs)) {
      const name = attrs[0];
      const val = attrs[1];
      if (name === oldAttrs[0]) {
        if (val === oldAttrs[1]) {
          return;
        }
        if (name === "class") {
          updateClass.call(this, val, oldAttrs[1]);
        } else {
          setAttribute.call(this, name, val);
        }
      } else {
        removeAttribute.call(this, oldAttrs[0]);
        setAttribute.call(this, name, val);
      }
    } else {
      for (let k in oldAttrs) {
        if (!(k in attrs)) {
          if (k === "class") {
            updateClass.call(this, "", oldAttrs[k]);
          } else {
            removeAttribute.call(this, k);
          }
        }
      }
      for (let k in attrs) {
        const val = attrs[k];
        if (val !== oldAttrs[k]) {
          if (k === "class") {
            updateClass.call(this, val, oldAttrs[k]);
          } else {
            setAttribute.call(this, k, val);
          }
        }
      }
    }
  }
  function toClassObj(expr) {
    const result = {};
    switch (typeof expr) {
      case "string":
        const str = trim.call(expr);
        if (!str) {
          return {};
        }
        let words = split.call(str, wordRegexp);
        for (let i = 0, l = words.length; i < l; i++) {
          result[words[i]] = true;
        }
        return result;
      case "object":
        for (let key in expr) {
          const value = expr[key];
          if (value) {
            key = trim.call(key);
            if (!key) {
              continue;
            }
            const words2 = split.call(key, wordRegexp);
            for (let word of words2) {
              result[word] = value;
            }
          }
        }
        return result;
      case "undefined":
        return {};
      case "number":
        return { [expr]: true };
      default:
        return { [expr]: true };
    }
  }
  function setClass(val) {
    val = val === "" ? {} : toClassObj(val);
    const cl = this.classList;
    for (let c in val) {
      tokenListAdd.call(cl, c);
    }
  }
  function updateClass(val, oldVal) {
    oldVal = oldVal === "" ? {} : toClassObj(oldVal);
    val = val === "" ? {} : toClassObj(val);
    const cl = this.classList;
    for (let c in oldVal) {
      if (!(c in val)) {
        tokenListRemove.call(cl, c);
      }
    }
    for (let c in val) {
      if (!(c in oldVal)) {
        tokenListAdd.call(cl, c);
      }
    }
  }
  function batched(callback) {
    let scheduled = false;
    return async (...args) => {
      if (!scheduled) {
        scheduled = true;
        await Promise.resolve();
        scheduled = false;
        callback(...args);
      }
    };
  }
  function inOwnerDocument(el) {
    if (!el) {
      return false;
    }
    if (el.ownerDocument.contains(el)) {
      return true;
    }
    const rootNode = el.getRootNode();
    return rootNode instanceof ShadowRoot && el.ownerDocument.contains(rootNode.host);
  }
  function validateTarget(target) {
    const document2 = target && target.ownerDocument;
    if (document2) {
      const HTMLElement = document2.defaultView.HTMLElement;
      if (target instanceof HTMLElement || target instanceof ShadowRoot) {
        if (!document2.body.contains(target instanceof HTMLElement ? target : target.host)) {
          throw new OwlError("Cannot mount a component on a detached dom node");
        }
        return;
      }
    }
    throw new OwlError("Cannot mount component: the target is not a valid DOM element");
  }
  var Markup = class extends String {
  };
  function createEventHandler(rawEvent) {
    const eventName = rawEvent.split(".")[0];
    const capture2 = rawEvent.includes(".capture");
    if (rawEvent.includes(".synthetic")) {
      return createSyntheticHandler(eventName, capture2);
    } else {
      return createElementHandler(eventName, capture2);
    }
  }
  var nextNativeEventId = 1;
  function createElementHandler(evName, capture2 = false) {
    let eventKey = `__event__${evName}_${nextNativeEventId++}`;
    if (capture2) {
      eventKey = `${eventKey}_capture`;
    }
    function listener(ev) {
      const currentTarget = ev.currentTarget;
      if (!currentTarget || !inOwnerDocument(currentTarget))
        return;
      const data = currentTarget[eventKey];
      if (!data)
        return;
      config.mainEventHandler(data, ev, currentTarget);
    }
    function setup(data) {
      this[eventKey] = data;
      this.addEventListener(evName, listener, { capture: capture2 });
    }
    function remove() {
      delete this[eventKey];
      this.removeEventListener(evName, listener, { capture: capture2 });
    }
    function update(data) {
      this[eventKey] = data;
    }
    return { setup, update, remove };
  }
  var nextSyntheticEventId = 1;
  function createSyntheticHandler(evName, capture2 = false) {
    let eventKey = `__event__synthetic_${evName}`;
    if (capture2) {
      eventKey = `${eventKey}_capture`;
    }
    setupSyntheticEvent(evName, eventKey, capture2);
    const currentId = nextSyntheticEventId++;
    function setup(data) {
      const _data = this[eventKey] || {};
      _data[currentId] = data;
      this[eventKey] = _data;
    }
    function remove() {
      delete this[eventKey];
    }
    return { setup, update: setup, remove };
  }
  function nativeToSyntheticEvent(eventKey, event) {
    let dom = event.target;
    while (dom !== null) {
      const _data = dom[eventKey];
      if (_data) {
        for (const data of Object.values(_data)) {
          const stopped = config.mainEventHandler(data, event, dom);
          if (stopped)
            return;
        }
      }
      dom = dom.parentNode;
    }
  }
  var CONFIGURED_SYNTHETIC_EVENTS = {};
  function setupSyntheticEvent(evName, eventKey, capture2 = false) {
    if (CONFIGURED_SYNTHETIC_EVENTS[eventKey]) {
      return;
    }
    document.addEventListener(evName, (event) => nativeToSyntheticEvent(eventKey, event), {
      capture: capture2
    });
    CONFIGURED_SYNTHETIC_EVENTS[eventKey] = true;
  }
  var getDescriptor$3 = (o, p) => Object.getOwnPropertyDescriptor(o, p);
  var nodeProto$4 = Node.prototype;
  var nodeInsertBefore$3 = nodeProto$4.insertBefore;
  var nodeSetTextContent$1 = getDescriptor$3(nodeProto$4, "textContent").set;
  var nodeRemoveChild$3 = nodeProto$4.removeChild;
  var VMulti = class {
    constructor(children) {
      this.children = children;
    }
    mount(parent, afterNode) {
      const children = this.children;
      const l = children.length;
      const anchors = new Array(l);
      for (let i = 0; i < l; i++) {
        let child = children[i];
        if (child) {
          child.mount(parent, afterNode);
        } else {
          const childAnchor = document.createTextNode("");
          anchors[i] = childAnchor;
          nodeInsertBefore$3.call(parent, childAnchor, afterNode);
        }
      }
      this.anchors = anchors;
      this.parentEl = parent;
    }
    moveBeforeDOMNode(node, parent = this.parentEl) {
      this.parentEl = parent;
      const children = this.children;
      const anchors = this.anchors;
      for (let i = 0, l = children.length; i < l; i++) {
        let child = children[i];
        if (child) {
          child.moveBeforeDOMNode(node, parent);
        } else {
          const anchor = anchors[i];
          nodeInsertBefore$3.call(parent, anchor, node);
        }
      }
    }
    moveBeforeVNode(other, afterNode) {
      if (other) {
        const next = other.children[0];
        afterNode = (next ? next.firstNode() : other.anchors[0]) || null;
      }
      const children = this.children;
      const parent = this.parentEl;
      const anchors = this.anchors;
      for (let i = 0, l = children.length; i < l; i++) {
        let child = children[i];
        if (child) {
          child.moveBeforeVNode(null, afterNode);
        } else {
          const anchor = anchors[i];
          nodeInsertBefore$3.call(parent, anchor, afterNode);
        }
      }
    }
    patch(other, withBeforeRemove) {
      if (this === other) {
        return;
      }
      const children1 = this.children;
      const children2 = other.children;
      const anchors = this.anchors;
      const parentEl = this.parentEl;
      for (let i = 0, l = children1.length; i < l; i++) {
        const vn1 = children1[i];
        const vn2 = children2[i];
        if (vn1) {
          if (vn2) {
            vn1.patch(vn2, withBeforeRemove);
          } else {
            const afterNode = vn1.firstNode();
            const anchor = document.createTextNode("");
            anchors[i] = anchor;
            nodeInsertBefore$3.call(parentEl, anchor, afterNode);
            if (withBeforeRemove) {
              vn1.beforeRemove();
            }
            vn1.remove();
            children1[i] = void 0;
          }
        } else if (vn2) {
          children1[i] = vn2;
          const anchor = anchors[i];
          vn2.mount(parentEl, anchor);
          nodeRemoveChild$3.call(parentEl, anchor);
        }
      }
    }
    beforeRemove() {
      const children = this.children;
      for (let i = 0, l = children.length; i < l; i++) {
        const child = children[i];
        if (child) {
          child.beforeRemove();
        }
      }
    }
    remove() {
      const parentEl = this.parentEl;
      if (this.isOnlyChild) {
        nodeSetTextContent$1.call(parentEl, "");
      } else {
        const children = this.children;
        const anchors = this.anchors;
        for (let i = 0, l = children.length; i < l; i++) {
          const child = children[i];
          if (child) {
            child.remove();
          } else {
            nodeRemoveChild$3.call(parentEl, anchors[i]);
          }
        }
      }
    }
    firstNode() {
      const child = this.children[0];
      return child ? child.firstNode() : this.anchors[0];
    }
    toString() {
      return this.children.map((c) => c ? c.toString() : "").join("");
    }
  };
  function multi(children) {
    return new VMulti(children);
  }
  var getDescriptor$2 = (o, p) => Object.getOwnPropertyDescriptor(o, p);
  var nodeProto$3 = Node.prototype;
  var characterDataProto$1 = CharacterData.prototype;
  var nodeInsertBefore$2 = nodeProto$3.insertBefore;
  var characterDataSetData$1 = getDescriptor$2(characterDataProto$1, "data").set;
  var nodeRemoveChild$2 = nodeProto$3.removeChild;
  var VSimpleNode = class {
    constructor(text2) {
      this.text = text2;
    }
    mountNode(node, parent, afterNode) {
      this.parentEl = parent;
      nodeInsertBefore$2.call(parent, node, afterNode);
      this.el = node;
    }
    moveBeforeDOMNode(node, parent = this.parentEl) {
      this.parentEl = parent;
      nodeInsertBefore$2.call(parent, this.el, node);
    }
    moveBeforeVNode(other, afterNode) {
      nodeInsertBefore$2.call(this.parentEl, this.el, other ? other.el : afterNode);
    }
    beforeRemove() {
    }
    remove() {
      nodeRemoveChild$2.call(this.parentEl, this.el);
    }
    firstNode() {
      return this.el;
    }
    toString() {
      return this.text;
    }
  };
  var VText$1 = class extends VSimpleNode {
    mount(parent, afterNode) {
      this.mountNode(document.createTextNode(toText(this.text)), parent, afterNode);
    }
    patch(other) {
      const text2 = other.text;
      if (this.text !== text2) {
        characterDataSetData$1.call(this.el, toText(text2));
        this.text = text2;
      }
    }
  };
  var VComment = class extends VSimpleNode {
    mount(parent, afterNode) {
      this.mountNode(document.createComment(toText(this.text)), parent, afterNode);
    }
    patch() {
    }
  };
  function text(str) {
    return new VText$1(str);
  }
  function comment(str) {
    return new VComment(str);
  }
  function toText(value) {
    switch (typeof value) {
      case "string":
        return value;
      case "number":
        return String(value);
      case "boolean":
        return value ? "true" : "false";
      default:
        return value || "";
    }
  }
  var getDescriptor$1 = (o, p) => Object.getOwnPropertyDescriptor(o, p);
  var nodeProto$2 = Node.prototype;
  var elementProto = Element.prototype;
  var characterDataProto = CharacterData.prototype;
  var characterDataSetData = getDescriptor$1(characterDataProto, "data").set;
  var nodeGetFirstChild = getDescriptor$1(nodeProto$2, "firstChild").get;
  var nodeGetNextSibling = getDescriptor$1(nodeProto$2, "nextSibling").get;
  var NO_OP = () => {
  };
  function makePropSetter(name) {
    return function setProp(value) {
      this[name] = value === 0 ? 0 : value ? value.valueOf() : "";
    };
  }
  var cache$1 = {};
  function createBlock(str) {
    if (str in cache$1) {
      return cache$1[str];
    }
    const doc = new DOMParser().parseFromString(`<t>${str}</t>`, "text/xml");
    const node = doc.firstChild.firstChild;
    if (config.shouldNormalizeDom) {
      normalizeNode(node);
    }
    const tree = buildTree(node);
    const context = buildContext(tree);
    const template = tree.el;
    const Block = buildBlock(template, context);
    cache$1[str] = Block;
    return Block;
  }
  function normalizeNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!/\S/.test(node.textContent)) {
        node.remove();
        return;
      }
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === "pre") {
        return;
      }
    }
    for (let i = node.childNodes.length - 1; i >= 0; --i) {
      normalizeNode(node.childNodes.item(i));
    }
  }
  function buildTree(node, parent = null, domParentTree = null) {
    switch (node.nodeType) {
      case Node.ELEMENT_NODE: {
        let currentNS = domParentTree && domParentTree.currentNS;
        const tagName = node.tagName;
        let el = void 0;
        const info = [];
        if (tagName.startsWith("block-text-")) {
          const index = parseInt(tagName.slice(11), 10);
          info.push({ type: "text", idx: index });
          el = document.createTextNode("");
        }
        if (tagName.startsWith("block-child-")) {
          if (!domParentTree.isRef) {
            addRef(domParentTree);
          }
          const index = parseInt(tagName.slice(12), 10);
          info.push({ type: "child", idx: index });
          el = document.createTextNode("");
        }
        currentNS || (currentNS = node.namespaceURI);
        if (!el) {
          el = currentNS ? document.createElementNS(currentNS, tagName) : document.createElement(tagName);
        }
        if (el instanceof Element) {
          if (!domParentTree) {
            const fragment = document.createElement("template").content;
            fragment.appendChild(el);
          }
          const attrs = node.attributes;
          for (let i = 0; i < attrs.length; i++) {
            const attrName = attrs[i].name;
            const attrValue = attrs[i].value;
            if (attrName.startsWith("block-handler-")) {
              const idx = parseInt(attrName.slice(14), 10);
              info.push({
                type: "handler",
                idx,
                event: attrValue
              });
            } else if (attrName.startsWith("block-attribute-")) {
              const idx = parseInt(attrName.slice(16), 10);
              info.push({
                type: "attribute",
                idx,
                name: attrValue,
                tag: tagName
              });
            } else if (attrName.startsWith("block-property-")) {
              const idx = parseInt(attrName.slice(15), 10);
              info.push({
                type: "property",
                idx,
                name: attrValue,
                tag: tagName
              });
            } else if (attrName === "block-attributes") {
              info.push({
                type: "attributes",
                idx: parseInt(attrValue, 10)
              });
            } else if (attrName === "block-ref") {
              info.push({
                type: "ref",
                idx: parseInt(attrValue, 10)
              });
            } else {
              el.setAttribute(attrs[i].name, attrValue);
            }
          }
        }
        const tree = {
          parent,
          firstChild: null,
          nextSibling: null,
          el,
          info,
          refN: 0,
          currentNS
        };
        if (node.firstChild) {
          const childNode = node.childNodes[0];
          if (node.childNodes.length === 1 && childNode.nodeType === Node.ELEMENT_NODE && childNode.tagName.startsWith("block-child-")) {
            const tagName2 = childNode.tagName;
            const index = parseInt(tagName2.slice(12), 10);
            info.push({ idx: index, type: "child", isOnlyChild: true });
          } else {
            tree.firstChild = buildTree(node.firstChild, tree, tree);
            el.appendChild(tree.firstChild.el);
            let curNode = node.firstChild;
            let curTree = tree.firstChild;
            while (curNode = curNode.nextSibling) {
              curTree.nextSibling = buildTree(curNode, curTree, tree);
              el.appendChild(curTree.nextSibling.el);
              curTree = curTree.nextSibling;
            }
          }
        }
        if (tree.info.length) {
          addRef(tree);
        }
        return tree;
      }
      case Node.TEXT_NODE:
      case Node.COMMENT_NODE: {
        const el = node.nodeType === Node.TEXT_NODE ? document.createTextNode(node.textContent) : document.createComment(node.textContent);
        return {
          parent,
          firstChild: null,
          nextSibling: null,
          el,
          info: [],
          refN: 0,
          currentNS: null
        };
      }
    }
    throw new OwlError("boom");
  }
  function addRef(tree) {
    tree.isRef = true;
    do {
      tree.refN++;
    } while (tree = tree.parent);
  }
  function parentTree(tree) {
    let parent = tree.parent;
    while (parent && parent.nextSibling === tree) {
      tree = parent;
      parent = parent.parent;
    }
    return parent;
  }
  function buildContext(tree, ctx, fromIdx) {
    if (!ctx) {
      const children = new Array(tree.info.filter((v) => v.type === "child").length);
      ctx = { collectors: [], locations: [], children, cbRefs: [], refN: tree.refN, refList: [] };
      fromIdx = 0;
    }
    if (tree.refN) {
      const initialIdx = fromIdx;
      const isRef = tree.isRef;
      const firstChild = tree.firstChild ? tree.firstChild.refN : 0;
      const nextSibling = tree.nextSibling ? tree.nextSibling.refN : 0;
      if (isRef) {
        for (let info of tree.info) {
          info.refIdx = initialIdx;
        }
        tree.refIdx = initialIdx;
        updateCtx(ctx, tree);
        fromIdx++;
      }
      if (nextSibling) {
        const idx = fromIdx + firstChild;
        ctx.collectors.push({ idx, prevIdx: initialIdx, getVal: nodeGetNextSibling });
        buildContext(tree.nextSibling, ctx, idx);
      }
      if (firstChild) {
        ctx.collectors.push({ idx: fromIdx, prevIdx: initialIdx, getVal: nodeGetFirstChild });
        buildContext(tree.firstChild, ctx, fromIdx);
      }
    }
    return ctx;
  }
  function updateCtx(ctx, tree) {
    for (let info of tree.info) {
      switch (info.type) {
        case "text":
          ctx.locations.push({
            idx: info.idx,
            refIdx: info.refIdx,
            setData: setText,
            updateData: setText
          });
          break;
        case "child":
          if (info.isOnlyChild) {
            ctx.children[info.idx] = {
              parentRefIdx: info.refIdx,
              isOnlyChild: true
            };
          } else {
            ctx.children[info.idx] = {
              parentRefIdx: parentTree(tree).refIdx,
              afterRefIdx: info.refIdx
            };
          }
          break;
        case "property": {
          const refIdx = info.refIdx;
          const setProp = makePropSetter(info.name);
          ctx.locations.push({
            idx: info.idx,
            refIdx,
            setData: setProp,
            updateData: setProp
          });
          break;
        }
        case "attribute": {
          const refIdx = info.refIdx;
          let updater;
          let setter;
          if (info.name === "class") {
            setter = setClass;
            updater = updateClass;
          } else {
            setter = createAttrUpdater(info.name);
            updater = setter;
          }
          ctx.locations.push({
            idx: info.idx,
            refIdx,
            setData: setter,
            updateData: updater
          });
          break;
        }
        case "attributes":
          ctx.locations.push({
            idx: info.idx,
            refIdx: info.refIdx,
            setData: attrsSetter,
            updateData: attrsUpdater
          });
          break;
        case "handler": {
          const { setup, update } = createEventHandler(info.event);
          ctx.locations.push({
            idx: info.idx,
            refIdx: info.refIdx,
            setData: setup,
            updateData: update
          });
          break;
        }
        case "ref":
          const index = ctx.cbRefs.push(info.idx) - 1;
          ctx.locations.push({
            idx: info.idx,
            refIdx: info.refIdx,
            setData: makeRefSetter(index, ctx.refList),
            updateData: NO_OP
          });
      }
    }
  }
  function buildBlock(template, ctx) {
    let B = createBlockClass(template, ctx);
    if (ctx.cbRefs.length) {
      const cbRefs = ctx.cbRefs;
      const refList = ctx.refList;
      let cbRefsNumber = cbRefs.length;
      B = class extends B {
        mount(parent, afterNode) {
          refList.push(new Array(cbRefsNumber));
          super.mount(parent, afterNode);
          for (let cbRef of refList.pop()) {
            cbRef();
          }
        }
        remove() {
          super.remove();
          for (let cbRef of cbRefs) {
            let fn = this.data[cbRef];
            fn(null);
          }
        }
      };
    }
    if (ctx.children.length) {
      B = class extends B {
        constructor(data, children) {
          super(data);
          this.children = children;
        }
      };
      B.prototype.beforeRemove = VMulti.prototype.beforeRemove;
      return (data, children = []) => new B(data, children);
    }
    return (data) => new B(data);
  }
  function createBlockClass(template, ctx) {
    const { refN, collectors, children } = ctx;
    const colN = collectors.length;
    ctx.locations.sort((a, b) => a.idx - b.idx);
    const locations = ctx.locations.map((loc) => ({
      refIdx: loc.refIdx,
      setData: loc.setData,
      updateData: loc.updateData
    }));
    const locN = locations.length;
    const childN = children.length;
    const childrenLocs = children;
    const isDynamic = refN > 0;
    const nodeCloneNode = nodeProto$2.cloneNode;
    const nodeInsertBefore2 = nodeProto$2.insertBefore;
    const elementRemove = elementProto.remove;
    class Block {
      constructor(data) {
        this.data = data;
      }
      beforeRemove() {
      }
      remove() {
        elementRemove.call(this.el);
      }
      firstNode() {
        return this.el;
      }
      moveBeforeDOMNode(node, parent = this.parentEl) {
        this.parentEl = parent;
        nodeInsertBefore2.call(parent, this.el, node);
      }
      moveBeforeVNode(other, afterNode) {
        nodeInsertBefore2.call(this.parentEl, this.el, other ? other.el : afterNode);
      }
      toString() {
        const div = document.createElement("div");
        this.mount(div, null);
        return div.innerHTML;
      }
      mount(parent, afterNode) {
        const el = nodeCloneNode.call(template, true);
        nodeInsertBefore2.call(parent, el, afterNode);
        this.el = el;
        this.parentEl = parent;
      }
      patch(other, withBeforeRemove) {
      }
    }
    if (isDynamic) {
      Block.prototype.mount = function mount2(parent, afterNode) {
        const el = nodeCloneNode.call(template, true);
        const refs = new Array(refN);
        this.refs = refs;
        refs[0] = el;
        for (let i = 0; i < colN; i++) {
          const w = collectors[i];
          refs[w.idx] = w.getVal.call(refs[w.prevIdx]);
        }
        if (locN) {
          const data = this.data;
          for (let i = 0; i < locN; i++) {
            const loc = locations[i];
            loc.setData.call(refs[loc.refIdx], data[i]);
          }
        }
        nodeInsertBefore2.call(parent, el, afterNode);
        if (childN) {
          const children2 = this.children;
          for (let i = 0; i < childN; i++) {
            const child = children2[i];
            if (child) {
              const loc = childrenLocs[i];
              const afterNode2 = loc.afterRefIdx ? refs[loc.afterRefIdx] : null;
              child.isOnlyChild = loc.isOnlyChild;
              child.mount(refs[loc.parentRefIdx], afterNode2);
            }
          }
        }
        this.el = el;
        this.parentEl = parent;
      };
      Block.prototype.patch = function patch(other, withBeforeRemove) {
        if (this === other) {
          return;
        }
        const refs = this.refs;
        if (locN) {
          const data1 = this.data;
          const data2 = other.data;
          for (let i = 0; i < locN; i++) {
            const val1 = data1[i];
            const val2 = data2[i];
            if (val1 !== val2) {
              const loc = locations[i];
              loc.updateData.call(refs[loc.refIdx], val2, val1);
            }
          }
          this.data = data2;
        }
        if (childN) {
          let children1 = this.children;
          const children2 = other.children;
          for (let i = 0; i < childN; i++) {
            const child1 = children1[i];
            const child2 = children2[i];
            if (child1) {
              if (child2) {
                child1.patch(child2, withBeforeRemove);
              } else {
                if (withBeforeRemove) {
                  child1.beforeRemove();
                }
                child1.remove();
                children1[i] = void 0;
              }
            } else if (child2) {
              const loc = childrenLocs[i];
              const afterNode = loc.afterRefIdx ? refs[loc.afterRefIdx] : null;
              child2.mount(refs[loc.parentRefIdx], afterNode);
              children1[i] = child2;
            }
          }
        }
      };
    }
    return Block;
  }
  function setText(value) {
    characterDataSetData.call(this, toText(value));
  }
  function makeRefSetter(index, refs) {
    return function setRef(fn) {
      refs[refs.length - 1][index] = () => fn(this);
    };
  }
  var getDescriptor = (o, p) => Object.getOwnPropertyDescriptor(o, p);
  var nodeProto$1 = Node.prototype;
  var nodeInsertBefore$1 = nodeProto$1.insertBefore;
  var nodeAppendChild = nodeProto$1.appendChild;
  var nodeRemoveChild$1 = nodeProto$1.removeChild;
  var nodeSetTextContent = getDescriptor(nodeProto$1, "textContent").set;
  var VList = class {
    constructor(children) {
      this.children = children;
    }
    mount(parent, afterNode) {
      const children = this.children;
      const _anchor = document.createTextNode("");
      this.anchor = _anchor;
      nodeInsertBefore$1.call(parent, _anchor, afterNode);
      const l = children.length;
      if (l) {
        const mount2 = children[0].mount;
        for (let i = 0; i < l; i++) {
          mount2.call(children[i], parent, _anchor);
        }
      }
      this.parentEl = parent;
    }
    moveBeforeDOMNode(node, parent = this.parentEl) {
      this.parentEl = parent;
      const children = this.children;
      for (let i = 0, l = children.length; i < l; i++) {
        children[i].moveBeforeDOMNode(node, parent);
      }
      parent.insertBefore(this.anchor, node);
    }
    moveBeforeVNode(other, afterNode) {
      if (other) {
        const next = other.children[0];
        afterNode = (next ? next.firstNode() : other.anchor) || null;
      }
      const children = this.children;
      for (let i = 0, l = children.length; i < l; i++) {
        children[i].moveBeforeVNode(null, afterNode);
      }
      this.parentEl.insertBefore(this.anchor, afterNode);
    }
    patch(other, withBeforeRemove) {
      if (this === other) {
        return;
      }
      const ch1 = this.children;
      const ch2 = other.children;
      if (ch2.length === 0 && ch1.length === 0) {
        return;
      }
      this.children = ch2;
      const proto = ch2[0] || ch1[0];
      const { mount: cMount, patch: cPatch, remove: cRemove, beforeRemove, moveBeforeVNode: cMoveBefore, firstNode: cFirstNode } = proto;
      const _anchor = this.anchor;
      const isOnlyChild = this.isOnlyChild;
      const parent = this.parentEl;
      if (ch2.length === 0 && isOnlyChild) {
        if (withBeforeRemove) {
          for (let i = 0, l = ch1.length; i < l; i++) {
            beforeRemove.call(ch1[i]);
          }
        }
        nodeSetTextContent.call(parent, "");
        nodeAppendChild.call(parent, _anchor);
        return;
      }
      let startIdx1 = 0;
      let startIdx2 = 0;
      let startVn1 = ch1[0];
      let startVn2 = ch2[0];
      let endIdx1 = ch1.length - 1;
      let endIdx2 = ch2.length - 1;
      let endVn1 = ch1[endIdx1];
      let endVn2 = ch2[endIdx2];
      let mapping = void 0;
      while (startIdx1 <= endIdx1 && startIdx2 <= endIdx2) {
        if (startVn1 === null) {
          startVn1 = ch1[++startIdx1];
          continue;
        }
        if (endVn1 === null) {
          endVn1 = ch1[--endIdx1];
          continue;
        }
        let startKey1 = startVn1.key;
        let startKey2 = startVn2.key;
        if (startKey1 === startKey2) {
          cPatch.call(startVn1, startVn2, withBeforeRemove);
          ch2[startIdx2] = startVn1;
          startVn1 = ch1[++startIdx1];
          startVn2 = ch2[++startIdx2];
          continue;
        }
        let endKey1 = endVn1.key;
        let endKey2 = endVn2.key;
        if (endKey1 === endKey2) {
          cPatch.call(endVn1, endVn2, withBeforeRemove);
          ch2[endIdx2] = endVn1;
          endVn1 = ch1[--endIdx1];
          endVn2 = ch2[--endIdx2];
          continue;
        }
        if (startKey1 === endKey2) {
          cPatch.call(startVn1, endVn2, withBeforeRemove);
          ch2[endIdx2] = startVn1;
          const nextChild = ch2[endIdx2 + 1];
          cMoveBefore.call(startVn1, nextChild, _anchor);
          startVn1 = ch1[++startIdx1];
          endVn2 = ch2[--endIdx2];
          continue;
        }
        if (endKey1 === startKey2) {
          cPatch.call(endVn1, startVn2, withBeforeRemove);
          ch2[startIdx2] = endVn1;
          const nextChild = ch1[startIdx1];
          cMoveBefore.call(endVn1, nextChild, _anchor);
          endVn1 = ch1[--endIdx1];
          startVn2 = ch2[++startIdx2];
          continue;
        }
        mapping = mapping || createMapping(ch1, startIdx1, endIdx1);
        let idxInOld = mapping[startKey2];
        if (idxInOld === void 0) {
          cMount.call(startVn2, parent, cFirstNode.call(startVn1) || null);
        } else {
          const elmToMove = ch1[idxInOld];
          cMoveBefore.call(elmToMove, startVn1, null);
          cPatch.call(elmToMove, startVn2, withBeforeRemove);
          ch2[startIdx2] = elmToMove;
          ch1[idxInOld] = null;
        }
        startVn2 = ch2[++startIdx2];
      }
      if (startIdx1 <= endIdx1 || startIdx2 <= endIdx2) {
        if (startIdx1 > endIdx1) {
          const nextChild = ch2[endIdx2 + 1];
          const anchor = nextChild ? cFirstNode.call(nextChild) || null : _anchor;
          for (let i = startIdx2; i <= endIdx2; i++) {
            cMount.call(ch2[i], parent, anchor);
          }
        } else {
          for (let i = startIdx1; i <= endIdx1; i++) {
            let ch = ch1[i];
            if (ch) {
              if (withBeforeRemove) {
                beforeRemove.call(ch);
              }
              cRemove.call(ch);
            }
          }
        }
      }
    }
    beforeRemove() {
      const children = this.children;
      const l = children.length;
      if (l) {
        const beforeRemove = children[0].beforeRemove;
        for (let i = 0; i < l; i++) {
          beforeRemove.call(children[i]);
        }
      }
    }
    remove() {
      const { parentEl, anchor } = this;
      if (this.isOnlyChild) {
        nodeSetTextContent.call(parentEl, "");
      } else {
        const children = this.children;
        const l = children.length;
        if (l) {
          const remove = children[0].remove;
          for (let i = 0; i < l; i++) {
            remove.call(children[i]);
          }
        }
        nodeRemoveChild$1.call(parentEl, anchor);
      }
    }
    firstNode() {
      const child = this.children[0];
      return child ? child.firstNode() : void 0;
    }
    toString() {
      return this.children.map((c) => c.toString()).join("");
    }
  };
  function list(children) {
    return new VList(children);
  }
  function createMapping(ch1, startIdx1, endIdx2) {
    let mapping = {};
    for (let i = startIdx1; i <= endIdx2; i++) {
      mapping[ch1[i].key] = i;
    }
    return mapping;
  }
  var nodeProto = Node.prototype;
  var nodeInsertBefore = nodeProto.insertBefore;
  var nodeRemoveChild = nodeProto.removeChild;
  var VHtml = class {
    constructor(html2) {
      this.content = [];
      this.html = html2;
    }
    mount(parent, afterNode) {
      this.parentEl = parent;
      const template = document.createElement("template");
      template.innerHTML = this.html;
      this.content = [...template.content.childNodes];
      for (let elem of this.content) {
        nodeInsertBefore.call(parent, elem, afterNode);
      }
      if (!this.content.length) {
        const textNode = document.createTextNode("");
        this.content.push(textNode);
        nodeInsertBefore.call(parent, textNode, afterNode);
      }
    }
    moveBeforeDOMNode(node, parent = this.parentEl) {
      this.parentEl = parent;
      for (let elem of this.content) {
        nodeInsertBefore.call(parent, elem, node);
      }
    }
    moveBeforeVNode(other, afterNode) {
      const target = other ? other.content[0] : afterNode;
      this.moveBeforeDOMNode(target);
    }
    patch(other) {
      if (this === other) {
        return;
      }
      const html2 = other.html;
      if (this.html !== html2) {
        const parent = this.parentEl;
        const afterNode = this.content[0];
        const template = document.createElement("template");
        template.innerHTML = html2;
        const content = [...template.content.childNodes];
        for (let elem of content) {
          nodeInsertBefore.call(parent, elem, afterNode);
        }
        if (!content.length) {
          const textNode = document.createTextNode("");
          content.push(textNode);
          nodeInsertBefore.call(parent, textNode, afterNode);
        }
        this.remove();
        this.content = content;
        this.html = other.html;
      }
    }
    beforeRemove() {
    }
    remove() {
      const parent = this.parentEl;
      for (let elem of this.content) {
        nodeRemoveChild.call(parent, elem);
      }
    }
    firstNode() {
      return this.content[0];
    }
    toString() {
      return this.html;
    }
  };
  function html(str) {
    return new VHtml(str);
  }
  function createCatcher(eventsSpec) {
    const n = Object.keys(eventsSpec).length;
    class VCatcher {
      constructor(child, handlers) {
        this.handlerFns = [];
        this.afterNode = null;
        this.child = child;
        this.handlerData = handlers;
      }
      mount(parent, afterNode) {
        this.parentEl = parent;
        this.child.mount(parent, afterNode);
        this.afterNode = document.createTextNode("");
        parent.insertBefore(this.afterNode, afterNode);
        this.wrapHandlerData();
        for (let name in eventsSpec) {
          const index = eventsSpec[name];
          const handler = createEventHandler(name);
          this.handlerFns[index] = handler;
          handler.setup.call(parent, this.handlerData[index]);
        }
      }
      wrapHandlerData() {
        for (let i = 0; i < n; i++) {
          let handler = this.handlerData[i];
          let idx = handler.length - 2;
          let origFn = handler[idx];
          const self = this;
          handler[idx] = function(ev) {
            const target = ev.target;
            let currentNode2 = self.child.firstNode();
            const afterNode = self.afterNode;
            while (currentNode2 && currentNode2 !== afterNode) {
              if (currentNode2.contains(target)) {
                return origFn.call(this, ev);
              }
              currentNode2 = currentNode2.nextSibling;
            }
          };
        }
      }
      moveBeforeDOMNode(node, parent = this.parentEl) {
        this.parentEl = parent;
        this.child.moveBeforeDOMNode(node, parent);
        parent.insertBefore(this.afterNode, node);
      }
      moveBeforeVNode(other, afterNode) {
        if (other) {
          afterNode = other.firstNode() || afterNode;
        }
        this.child.moveBeforeVNode(other ? other.child : null, afterNode);
        this.parentEl.insertBefore(this.afterNode, afterNode);
      }
      patch(other, withBeforeRemove) {
        if (this === other) {
          return;
        }
        this.handlerData = other.handlerData;
        this.wrapHandlerData();
        for (let i = 0; i < n; i++) {
          this.handlerFns[i].update.call(this.parentEl, this.handlerData[i]);
        }
        this.child.patch(other.child, withBeforeRemove);
      }
      beforeRemove() {
        this.child.beforeRemove();
      }
      remove() {
        for (let i = 0; i < n; i++) {
          this.handlerFns[i].remove.call(this.parentEl);
        }
        this.child.remove();
        this.afterNode.remove();
      }
      firstNode() {
        return this.child.firstNode();
      }
      toString() {
        return this.child.toString();
      }
    }
    return function(child, handlers) {
      return new VCatcher(child, handlers);
    };
  }
  function mount$1(vnode, fixture, afterNode = null) {
    vnode.mount(fixture, afterNode);
  }
  var fibersInError = /* @__PURE__ */ new WeakMap();
  var nodeErrorHandlers = /* @__PURE__ */ new WeakMap();
  function _handleError(node, error) {
    if (!node) {
      return false;
    }
    const fiber = node.fiber;
    if (fiber) {
      fibersInError.set(fiber, error);
    }
    const errorHandlers = nodeErrorHandlers.get(node);
    if (errorHandlers) {
      let handled = false;
      for (let i = errorHandlers.length - 1; i >= 0; i--) {
        try {
          errorHandlers[i](error);
          handled = true;
          break;
        } catch (e) {
          error = e;
        }
      }
      if (handled) {
        return true;
      }
    }
    return _handleError(node.parent, error);
  }
  function handleError(params) {
    let { error } = params;
    if (!(error instanceof OwlError)) {
      error = Object.assign(new OwlError(`An error occured in the owl lifecycle (see this Error's "cause" property)`), { cause: error });
    }
    const node = "node" in params ? params.node : params.fiber.node;
    const fiber = "fiber" in params ? params.fiber : node.fiber;
    if (fiber) {
      let current = fiber;
      do {
        current.node.fiber = current;
        current = current.parent;
      } while (current);
      fibersInError.set(fiber.root, error);
    }
    const handled = _handleError(node, error);
    if (!handled) {
      console.warn(`[Owl] Unhandled error. Destroying the root component`);
      try {
        node.app.destroy();
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  }
  function makeChildFiber(node, parent) {
    let current = node.fiber;
    if (current) {
      cancelFibers(current.children);
      current.root = null;
    }
    return new Fiber(node, parent);
  }
  function makeRootFiber(node) {
    let current = node.fiber;
    if (current) {
      let root = current.root;
      root.locked = true;
      root.setCounter(root.counter + 1 - cancelFibers(current.children));
      root.locked = false;
      current.children = [];
      current.childrenMap = {};
      current.bdom = null;
      if (fibersInError.has(current)) {
        fibersInError.delete(current);
        fibersInError.delete(root);
        current.appliedToDom = false;
      }
      return current;
    }
    const fiber = new RootFiber(node, null);
    if (node.willPatch.length) {
      fiber.willPatch.push(fiber);
    }
    if (node.patched.length) {
      fiber.patched.push(fiber);
    }
    return fiber;
  }
  function throwOnRender() {
    throw new OwlError("Attempted to render cancelled fiber");
  }
  function cancelFibers(fibers) {
    let result = 0;
    for (let fiber of fibers) {
      let node = fiber.node;
      fiber.render = throwOnRender;
      if (node.status === 0) {
        node.cancel();
      }
      node.fiber = null;
      if (fiber.bdom) {
        node.forceNextRender = true;
      } else {
        result++;
      }
      result += cancelFibers(fiber.children);
    }
    return result;
  }
  var Fiber = class {
    constructor(node, parent) {
      this.bdom = null;
      this.children = [];
      this.appliedToDom = false;
      this.deep = false;
      this.childrenMap = {};
      this.node = node;
      this.parent = parent;
      if (parent) {
        this.deep = parent.deep;
        const root = parent.root;
        root.setCounter(root.counter + 1);
        this.root = root;
        parent.children.push(this);
      } else {
        this.root = this;
      }
    }
    render() {
      let prev = this.root.node;
      let scheduler = prev.app.scheduler;
      let current = prev.parent;
      while (current) {
        if (current.fiber) {
          let root = current.fiber.root;
          if (root.counter === 0 && prev.parentKey in current.fiber.childrenMap) {
            current = root.node;
          } else {
            scheduler.delayedRenders.push(this);
            return;
          }
        }
        prev = current;
        current = current.parent;
      }
      this._render();
    }
    _render() {
      const node = this.node;
      const root = this.root;
      if (root) {
        try {
          this.bdom = true;
          this.bdom = node.renderFn();
        } catch (e) {
          node.app.handleError({ node, error: e });
        }
        root.setCounter(root.counter - 1);
      }
    }
  };
  var RootFiber = class extends Fiber {
    constructor() {
      super(...arguments);
      this.counter = 1;
      this.willPatch = [];
      this.patched = [];
      this.mounted = [];
      this.locked = false;
    }
    complete() {
      const node = this.node;
      this.locked = true;
      let current = void 0;
      try {
        for (current of this.willPatch) {
          let node2 = current.node;
          if (node2.fiber === current) {
            const component = node2.component;
            for (let cb of node2.willPatch) {
              cb.call(component);
            }
          }
        }
        current = void 0;
        node._patch();
        this.locked = false;
        let mountedFibers = this.mounted;
        while (current = mountedFibers.pop()) {
          current = current;
          if (current.appliedToDom) {
            for (let cb of current.node.mounted) {
              cb();
            }
          }
        }
        let patchedFibers = this.patched;
        while (current = patchedFibers.pop()) {
          current = current;
          if (current.appliedToDom) {
            for (let cb of current.node.patched) {
              cb();
            }
          }
        }
      } catch (e) {
        this.locked = false;
        node.app.handleError({ fiber: current || this, error: e });
      }
    }
    setCounter(newValue) {
      this.counter = newValue;
      if (newValue === 0) {
        this.node.app.scheduler.flush();
      }
    }
  };
  var MountFiber = class extends RootFiber {
    constructor(node, target, options = {}) {
      super(node, null);
      this.target = target;
      this.position = options.position || "last-child";
    }
    complete() {
      let current = this;
      try {
        const node = this.node;
        node.children = this.childrenMap;
        node.app.constructor.validateTarget(this.target);
        if (node.bdom) {
          node.updateDom();
        } else {
          node.bdom = this.bdom;
          if (this.position === "last-child" || this.target.childNodes.length === 0) {
            mount$1(node.bdom, this.target);
          } else {
            const firstChild = this.target.childNodes[0];
            mount$1(node.bdom, this.target, firstChild);
          }
        }
        node.fiber = null;
        node.status = 1;
        this.appliedToDom = true;
        let mountedFibers = this.mounted;
        while (current = mountedFibers.pop()) {
          if (current.appliedToDom) {
            for (let cb of current.node.mounted) {
              cb();
            }
          }
        }
      } catch (e) {
        this.node.app.handleError({ fiber: current, error: e });
      }
    }
  };
  var KEYCHANGES = Symbol("Key changes");
  var NO_CALLBACK = () => {
    throw new Error("Called NO_CALLBACK. Owl is broken, please report this to the maintainers.");
  };
  var objectToString = Object.prototype.toString;
  var objectHasOwnProperty = Object.prototype.hasOwnProperty;
  var SUPPORTED_RAW_TYPES = ["Object", "Array", "Set", "Map", "WeakMap"];
  var COLLECTION_RAW_TYPES = ["Set", "Map", "WeakMap"];
  function rawType(obj) {
    return objectToString.call(toRaw(obj)).slice(8, -1);
  }
  function canBeMadeReactive(value) {
    if (typeof value !== "object") {
      return false;
    }
    return SUPPORTED_RAW_TYPES.includes(rawType(value));
  }
  function possiblyReactive(val, cb) {
    return canBeMadeReactive(val) ? reactive(val, cb) : val;
  }
  var skipped = /* @__PURE__ */ new WeakSet();
  function markRaw(value) {
    skipped.add(value);
    return value;
  }
  function toRaw(value) {
    return targets.has(value) ? targets.get(value) : value;
  }
  var targetToKeysToCallbacks = /* @__PURE__ */ new WeakMap();
  function observeTargetKey(target, key, callback) {
    if (callback === NO_CALLBACK) {
      return;
    }
    if (!targetToKeysToCallbacks.get(target)) {
      targetToKeysToCallbacks.set(target, /* @__PURE__ */ new Map());
    }
    const keyToCallbacks = targetToKeysToCallbacks.get(target);
    if (!keyToCallbacks.get(key)) {
      keyToCallbacks.set(key, /* @__PURE__ */ new Set());
    }
    keyToCallbacks.get(key).add(callback);
    if (!callbacksToTargets.has(callback)) {
      callbacksToTargets.set(callback, /* @__PURE__ */ new Set());
    }
    callbacksToTargets.get(callback).add(target);
  }
  function notifyReactives(target, key) {
    const keyToCallbacks = targetToKeysToCallbacks.get(target);
    if (!keyToCallbacks) {
      return;
    }
    const callbacks = keyToCallbacks.get(key);
    if (!callbacks) {
      return;
    }
    for (const callback of [...callbacks]) {
      clearReactivesForCallback(callback);
      callback();
    }
  }
  var callbacksToTargets = /* @__PURE__ */ new WeakMap();
  function clearReactivesForCallback(callback) {
    const targetsToClear = callbacksToTargets.get(callback);
    if (!targetsToClear) {
      return;
    }
    for (const target of targetsToClear) {
      const observedKeys = targetToKeysToCallbacks.get(target);
      if (!observedKeys) {
        continue;
      }
      for (const [key, callbacks] of observedKeys.entries()) {
        callbacks.delete(callback);
        if (!callbacks.size) {
          observedKeys.delete(key);
        }
      }
    }
    targetsToClear.clear();
  }
  function getSubscriptions(callback) {
    const targets2 = callbacksToTargets.get(callback) || [];
    return [...targets2].map((target) => {
      const keysToCallbacks = targetToKeysToCallbacks.get(target);
      let keys = [];
      if (keysToCallbacks) {
        for (const [key, cbs] of keysToCallbacks) {
          if (cbs.has(callback)) {
            keys.push(key);
          }
        }
      }
      return { target, keys };
    });
  }
  var targets = /* @__PURE__ */ new WeakMap();
  var reactiveCache = /* @__PURE__ */ new WeakMap();
  function reactive(target, callback = NO_CALLBACK) {
    if (!canBeMadeReactive(target)) {
      throw new OwlError(`Cannot make the given value reactive`);
    }
    if (skipped.has(target)) {
      return target;
    }
    if (targets.has(target)) {
      return reactive(targets.get(target), callback);
    }
    if (!reactiveCache.has(target)) {
      reactiveCache.set(target, /* @__PURE__ */ new WeakMap());
    }
    const reactivesForTarget = reactiveCache.get(target);
    if (!reactivesForTarget.has(callback)) {
      const targetRawType = rawType(target);
      const handler = COLLECTION_RAW_TYPES.includes(targetRawType) ? collectionsProxyHandler(target, callback, targetRawType) : basicProxyHandler(callback);
      const proxy = new Proxy(target, handler);
      reactivesForTarget.set(callback, proxy);
      targets.set(proxy, target);
    }
    return reactivesForTarget.get(callback);
  }
  function basicProxyHandler(callback) {
    return {
      get(target, key, receiver) {
        const desc = Object.getOwnPropertyDescriptor(target, key);
        if (desc && !desc.writable && !desc.configurable) {
          return Reflect.get(target, key, receiver);
        }
        observeTargetKey(target, key, callback);
        return possiblyReactive(Reflect.get(target, key, receiver), callback);
      },
      set(target, key, value, receiver) {
        const hadKey = objectHasOwnProperty.call(target, key);
        const originalValue = Reflect.get(target, key, receiver);
        const ret = Reflect.set(target, key, toRaw(value), receiver);
        if (!hadKey && objectHasOwnProperty.call(target, key)) {
          notifyReactives(target, KEYCHANGES);
        }
        if (originalValue !== Reflect.get(target, key, receiver) || key === "length" && Array.isArray(target)) {
          notifyReactives(target, key);
        }
        return ret;
      },
      deleteProperty(target, key) {
        const ret = Reflect.deleteProperty(target, key);
        notifyReactives(target, KEYCHANGES);
        notifyReactives(target, key);
        return ret;
      },
      ownKeys(target) {
        observeTargetKey(target, KEYCHANGES, callback);
        return Reflect.ownKeys(target);
      },
      has(target, key) {
        observeTargetKey(target, KEYCHANGES, callback);
        return Reflect.has(target, key);
      }
    };
  }
  function makeKeyObserver(methodName, target, callback) {
    return (key) => {
      key = toRaw(key);
      observeTargetKey(target, key, callback);
      return possiblyReactive(target[methodName](key), callback);
    };
  }
  function makeIteratorObserver(methodName, target, callback) {
    return function* () {
      observeTargetKey(target, KEYCHANGES, callback);
      const keys = target.keys();
      for (const item of target[methodName]()) {
        const key = keys.next().value;
        observeTargetKey(target, key, callback);
        yield possiblyReactive(item, callback);
      }
    };
  }
  function makeForEachObserver(target, callback) {
    return function forEach(forEachCb, thisArg) {
      observeTargetKey(target, KEYCHANGES, callback);
      target.forEach(function(val, key, targetObj) {
        observeTargetKey(target, key, callback);
        forEachCb.call(thisArg, possiblyReactive(val, callback), possiblyReactive(key, callback), possiblyReactive(targetObj, callback));
      }, thisArg);
    };
  }
  function delegateAndNotify(setterName, getterName, target) {
    return (key, value) => {
      key = toRaw(key);
      const hadKey = target.has(key);
      const originalValue = target[getterName](key);
      const ret = target[setterName](key, value);
      const hasKey = target.has(key);
      if (hadKey !== hasKey) {
        notifyReactives(target, KEYCHANGES);
      }
      if (originalValue !== target[getterName](key)) {
        notifyReactives(target, key);
      }
      return ret;
    };
  }
  function makeClearNotifier(target) {
    return () => {
      const allKeys = [...target.keys()];
      target.clear();
      notifyReactives(target, KEYCHANGES);
      for (const key of allKeys) {
        notifyReactives(target, key);
      }
    };
  }
  var rawTypeToFuncHandlers = {
    Set: (target, callback) => ({
      has: makeKeyObserver("has", target, callback),
      add: delegateAndNotify("add", "has", target),
      delete: delegateAndNotify("delete", "has", target),
      keys: makeIteratorObserver("keys", target, callback),
      values: makeIteratorObserver("values", target, callback),
      entries: makeIteratorObserver("entries", target, callback),
      [Symbol.iterator]: makeIteratorObserver(Symbol.iterator, target, callback),
      forEach: makeForEachObserver(target, callback),
      clear: makeClearNotifier(target),
      get size() {
        observeTargetKey(target, KEYCHANGES, callback);
        return target.size;
      }
    }),
    Map: (target, callback) => ({
      has: makeKeyObserver("has", target, callback),
      get: makeKeyObserver("get", target, callback),
      set: delegateAndNotify("set", "get", target),
      delete: delegateAndNotify("delete", "has", target),
      keys: makeIteratorObserver("keys", target, callback),
      values: makeIteratorObserver("values", target, callback),
      entries: makeIteratorObserver("entries", target, callback),
      [Symbol.iterator]: makeIteratorObserver(Symbol.iterator, target, callback),
      forEach: makeForEachObserver(target, callback),
      clear: makeClearNotifier(target),
      get size() {
        observeTargetKey(target, KEYCHANGES, callback);
        return target.size;
      }
    }),
    WeakMap: (target, callback) => ({
      has: makeKeyObserver("has", target, callback),
      get: makeKeyObserver("get", target, callback),
      set: delegateAndNotify("set", "get", target),
      delete: delegateAndNotify("delete", "has", target)
    })
  };
  function collectionsProxyHandler(target, callback, targetRawType) {
    const specialHandlers = rawTypeToFuncHandlers[targetRawType](target, callback);
    return Object.assign(basicProxyHandler(callback), {
      // FIXME: probably broken when part of prototype chain since we ignore the receiver
      get(target2, key) {
        if (objectHasOwnProperty.call(specialHandlers, key)) {
          return specialHandlers[key];
        }
        observeTargetKey(target2, key, callback);
        return possiblyReactive(target2[key], callback);
      }
    });
  }
  var currentNode = null;
  function getCurrent() {
    if (!currentNode) {
      throw new OwlError("No active component (a hook function should only be called in 'setup')");
    }
    return currentNode;
  }
  function applyDefaultProps(props, defaultProps) {
    for (let propName in defaultProps) {
      if (props[propName] === void 0) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  var batchedRenderFunctions = /* @__PURE__ */ new WeakMap();
  function useState(state) {
    const node = getCurrent();
    let render = batchedRenderFunctions.get(node);
    if (!render) {
      render = batched(node.render.bind(node, false));
      batchedRenderFunctions.set(node, render);
      node.willDestroy.push(clearReactivesForCallback.bind(null, render));
    }
    return reactive(state, render);
  }
  var ComponentNode = class {
    constructor(C, props, app, parent, parentKey) {
      this.fiber = null;
      this.bdom = null;
      this.status = 0;
      this.forceNextRender = false;
      this.nextProps = null;
      this.children = /* @__PURE__ */ Object.create(null);
      this.refs = {};
      this.willStart = [];
      this.willUpdateProps = [];
      this.willUnmount = [];
      this.mounted = [];
      this.willPatch = [];
      this.patched = [];
      this.willDestroy = [];
      currentNode = this;
      this.app = app;
      this.parent = parent;
      this.props = props;
      this.parentKey = parentKey;
      const defaultProps = C.defaultProps;
      props = Object.assign({}, props);
      if (defaultProps) {
        applyDefaultProps(props, defaultProps);
      }
      const env = parent && parent.childEnv || app.env;
      this.childEnv = env;
      for (const key in props) {
        const prop = props[key];
        if (prop && typeof prop === "object" && targets.has(prop)) {
          props[key] = useState(prop);
        }
      }
      this.component = new C(props, env, this);
      const ctx = Object.assign(Object.create(this.component), { this: this.component });
      this.renderFn = app.getTemplate(C.template).bind(this.component, ctx, this);
      this.component.setup();
      currentNode = null;
    }
    mountComponent(target, options) {
      const fiber = new MountFiber(this, target, options);
      this.app.scheduler.addFiber(fiber);
      this.initiateRender(fiber);
    }
    async initiateRender(fiber) {
      this.fiber = fiber;
      if (this.mounted.length) {
        fiber.root.mounted.push(fiber);
      }
      const component = this.component;
      try {
        await Promise.all(this.willStart.map((f) => f.call(component)));
      } catch (e) {
        this.app.handleError({ node: this, error: e });
        return;
      }
      if (this.status === 0 && this.fiber === fiber) {
        fiber.render();
      }
    }
    async render(deep) {
      if (this.status >= 2) {
        return;
      }
      let current = this.fiber;
      if (current && (current.root.locked || current.bdom === true)) {
        await Promise.resolve();
        current = this.fiber;
      }
      if (current) {
        if (!current.bdom && !fibersInError.has(current)) {
          if (deep) {
            current.deep = deep;
          }
          return;
        }
        deep = deep || current.deep;
      } else if (!this.bdom) {
        return;
      }
      const fiber = makeRootFiber(this);
      fiber.deep = deep;
      this.fiber = fiber;
      this.app.scheduler.addFiber(fiber);
      await Promise.resolve();
      if (this.status >= 2) {
        return;
      }
      if (this.fiber === fiber && (current || !fiber.parent)) {
        fiber.render();
      }
    }
    cancel() {
      this._cancel();
      delete this.parent.children[this.parentKey];
      this.app.scheduler.scheduleDestroy(this);
    }
    _cancel() {
      this.status = 2;
      const children = this.children;
      for (let childKey in children) {
        children[childKey]._cancel();
      }
    }
    destroy() {
      let shouldRemove = this.status === 1;
      this._destroy();
      if (shouldRemove) {
        this.bdom.remove();
      }
    }
    _destroy() {
      const component = this.component;
      if (this.status === 1) {
        for (let cb of this.willUnmount) {
          cb.call(component);
        }
      }
      for (let child of Object.values(this.children)) {
        child._destroy();
      }
      if (this.willDestroy.length) {
        try {
          for (let cb of this.willDestroy) {
            cb.call(component);
          }
        } catch (e) {
          this.app.handleError({ error: e, node: this });
        }
      }
      this.status = 3;
    }
    async updateAndRender(props, parentFiber) {
      this.nextProps = props;
      props = Object.assign({}, props);
      const fiber = makeChildFiber(this, parentFiber);
      this.fiber = fiber;
      const component = this.component;
      const defaultProps = component.constructor.defaultProps;
      if (defaultProps) {
        applyDefaultProps(props, defaultProps);
      }
      currentNode = this;
      for (const key in props) {
        const prop = props[key];
        if (prop && typeof prop === "object" && targets.has(prop)) {
          props[key] = useState(prop);
        }
      }
      currentNode = null;
      const prom = Promise.all(this.willUpdateProps.map((f) => f.call(component, props)));
      await prom;
      if (fiber !== this.fiber) {
        return;
      }
      component.props = props;
      fiber.render();
      const parentRoot = parentFiber.root;
      if (this.willPatch.length) {
        parentRoot.willPatch.push(fiber);
      }
      if (this.patched.length) {
        parentRoot.patched.push(fiber);
      }
    }
    /**
     * Finds a child that has dom that is not yet updated, and update it. This
     * method is meant to be used only in the context of repatching the dom after
     * a mounted hook failed and was handled.
     */
    updateDom() {
      if (!this.fiber) {
        return;
      }
      if (this.bdom === this.fiber.bdom) {
        for (let k in this.children) {
          const child = this.children[k];
          child.updateDom();
        }
      } else {
        this.bdom.patch(this.fiber.bdom, false);
        this.fiber.appliedToDom = true;
        this.fiber = null;
      }
    }
    /**
     * Sets a ref to a given HTMLElement.
     *
     * @param name the name of the ref to set
     * @param el the HTMLElement to set the ref to. The ref is not set if the el
     *  is null, but useRef will not return elements that are not in the DOM
     */
    setRef(name, el) {
      if (el) {
        this.refs[name] = el;
      }
    }
    // ---------------------------------------------------------------------------
    // Block DOM methods
    // ---------------------------------------------------------------------------
    firstNode() {
      const bdom2 = this.bdom;
      return bdom2 ? bdom2.firstNode() : void 0;
    }
    mount(parent, anchor) {
      const bdom2 = this.fiber.bdom;
      this.bdom = bdom2;
      bdom2.mount(parent, anchor);
      this.status = 1;
      this.fiber.appliedToDom = true;
      this.children = this.fiber.childrenMap;
      this.fiber = null;
    }
    moveBeforeDOMNode(node, parent) {
      this.bdom.moveBeforeDOMNode(node, parent);
    }
    moveBeforeVNode(other, afterNode) {
      this.bdom.moveBeforeVNode(other ? other.bdom : null, afterNode);
    }
    patch() {
      if (this.fiber && this.fiber.parent) {
        this._patch();
        this.props = this.nextProps;
      }
    }
    _patch() {
      let hasChildren = false;
      for (let _k in this.children) {
        hasChildren = true;
        break;
      }
      const fiber = this.fiber;
      this.children = fiber.childrenMap;
      this.bdom.patch(fiber.bdom, hasChildren);
      fiber.appliedToDom = true;
      this.fiber = null;
    }
    beforeRemove() {
      this._destroy();
    }
    remove() {
      this.bdom.remove();
    }
    // ---------------------------------------------------------------------------
    // Some debug helpers
    // ---------------------------------------------------------------------------
    get name() {
      return this.component.constructor.name;
    }
    get subscriptions() {
      const render = batchedRenderFunctions.get(this);
      return render ? getSubscriptions(render) : [];
    }
  };
  var TIMEOUT = Symbol("timeout");
  function wrapError(fn, hookName) {
    const error = new OwlError(`The following error occurred in ${hookName}: `);
    const timeoutError = new OwlError(`${hookName}'s promise hasn't resolved after 3 seconds`);
    const node = getCurrent();
    return (...args) => {
      const onError = (cause) => {
        error.cause = cause;
        if (cause instanceof Error) {
          error.message += `"${cause.message}"`;
        } else {
          error.message = `Something that is not an Error was thrown in ${hookName} (see this Error's "cause" property)`;
        }
        throw error;
      };
      try {
        const result = fn(...args);
        if (result instanceof Promise) {
          if (hookName === "onWillStart" || hookName === "onWillUpdateProps") {
            const fiber = node.fiber;
            Promise.race([
              result.catch(() => {
              }),
              new Promise((resolve) => setTimeout(() => resolve(TIMEOUT), 3e3))
            ]).then((res) => {
              if (res === TIMEOUT && node.fiber === fiber && node.status <= 2) {
                console.warn(timeoutError);
              }
            });
          }
          return result.catch(onError);
        }
        return result;
      } catch (cause) {
        onError(cause);
      }
    };
  }
  function onMounted(fn) {
    const node = getCurrent();
    const decorate = node.app.dev ? wrapError : (fn2) => fn2;
    node.mounted.push(decorate(fn.bind(node.component), "onMounted"));
  }
  function onWillUnmount(fn) {
    const node = getCurrent();
    const decorate = node.app.dev ? wrapError : (fn2) => fn2;
    node.willUnmount.unshift(decorate(fn.bind(node.component), "onWillUnmount"));
  }
  var Component = class {
    constructor(props, env, node) {
      this.props = props;
      this.env = env;
      this.__owl__ = node;
    }
    setup() {
    }
    render(deep = false) {
      this.__owl__.render(deep === true);
    }
  };
  Component.template = "";
  var VText = text("").constructor;
  var VPortal = class extends VText {
    constructor(selector, content) {
      super("");
      this.target = null;
      this.selector = selector;
      this.content = content;
    }
    mount(parent, anchor) {
      super.mount(parent, anchor);
      this.target = document.querySelector(this.selector);
      if (this.target) {
        this.content.mount(this.target, null);
      } else {
        this.content.mount(parent, anchor);
      }
    }
    beforeRemove() {
      this.content.beforeRemove();
    }
    remove() {
      if (this.content) {
        super.remove();
        this.content.remove();
        this.content = null;
      }
    }
    patch(other) {
      super.patch(other);
      if (this.content) {
        this.content.patch(other.content, true);
      } else {
        this.content = other.content;
        this.content.mount(this.target, null);
      }
    }
  };
  function portalTemplate(app, bdom2, helpers2) {
    let { callSlot: callSlot2 } = helpers2;
    return function template(ctx, node, key = "") {
      return new VPortal(ctx.props.target, callSlot2(ctx, node, key, "default", false, null));
    };
  }
  var Portal = class extends Component {
    setup() {
      const node = this.__owl__;
      onMounted(() => {
        const portal = node.bdom;
        if (!portal.target) {
          const target = document.querySelector(this.props.target);
          if (target) {
            portal.content.moveBeforeDOMNode(target.firstChild, target);
          } else {
            throw new OwlError("invalid portal target");
          }
        }
      });
      onWillUnmount(() => {
        const portal = node.bdom;
        portal.remove();
      });
    }
  };
  Portal.template = "__portal__";
  Portal.props = {
    target: {
      type: String
    },
    slots: true
  };
  var isUnionType = (t) => Array.isArray(t);
  var isBaseType = (t) => typeof t !== "object";
  var isValueType = (t) => typeof t === "object" && t && "value" in t;
  function isOptional(t) {
    return typeof t === "object" && "optional" in t ? t.optional || false : false;
  }
  function describeType(type) {
    return type === "*" || type === true ? "value" : type.name.toLowerCase();
  }
  function describe(info) {
    if (isBaseType(info)) {
      return describeType(info);
    } else if (isUnionType(info)) {
      return info.map(describe).join(" or ");
    } else if (isValueType(info)) {
      return String(info.value);
    }
    if ("element" in info) {
      return `list of ${describe({ type: info.element, optional: false })}s`;
    }
    if ("shape" in info) {
      return `object`;
    }
    return describe(info.type || "*");
  }
  function toSchema(spec) {
    return Object.fromEntries(spec.map((e) => e.endsWith("?") ? [e.slice(0, -1), { optional: true }] : [e, { type: "*", optional: false }]));
  }
  function validateSchema(obj, schema) {
    if (Array.isArray(schema)) {
      schema = toSchema(schema);
    }
    obj = toRaw(obj);
    let errors = [];
    for (let key in obj) {
      if (key in schema) {
        let result = validateType(key, obj[key], schema[key]);
        if (result) {
          errors.push(result);
        }
      } else if (!("*" in schema)) {
        errors.push(`unknown key '${key}'`);
      }
    }
    for (let key in schema) {
      const spec = schema[key];
      if (key !== "*" && !isOptional(spec) && !(key in obj)) {
        const isObj = typeof spec === "object" && !Array.isArray(spec);
        const isAny = spec === "*" || (isObj && "type" in spec ? spec.type === "*" : isObj);
        let detail = isAny ? "" : ` (should be a ${describe(spec)})`;
        errors.push(`'${key}' is missing${detail}`);
      }
    }
    return errors;
  }
  function validateBaseType(key, value, type) {
    if (typeof type === "function") {
      if (typeof value === "object") {
        if (!(value instanceof type)) {
          return `'${key}' is not a ${describeType(type)}`;
        }
      } else if (typeof value !== type.name.toLowerCase()) {
        return `'${key}' is not a ${describeType(type)}`;
      }
    }
    return null;
  }
  function validateArrayType(key, value, descr) {
    if (!Array.isArray(value)) {
      return `'${key}' is not a list of ${describe(descr)}s`;
    }
    for (let i = 0; i < value.length; i++) {
      const error = validateType(`${key}[${i}]`, value[i], descr);
      if (error) {
        return error;
      }
    }
    return null;
  }
  function validateType(key, value, descr) {
    if (value === void 0) {
      return isOptional(descr) ? null : `'${key}' is undefined (should be a ${describe(descr)})`;
    } else if (isBaseType(descr)) {
      return validateBaseType(key, value, descr);
    } else if (isValueType(descr)) {
      return value === descr.value ? null : `'${key}' is not equal to '${descr.value}'`;
    } else if (isUnionType(descr)) {
      let validDescr = descr.find((p) => !validateType(key, value, p));
      return validDescr ? null : `'${key}' is not a ${describe(descr)}`;
    }
    let result = null;
    if ("element" in descr) {
      result = validateArrayType(key, value, descr.element);
    } else if ("shape" in descr) {
      if (typeof value !== "object" || Array.isArray(value)) {
        result = `'${key}' is not an object`;
      } else {
        const errors = validateSchema(value, descr.shape);
        if (errors.length) {
          result = `'${key}' doesn't have the correct shape (${errors.join(", ")})`;
        }
      }
    } else if ("values" in descr) {
      if (typeof value !== "object" || Array.isArray(value)) {
        result = `'${key}' is not an object`;
      } else {
        const errors = Object.entries(value).map(([key2, value2]) => validateType(key2, value2, descr.values)).filter(Boolean);
        if (errors.length) {
          result = `some of the values in '${key}' are invalid (${errors.join(", ")})`;
        }
      }
    }
    if ("type" in descr && !result) {
      result = validateType(key, value, descr.type);
    }
    if ("validate" in descr && !result) {
      result = !descr.validate(value) ? `'${key}' is not valid` : null;
    }
    return result;
  }
  var ObjectCreate = Object.create;
  function withDefault(value, defaultValue) {
    return value === void 0 || value === null || value === false ? defaultValue : value;
  }
  function callSlot(ctx, parent, key, name, dynamic, extra, defaultContent) {
    key = key + "__slot_" + name;
    const slots = ctx.props.slots || {};
    const { __render, __ctx, __scope } = slots[name] || {};
    const slotScope = ObjectCreate(__ctx || {});
    if (__scope) {
      slotScope[__scope] = extra;
    }
    const slotBDom = __render ? __render(slotScope, parent, key) : null;
    if (defaultContent) {
      let child1 = void 0;
      let child2 = void 0;
      if (slotBDom) {
        child1 = dynamic ? toggler(name, slotBDom) : slotBDom;
      } else {
        child2 = defaultContent(ctx, parent, key);
      }
      return multi([child1, child2]);
    }
    return slotBDom || text("");
  }
  function capture(ctx) {
    const result = ObjectCreate(ctx);
    for (let k in ctx) {
      result[k] = ctx[k];
    }
    return result;
  }
  function withKey(elem, k) {
    elem.key = k;
    return elem;
  }
  function prepareList(collection) {
    let keys;
    let values;
    if (Array.isArray(collection)) {
      keys = collection;
      values = collection;
    } else if (collection instanceof Map) {
      keys = [...collection.keys()];
      values = [...collection.values()];
    } else if (Symbol.iterator in Object(collection)) {
      keys = [...collection];
      values = keys;
    } else if (collection && typeof collection === "object") {
      values = Object.values(collection);
      keys = Object.keys(collection);
    } else {
      throw new OwlError(`Invalid loop expression: "${collection}" is not iterable`);
    }
    const n = values.length;
    return [keys, values, n, new Array(n)];
  }
  var isBoundary = Symbol("isBoundary");
  function setContextValue(ctx, key, value) {
    const ctx0 = ctx;
    while (!ctx.hasOwnProperty(key) && !ctx.hasOwnProperty(isBoundary)) {
      const newCtx = ctx.__proto__;
      if (!newCtx) {
        ctx = ctx0;
        break;
      }
      ctx = newCtx;
    }
    ctx[key] = value;
  }
  function toNumber(val) {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  }
  function shallowEqual(l1, l2) {
    for (let i = 0, l = l1.length; i < l; i++) {
      if (l1[i] !== l2[i]) {
        return false;
      }
    }
    return true;
  }
  var LazyValue = class {
    constructor(fn, ctx, component, node, key) {
      this.fn = fn;
      this.ctx = capture(ctx);
      this.component = component;
      this.node = node;
      this.key = key;
    }
    evaluate() {
      return this.fn.call(this.component, this.ctx, this.node, this.key);
    }
    toString() {
      return this.evaluate().toString();
    }
  };
  function safeOutput(value, defaultValue) {
    if (value === void 0 || value === null) {
      return defaultValue ? toggler("default", defaultValue) : toggler("undefined", text(""));
    }
    let safeKey;
    let block;
    switch (typeof value) {
      case "object":
        if (value instanceof Markup) {
          safeKey = `string_safe`;
          block = html(value);
        } else if (value instanceof LazyValue) {
          safeKey = `lazy_value`;
          block = value.evaluate();
        } else if (value instanceof String) {
          safeKey = "string_unsafe";
          block = text(value);
        } else {
          safeKey = "block_safe";
          block = value;
        }
        break;
      case "string":
        safeKey = "string_unsafe";
        block = text(value);
        break;
      default:
        safeKey = "string_unsafe";
        block = text(String(value));
    }
    return toggler(safeKey, block);
  }
  function validateProps(name, props, comp) {
    const ComponentClass = typeof name !== "string" ? name : comp.constructor.components[name];
    if (!ComponentClass) {
      return;
    }
    const schema = ComponentClass.props;
    if (!schema) {
      if (comp.__owl__.app.warnIfNoStaticProps) {
        console.warn(`Component '${ComponentClass.name}' does not have a static props description`);
      }
      return;
    }
    const defaultProps = ComponentClass.defaultProps;
    if (defaultProps) {
      let isMandatory = (name2) => Array.isArray(schema) ? schema.includes(name2) : name2 in schema && !("*" in schema) && !isOptional(schema[name2]);
      for (let p in defaultProps) {
        if (isMandatory(p)) {
          throw new OwlError(`A default value cannot be defined for a mandatory prop (name: '${p}', component: ${ComponentClass.name})`);
        }
      }
    }
    const errors = validateSchema(props, schema);
    if (errors.length) {
      throw new OwlError(`Invalid props for component '${ComponentClass.name}': ` + errors.join(", "));
    }
  }
  function makeRefWrapper(node) {
    let refNames = /* @__PURE__ */ new Set();
    return (name, fn) => {
      if (refNames.has(name)) {
        throw new OwlError(`Cannot set the same ref more than once in the same component, ref "${name}" was set multiple times in ${node.name}`);
      }
      refNames.add(name);
      return fn;
    };
  }
  var helpers = {
    withDefault,
    zero: Symbol("zero"),
    isBoundary,
    callSlot,
    capture,
    withKey,
    prepareList,
    setContextValue,
    shallowEqual,
    toNumber,
    validateProps,
    LazyValue,
    safeOutput,
    createCatcher,
    markRaw,
    OwlError,
    makeRefWrapper
  };
  function parseXML(xml2) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml2, "text/xml");
    if (doc.getElementsByTagName("parsererror").length) {
      let msg = "Invalid XML in template.";
      const parsererrorText = doc.getElementsByTagName("parsererror")[0].textContent;
      if (parsererrorText) {
        msg += "\nThe parser has produced the following error message:\n" + parsererrorText;
        const re = /\d+/g;
        const firstMatch = re.exec(parsererrorText);
        if (firstMatch) {
          const lineNumber = Number(firstMatch[0]);
          const line = xml2.split("\n")[lineNumber - 1];
          const secondMatch = re.exec(parsererrorText);
          if (line && secondMatch) {
            const columnIndex = Number(secondMatch[0]) - 1;
            if (line[columnIndex]) {
              msg += `
The error might be located at xml line ${lineNumber} column ${columnIndex}
${line}
${"-".repeat(columnIndex - 1)}^`;
            }
          }
        }
      }
      throw new OwlError(msg);
    }
    return doc;
  }
  var bdom = { text, createBlock, list, multi, html, toggler, comment };
  var TemplateSet = class {
    constructor(config2 = {}) {
      this.rawTemplates = Object.create(globalTemplates);
      this.templates = {};
      this.Portal = Portal;
      this.dev = config2.dev || false;
      this.translateFn = config2.translateFn;
      this.translatableAttributes = config2.translatableAttributes;
      if (config2.templates) {
        if (config2.templates instanceof Document || typeof config2.templates === "string") {
          this.addTemplates(config2.templates);
        } else {
          for (const name in config2.templates) {
            this.addTemplate(name, config2.templates[name]);
          }
        }
      }
      this.getRawTemplate = config2.getTemplate;
    }
    static registerTemplate(name, fn) {
      globalTemplates[name] = fn;
    }
    addTemplate(name, template) {
      if (name in this.rawTemplates) {
        if (!this.dev) {
          return;
        }
        const rawTemplate = this.rawTemplates[name];
        const currentAsString = typeof rawTemplate === "string" ? rawTemplate : rawTemplate instanceof Element ? rawTemplate.outerHTML : rawTemplate.toString();
        const newAsString = typeof template === "string" ? template : template.outerHTML;
        if (currentAsString === newAsString) {
          return;
        }
        throw new OwlError(`Template ${name} already defined with different content`);
      }
      this.rawTemplates[name] = template;
    }
    addTemplates(xml2) {
      if (!xml2) {
        return;
      }
      xml2 = xml2 instanceof Document ? xml2 : parseXML(xml2);
      for (const template of xml2.querySelectorAll("[t-name]")) {
        const name = template.getAttribute("t-name");
        this.addTemplate(name, template);
      }
    }
    getTemplate(name) {
      var _a;
      if (!(name in this.templates)) {
        const rawTemplate = ((_a = this.getRawTemplate) === null || _a === void 0 ? void 0 : _a.call(this, name)) || this.rawTemplates[name];
        if (rawTemplate === void 0) {
          let extraInfo = "";
          try {
            const componentName = getCurrent().component.constructor.name;
            extraInfo = ` (for component "${componentName}")`;
          } catch {
          }
          throw new OwlError(`Missing template: "${name}"${extraInfo}`);
        }
        const isFn = typeof rawTemplate === "function" && !(rawTemplate instanceof Element);
        const templateFn = isFn ? rawTemplate : this._compileTemplate(name, rawTemplate);
        const templates = this.templates;
        this.templates[name] = function(context, parent) {
          return templates[name].call(this, context, parent);
        };
        const template = templateFn(this, bdom, helpers);
        this.templates[name] = template;
      }
      return this.templates[name];
    }
    _compileTemplate(name, template) {
      throw new OwlError(`Unable to compile a template. Please use owl full build instead`);
    }
    callTemplate(owner, subTemplate, ctx, parent, key) {
      const template = this.getTemplate(subTemplate);
      return toggler(subTemplate, template.call(owner, ctx, parent, key + subTemplate));
    }
  };
  var globalTemplates = {};
  function xml(...args) {
    const name = `__template__${xml.nextId++}`;
    const value = String.raw(...args);
    globalTemplates[name] = value;
    return name;
  }
  xml.nextId = 1;
  TemplateSet.registerTemplate("__portal__", portalTemplate);
  var RESERVED_WORDS = "true,false,NaN,null,undefined,debugger,console,window,in,instanceof,new,function,return,eval,void,Math,RegExp,Array,Object,Date".split(",");
  var WORD_REPLACEMENT = Object.assign(/* @__PURE__ */ Object.create(null), {
    and: "&&",
    or: "||",
    gt: ">",
    gte: ">=",
    lt: "<",
    lte: "<="
  });
  var STATIC_TOKEN_MAP = Object.assign(/* @__PURE__ */ Object.create(null), {
    "{": "LEFT_BRACE",
    "}": "RIGHT_BRACE",
    "[": "LEFT_BRACKET",
    "]": "RIGHT_BRACKET",
    ":": "COLON",
    ",": "COMMA",
    "(": "LEFT_PAREN",
    ")": "RIGHT_PAREN"
  });
  var OPERATORS = "...,.,===,==,+,!==,!=,!,||,&&,>=,>,<=,<,?,-,*,/,%,typeof ,=>,=,;,in ,new ,|,&,^,~".split(",");
  var tokenizeString = function(expr) {
    let s = expr[0];
    let start = s;
    if (s !== "'" && s !== '"' && s !== "`") {
      return false;
    }
    let i = 1;
    let cur;
    while (expr[i] && expr[i] !== start) {
      cur = expr[i];
      s += cur;
      if (cur === "\\") {
        i++;
        cur = expr[i];
        if (!cur) {
          throw new OwlError("Invalid expression");
        }
        s += cur;
      }
      i++;
    }
    if (expr[i] !== start) {
      throw new OwlError("Invalid expression");
    }
    s += start;
    if (start === "`") {
      return {
        type: "TEMPLATE_STRING",
        value: s,
        replace(replacer) {
          return s.replace(/\$\{(.*?)\}/g, (match, group) => {
            return "${" + replacer(group) + "}";
          });
        }
      };
    }
    return { type: "VALUE", value: s };
  };
  var tokenizeNumber = function(expr) {
    let s = expr[0];
    if (s && s.match(/[0-9]/)) {
      let i = 1;
      while (expr[i] && expr[i].match(/[0-9]|\./)) {
        s += expr[i];
        i++;
      }
      return { type: "VALUE", value: s };
    } else {
      return false;
    }
  };
  var tokenizeSymbol = function(expr) {
    let s = expr[0];
    if (s && s.match(/[a-zA-Z_\$]/)) {
      let i = 1;
      while (expr[i] && expr[i].match(/\w/)) {
        s += expr[i];
        i++;
      }
      if (s in WORD_REPLACEMENT) {
        return { type: "OPERATOR", value: WORD_REPLACEMENT[s], size: s.length };
      }
      return { type: "SYMBOL", value: s };
    } else {
      return false;
    }
  };
  var tokenizeStatic = function(expr) {
    const char = expr[0];
    if (char && char in STATIC_TOKEN_MAP) {
      return { type: STATIC_TOKEN_MAP[char], value: char };
    }
    return false;
  };
  var tokenizeOperator = function(expr) {
    for (let op of OPERATORS) {
      if (expr.startsWith(op)) {
        return { type: "OPERATOR", value: op };
      }
    }
    return false;
  };
  var TOKENIZERS = [
    tokenizeString,
    tokenizeNumber,
    tokenizeOperator,
    tokenizeSymbol,
    tokenizeStatic
  ];
  function tokenize(expr) {
    const result = [];
    let token = true;
    let error;
    let current = expr;
    try {
      while (token) {
        current = current.trim();
        if (current) {
          for (let tokenizer of TOKENIZERS) {
            token = tokenizer(current);
            if (token) {
              result.push(token);
              current = current.slice(token.size || token.value.length);
              break;
            }
          }
        } else {
          token = false;
        }
      }
    } catch (e) {
      error = e;
    }
    if (current.length || error) {
      throw new OwlError(`Tokenizer error: could not tokenize \`${expr}\``);
    }
    return result;
  }
  var isLeftSeparator = (token) => token && (token.type === "LEFT_BRACE" || token.type === "COMMA");
  var isRightSeparator = (token) => token && (token.type === "RIGHT_BRACE" || token.type === "COMMA");
  function compileExprToArray(expr) {
    const localVars = /* @__PURE__ */ new Set();
    const tokens = tokenize(expr);
    let i = 0;
    let stack = [];
    while (i < tokens.length) {
      let token = tokens[i];
      let prevToken = tokens[i - 1];
      let nextToken = tokens[i + 1];
      let groupType = stack[stack.length - 1];
      switch (token.type) {
        case "LEFT_BRACE":
        case "LEFT_BRACKET":
        case "LEFT_PAREN":
          stack.push(token.type);
          break;
        case "RIGHT_BRACE":
        case "RIGHT_BRACKET":
        case "RIGHT_PAREN":
          stack.pop();
      }
      let isVar = token.type === "SYMBOL" && !RESERVED_WORDS.includes(token.value);
      if (token.type === "SYMBOL" && !RESERVED_WORDS.includes(token.value)) {
        if (prevToken) {
          if (groupType === "LEFT_BRACE" && isLeftSeparator(prevToken) && isRightSeparator(nextToken)) {
            tokens.splice(i + 1, 0, { type: "COLON", value: ":" }, { ...token });
            nextToken = tokens[i + 1];
          }
          if (prevToken.type === "OPERATOR" && prevToken.value === ".") {
            isVar = false;
          } else if (prevToken.type === "LEFT_BRACE" || prevToken.type === "COMMA") {
            if (nextToken && nextToken.type === "COLON") {
              isVar = false;
            }
          }
        }
      }
      if (token.type === "TEMPLATE_STRING") {
        token.value = token.replace((expr2) => compileExpr(expr2));
      }
      if (nextToken && nextToken.type === "OPERATOR" && nextToken.value === "=>") {
        if (token.type === "RIGHT_PAREN") {
          let j = i - 1;
          while (j > 0 && tokens[j].type !== "LEFT_PAREN") {
            if (tokens[j].type === "SYMBOL" && tokens[j].originalValue) {
              tokens[j].value = tokens[j].originalValue;
              localVars.add(tokens[j].value);
            }
            j--;
          }
        } else {
          localVars.add(token.value);
        }
      }
      if (isVar) {
        token.varName = token.value;
        if (!localVars.has(token.value)) {
          token.originalValue = token.value;
          token.value = `ctx['${token.value}']`;
        }
      }
      i++;
    }
    for (const token of tokens) {
      if (token.type === "SYMBOL" && token.varName && localVars.has(token.value)) {
        token.originalValue = token.value;
        token.value = `_${token.value}`;
        token.isLocal = true;
      }
    }
    return tokens;
  }
  var paddedValues = /* @__PURE__ */ new Map([["in ", " in "]]);
  function compileExpr(expr) {
    return compileExprToArray(expr).map((t) => paddedValues.get(t.value) || t.value).join("");
  }
  var INTERP_REGEXP = /\{\{.*?\}\}|\#\{.*?\}/g;
  function replaceDynamicParts(s, replacer) {
    let matches = s.match(INTERP_REGEXP);
    if (matches && matches[0].length === s.length) {
      return `(${replacer(s.slice(2, matches[0][0] === "{" ? -2 : -1))})`;
    }
    let r = s.replace(INTERP_REGEXP, (s2) => "${" + replacer(s2.slice(2, s2[0] === "{" ? -2 : -1)) + "}");
    return "`" + r + "`";
  }
  function interpolate(s) {
    return replaceDynamicParts(s, compileExpr);
  }
  var whitespaceRE = /\s+/g;
  var xmlDoc = document.implementation.createDocument(null, null, null);
  var MODS = /* @__PURE__ */ new Set(["stop", "capture", "prevent", "self", "synthetic"]);
  var nextDataIds = {};
  function generateId(prefix = "") {
    nextDataIds[prefix] = (nextDataIds[prefix] || 0) + 1;
    return prefix + nextDataIds[prefix];
  }
  function isProp(tag, key) {
    switch (tag) {
      case "input":
        return key === "checked" || key === "indeterminate" || key === "value" || key === "readonly" || key === "readOnly" || key === "disabled";
      case "option":
        return key === "selected" || key === "disabled";
      case "textarea":
        return key === "value" || key === "readonly" || key === "readOnly" || key === "disabled";
      case "select":
        return key === "value" || key === "disabled";
      case "button":
      case "optgroup":
        return key === "disabled";
    }
    return false;
  }
  function toStringExpression(str) {
    return `\`${str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/, "\\${")}\``;
  }
  var BlockDescription = class _BlockDescription {
    constructor(target, type) {
      this.dynamicTagName = null;
      this.isRoot = false;
      this.hasDynamicChildren = false;
      this.children = [];
      this.data = [];
      this.childNumber = 0;
      this.parentVar = "";
      this.id = _BlockDescription.nextBlockId++;
      this.varName = "b" + this.id;
      this.blockName = "block" + this.id;
      this.target = target;
      this.type = type;
    }
    insertData(str, prefix = "d") {
      const id = generateId(prefix);
      this.target.addLine(`let ${id} = ${str};`);
      return this.data.push(id) - 1;
    }
    insert(dom) {
      if (this.currentDom) {
        this.currentDom.appendChild(dom);
      } else {
        this.dom = dom;
      }
    }
    generateExpr(expr) {
      if (this.type === "block") {
        const hasChildren = this.children.length;
        let params = this.data.length ? `[${this.data.join(", ")}]` : hasChildren ? "[]" : "";
        if (hasChildren) {
          params += ", [" + this.children.map((c) => c.varName).join(", ") + "]";
        }
        if (this.dynamicTagName) {
          return `toggler(${this.dynamicTagName}, ${this.blockName}(${this.dynamicTagName})(${params}))`;
        }
        return `${this.blockName}(${params})`;
      } else if (this.type === "list") {
        return `list(c_block${this.id})`;
      }
      return expr;
    }
    asXmlString() {
      const t = xmlDoc.createElement("t");
      t.appendChild(this.dom);
      return t.innerHTML;
    }
  };
  BlockDescription.nextBlockId = 1;
  function createContext(parentCtx, params) {
    return Object.assign({
      block: null,
      index: 0,
      forceNewBlock: true,
      translate: parentCtx.translate,
      tKeyExpr: null,
      nameSpace: parentCtx.nameSpace,
      tModelSelectedExpr: parentCtx.tModelSelectedExpr
    }, params);
  }
  var CodeTarget = class {
    constructor(name, on) {
      this.indentLevel = 0;
      this.loopLevel = 0;
      this.code = [];
      this.hasRoot = false;
      this.hasCache = false;
      this.shouldProtectScope = false;
      this.hasRefWrapper = false;
      this.name = name;
      this.on = on || null;
    }
    addLine(line, idx) {
      const prefix = new Array(this.indentLevel + 2).join("  ");
      if (idx === void 0) {
        this.code.push(prefix + line);
      } else {
        this.code.splice(idx, 0, prefix + line);
      }
    }
    generateCode() {
      let result = [];
      result.push(`function ${this.name}(ctx, node, key = "") {`);
      if (this.shouldProtectScope) {
        result.push(`  ctx = Object.create(ctx);`);
        result.push(`  ctx[isBoundary] = 1`);
      }
      if (this.hasRefWrapper) {
        result.push(`  let refWrapper = makeRefWrapper(this.__owl__);`);
      }
      if (this.hasCache) {
        result.push(`  let cache = ctx.cache || {};`);
        result.push(`  let nextCache = ctx.cache = {};`);
      }
      for (let line of this.code) {
        result.push(line);
      }
      if (!this.hasRoot) {
        result.push(`return text('');`);
      }
      result.push(`}`);
      return result.join("\n  ");
    }
    currentKey(ctx) {
      let key = this.loopLevel ? `key${this.loopLevel}` : "key";
      if (ctx.tKeyExpr) {
        key = `${ctx.tKeyExpr} + ${key}`;
      }
      return key;
    }
  };
  var TRANSLATABLE_ATTRS = ["label", "title", "placeholder", "alt"];
  var translationRE = /^(\s*)([\s\S]+?)(\s*)$/;
  var CodeGenerator = class {
    constructor(ast, options) {
      this.blocks = [];
      this.nextBlockId = 1;
      this.isDebug = false;
      this.targets = [];
      this.target = new CodeTarget("template");
      this.translatableAttributes = TRANSLATABLE_ATTRS;
      this.staticDefs = [];
      this.slotNames = /* @__PURE__ */ new Set();
      this.helpers = /* @__PURE__ */ new Set();
      this.translateFn = options.translateFn || ((s) => s);
      if (options.translatableAttributes) {
        const attrs = new Set(TRANSLATABLE_ATTRS);
        for (let attr of options.translatableAttributes) {
          if (attr.startsWith("-")) {
            attrs.delete(attr.slice(1));
          } else {
            attrs.add(attr);
          }
        }
        this.translatableAttributes = [...attrs];
      }
      this.hasSafeContext = options.hasSafeContext || false;
      this.dev = options.dev || false;
      this.ast = ast;
      this.templateName = options.name;
    }
    generateCode() {
      const ast = this.ast;
      this.isDebug = ast.type === 12;
      BlockDescription.nextBlockId = 1;
      nextDataIds = {};
      this.compileAST(ast, {
        block: null,
        index: 0,
        forceNewBlock: false,
        isLast: true,
        translate: true,
        tKeyExpr: null
      });
      let mainCode = [`  let { text, createBlock, list, multi, html, toggler, comment } = bdom;`];
      if (this.helpers.size) {
        mainCode.push(`let { ${[...this.helpers].join(", ")} } = helpers;`);
      }
      if (this.templateName) {
        mainCode.push(`// Template name: "${this.templateName}"`);
      }
      for (let { id, expr } of this.staticDefs) {
        mainCode.push(`const ${id} = ${expr};`);
      }
      if (this.blocks.length) {
        mainCode.push(``);
        for (let block of this.blocks) {
          if (block.dom) {
            let xmlString = toStringExpression(block.asXmlString());
            if (block.dynamicTagName) {
              xmlString = xmlString.replace(/^`<\w+/, `\`<\${tag || '${block.dom.nodeName}'}`);
              xmlString = xmlString.replace(/\w+>`$/, `\${tag || '${block.dom.nodeName}'}>\``);
              mainCode.push(`let ${block.blockName} = tag => createBlock(${xmlString});`);
            } else {
              mainCode.push(`let ${block.blockName} = createBlock(${xmlString});`);
            }
          }
        }
      }
      if (this.targets.length) {
        for (let fn of this.targets) {
          mainCode.push("");
          mainCode = mainCode.concat(fn.generateCode());
        }
      }
      mainCode.push("");
      mainCode = mainCode.concat("return " + this.target.generateCode());
      const code = mainCode.join("\n  ");
      if (this.isDebug) {
        const msg = `[Owl Debug]
${code}`;
        console.log(msg);
      }
      return code;
    }
    compileInNewTarget(prefix, ast, ctx, on) {
      const name = generateId(prefix);
      const initialTarget = this.target;
      const target = new CodeTarget(name, on);
      this.targets.push(target);
      this.target = target;
      this.compileAST(ast, createContext(ctx));
      this.target = initialTarget;
      return name;
    }
    addLine(line, idx) {
      this.target.addLine(line, idx);
    }
    define(varName, expr) {
      this.addLine(`const ${varName} = ${expr};`);
    }
    insertAnchor(block, index = block.children.length) {
      const tag = `block-child-${index}`;
      const anchor = xmlDoc.createElement(tag);
      block.insert(anchor);
    }
    createBlock(parentBlock, type, ctx) {
      const hasRoot = this.target.hasRoot;
      const block = new BlockDescription(this.target, type);
      if (!hasRoot) {
        this.target.hasRoot = true;
        block.isRoot = true;
      }
      if (parentBlock) {
        parentBlock.children.push(block);
        if (parentBlock.type === "list") {
          block.parentVar = `c_block${parentBlock.id}`;
        }
      }
      return block;
    }
    insertBlock(expression, block, ctx) {
      let blockExpr = block.generateExpr(expression);
      if (block.parentVar) {
        let key = this.target.currentKey(ctx);
        this.helpers.add("withKey");
        this.addLine(`${block.parentVar}[${ctx.index}] = withKey(${blockExpr}, ${key});`);
        return;
      }
      if (ctx.tKeyExpr) {
        blockExpr = `toggler(${ctx.tKeyExpr}, ${blockExpr})`;
      }
      if (block.isRoot) {
        if (this.target.on) {
          blockExpr = this.wrapWithEventCatcher(blockExpr, this.target.on);
        }
        this.addLine(`return ${blockExpr};`);
      } else {
        this.define(block.varName, blockExpr);
      }
    }
    /**
     * Captures variables that are used inside of an expression. This is useful
     * because in compiled code, almost all variables are accessed through the ctx
     * object. In the case of functions, that lookup in the context can be delayed
     * which can cause issues if the value has changed since the function was
     * defined.
     *
     * @param expr the expression to capture
     * @param forceCapture whether the expression should capture its scope even if
     *  it doesn't contain a function. Useful when the expression will be used as
     *  a function body.
     * @returns a new expression that uses the captured values
     */
    captureExpression(expr, forceCapture = false) {
      if (!forceCapture && !expr.includes("=>")) {
        return compileExpr(expr);
      }
      const tokens = compileExprToArray(expr);
      const mapping = /* @__PURE__ */ new Map();
      return tokens.map((tok) => {
        if (tok.varName && !tok.isLocal) {
          if (!mapping.has(tok.varName)) {
            const varId = generateId("v");
            mapping.set(tok.varName, varId);
            this.define(varId, tok.value);
          }
          tok.value = mapping.get(tok.varName);
        }
        return tok.value;
      }).join("");
    }
    translate(str) {
      const match = translationRE.exec(str);
      return match[1] + this.translateFn(match[2]) + match[3];
    }
    /**
     * @returns the newly created block name, if any
     */
    compileAST(ast, ctx) {
      switch (ast.type) {
        case 1:
          return this.compileComment(ast, ctx);
        case 0:
          return this.compileText(ast, ctx);
        case 2:
          return this.compileTDomNode(ast, ctx);
        case 4:
          return this.compileTEsc(ast, ctx);
        case 8:
          return this.compileTOut(ast, ctx);
        case 5:
          return this.compileTIf(ast, ctx);
        case 9:
          return this.compileTForeach(ast, ctx);
        case 10:
          return this.compileTKey(ast, ctx);
        case 3:
          return this.compileMulti(ast, ctx);
        case 7:
          return this.compileTCall(ast, ctx);
        case 15:
          return this.compileTCallBlock(ast, ctx);
        case 6:
          return this.compileTSet(ast, ctx);
        case 11:
          return this.compileComponent(ast, ctx);
        case 12:
          return this.compileDebug(ast, ctx);
        case 13:
          return this.compileLog(ast, ctx);
        case 14:
          return this.compileTSlot(ast, ctx);
        case 16:
          return this.compileTTranslation(ast, ctx);
        case 17:
          return this.compileTPortal(ast, ctx);
      }
    }
    compileDebug(ast, ctx) {
      this.addLine(`debugger;`);
      if (ast.content) {
        return this.compileAST(ast.content, ctx);
      }
      return null;
    }
    compileLog(ast, ctx) {
      this.addLine(`console.log(${compileExpr(ast.expr)});`);
      if (ast.content) {
        return this.compileAST(ast.content, ctx);
      }
      return null;
    }
    compileComment(ast, ctx) {
      let { block, forceNewBlock } = ctx;
      const isNewBlock = !block || forceNewBlock;
      if (isNewBlock) {
        block = this.createBlock(block, "comment", ctx);
        this.insertBlock(`comment(${toStringExpression(ast.value)})`, block, {
          ...ctx,
          forceNewBlock: forceNewBlock && !block
        });
      } else {
        const text2 = xmlDoc.createComment(ast.value);
        block.insert(text2);
      }
      return block.varName;
    }
    compileText(ast, ctx) {
      let { block, forceNewBlock } = ctx;
      let value = ast.value;
      if (value && ctx.translate !== false) {
        value = this.translate(value);
      }
      if (!ctx.inPreTag) {
        value = value.replace(whitespaceRE, " ");
      }
      if (!block || forceNewBlock) {
        block = this.createBlock(block, "text", ctx);
        this.insertBlock(`text(${toStringExpression(value)})`, block, {
          ...ctx,
          forceNewBlock: forceNewBlock && !block
        });
      } else {
        const createFn = ast.type === 0 ? xmlDoc.createTextNode : xmlDoc.createComment;
        block.insert(createFn.call(xmlDoc, value));
      }
      return block.varName;
    }
    generateHandlerCode(rawEvent, handler) {
      const modifiers = rawEvent.split(".").slice(1).map((m) => {
        if (!MODS.has(m)) {
          throw new OwlError(`Unknown event modifier: '${m}'`);
        }
        return `"${m}"`;
      });
      let modifiersCode = "";
      if (modifiers.length) {
        modifiersCode = `${modifiers.join(",")}, `;
      }
      return `[${modifiersCode}${this.captureExpression(handler)}, ctx]`;
    }
    compileTDomNode(ast, ctx) {
      let { block, forceNewBlock } = ctx;
      const isNewBlock = !block || forceNewBlock || ast.dynamicTag !== null || ast.ns;
      let codeIdx = this.target.code.length;
      if (isNewBlock) {
        if ((ast.dynamicTag || ctx.tKeyExpr || ast.ns) && ctx.block) {
          this.insertAnchor(ctx.block);
        }
        block = this.createBlock(block, "block", ctx);
        this.blocks.push(block);
        if (ast.dynamicTag) {
          const tagExpr = generateId("tag");
          this.define(tagExpr, compileExpr(ast.dynamicTag));
          block.dynamicTagName = tagExpr;
        }
      }
      const attrs = {};
      for (let key in ast.attrs) {
        let expr, attrName;
        if (key.startsWith("t-attf")) {
          expr = interpolate(ast.attrs[key]);
          const idx = block.insertData(expr, "attr");
          attrName = key.slice(7);
          attrs["block-attribute-" + idx] = attrName;
        } else if (key.startsWith("t-att")) {
          attrName = key === "t-att" ? null : key.slice(6);
          expr = compileExpr(ast.attrs[key]);
          if (attrName && isProp(ast.tag, attrName)) {
            if (attrName === "readonly") {
              attrName = "readOnly";
            }
            if (attrName === "value") {
              expr = `new String((${expr}) === 0 ? 0 : ((${expr}) || ""))`;
            } else {
              expr = `new Boolean(${expr})`;
            }
            const idx = block.insertData(expr, "prop");
            attrs[`block-property-${idx}`] = attrName;
          } else {
            const idx = block.insertData(expr, "attr");
            if (key === "t-att") {
              attrs[`block-attributes`] = String(idx);
            } else {
              attrs[`block-attribute-${idx}`] = attrName;
            }
          }
        } else if (this.translatableAttributes.includes(key)) {
          attrs[key] = this.translateFn(ast.attrs[key]);
        } else {
          expr = `"${ast.attrs[key]}"`;
          attrName = key;
          attrs[key] = ast.attrs[key];
        }
        if (attrName === "value" && ctx.tModelSelectedExpr) {
          let selectedId = block.insertData(`${ctx.tModelSelectedExpr} === ${expr}`, "attr");
          attrs[`block-attribute-${selectedId}`] = "selected";
        }
      }
      let tModelSelectedExpr;
      if (ast.model) {
        const { hasDynamicChildren, baseExpr, expr, eventType, shouldNumberize, shouldTrim, targetAttr, specialInitTargetAttr } = ast.model;
        const baseExpression = compileExpr(baseExpr);
        const bExprId = generateId("bExpr");
        this.define(bExprId, baseExpression);
        const expression = compileExpr(expr);
        const exprId = generateId("expr");
        this.define(exprId, expression);
        const fullExpression = `${bExprId}[${exprId}]`;
        let idx;
        if (specialInitTargetAttr) {
          let targetExpr = targetAttr in attrs && `'${attrs[targetAttr]}'`;
          if (!targetExpr && ast.attrs) {
            const dynamicTgExpr = ast.attrs[`t-att-${targetAttr}`];
            if (dynamicTgExpr) {
              targetExpr = compileExpr(dynamicTgExpr);
            }
          }
          idx = block.insertData(`${fullExpression} === ${targetExpr}`, "prop");
          attrs[`block-property-${idx}`] = specialInitTargetAttr;
        } else if (hasDynamicChildren) {
          const bValueId = generateId("bValue");
          tModelSelectedExpr = `${bValueId}`;
          this.define(tModelSelectedExpr, fullExpression);
        } else {
          idx = block.insertData(`${fullExpression}`, "prop");
          attrs[`block-property-${idx}`] = targetAttr;
        }
        this.helpers.add("toNumber");
        let valueCode = `ev.target.${targetAttr}`;
        valueCode = shouldTrim ? `${valueCode}.trim()` : valueCode;
        valueCode = shouldNumberize ? `toNumber(${valueCode})` : valueCode;
        const handler = `[(ev) => { ${fullExpression} = ${valueCode}; }]`;
        idx = block.insertData(handler, "hdlr");
        attrs[`block-handler-${idx}`] = eventType;
      }
      for (let ev in ast.on) {
        const name = this.generateHandlerCode(ev, ast.on[ev]);
        const idx = block.insertData(name, "hdlr");
        attrs[`block-handler-${idx}`] = ev;
      }
      if (ast.ref) {
        if (this.dev) {
          this.helpers.add("makeRefWrapper");
          this.target.hasRefWrapper = true;
        }
        const isDynamic = INTERP_REGEXP.test(ast.ref);
        let name = `\`${ast.ref}\``;
        if (isDynamic) {
          name = replaceDynamicParts(ast.ref, (expr) => this.captureExpression(expr, true));
        }
        let setRefStr = `(el) => this.__owl__.setRef((${name}), el)`;
        if (this.dev) {
          setRefStr = `refWrapper(${name}, ${setRefStr})`;
        }
        const idx = block.insertData(setRefStr, "ref");
        attrs["block-ref"] = String(idx);
      }
      const nameSpace = ast.ns || ctx.nameSpace;
      const dom = nameSpace ? xmlDoc.createElementNS(nameSpace, ast.tag) : xmlDoc.createElement(ast.tag);
      for (const [attr, val] of Object.entries(attrs)) {
        if (!(attr === "class" && val === "")) {
          dom.setAttribute(attr, val);
        }
      }
      block.insert(dom);
      if (ast.content.length) {
        const initialDom = block.currentDom;
        block.currentDom = dom;
        const children = ast.content;
        for (let i = 0; i < children.length; i++) {
          const child = ast.content[i];
          const subCtx = createContext(ctx, {
            block,
            index: block.childNumber,
            forceNewBlock: false,
            isLast: ctx.isLast && i === children.length - 1,
            tKeyExpr: ctx.tKeyExpr,
            nameSpace,
            tModelSelectedExpr,
            inPreTag: ctx.inPreTag || ast.tag === "pre"
          });
          this.compileAST(child, subCtx);
        }
        block.currentDom = initialDom;
      }
      if (isNewBlock) {
        this.insertBlock(`${block.blockName}(ddd)`, block, ctx);
        if (block.children.length && block.hasDynamicChildren) {
          const code = this.target.code;
          const children = block.children.slice();
          let current = children.shift();
          for (let i = codeIdx; i < code.length; i++) {
            if (code[i].trimStart().startsWith(`const ${current.varName} `)) {
              code[i] = code[i].replace(`const ${current.varName}`, current.varName);
              current = children.shift();
              if (!current)
                break;
            }
          }
          this.addLine(`let ${block.children.map((c) => c.varName).join(", ")};`, codeIdx);
        }
      }
      return block.varName;
    }
    compileTEsc(ast, ctx) {
      let { block, forceNewBlock } = ctx;
      let expr;
      if (ast.expr === "0") {
        this.helpers.add("zero");
        expr = `ctx[zero]`;
      } else {
        expr = compileExpr(ast.expr);
        if (ast.defaultValue) {
          this.helpers.add("withDefault");
          expr = `withDefault(${expr}, ${toStringExpression(ast.defaultValue)})`;
        }
      }
      if (!block || forceNewBlock) {
        block = this.createBlock(block, "text", ctx);
        this.insertBlock(`text(${expr})`, block, { ...ctx, forceNewBlock: forceNewBlock && !block });
      } else {
        const idx = block.insertData(expr, "txt");
        const text2 = xmlDoc.createElement(`block-text-${idx}`);
        block.insert(text2);
      }
      return block.varName;
    }
    compileTOut(ast, ctx) {
      let { block } = ctx;
      if (block) {
        this.insertAnchor(block);
      }
      block = this.createBlock(block, "html", ctx);
      let blockStr;
      if (ast.expr === "0") {
        this.helpers.add("zero");
        blockStr = `ctx[zero]`;
      } else if (ast.body) {
        let bodyValue = null;
        bodyValue = BlockDescription.nextBlockId;
        const subCtx = createContext(ctx);
        this.compileAST({ type: 3, content: ast.body }, subCtx);
        this.helpers.add("safeOutput");
        blockStr = `safeOutput(${compileExpr(ast.expr)}, b${bodyValue})`;
      } else {
        this.helpers.add("safeOutput");
        blockStr = `safeOutput(${compileExpr(ast.expr)})`;
      }
      this.insertBlock(blockStr, block, ctx);
      return block.varName;
    }
    compileTIfBranch(content, block, ctx) {
      this.target.indentLevel++;
      let childN = block.children.length;
      this.compileAST(content, createContext(ctx, { block, index: ctx.index }));
      if (block.children.length > childN) {
        this.insertAnchor(block, childN);
      }
      this.target.indentLevel--;
    }
    compileTIf(ast, ctx, nextNode) {
      let { block, forceNewBlock } = ctx;
      const codeIdx = this.target.code.length;
      const isNewBlock = !block || block.type !== "multi" && forceNewBlock;
      if (block) {
        block.hasDynamicChildren = true;
      }
      if (!block || block.type !== "multi" && forceNewBlock) {
        block = this.createBlock(block, "multi", ctx);
      }
      this.addLine(`if (${compileExpr(ast.condition)}) {`);
      this.compileTIfBranch(ast.content, block, ctx);
      if (ast.tElif) {
        for (let clause of ast.tElif) {
          this.addLine(`} else if (${compileExpr(clause.condition)}) {`);
          this.compileTIfBranch(clause.content, block, ctx);
        }
      }
      if (ast.tElse) {
        this.addLine(`} else {`);
        this.compileTIfBranch(ast.tElse, block, ctx);
      }
      this.addLine("}");
      if (isNewBlock) {
        if (block.children.length) {
          const code = this.target.code;
          const children = block.children.slice();
          let current = children.shift();
          for (let i = codeIdx; i < code.length; i++) {
            if (code[i].trimStart().startsWith(`const ${current.varName} `)) {
              code[i] = code[i].replace(`const ${current.varName}`, current.varName);
              current = children.shift();
              if (!current)
                break;
            }
          }
          this.addLine(`let ${block.children.map((c) => c.varName).join(", ")};`, codeIdx);
        }
        const args = block.children.map((c) => c.varName).join(", ");
        this.insertBlock(`multi([${args}])`, block, ctx);
      }
      return block.varName;
    }
    compileTForeach(ast, ctx) {
      let { block } = ctx;
      if (block) {
        this.insertAnchor(block);
      }
      block = this.createBlock(block, "list", ctx);
      this.target.loopLevel++;
      const loopVar = `i${this.target.loopLevel}`;
      this.addLine(`ctx = Object.create(ctx);`);
      const vals = `v_block${block.id}`;
      const keys = `k_block${block.id}`;
      const l = `l_block${block.id}`;
      const c = `c_block${block.id}`;
      this.helpers.add("prepareList");
      this.define(`[${keys}, ${vals}, ${l}, ${c}]`, `prepareList(${compileExpr(ast.collection)});`);
      if (this.dev) {
        this.define(`keys${block.id}`, `new Set()`);
      }
      this.addLine(`for (let ${loopVar} = 0; ${loopVar} < ${l}; ${loopVar}++) {`);
      this.target.indentLevel++;
      this.addLine(`ctx[\`${ast.elem}\`] = ${keys}[${loopVar}];`);
      if (!ast.hasNoFirst) {
        this.addLine(`ctx[\`${ast.elem}_first\`] = ${loopVar} === 0;`);
      }
      if (!ast.hasNoLast) {
        this.addLine(`ctx[\`${ast.elem}_last\`] = ${loopVar} === ${keys}.length - 1;`);
      }
      if (!ast.hasNoIndex) {
        this.addLine(`ctx[\`${ast.elem}_index\`] = ${loopVar};`);
      }
      if (!ast.hasNoValue) {
        this.addLine(`ctx[\`${ast.elem}_value\`] = ${vals}[${loopVar}];`);
      }
      this.define(`key${this.target.loopLevel}`, ast.key ? compileExpr(ast.key) : loopVar);
      if (this.dev) {
        this.helpers.add("OwlError");
        this.addLine(`if (keys${block.id}.has(String(key${this.target.loopLevel}))) { throw new OwlError(\`Got duplicate key in t-foreach: \${key${this.target.loopLevel}}\`)}`);
        this.addLine(`keys${block.id}.add(String(key${this.target.loopLevel}));`);
      }
      let id;
      if (ast.memo) {
        this.target.hasCache = true;
        id = generateId();
        this.define(`memo${id}`, compileExpr(ast.memo));
        this.define(`vnode${id}`, `cache[key${this.target.loopLevel}];`);
        this.addLine(`if (vnode${id}) {`);
        this.target.indentLevel++;
        this.addLine(`if (shallowEqual(vnode${id}.memo, memo${id})) {`);
        this.target.indentLevel++;
        this.addLine(`${c}[${loopVar}] = vnode${id};`);
        this.addLine(`nextCache[key${this.target.loopLevel}] = vnode${id};`);
        this.addLine(`continue;`);
        this.target.indentLevel--;
        this.addLine("}");
        this.target.indentLevel--;
        this.addLine("}");
      }
      const subCtx = createContext(ctx, { block, index: loopVar });
      this.compileAST(ast.body, subCtx);
      if (ast.memo) {
        this.addLine(`nextCache[key${this.target.loopLevel}] = Object.assign(${c}[${loopVar}], {memo: memo${id}});`);
      }
      this.target.indentLevel--;
      this.target.loopLevel--;
      this.addLine(`}`);
      if (!ctx.isLast) {
        this.addLine(`ctx = ctx.__proto__;`);
      }
      this.insertBlock("l", block, ctx);
      return block.varName;
    }
    compileTKey(ast, ctx) {
      const tKeyExpr = generateId("tKey_");
      this.define(tKeyExpr, compileExpr(ast.expr));
      ctx = createContext(ctx, {
        tKeyExpr,
        block: ctx.block,
        index: ctx.index
      });
      return this.compileAST(ast.content, ctx);
    }
    compileMulti(ast, ctx) {
      let { block, forceNewBlock } = ctx;
      const isNewBlock = !block || forceNewBlock;
      let codeIdx = this.target.code.length;
      if (isNewBlock) {
        const n = ast.content.filter(
          (c) => c.type !== 6
          /* TSet */
        ).length;
        let result = null;
        if (n <= 1) {
          for (let child of ast.content) {
            const blockName = this.compileAST(child, ctx);
            result = result || blockName;
          }
          return result;
        }
        block = this.createBlock(block, "multi", ctx);
      }
      let index = 0;
      for (let i = 0, l = ast.content.length; i < l; i++) {
        const child = ast.content[i];
        const isTSet = child.type === 6;
        const subCtx = createContext(ctx, {
          block,
          index,
          forceNewBlock: !isTSet,
          isLast: ctx.isLast && i === l - 1
        });
        this.compileAST(child, subCtx);
        if (!isTSet) {
          index++;
        }
      }
      if (isNewBlock) {
        if (block.hasDynamicChildren && block.children.length) {
          const code = this.target.code;
          const children = block.children.slice();
          let current = children.shift();
          for (let i = codeIdx; i < code.length; i++) {
            if (code[i].trimStart().startsWith(`const ${current.varName} `)) {
              code[i] = code[i].replace(`const ${current.varName}`, current.varName);
              current = children.shift();
              if (!current)
                break;
            }
          }
          this.addLine(`let ${block.children.map((c) => c.varName).join(", ")};`, codeIdx);
        }
        const args = block.children.map((c) => c.varName).join(", ");
        this.insertBlock(`multi([${args}])`, block, ctx);
      }
      return block.varName;
    }
    compileTCall(ast, ctx) {
      let { block, forceNewBlock } = ctx;
      let ctxVar = ctx.ctxVar || "ctx";
      if (ast.context) {
        ctxVar = generateId("ctx");
        this.addLine(`let ${ctxVar} = ${compileExpr(ast.context)};`);
      }
      const isDynamic = INTERP_REGEXP.test(ast.name);
      const subTemplate = isDynamic ? interpolate(ast.name) : "`" + ast.name + "`";
      if (block && !forceNewBlock) {
        this.insertAnchor(block);
      }
      block = this.createBlock(block, "multi", ctx);
      if (ast.body) {
        this.addLine(`${ctxVar} = Object.create(${ctxVar});`);
        this.addLine(`${ctxVar}[isBoundary] = 1;`);
        this.helpers.add("isBoundary");
        const subCtx = createContext(ctx, { ctxVar });
        const bl = this.compileMulti({ type: 3, content: ast.body }, subCtx);
        if (bl) {
          this.helpers.add("zero");
          this.addLine(`${ctxVar}[zero] = ${bl};`);
        }
      }
      const key = this.generateComponentKey();
      if (isDynamic) {
        const templateVar = generateId("template");
        if (!this.staticDefs.find((d) => d.id === "call")) {
          this.staticDefs.push({ id: "call", expr: `app.callTemplate.bind(app)` });
        }
        this.define(templateVar, subTemplate);
        this.insertBlock(`call(this, ${templateVar}, ${ctxVar}, node, ${key})`, block, {
          ...ctx,
          forceNewBlock: !block
        });
      } else {
        const id = generateId(`callTemplate_`);
        this.staticDefs.push({ id, expr: `app.getTemplate(${subTemplate})` });
        this.insertBlock(`${id}.call(this, ${ctxVar}, node, ${key})`, block, {
          ...ctx,
          forceNewBlock: !block
        });
      }
      if (ast.body && !ctx.isLast) {
        this.addLine(`${ctxVar} = ${ctxVar}.__proto__;`);
      }
      return block.varName;
    }
    compileTCallBlock(ast, ctx) {
      let { block, forceNewBlock } = ctx;
      if (block) {
        if (!forceNewBlock) {
          this.insertAnchor(block);
        }
      }
      block = this.createBlock(block, "multi", ctx);
      this.insertBlock(compileExpr(ast.name), block, { ...ctx, forceNewBlock: !block });
      return block.varName;
    }
    compileTSet(ast, ctx) {
      this.target.shouldProtectScope = true;
      this.helpers.add("isBoundary").add("withDefault");
      const expr = ast.value ? compileExpr(ast.value || "") : "null";
      if (ast.body) {
        this.helpers.add("LazyValue");
        const bodyAst = { type: 3, content: ast.body };
        const name = this.compileInNewTarget("value", bodyAst, ctx);
        let key = this.target.currentKey(ctx);
        let value = `new LazyValue(${name}, ctx, this, node, ${key})`;
        value = ast.value ? value ? `withDefault(${expr}, ${value})` : expr : value;
        this.addLine(`ctx[\`${ast.name}\`] = ${value};`);
      } else {
        let value;
        if (ast.defaultValue) {
          const defaultValue = toStringExpression(ctx.translate ? this.translate(ast.defaultValue) : ast.defaultValue);
          if (ast.value) {
            value = `withDefault(${expr}, ${defaultValue})`;
          } else {
            value = defaultValue;
          }
        } else {
          value = expr;
        }
        this.helpers.add("setContextValue");
        this.addLine(`setContextValue(${ctx.ctxVar || "ctx"}, "${ast.name}", ${value});`);
      }
      return null;
    }
    generateComponentKey(currentKey = "key") {
      const parts = [generateId("__")];
      for (let i = 0; i < this.target.loopLevel; i++) {
        parts.push(`\${key${i + 1}}`);
      }
      return `${currentKey} + \`${parts.join("__")}\``;
    }
    /**
     * Formats a prop name and value into a string suitable to be inserted in the
     * generated code. For example:
     *
     * Name              Value            Result
     * ---------------------------------------------------------
     * "number"          "state"          "number: ctx['state']"
     * "something"       ""               "something: undefined"
     * "some-prop"       "state"          "'some-prop': ctx['state']"
     * "onClick.bind"    "onClick"        "onClick: bind(ctx, ctx['onClick'])"
     */
    formatProp(name, value) {
      if (name.endsWith(".translate")) {
        value = toStringExpression(this.translateFn(value));
      } else {
        value = this.captureExpression(value);
      }
      if (name.includes(".")) {
        let [_name, suffix] = name.split(".");
        name = _name;
        switch (suffix) {
          case "bind":
            value = `(${value}).bind(this)`;
            break;
          case "alike":
          case "translate":
            break;
          default:
            throw new OwlError("Invalid prop suffix");
        }
      }
      name = /^[a-z_]+$/i.test(name) ? name : `'${name}'`;
      return `${name}: ${value || void 0}`;
    }
    formatPropObject(obj) {
      return Object.entries(obj).map(([k, v]) => this.formatProp(k, v));
    }
    getPropString(props, dynProps) {
      let propString = `{${props.join(",")}}`;
      if (dynProps) {
        propString = `Object.assign({}, ${compileExpr(dynProps)}${props.length ? ", " + propString : ""})`;
      }
      return propString;
    }
    compileComponent(ast, ctx) {
      let { block } = ctx;
      const hasSlotsProp = "slots" in (ast.props || {});
      const props = ast.props ? this.formatPropObject(ast.props) : [];
      let slotDef = "";
      if (ast.slots) {
        let ctxStr = "ctx";
        if (this.target.loopLevel || !this.hasSafeContext) {
          ctxStr = generateId("ctx");
          this.helpers.add("capture");
          this.define(ctxStr, `capture(ctx)`);
        }
        let slotStr = [];
        for (let slotName in ast.slots) {
          const slotAst = ast.slots[slotName];
          const params = [];
          if (slotAst.content) {
            const name = this.compileInNewTarget("slot", slotAst.content, ctx, slotAst.on);
            params.push(`__render: ${name}.bind(this), __ctx: ${ctxStr}`);
          }
          const scope = ast.slots[slotName].scope;
          if (scope) {
            params.push(`__scope: "${scope}"`);
          }
          if (ast.slots[slotName].attrs) {
            params.push(...this.formatPropObject(ast.slots[slotName].attrs));
          }
          const slotInfo = `{${params.join(", ")}}`;
          slotStr.push(`'${slotName}': ${slotInfo}`);
        }
        slotDef = `{${slotStr.join(", ")}}`;
      }
      if (slotDef && !(ast.dynamicProps || hasSlotsProp)) {
        this.helpers.add("markRaw");
        props.push(`slots: markRaw(${slotDef})`);
      }
      let propString = this.getPropString(props, ast.dynamicProps);
      let propVar;
      if (slotDef && (ast.dynamicProps || hasSlotsProp) || this.dev) {
        propVar = generateId("props");
        this.define(propVar, propString);
        propString = propVar;
      }
      if (slotDef && (ast.dynamicProps || hasSlotsProp)) {
        this.helpers.add("markRaw");
        this.addLine(`${propVar}.slots = markRaw(Object.assign(${slotDef}, ${propVar}.slots))`);
      }
      let expr;
      if (ast.isDynamic) {
        expr = generateId("Comp");
        this.define(expr, compileExpr(ast.name));
      } else {
        expr = `\`${ast.name}\``;
      }
      if (this.dev) {
        this.addLine(`helpers.validateProps(${expr}, ${propVar}, this);`);
      }
      if (block && (ctx.forceNewBlock === false || ctx.tKeyExpr)) {
        this.insertAnchor(block);
      }
      let keyArg = this.generateComponentKey();
      if (ctx.tKeyExpr) {
        keyArg = `${ctx.tKeyExpr} + ${keyArg}`;
      }
      let id = generateId("comp");
      const propList = [];
      for (let p in ast.props || {}) {
        let [name, suffix] = p.split(".");
        if (!suffix) {
          propList.push(`"${name}"`);
        }
      }
      this.staticDefs.push({
        id,
        expr: `app.createComponent(${ast.isDynamic ? null : expr}, ${!ast.isDynamic}, ${!!ast.slots}, ${!!ast.dynamicProps}, [${propList}])`
      });
      if (ast.isDynamic) {
        keyArg = `(${expr}).name + ${keyArg}`;
      }
      let blockExpr = `${id}(${propString}, ${keyArg}, node, this, ${ast.isDynamic ? expr : null})`;
      if (ast.isDynamic) {
        blockExpr = `toggler(${expr}, ${blockExpr})`;
      }
      if (ast.on) {
        blockExpr = this.wrapWithEventCatcher(blockExpr, ast.on);
      }
      block = this.createBlock(block, "multi", ctx);
      this.insertBlock(blockExpr, block, ctx);
      return block.varName;
    }
    wrapWithEventCatcher(expr, on) {
      this.helpers.add("createCatcher");
      let name = generateId("catcher");
      let spec = {};
      let handlers = [];
      for (let ev in on) {
        let handlerId = generateId("hdlr");
        let idx = handlers.push(handlerId) - 1;
        spec[ev] = idx;
        const handler = this.generateHandlerCode(ev, on[ev]);
        this.define(handlerId, handler);
      }
      this.staticDefs.push({ id: name, expr: `createCatcher(${JSON.stringify(spec)})` });
      return `${name}(${expr}, [${handlers.join(",")}])`;
    }
    compileTSlot(ast, ctx) {
      this.helpers.add("callSlot");
      let { block } = ctx;
      let blockString;
      let slotName;
      let dynamic = false;
      let isMultiple = false;
      if (ast.name.match(INTERP_REGEXP)) {
        dynamic = true;
        isMultiple = true;
        slotName = interpolate(ast.name);
      } else {
        slotName = "'" + ast.name + "'";
        isMultiple = isMultiple || this.slotNames.has(ast.name);
        this.slotNames.add(ast.name);
      }
      const dynProps = ast.attrs ? ast.attrs["t-props"] : null;
      if (ast.attrs) {
        delete ast.attrs["t-props"];
      }
      let key = this.target.loopLevel ? `key${this.target.loopLevel}` : "key";
      if (isMultiple) {
        key = this.generateComponentKey(key);
      }
      const props = ast.attrs ? this.formatPropObject(ast.attrs) : [];
      const scope = this.getPropString(props, dynProps);
      if (ast.defaultContent) {
        const name = this.compileInNewTarget("defaultContent", ast.defaultContent, ctx);
        blockString = `callSlot(ctx, node, ${key}, ${slotName}, ${dynamic}, ${scope}, ${name}.bind(this))`;
      } else {
        if (dynamic) {
          let name = generateId("slot");
          this.define(name, slotName);
          blockString = `toggler(${name}, callSlot(ctx, node, ${key}, ${name}, ${dynamic}, ${scope}))`;
        } else {
          blockString = `callSlot(ctx, node, ${key}, ${slotName}, ${dynamic}, ${scope})`;
        }
      }
      if (ast.on) {
        blockString = this.wrapWithEventCatcher(blockString, ast.on);
      }
      if (block) {
        this.insertAnchor(block);
      }
      block = this.createBlock(block, "multi", ctx);
      this.insertBlock(blockString, block, { ...ctx, forceNewBlock: false });
      return block.varName;
    }
    compileTTranslation(ast, ctx) {
      if (ast.content) {
        return this.compileAST(ast.content, Object.assign({}, ctx, { translate: false }));
      }
      return null;
    }
    compileTPortal(ast, ctx) {
      if (!this.staticDefs.find((d) => d.id === "Portal")) {
        this.staticDefs.push({ id: "Portal", expr: `app.Portal` });
      }
      let { block } = ctx;
      const name = this.compileInNewTarget("slot", ast.content, ctx);
      let ctxStr = "ctx";
      if (this.target.loopLevel || !this.hasSafeContext) {
        ctxStr = generateId("ctx");
        this.helpers.add("capture");
        this.define(ctxStr, `capture(ctx)`);
      }
      let id = generateId("comp");
      this.staticDefs.push({
        id,
        expr: `app.createComponent(null, false, true, false, false)`
      });
      const target = compileExpr(ast.target);
      const key = this.generateComponentKey();
      const blockString = `${id}({target: ${target},slots: {'default': {__render: ${name}.bind(this), __ctx: ${ctxStr}}}}, ${key}, node, ctx, Portal)`;
      if (block) {
        this.insertAnchor(block);
      }
      block = this.createBlock(block, "multi", ctx);
      this.insertBlock(blockString, block, { ...ctx, forceNewBlock: false });
      return block.varName;
    }
  };
  var cache = /* @__PURE__ */ new WeakMap();
  function parse(xml2) {
    if (typeof xml2 === "string") {
      const elem = parseXML(`<t>${xml2}</t>`).firstChild;
      return _parse(elem);
    }
    let ast = cache.get(xml2);
    if (!ast) {
      ast = _parse(xml2.cloneNode(true));
      cache.set(xml2, ast);
    }
    return ast;
  }
  function _parse(xml2) {
    normalizeXML(xml2);
    const ctx = { inPreTag: false };
    return parseNode(xml2, ctx) || { type: 0, value: "" };
  }
  function parseNode(node, ctx) {
    if (!(node instanceof Element)) {
      return parseTextCommentNode(node, ctx);
    }
    return parseTDebugLog(node, ctx) || parseTForEach(node, ctx) || parseTIf(node, ctx) || parseTPortal(node, ctx) || parseTCall(node, ctx) || parseTCallBlock(node) || parseTEscNode(node, ctx) || parseTOutNode(node, ctx) || parseTKey(node, ctx) || parseTTranslation(node, ctx) || parseTSlot(node, ctx) || parseComponent(node, ctx) || parseDOMNode(node, ctx) || parseTSetNode(node, ctx) || parseTNode(node, ctx);
  }
  function parseTNode(node, ctx) {
    if (node.tagName !== "t") {
      return null;
    }
    return parseChildNodes(node, ctx);
  }
  var lineBreakRE = /[\r\n]/;
  function parseTextCommentNode(node, ctx) {
    if (node.nodeType === Node.TEXT_NODE) {
      let value = node.textContent || "";
      if (!ctx.inPreTag && lineBreakRE.test(value) && !value.trim()) {
        return null;
      }
      return { type: 0, value };
    } else if (node.nodeType === Node.COMMENT_NODE) {
      return { type: 1, value: node.textContent || "" };
    }
    return null;
  }
  function parseTDebugLog(node, ctx) {
    if (node.hasAttribute("t-debug")) {
      node.removeAttribute("t-debug");
      return {
        type: 12,
        content: parseNode(node, ctx)
      };
    }
    if (node.hasAttribute("t-log")) {
      const expr = node.getAttribute("t-log");
      node.removeAttribute("t-log");
      return {
        type: 13,
        expr,
        content: parseNode(node, ctx)
      };
    }
    return null;
  }
  var hasDotAtTheEnd = /\.[\w_]+\s*$/;
  var hasBracketsAtTheEnd = /\[[^\[]+\]\s*$/;
  var ROOT_SVG_TAGS = /* @__PURE__ */ new Set(["svg", "g", "path"]);
  function parseDOMNode(node, ctx) {
    const { tagName } = node;
    const dynamicTag = node.getAttribute("t-tag");
    node.removeAttribute("t-tag");
    if (tagName === "t" && !dynamicTag) {
      return null;
    }
    if (tagName.startsWith("block-")) {
      throw new OwlError(`Invalid tag name: '${tagName}'`);
    }
    ctx = Object.assign({}, ctx);
    if (tagName === "pre") {
      ctx.inPreTag = true;
    }
    let ns = !ctx.nameSpace && ROOT_SVG_TAGS.has(tagName) ? "http://www.w3.org/2000/svg" : null;
    const ref = node.getAttribute("t-ref");
    node.removeAttribute("t-ref");
    const nodeAttrsNames = node.getAttributeNames();
    let attrs = null;
    let on = null;
    let model = null;
    for (let attr of nodeAttrsNames) {
      const value = node.getAttribute(attr);
      if (attr === "t-on" || attr === "t-on-") {
        throw new OwlError("Missing event name with t-on directive");
      }
      if (attr.startsWith("t-on-")) {
        on = on || {};
        on[attr.slice(5)] = value;
      } else if (attr.startsWith("t-model")) {
        if (!["input", "select", "textarea"].includes(tagName)) {
          throw new OwlError("The t-model directive only works with <input>, <textarea> and <select>");
        }
        let baseExpr, expr;
        if (hasDotAtTheEnd.test(value)) {
          const index = value.lastIndexOf(".");
          baseExpr = value.slice(0, index);
          expr = `'${value.slice(index + 1)}'`;
        } else if (hasBracketsAtTheEnd.test(value)) {
          const index = value.lastIndexOf("[");
          baseExpr = value.slice(0, index);
          expr = value.slice(index + 1, -1);
        } else {
          throw new OwlError(`Invalid t-model expression: "${value}" (it should be assignable)`);
        }
        const typeAttr = node.getAttribute("type");
        const isInput = tagName === "input";
        const isSelect = tagName === "select";
        const isCheckboxInput = isInput && typeAttr === "checkbox";
        const isRadioInput = isInput && typeAttr === "radio";
        const hasTrimMod = attr.includes(".trim");
        const hasLazyMod = hasTrimMod || attr.includes(".lazy");
        const hasNumberMod = attr.includes(".number");
        const eventType = isRadioInput ? "click" : isSelect || hasLazyMod ? "change" : "input";
        model = {
          baseExpr,
          expr,
          targetAttr: isCheckboxInput ? "checked" : "value",
          specialInitTargetAttr: isRadioInput ? "checked" : null,
          eventType,
          hasDynamicChildren: false,
          shouldTrim: hasTrimMod,
          shouldNumberize: hasNumberMod
        };
        if (isSelect) {
          ctx = Object.assign({}, ctx);
          ctx.tModelInfo = model;
        }
      } else if (attr.startsWith("block-")) {
        throw new OwlError(`Invalid attribute: '${attr}'`);
      } else if (attr === "xmlns") {
        ns = value;
      } else if (attr !== "t-name") {
        if (attr.startsWith("t-") && !attr.startsWith("t-att")) {
          throw new OwlError(`Unknown QWeb directive: '${attr}'`);
        }
        const tModel = ctx.tModelInfo;
        if (tModel && ["t-att-value", "t-attf-value"].includes(attr)) {
          tModel.hasDynamicChildren = true;
        }
        attrs = attrs || {};
        attrs[attr] = value;
      }
    }
    if (ns) {
      ctx.nameSpace = ns;
    }
    const children = parseChildren(node, ctx);
    return {
      type: 2,
      tag: tagName,
      dynamicTag,
      attrs,
      on,
      ref,
      content: children,
      model,
      ns
    };
  }
  function parseTEscNode(node, ctx) {
    if (!node.hasAttribute("t-esc")) {
      return null;
    }
    const escValue = node.getAttribute("t-esc");
    node.removeAttribute("t-esc");
    const tesc = {
      type: 4,
      expr: escValue,
      defaultValue: node.textContent || ""
    };
    let ref = node.getAttribute("t-ref");
    node.removeAttribute("t-ref");
    const ast = parseNode(node, ctx);
    if (!ast) {
      return tesc;
    }
    if (ast.type === 2) {
      return {
        ...ast,
        ref,
        content: [tesc]
      };
    }
    return tesc;
  }
  function parseTOutNode(node, ctx) {
    if (!node.hasAttribute("t-out") && !node.hasAttribute("t-raw")) {
      return null;
    }
    if (node.hasAttribute("t-raw")) {
      console.warn(`t-raw has been deprecated in favor of t-out. If the value to render is not wrapped by the "markup" function, it will be escaped`);
    }
    const expr = node.getAttribute("t-out") || node.getAttribute("t-raw");
    node.removeAttribute("t-out");
    node.removeAttribute("t-raw");
    const tOut = { type: 8, expr, body: null };
    const ref = node.getAttribute("t-ref");
    node.removeAttribute("t-ref");
    const ast = parseNode(node, ctx);
    if (!ast) {
      return tOut;
    }
    if (ast.type === 2) {
      tOut.body = ast.content.length ? ast.content : null;
      return {
        ...ast,
        ref,
        content: [tOut]
      };
    }
    return tOut;
  }
  function parseTForEach(node, ctx) {
    if (!node.hasAttribute("t-foreach")) {
      return null;
    }
    const html2 = node.outerHTML;
    const collection = node.getAttribute("t-foreach");
    node.removeAttribute("t-foreach");
    const elem = node.getAttribute("t-as") || "";
    node.removeAttribute("t-as");
    const key = node.getAttribute("t-key");
    if (!key) {
      throw new OwlError(`"Directive t-foreach should always be used with a t-key!" (expression: t-foreach="${collection}" t-as="${elem}")`);
    }
    node.removeAttribute("t-key");
    const memo = node.getAttribute("t-memo") || "";
    node.removeAttribute("t-memo");
    const body = parseNode(node, ctx);
    if (!body) {
      return null;
    }
    const hasNoTCall = !html2.includes("t-call");
    const hasNoFirst = hasNoTCall && !html2.includes(`${elem}_first`);
    const hasNoLast = hasNoTCall && !html2.includes(`${elem}_last`);
    const hasNoIndex = hasNoTCall && !html2.includes(`${elem}_index`);
    const hasNoValue = hasNoTCall && !html2.includes(`${elem}_value`);
    return {
      type: 9,
      collection,
      elem,
      body,
      memo,
      key,
      hasNoFirst,
      hasNoLast,
      hasNoIndex,
      hasNoValue
    };
  }
  function parseTKey(node, ctx) {
    if (!node.hasAttribute("t-key")) {
      return null;
    }
    const key = node.getAttribute("t-key");
    node.removeAttribute("t-key");
    const body = parseNode(node, ctx);
    if (!body) {
      return null;
    }
    return { type: 10, expr: key, content: body };
  }
  function parseTCall(node, ctx) {
    if (!node.hasAttribute("t-call")) {
      return null;
    }
    const subTemplate = node.getAttribute("t-call");
    const context = node.getAttribute("t-call-context");
    node.removeAttribute("t-call");
    node.removeAttribute("t-call-context");
    if (node.tagName !== "t") {
      const ast = parseNode(node, ctx);
      const tcall = { type: 7, name: subTemplate, body: null, context };
      if (ast && ast.type === 2) {
        ast.content = [tcall];
        return ast;
      }
      if (ast && ast.type === 11) {
        return {
          ...ast,
          slots: { default: { content: tcall, scope: null, on: null, attrs: null } }
        };
      }
    }
    const body = parseChildren(node, ctx);
    return {
      type: 7,
      name: subTemplate,
      body: body.length ? body : null,
      context
    };
  }
  function parseTCallBlock(node, ctx) {
    if (!node.hasAttribute("t-call-block")) {
      return null;
    }
    const name = node.getAttribute("t-call-block");
    return {
      type: 15,
      name
    };
  }
  function parseTIf(node, ctx) {
    if (!node.hasAttribute("t-if")) {
      return null;
    }
    const condition = node.getAttribute("t-if");
    node.removeAttribute("t-if");
    const content = parseNode(node, ctx) || { type: 0, value: "" };
    let nextElement = node.nextElementSibling;
    const tElifs = [];
    while (nextElement && nextElement.hasAttribute("t-elif")) {
      const condition2 = nextElement.getAttribute("t-elif");
      nextElement.removeAttribute("t-elif");
      const tElif = parseNode(nextElement, ctx);
      const next = nextElement.nextElementSibling;
      nextElement.remove();
      nextElement = next;
      if (tElif) {
        tElifs.push({ condition: condition2, content: tElif });
      }
    }
    let tElse = null;
    if (nextElement && nextElement.hasAttribute("t-else")) {
      nextElement.removeAttribute("t-else");
      tElse = parseNode(nextElement, ctx);
      nextElement.remove();
    }
    return {
      type: 5,
      condition,
      content,
      tElif: tElifs.length ? tElifs : null,
      tElse
    };
  }
  function parseTSetNode(node, ctx) {
    if (!node.hasAttribute("t-set")) {
      return null;
    }
    const name = node.getAttribute("t-set");
    const value = node.getAttribute("t-value") || null;
    const defaultValue = node.innerHTML === node.textContent ? node.textContent || null : null;
    let body = null;
    if (node.textContent !== node.innerHTML) {
      body = parseChildren(node, ctx);
    }
    return { type: 6, name, value, defaultValue, body };
  }
  var directiveErrorMap = /* @__PURE__ */ new Map([
    [
      "t-ref",
      "t-ref is no longer supported on components. Consider exposing only the public part of the component's API through a callback prop."
    ],
    ["t-att", "t-att makes no sense on component: props are already treated as expressions"],
    [
      "t-attf",
      "t-attf is not supported on components: use template strings for string interpolation in props"
    ]
  ]);
  function parseComponent(node, ctx) {
    let name = node.tagName;
    const firstLetter = name[0];
    let isDynamic = node.hasAttribute("t-component");
    if (isDynamic && name !== "t") {
      throw new OwlError(`Directive 't-component' can only be used on <t> nodes (used on a <${name}>)`);
    }
    if (!(firstLetter === firstLetter.toUpperCase() || isDynamic)) {
      return null;
    }
    if (isDynamic) {
      name = node.getAttribute("t-component");
      node.removeAttribute("t-component");
    }
    const dynamicProps = node.getAttribute("t-props");
    node.removeAttribute("t-props");
    const defaultSlotScope = node.getAttribute("t-slot-scope");
    node.removeAttribute("t-slot-scope");
    let on = null;
    let props = null;
    for (let name2 of node.getAttributeNames()) {
      const value = node.getAttribute(name2);
      if (name2.startsWith("t-")) {
        if (name2.startsWith("t-on-")) {
          on = on || {};
          on[name2.slice(5)] = value;
        } else {
          const message = directiveErrorMap.get(name2.split("-").slice(0, 2).join("-"));
          throw new OwlError(message || `unsupported directive on Component: ${name2}`);
        }
      } else {
        props = props || {};
        props[name2] = value;
      }
    }
    let slots = null;
    if (node.hasChildNodes()) {
      const clone = node.cloneNode(true);
      const slotNodes = Array.from(clone.querySelectorAll("[t-set-slot]"));
      for (let slotNode of slotNodes) {
        if (slotNode.tagName !== "t") {
          throw new OwlError(`Directive 't-set-slot' can only be used on <t> nodes (used on a <${slotNode.tagName}>)`);
        }
        const name2 = slotNode.getAttribute("t-set-slot");
        let el = slotNode.parentElement;
        let isInSubComponent = false;
        while (el && el !== clone) {
          if (el.hasAttribute("t-component") || el.tagName[0] === el.tagName[0].toUpperCase()) {
            isInSubComponent = true;
            break;
          }
          el = el.parentElement;
        }
        if (isInSubComponent || !el) {
          continue;
        }
        slotNode.removeAttribute("t-set-slot");
        slotNode.remove();
        const slotAst = parseNode(slotNode, ctx);
        let on2 = null;
        let attrs = null;
        let scope = null;
        for (let attributeName of slotNode.getAttributeNames()) {
          const value = slotNode.getAttribute(attributeName);
          if (attributeName === "t-slot-scope") {
            scope = value;
            continue;
          } else if (attributeName.startsWith("t-on-")) {
            on2 = on2 || {};
            on2[attributeName.slice(5)] = value;
          } else {
            attrs = attrs || {};
            attrs[attributeName] = value;
          }
        }
        slots = slots || {};
        slots[name2] = { content: slotAst, on: on2, attrs, scope };
      }
      const defaultContent = parseChildNodes(clone, ctx);
      slots = slots || {};
      if (defaultContent && !slots.default) {
        slots.default = { content: defaultContent, on, attrs: null, scope: defaultSlotScope };
      }
    }
    return { type: 11, name, isDynamic, dynamicProps, props, slots, on };
  }
  function parseTSlot(node, ctx) {
    if (!node.hasAttribute("t-slot")) {
      return null;
    }
    const name = node.getAttribute("t-slot");
    node.removeAttribute("t-slot");
    let attrs = null;
    let on = null;
    for (let attributeName of node.getAttributeNames()) {
      const value = node.getAttribute(attributeName);
      if (attributeName.startsWith("t-on-")) {
        on = on || {};
        on[attributeName.slice(5)] = value;
      } else {
        attrs = attrs || {};
        attrs[attributeName] = value;
      }
    }
    return {
      type: 14,
      name,
      attrs,
      on,
      defaultContent: parseChildNodes(node, ctx)
    };
  }
  function parseTTranslation(node, ctx) {
    if (node.getAttribute("t-translation") !== "off") {
      return null;
    }
    node.removeAttribute("t-translation");
    return {
      type: 16,
      content: parseNode(node, ctx)
    };
  }
  function parseTPortal(node, ctx) {
    if (!node.hasAttribute("t-portal")) {
      return null;
    }
    const target = node.getAttribute("t-portal");
    node.removeAttribute("t-portal");
    const content = parseNode(node, ctx);
    if (!content) {
      return {
        type: 0,
        value: ""
      };
    }
    return {
      type: 17,
      target,
      content
    };
  }
  function parseChildren(node, ctx) {
    const children = [];
    for (let child of node.childNodes) {
      const childAst = parseNode(child, ctx);
      if (childAst) {
        if (childAst.type === 3) {
          children.push(...childAst.content);
        } else {
          children.push(childAst);
        }
      }
    }
    return children;
  }
  function parseChildNodes(node, ctx) {
    const children = parseChildren(node, ctx);
    switch (children.length) {
      case 0:
        return null;
      case 1:
        return children[0];
      default:
        return { type: 3, content: children };
    }
  }
  function normalizeTIf(el) {
    let tbranch = el.querySelectorAll("[t-elif], [t-else]");
    for (let i = 0, ilen = tbranch.length; i < ilen; i++) {
      let node = tbranch[i];
      let prevElem = node.previousElementSibling;
      let pattr = (name) => prevElem.getAttribute(name);
      let nattr = (name) => +!!node.getAttribute(name);
      if (prevElem && (pattr("t-if") || pattr("t-elif"))) {
        if (pattr("t-foreach")) {
          throw new OwlError("t-if cannot stay at the same level as t-foreach when using t-elif or t-else");
        }
        if (["t-if", "t-elif", "t-else"].map(nattr).reduce(function(a, b) {
          return a + b;
        }) > 1) {
          throw new OwlError("Only one conditional branching directive is allowed per node");
        }
        let textNode;
        while ((textNode = node.previousSibling) !== prevElem) {
          if (textNode.nodeValue.trim().length && textNode.nodeType !== 8) {
            throw new OwlError("text is not allowed between branching directives");
          }
          textNode.remove();
        }
      } else {
        throw new OwlError("t-elif and t-else directives must be preceded by a t-if or t-elif directive");
      }
    }
  }
  function normalizeTEscTOut(el) {
    for (const d of ["t-esc", "t-out"]) {
      const elements = [...el.querySelectorAll(`[${d}]`)].filter((el2) => el2.tagName[0] === el2.tagName[0].toUpperCase() || el2.hasAttribute("t-component"));
      for (const el2 of elements) {
        if (el2.childNodes.length) {
          throw new OwlError(`Cannot have ${d} on a component that already has content`);
        }
        const value = el2.getAttribute(d);
        el2.removeAttribute(d);
        const t = el2.ownerDocument.createElement("t");
        if (value != null) {
          t.setAttribute(d, value);
        }
        el2.appendChild(t);
      }
    }
  }
  function normalizeXML(el) {
    normalizeTIf(el);
    normalizeTEscTOut(el);
  }
  function compile(template, options = {}) {
    const ast = parse(template);
    const hasSafeContext = template instanceof Node ? !(template instanceof Element) || template.querySelector("[t-set], [t-call]") === null : !template.includes("t-set") && !template.includes("t-call");
    const codeGenerator = new CodeGenerator(ast, { ...options, hasSafeContext });
    const code = codeGenerator.generateCode();
    try {
      return new Function("app, bdom, helpers", code);
    } catch (originalError) {
      const { name } = options;
      const nameStr = name ? `template "${name}"` : "anonymous template";
      const err = new OwlError(`Failed to compile ${nameStr}: ${originalError.message}

generated code:
function(app, bdom, helpers) {
${code}
}`);
      err.cause = originalError;
      throw err;
    }
  }
  var version = "2.3.0";
  var Scheduler = class _Scheduler {
    constructor() {
      this.tasks = /* @__PURE__ */ new Set();
      this.frame = 0;
      this.delayedRenders = [];
      this.cancelledNodes = /* @__PURE__ */ new Set();
      this.requestAnimationFrame = _Scheduler.requestAnimationFrame;
    }
    addFiber(fiber) {
      this.tasks.add(fiber.root);
    }
    scheduleDestroy(node) {
      this.cancelledNodes.add(node);
      if (this.frame === 0) {
        this.frame = this.requestAnimationFrame(() => this.processTasks());
      }
    }
    /**
     * Process all current tasks. This only applies to the fibers that are ready.
     * Other tasks are left unchanged.
     */
    flush() {
      if (this.delayedRenders.length) {
        let renders = this.delayedRenders;
        this.delayedRenders = [];
        for (let f of renders) {
          if (f.root && f.node.status !== 3 && f.node.fiber === f) {
            f.render();
          }
        }
      }
      if (this.frame === 0) {
        this.frame = this.requestAnimationFrame(() => this.processTasks());
      }
    }
    processTasks() {
      this.frame = 0;
      for (let node of this.cancelledNodes) {
        node._destroy();
      }
      this.cancelledNodes.clear();
      for (let task of this.tasks) {
        this.processFiber(task);
      }
      for (let task of this.tasks) {
        if (task.node.status === 3) {
          this.tasks.delete(task);
        }
      }
    }
    processFiber(fiber) {
      if (fiber.root !== fiber) {
        this.tasks.delete(fiber);
        return;
      }
      const hasError = fibersInError.has(fiber);
      if (hasError && fiber.counter !== 0) {
        this.tasks.delete(fiber);
        return;
      }
      if (fiber.node.status === 3) {
        this.tasks.delete(fiber);
        return;
      }
      if (fiber.counter === 0) {
        if (!hasError) {
          fiber.complete();
        }
        this.tasks.delete(fiber);
      }
    }
  };
  Scheduler.requestAnimationFrame = window.requestAnimationFrame.bind(window);
  var hasBeenLogged = false;
  var DEV_MSG = () => {
    const hash = window.owl ? window.owl.__info__.hash : "master";
    return `Owl is running in 'dev' mode.

This is not suitable for production use.
See https://github.com/odoo/owl/blob/${hash}/doc/reference/app.md#configuration for more information.`;
  };
  var apps = /* @__PURE__ */ new Set();
  window.__OWL_DEVTOOLS__ || (window.__OWL_DEVTOOLS__ = { apps, Fiber, RootFiber, toRaw, reactive });
  var App = class _App extends TemplateSet {
    constructor(Root, config2 = {}) {
      super(config2);
      this.scheduler = new Scheduler();
      this.root = null;
      this.name = config2.name || "";
      this.Root = Root;
      apps.add(this);
      if (config2.test) {
        this.dev = true;
      }
      this.warnIfNoStaticProps = config2.warnIfNoStaticProps || false;
      if (this.dev && !config2.test && !hasBeenLogged) {
        console.info(DEV_MSG());
        hasBeenLogged = true;
      }
      const env = config2.env || {};
      const descrs = Object.getOwnPropertyDescriptors(env);
      this.env = Object.freeze(Object.create(Object.getPrototypeOf(env), descrs));
      this.props = config2.props || {};
    }
    mount(target, options) {
      _App.validateTarget(target);
      if (this.dev) {
        validateProps(this.Root, this.props, { __owl__: { app: this } });
      }
      const node = this.makeNode(this.Root, this.props);
      const prom = this.mountNode(node, target, options);
      this.root = node;
      return prom;
    }
    makeNode(Component2, props) {
      return new ComponentNode(Component2, props, this, null, null);
    }
    mountNode(node, target, options) {
      const promise = new Promise((resolve, reject) => {
        let isResolved = false;
        node.mounted.push(() => {
          resolve(node.component);
          isResolved = true;
        });
        let handlers = nodeErrorHandlers.get(node);
        if (!handlers) {
          handlers = [];
          nodeErrorHandlers.set(node, handlers);
        }
        handlers.unshift((e) => {
          if (!isResolved) {
            reject(e);
          }
          throw e;
        });
      });
      node.mountComponent(target, options);
      return promise;
    }
    destroy() {
      if (this.root) {
        this.root.destroy();
        this.scheduler.processTasks();
      }
      apps.delete(this);
    }
    createComponent(name, isStatic, hasSlotsProp, hasDynamicPropList, propList) {
      const isDynamic = !isStatic;
      let arePropsDifferent;
      const hasNoProp = propList.length === 0;
      if (hasSlotsProp) {
        arePropsDifferent = (_1, _2) => true;
      } else if (hasDynamicPropList) {
        arePropsDifferent = function(props1, props2) {
          for (let k in props1) {
            if (props1[k] !== props2[k]) {
              return true;
            }
          }
          return Object.keys(props1).length !== Object.keys(props2).length;
        };
      } else if (hasNoProp) {
        arePropsDifferent = (_1, _2) => false;
      } else {
        arePropsDifferent = function(props1, props2) {
          for (let p of propList) {
            if (props1[p] !== props2[p]) {
              return true;
            }
          }
          return false;
        };
      }
      const updateAndRender = ComponentNode.prototype.updateAndRender;
      const initiateRender = ComponentNode.prototype.initiateRender;
      return (props, key, ctx, parent, C) => {
        let children = ctx.children;
        let node = children[key];
        if (isDynamic && node && node.component.constructor !== C) {
          node = void 0;
        }
        const parentFiber = ctx.fiber;
        if (node) {
          if (arePropsDifferent(node.props, props) || parentFiber.deep || node.forceNextRender) {
            node.forceNextRender = false;
            updateAndRender.call(node, props, parentFiber);
          }
        } else {
          if (isStatic) {
            const components = parent.constructor.components;
            if (!components) {
              throw new OwlError(`Cannot find the definition of component "${name}", missing static components key in parent`);
            }
            C = components[name];
            if (!C) {
              throw new OwlError(`Cannot find the definition of component "${name}"`);
            } else if (!(C.prototype instanceof Component)) {
              throw new OwlError(`"${name}" is not a Component. It must inherit from the Component class`);
            }
          }
          node = new ComponentNode(C, props, this, ctx, key);
          children[key] = node;
          initiateRender.call(node, new Fiber(node, parentFiber));
        }
        parentFiber.childrenMap[key] = node;
        return node;
      };
    }
    handleError(...args) {
      return handleError(...args);
    }
  };
  App.validateTarget = validateTarget;
  App.apps = apps;
  App.version = version;
  async function mount(C, target, config2 = {}) {
    return new App(C, config2).mount(target, config2);
  }
  var mainEventHandler = (data, ev, currentTarget) => {
    const { data: _data, modifiers } = filterOutModifiersFromData(data);
    data = _data;
    let stopped = false;
    if (modifiers.length) {
      let selfMode = false;
      const isSelf = ev.target === currentTarget;
      for (const mod of modifiers) {
        switch (mod) {
          case "self":
            selfMode = true;
            if (isSelf) {
              continue;
            } else {
              return stopped;
            }
          case "prevent":
            if (selfMode && isSelf || !selfMode)
              ev.preventDefault();
            continue;
          case "stop":
            if (selfMode && isSelf || !selfMode)
              ev.stopPropagation();
            stopped = true;
            continue;
        }
      }
    }
    if (Object.hasOwnProperty.call(data, 0)) {
      const handler = data[0];
      if (typeof handler !== "function") {
        throw new OwlError(`Invalid handler (expected a function, received: '${handler}')`);
      }
      let node = data[1] ? data[1].__owl__ : null;
      if (node ? node.status === 1 : true) {
        handler.call(node ? node.component : null, ev);
      }
    }
    return stopped;
  };
  config.shouldNormalizeDom = false;
  config.mainEventHandler = mainEventHandler;
  var __info__ = {
    version: App.version
  };
  TemplateSet.prototype._compileTemplate = function _compileTemplate(name, template) {
    return compile(template, {
      name,
      dev: this.dev,
      translateFn: this.translateFn,
      translatableAttributes: this.translatableAttributes
    });
  };
  __info__.date = "2024-07-25T13:13:44.371Z";
  __info__.hash = "0cde4b8";
  __info__.url = "https://github.com/odoo/owl";

  // src/shared/top_menu.js
  var TopMenu = class extends Component {
    static template = xml`
        <div class="bg-primary text-white d-flex align-center space-between" style="height:45px;">
          <t t-slot="default"/>
        </div>`;
  };

  // src/screens/add_enemy_screen.js
  var AddEnemyScreen = class extends Component {
    static template = xml`
        <TopMenu>
          <span class="p-2" t-on-click="() => props.game.popScreen()">Back</span>
        </TopMenu>
        <h2 class="p-2">Add an Enemy</h2>
        <div class="d-flex m-2 align-center">
          <div class="width-50px text-right">Type </div>
          <select class=" mx-2 flex-grow" t-model="state.type">
            <option value="">Select a type</option>
            <t t-foreach="enemies" t-as="enemy" t-key="enemy.id">
              <option t-att-value="enemy.id"><t t-esc="enemy.name"/><t t-if="enemy.boss"> (BOSS)</t></option>
            </t>
          </select>
        </div>
        <div class="" t-if="!isBoss()">
          <div class="d-flex m-2 align-center">
            <div class="width-50px text-right">Id </div>
            <input class="mx-2 width-50px" type="number" t-model.number="state.nbr"/>
          </div>
          <div class="d-flex m-2 align-center" >
            <div class="width-50px text-right">Elite </div>
            <div class="width-50px"><input type="checkbox" t-model="state.elite"/>
            </div>
          </div>
        </div>
        <div class="d-flex flex-end">
          <div class="button p-2 m-1" t-on-click="create" t-att-class="{disabled: !state.type}">
            Add Enemy
          </div>
        </div>
      `;
    static components = { TopMenu };
    setup() {
      this.state = useState({
        type: "",
        nbr: 0,
        elite: false
      });
      this.enemies = ENEMIES;
    }
    create() {
      const enemy = ENEMIES_MAP[this.state.type];
      const level = this.props.game.scenarioLevel;
      const A = this.props.game.heroes.length;
      let maxHp;
      if (enemy.boss) {
        maxHp = enemy.hp[level](A);
      } else {
        const hpArray = this.state.elite ? enemy.eliteHp : enemy.normalHp;
        maxHp = hpArray[level];
      }
      let move;
      if (enemy.boss) {
        move = enemy.move[level];
      } else {
        const moveArray = this.state.elite ? enemy.eliteMove : enemy.normalMove;
        move = moveArray[level];
      }
      let attack;
      if (enemy.boss) {
        attack = enemy.attack[level](A);
      } else {
        const attackArray = this.state.elite ? enemy.eliteAttack : enemy.normalAttack;
        attack = attackArray[level];
      }
      let modifiers = "";
      if (!enemy.boss) {
        const modifiersArray = this.state.elite ? enemy.eliteModifiers : enemy.normalModifiers;
        modifiers = modifiersArray[level];
      }
      let immunities = "";
      let special1 = "";
      let special2 = "";
      if (enemy.boss) {
        immunities = enemy.immunities.join(", ");
        special1 = enemy.special1[level](A);
        special2 = enemy.special2[level](A);
      }
      const enemyObj = {
        id: this.props.game.getId(),
        type: this.state.type,
        name: enemy.name,
        nbr: this.state.nbr,
        elite: this.state.elite,
        boss: !!enemy.boss,
        hp: maxHp,
        maxHp,
        move,
        attack,
        modifiers,
        immunities,
        special1,
        special2,
        hasTurnEnded: false,
        status: {
          poisoned: false,
          wound: false,
          confusion: false,
          immobilisation: false,
          stunned: false,
          disarmed: false,
          renforced: false
        }
      };
      this.props.game.addEnemy(enemyObj);
      this.props.game.popScreen();
    }
    isBoss() {
      if (!this.state.type) {
        return false;
      }
      return !!ENEMIES_MAP[this.state.type].boss;
    }
  };

  // src/screens/character_editor_screen.js
  var CharacterEditor = class extends Component {
    static template = xml`
        <TopMenu>
          <span class="p-2" t-on-click="() => props.game.popScreen()">Back</span>
        </TopMenu>
        <h2 class="p-2"><t t-if="activeHero">Edit</t><t t-else="">Create</t> your Hero</h2>
        <div class="d-flex align-center mx-2 my-3">
          <div class="width-50px text-right">Name </div>
          <input class="mx-2 flex-grow" t-model="state.name" placeholder="Character name"/>
        </div>
        <div class="d-flex align-center mx-2 my-3">
          <div class="width-50px text-right">Class </div>
          <select class="mx-2 flex-grow" t-model="state.class">
            <option value="">Select a class</option>
            <option value="void_warden">Gardienne du Néant</option>
            <option value="red_guard">Garde Rouge</option>
          </select>
        </div>
        <div class="d-flex mx-2 my-3 space-between">
          <div class="d-flex align-center">
            <div class="width-50px text-right">Level </div>
            <select class="mx-2" t-model.number="state.level">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <div class="d-flex align-center">
            <div class="width-50px text-right">XP </div>
            <input class="mx-2 width-50px" type="number" t-model.number="state.xp"/>
          </div>
          <div class="d-flex align-center">
            <div class="width-50px text-right">Gold </div>
            <input  class="mx-2 width-50px" type="number" t-model.number="state.gold"/>
          </div>
        </div>
        <div class="d-flex flex-end p-2">
          <div class="button p-2 m-2" t-on-click="create" t-att-class="{disabled: isDisabled}">
            <t t-if="activeHero">Update</t><t t-else="">Add</t> Hero
          </div>
        </div>
      `;
    static components = { TopMenu };
    setup() {
      this.activeHero = this.props.game.state;
      this.state = useState({
        name: this.activeHero ? this.activeHero.name : "",
        class: this.activeHero ? this.activeHero.class : "",
        level: this.activeHero ? this.activeHero.level : 1,
        gold: this.activeHero ? this.activeHero.gold : 0,
        xp: this.activeHero ? this.activeHero.xp : 0
      });
    }
    get isDisabled() {
      return !(this.state.name && this.state.class);
    }
    create() {
      const maxHp = MAX_HP_MAP[this.state.class][this.state.level - 1];
      const hero = {
        name: this.state.name,
        class: this.state.class,
        level: this.state.level,
        hp: maxHp,
        maxHp,
        xp: this.state.xp || 0,
        maxCard: MAX_CARD_MAP[this.state.class],
        gold: this.state.gold || 0
      };
      if (this.activeHero) {
        Object.assign(this.activeHero, hero);
      } else {
        this.props.game.addHero({
          ...hero,
          status: {
            poisoned: false,
            wound: false,
            confusion: false,
            immobilisation: false,
            stunned: false,
            disarmed: false,
            renforced: false
          }
        });
      }
      this.props.game.popScreen();
    }
  };

  // src/screens/config_screen.js
  var ConfigScreen = class extends Component {
    static template = xml`
        <TopMenu>
          <span class="p-2" t-on-click="() => props.game.popScreen()">Back</span>
        </TopMenu>
        <div>
          <h2 class="p-2">Settings</h2>
          <div class="mx-2">
            Scenario
            <select class="bg-white" t-model.number="props.game.scenarioLevel">
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
              <option value="6">Level 6</option>
              <option value="7">Level 7</option>
            </select>
          </div>
          <h2 class="p-2">Features</h2>
          <t t-set="config" t-value="props.game.config"/>
          <div class="d-grid align-center" style="grid-template-columns:50px 1fr;row-gap:10px">
            <input type="checkbox" t-model="config.elements" id="track_element"/>
            <label for="track_element">Element Tracker</label>
            <input type="checkbox" t-model="config.turnTracker" id="track_turns"/>
            <label for="track_turns">Turn Tracker</label>
            <input type="checkbox" t-model="config.battleGoals" id="track_battlegoals"/>
            <label for="track_battlegoals">Battle Goals</label>
            <input type="checkbox" t-model="config.attackModifiers" id="enemy_attack_modifiers"/>
            <label for="enemy_attack_modifiers">Enemy Attack Modifiers</label>
            <input type="checkbox" t-model="config.enemyActions" id="enemy_actions"/>
            <label for="enemy_actions">Enemy Actions</label>
          </div>
          <hr/>
          <h2 class="p-2 my-2">Data</h2>
          <div class="d-flex flex-column align-center">
              <div class="button p-2 mx-3 my-1 text-center" style="width:200px;" t-on-click="save">
                  Save to local storage
              </div>
              <div class="button p-2 mx-3 my-1 text-center" style="width:200px;" t-on-click="restore">
                  Restore from local storage
              </div>
          </div>
  
        </div>
      `;
    static components = { TopMenu };
    save() {
      const state = JSON.stringify(this.props.game);
      localStorage.setItem("game_state", state);
      this.props.game.popScreen();
      alert("Game saved!");
    }
    restore() {
      const dataStr = localStorage.getItem("game_state");
      if (!dataStr) {
        return;
      }
      const data = JSON.parse(dataStr);
      Object.assign(this.props.game, data);
      this.props.game.popScreen();
    }
  };

  // src/shared/control_panel.js
  var ControlPanel = class extends Component {
    static template = xml`
        <div class="bg-white d-flex align-center border-bottom-gray space-between" style="height:50px;">
          <t t-slot="default"/>
        </div>`;
  };

  // src/shared/status_editor.js
  function statusString(statusObj) {
    const keys = [];
    for (let k in statusObj) {
      if (statusObj[k]) {
        keys.push(k);
      }
    }
    if (!keys.length) {
      return "";
    }
    const mapping = {
      poisoned: "poison",
      wound: "blessure",
      confusion: "confusion",
      immobilisation: "immobilisation",
      stunned: "\xE9tourdissement",
      renforced: "renforcement",
      disarmed: "d\xE9sarm\xE9"
    };
    return keys.map((k) => mapping[k]).join(", ");
  }
  var StatusEditor = class extends Component {
    static template = xml`
        <t t-set="status" t-value="props.status"/>
        <div 
          class="border-radius-2 text-smallcaps text-center p-1 " 
          t-att-class="{'bg-darker text-bold': status.poisoned}"
          t-on-click="() => status.poisoned = !status.poisoned"
        >
          poison
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.wound}"
          t-on-click="() => status.wound = !status.wound"
        >
          blessure
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.confusion}"
          t-on-click="() => this.toggleStatus('confusion')"
        >
          confusion
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.immobilisation}"
          t-on-click="() => this.toggleStatus('immobilisation')"
        >
          immobilisation
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.stunned}"
          t-on-click="() => this.toggleStatus('stunned')"
        >
          étourdissement
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.disarmed}"
          t-on-click="() => this.toggleStatus('disarmed')"
        >
          désarmement
        </div>
        <div
          class="border-radius-2 text-smallcaps text-center p-1 "
          t-att-class="{'bg-darker text-bold': status.renforced}"
          t-on-click="() => this.toggleStatus('renforced')"
        >
          renforcement
        </div>`;
    toggleStatus(effect) {
      if (this.props.status[effect]) {
        this.props.status[effect] = 0;
      } else {
        this.props.status[effect] = this.props.isActive ? 2 : 1;
      }
    }
  };

  // src/shared/counter.js
  var Counter = class extends Component {
    static template = xml`
        <div class="d-flex align-center p-1">
          <span class="button m-1 py-2 px-3" t-on-click="props.dec">-</span>
          <t t-slot="default"/>
          <span class="button m-1 py-2 px-3" t-on-click="props.inc">+</span>
        </div>`;
  };

  // src/shared/style.js
  var CARD = "border-gray border-radius-4 m-1";

  // src/shared/character_card.js
  var CharacterCard = class extends Component {
    static template = xml`
        <div class="${CARD} bg-lightgreen" t-on-click="toggle">
        <div class="d-flex space-between px-2 py-1">
            <span class="text-bold"><t t-esc="props.hero.name"/></span>
            <span class=""><t t-esc="heroClass"/> (level <t t-esc="props.hero.level"/>)</span>
          </div>
          <div class="d-flex space-between px-2 py-1">
            <span t-att-class="{'text-red': props.hero.hp lt 1}">HP: <span class="text-bold" t-esc="props.hero.hp"/> / <span class="text-bold" t-esc="props.hero.maxHp"/></span>
            <span>XP: <span class="text-bold" t-esc="props.hero.xp"/></span>
            <span>Gold: <span class="text-bold" t-esc="props.hero.gold"/></span>
          </div>
          <div class="d-flex space-between px-2 py-1" t-if="statuses">
            <span>Status: <span class="text-bold" t-esc="statuses"/> </span>
          </div>
          <div t-if="state.isOpen" t-on-click.stop="" class="p-1  border-top-gray d-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <Counter dec="() => props.hero.hp--" inc="() => props.hero.hp++">HP</Counter>
            <Counter dec="() => props.hero.xp--" inc="() => props.hero.xp++">XP</Counter>
            <Counter dec="() => props.hero.gold--" inc="() => props.hero.gold++">Gold</Counter>
            <StatusEditor status="props.hero.status" isActive="props.hero.id === props.game.activeEntity" />
          </div>
        </div>`;
    static components = { Counter, StatusEditor };
    setup() {
      this.state = useState({
        isOpen: false
      });
    }
    get heroClass() {
      return CLASS_NAME[this.props.hero.class];
    }
    toggle() {
      this.state.isOpen = !this.state.isOpen;
    }
    get statuses() {
      if (this.props.hero.hp <= 0) {
        return "";
      }
      return statusString(this.props.hero.status);
    }
  };

  // src/screens/main_screen.js
  var EnemyAttackModifiers = class extends Component {
    static template = xml`
        <div class="${CARD} bg-white">
          <div class="bg-gray p-1 d-flex space-between"  t-on-click="toggle">
            <span>Enemy Attack Modifiers (<t t-esc="mods.deck.length"/> cards)</span>
          </div>
          <div class="d-grid" style="grid-template-columns: 90px 1fr 95px;" t-if="state.open">
            <div class="d-flex flex-column">
              <div class="button mb-0" t-on-click="() => this.dealCard(1)">1 Card</div>
              <div class="button" t-on-click="() => this.dealCard(2)">2 Cards</div>
            </div>
            <div class="d-flex py-1 flex-center">
              <!-- sadf -->
              <t t-foreach="currentModifiers()" t-as="mod" t-key="mod.id">
                <div class="border-gray border-radius-4 p-2 mx-1 d-flex align-center flex-center" t-attf-style="width:35px;position:relative;background-color:{{mod.color || 'white'}};">
                  <t t-if="mod.recycled">
                    <span class="text-bold" style="position:absolute;bottom:0;right:0">♲</span>
                  </t>
                  <t t-foreach="mod.effects" t-as="effect" t-key="effect_index">
                    <div class="text-bold text-larger"><t t-esc="effect"/></div>
                  </t>
                </div>
              </t>
            </div>
            <div>
              <div class="button mb-0" t-on-click="addCurse">+ Curse</div>
              <div class="button" t-on-click="addBlessing">+ Blessing</div>
            </div>
          </div>
        </div>`;
    setup() {
      this.mods = this.props.game.enemyModifiers;
      this.state = useState({
        open: true
      });
    }
    toggle() {
      this.state.open = !this.state.open;
    }
    addCurse() {
      this.props.game.addCurse();
    }
    addBlessing() {
      this.props.game.addBlessing();
    }
    dealCard(n) {
      this.mods.visible = n;
      if (this.mods.deck.length < n) {
        while (this.mods.discardPile.length) {
          this.mods.deck.push(this.mods.discardPile.pop());
        }
      }
      shuffleArray(this.mods.deck);
      for (let i = 0; i < n; i++) {
        this.mods.discardPile.unshift(this.mods.deck.pop());
      }
    }
    currentModifiers() {
      const n = this.mods.visible;
      const ids = this.mods.discardPile.slice(0, n);
      const cards = ids.map((id) => {
        if (typeof id === "string") {
          if (id.startsWith("curse")) {
            return {
              id,
              effects: [" Cx0"],
              recycled: false,
              color: "#ffffd9"
            };
          }
          if (id.startsWith("blessing")) {
            return {
              id,
              effects: [" Bx2"],
              recycled: false,
              color: "#ffc7ff"
            };
          }
        }
        return MONSTER_MODIFIERS_DECK.find((m) => m.id === id);
      });
      console.log(cards);
      return cards;
    }
  };
  var BattleGoal = class extends Component {
    static template = xml`
          <div class="mx-3 my-2 p-1 border-gray border-radius-4" t-on-click="onClick">
            <div class="text-bold"><t t-esc="goal.title"/></div>
            <div><t t-esc="goal.description"/></div>
          </div>`;
    get goal() {
      const goal = BATTLE_GOALS.find((g) => g.id === this.props.id);
      return goal;
    }
    onClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  };
  var BattleGoalTracker = class extends Component {
    static template = xml`
        <div class="${CARD} bg-white">
          <div class="d-flex space-between bg-gray p-1 align-center">
            <span>Battle Goals</span>
            <span class="text-bold text-primary text-larger" t-on-click="close">×</span>
          </div>
          <div class="d-flex">
            <t t-foreach="props.game.heroes" t-as="hero" t-key="hero.id">
                  <div class="button" t-on-click="() => this.toggleHero(hero)" t-att-class="{'text-bold': state.hero and state.hero.id === hero.id}">
                    <t t-esc="hero.name"/>
                    <t t-if="props.game.battleGoals[hero.id]"><span class="ms-1">✓</span></t>
                  </div>
            </t>
          </div>
          <div t-if="state.hero">
                <t t-if="props.game.battleGoals[state.hero.id]">
                  <BattleGoal id="props.game.battleGoals[state.hero.id]"/>
                </t>
                <t t-else="">
                  <t t-set="i" t-value="getHeroIndex(state.hero.id)"/>
                  <BattleGoal id="goals[2*i]" onClick="() => this.selectGoal(2*i)"/>
                  <BattleGoal id="goals[2*i+1]" onClick="() => this.selectGoal(2*i+1)"/>
                </t>
            <div>
            </div>
          </div>
        </div>`;
    static components = { BattleGoal };
    setup() {
      this.state = useState({
        hero: false
      });
      this.goals = shuffleArray(BATTLE_GOALS.map((g) => g.id));
    }
    getHeroIndex(heroId) {
      return this.props.game.heroes.findIndex((h) => h.id === heroId);
    }
    toggleHero(hero) {
      if (this.state.hero === hero) {
        this.state.hero = false;
      } else {
        this.state.hero = hero;
      }
    }
    selectGoal(goalIndex) {
      const heroId = this.state.hero.id;
      this.props.game.battleGoals[heroId] = this.goals[goalIndex];
      this.state.hero = false;
    }
    close() {
      this.props.game.config.battleGoals = false;
    }
  };
  var TurnTracker = class extends Component {
    static template = xml`
        <div class="${CARD} bg-white">
          <div class="bg-gray p-1 d-flex space-between align-center" t-on-click="toggle">
            <span t-if="game.activeEntity">Current turn: <t t-esc="activeEntityName()"/></span>
            <span t-else="">Turn Tracker</span>
          </div>
          <div class="p-1" t-if="state.open">
            <div t-if="game.round === 1">Select each hero/monster when its turn starts</div>
            <div class="d-flex align-center flex-wrap">
              <t t-foreach="game.heroes" t-as="hero" t-key="hero.id">
                <t t-if="game.turnTracker[hero.id]">
                  <div class="button disabled" t-att-class="{'text-bold': game.activeEntity===hero.id}"><t t-esc="hero.name"/></div>
                </t>
                <div t-else="" class="button" t-on-click="() => this.startTurn(hero.id)">
                  <t t-esc="hero.name"/>
                </div>
              </t>
              <t t-foreach="enemies()" t-as="type" t-key="type">
                <t t-set="initiative" t-value="enemyInitiative(type)"/>
                <t t-if="game.turnTracker[type]">
                  <div class="button disabled"  t-att-class="{'text-bold': game.activeEntity===type}">
                    <t t-if="initiative">[<t t-esc="initiative"/>] </t>
                    <t t-esc="enemyName(type)"/>
                  </div>
                </t>
                <div t-else="" class="button" t-on-click="() => this.startTurn(type)">
                  <t t-if="initiative">[<t t-esc="initiative"/>] </t>
                  <t t-esc="enemyName(type)"/>
                </div>
              </t>
            </div>
          </div>
        </div>
      `;
    setup() {
      this.state = useState({ open: true });
      this.game = this.props.game;
    }
    toggle() {
      this.state.open = !this.state.open;
    }
    startTurn(entity) {
      this.game.startTurn(entity);
    }
    enemyInitiative(type) {
      return this.game.monsterActions[type].initiative;
    }
    enemyName(type) {
      return ENEMIES_MAP[type].name;
    }
    activeEntityName() {
      const entity = this.game.activeEntity;
      if (typeof entity === "number") {
        const hero = this.game.heroes.find((hero2) => hero2.id === entity);
        return hero.name;
      } else {
        return ENEMIES_MAP[entity].name;
      }
    }
    enemies() {
      const types = /* @__PURE__ */ new Set();
      for (let enemy of this.game.enemies) {
        types.add(enemy.type);
      }
      return [...types];
    }
  };
  var ElementTracker = class extends Component {
    static template = xml`
        <div class="${CARD} bg-white p-1" style="display:grid;grid-template-columns:1fr 1fr 1fr;">
          <div class="element-card" t-att-class="{'text-bold': game.fire > 1, 'text-gray': !game.fire}" t-on-click="() => this.updateElement('fire')">
            Feu <t t-if="game.fire" t-esc="game.fire"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.ice > 1, 'text-gray': !game.ice}" t-on-click="() => this.updateElement('ice')">
            Glace <t t-if="game.ice" t-esc="game.ice"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.air > 1, 'text-gray': !game.air}" t-on-click="() => this.updateElement('air')">
            Air <t t-if="game.air" t-esc="game.air"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.earth > 1, 'text-gray': !game.earth}" t-on-click="() => this.updateElement('earth')">
            Terre <t t-if="game.earth" t-esc="game.earth"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.light > 1, 'text-gray': !game.light}" t-on-click="() => this.updateElement('light')">
            Lumière <t t-if="game.light" t-esc="game.light"/>
          </div>
          <div class="element-card" t-att-class="{'text-bold': game.darkness > 1, 'text-gray': !game.darkness}" t-on-click="() => this.updateElement('darkness')">
            Obscurité <t t-if="game.darkness" t-esc="game.darkness"/>
          </div>
        </div>
    `;
    setup() {
      this.game = this.props.game;
    }
    updateElement(elem) {
      this.game[elem] = this.game[elem] - 1;
      if (this.game[elem] < 0) {
        this.game[elem] = 2;
      }
    }
  };
  var EnemyCard = class extends Component {
    static template = xml`
        <div class="${CARD} bg-lightred py-1" t-on-click="toggle">
          <div class="d-flex space-between px-2 align-center">
            <span class="text-bold">
              <span t-if="props.enemy.elite" style="font-variant: smallcaps;">Elite </span>
              <t t-esc="props.enemy.name"/>
              <t t-if="props.enemy.boss"> [BOSS]</t>
              <t t-if="!props.enemy.boss and props.enemy.nbr"> [<t t-esc="props.enemy.nbr"/>]</t>
            </span>
            <span>Move: <span class="text-bold" t-esc="props.enemy.move"/></span>
          </div>
          <div class="d-flex space-between px-2  align-center">
            <span t-att-class="{'text-red': props.enemy.hp lt 1}">
              HP: <span class="text-bold" t-esc="props.enemy.hp"/> / <span class="text-bold" t-esc="props.enemy.maxHp"/>
            </span>
            <span>Attack: <span class="text-bold" t-esc="props.enemy.attack"/></span>
          </div>
          <div class="d-flex space-between px-2 " t-if="statuses">
            <span>Status: <span class="text-bold" t-esc="statuses"/> </span>
          </div>
          <div class="d-flex px-2" t-if="props.enemy.modifiers">
            <span class="me-1">Modificateurs: </span> <span class="text-italic"><t t-esc="props.enemy.modifiers"/></span>
          </div>
          <div class="d-flex px-2 " t-if="props.enemy.immunities">
            <span>Immunités: <span class="text-italic" t-esc="props.enemy.immunities"/></span>
          </div>
          <t t-if="props.enemy.boss">
            <div class="px-2 border-top-gray mt-1 pt-1 ">
              <span class="text-bold">Spécial 1</span> <span class="text-italic"><t t-esc="props.enemy.special1"/></span>
            </div>
            <div class="px-2" t-if="props.enemy.boss">
              <span class="text-bold">Spécial 2</span> <span class="text-italic"><t t-esc="props.enemy.special2"/></span>
            </div>          
          </t>
          <div t-if="state.isOpen" t-on-click.stop="" class="p-1  border-top-gray">
            <div class="d-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
              <StatusEditor status="props.enemy.status"  isActive="props.enemy.type === props.game.activeEntity"  />
            </div>
            <div class="d-flex space-between align-center">
              <Counter dec="() => props.enemy.hp--" inc="() => props.enemy.hp++">HP</Counter>
              <div t-if="!props.enemy.boss">
                <span>ID </span>
                <select t-model.number="props.enemy.nbr">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </div>
              <div><span class="button p-2" t-on-click="remove">Remove</span></div>
            </div>
          </div>
  
          <!-- <div class="d-flex space-between px-2 py-1">
            <span>XP: <span class="text-bold" t-esc="props.hero.xp"/></span>
            <span>Gold: <span class="text-bold" t-esc="props.hero.gold"/></span>
          </div>
          <div class="d-flex space-between px-2 py-1" t-if="statuses">
            <span>Status: <t t-esc="statuses"/> </span>
          </div> -->
        </div>`;
    static components = { StatusEditor, Counter };
    setup() {
      this.state = useState({
        isOpen: false
      });
    }
    toggle() {
      this.state.isOpen = !this.state.isOpen;
    }
    get statuses() {
      if (this.props.enemy.hp <= 0) {
        return "";
      }
      return statusString(this.props.enemy.status);
    }
    remove() {
      if (confirm("Are you sure that you want to remove this enemy?")) {
        const index = this.props.game.enemies.findIndex(
          (e) => e._id === this.props.enemy._id
        );
        if (index >= 0) {
          this.props.game.enemies.splice(index, 1);
        }
      }
    }
  };
  var EnemyActions = class extends Component {
    static template = xml`
      <div class="${CARD} bg-white">
        <t t-foreach="enemyTypes" t-as="type" t-key="type">
            <t t-set="actions" t-value="enemyActions(type)"/>
            <div class="">
                <div class="p-2 d-flex space-between" style="background-color: #eee;">
                    <span class="text-bold"><t t-esc="enemyName(type)"/></span>
                    <span class="text-smaller">deck: <t t-esc="actions.deck.length"/> cartes</span>
                </div>
                <div class="d-flex flex-end" t-if="actions.active === false">
                    <span class="button m-2 p-1" t-on-click="() => this.selectAction(type)">Choisir action</span>
                </div>
                <div t-if="actions.active" class="p-1" >
                    <t t-set="action" t-value="activeAction(type)"/>
                    <div class="d-flex align-center">
                        <span class="text-bold text-larger"><t t-esc="action.initiative"/></span>
                        <span class="mx-1"><t t-esc="action.name"/><t t-if="action.recycled"> <span class="text-bold">♲</span></t></span>
                    </div>
                    <ul class="my-1 text-smaller text-italic">
                        <li t-foreach="action.effects" t-as="effect" t-key="effect">
                            <t t-esc="effect"/>
                        </li>
                    </ul>
                </div>
            </div>
        </t>
      </div>`;
    get enemyTypes() {
      const types = /* @__PURE__ */ new Set();
      for (let enemy of this.props.game.enemies) {
        types.add(enemy.type);
      }
      return [...types];
    }
    enemyActions(type) {
      return this.props.game.monsterActions[type];
    }
    enemyName(type) {
      return ENEMIES_MAP[type].name;
    }
    selectAction(type) {
      const monsterAction = this.enemyActions(type);
      if (!monsterAction.deck.length) {
        const deck = monsterAction.discardPile;
        shuffleArray(deck);
        monsterAction.discardPile = [];
        monsterAction.deck = deck;
      }
      const action = monsterAction.deck.pop();
      monsterAction.discardPile.unshift(action);
      monsterAction.active = true;
      const actionObj = this.activeAction(type);
      monsterAction.initiative = actionObj.initiative;
    }
    activeAction(type) {
      const actions = this.enemyActions(type);
      if (actions.active === false) {
        throw new Error("boom");
      }
      const activeId = actions.discardPile[0];
      const action = ENEMIES_MAP[type].actions.find((a) => a.id === activeId);
      console.log(action);
      return action;
    }
  };
  var MainScreen = class extends Component {
    static template = xml`
        <t t-set="game" t-value="props.game"/>
        <t t-set="ui" t-value="props.ui"/>
        <TopMenu>
          <span class="mx-2"><t t-if="game.round">Round <t t-esc="game.round"/></t></span>
          <div class="m-3 text-bold text-larger" t-on-click="() => game.pushScreen('CONFIG')">⚙</div>
        </TopMenu>
        <ControlPanel>
          <div class="button ms-1" t-on-click="() => game.pushScreen('ADD_ENEMY')">Add Enemy</div>
          <div class="button ms-1" t-on-click="goToNextRound" t-att-class="{disabled: !game.isNextRoundEnabled() }">
            <t t-if="game.round">Next Round</t>
            <t t-else="">Start Scenario</t>
          </div>
        </ControlPanel>
        <t t-if="game.config.battleGoals">
          <BattleGoalTracker game="game"/>
        </t>
        <TurnTracker t-if="game.config.turnTracker" game="props.game" />
        <t t-if="game.enemies.length and game.config.enemyActions">
          <EnemyActions game="game"/>
        </t>
        <ElementTracker t-if="game.config.elements" game="props.game" />
        <t t-foreach="game.heroes" t-as="hero" t-key="hero.id">
          <CharacterCard hero="hero" game="game"/>
        </t>
        <t t-foreach="game.enemies" t-as="enemy" t-key="enemy.id">
          <EnemyCard enemy="enemy" game="game"/>
        </t>
        <t t-if="game.config.attackModifiers and game.enemies.length">
          <EnemyAttackModifiers game="game"/>
        </t>
      `;
    static components = {
      TopMenu,
      ControlPanel,
      CharacterCard,
      EnemyActions,
      EnemyCard,
      ElementTracker,
      TurnTracker,
      BattleGoalTracker,
      EnemyAttackModifiers
    };
    setup() {
      this.game = this.props.game;
    }
    goToNextRound() {
      this.props.game.incrementRound();
    }
  };

  // src/screens/start_screen.js
  var StartScreen = class extends Component {
    static template = xml`
        <t t-set="game" t-value="props.game"/>
        <t t-set="ui" t-value="props.ui"/>
        <TopMenu>
          <span class="mx-2">GloomHaven</span>
          <div class="m-3 text-bold text-larger" t-on-click="() => game.pushScreen('CONFIG')">⚙</div>
        </TopMenu>
        <ControlPanel>
          <div class="button ms-1" t-on-click="() => game.pushScreen('CHAR_EDITOR')">Add Hero</div>
          <select class="border-none bg-white" t-model.number="game.scenarioLevel">
            <option value="1">Scenario Level 1</option>
            <option value="2">Scenario Level 2</option>
            <option value="3">Scenario Level 3</option>
            <option value="4">Scenario Level 4</option>
            <option value="5">Scenario Level 5</option>
            <option value="6">Scenario Level 6</option>
            <option value="7">Scenario Level 7</option>
          </select>
          <div class="me-2 button me-2" t-att-class="{disabled: !canStartGame() }" t-on-click="start">Start Game</div>
        </ControlPanel>
        <t t-if="game.heroes.length">
          <t t-foreach="game.heroes" t-as="hero" t-key="hero.id">
            <CharacterCard hero="hero" game="game"/>
          </t>
        </t>
        <div t-else="" class="text-gray" style="padding:24px;">
          Prepare your team of heroes, then start a game!
        </div>
      `;
    static components = {
      TopMenu,
      ControlPanel,
      CharacterCard
    };
    canStartGame() {
      return this.props.game.heroes.length;
    }
    start() {
      this.props.game.round = 1;
      this.props.game.pushScreen("MAIN");
    }
  };

  // src/app.js
  var SCREEN_MAP = {
    START: StartScreen,
    CONFIG: ConfigScreen,
    CHAR_EDITOR: CharacterEditor,
    MAIN: MainScreen,
    ADD_ENEMY: AddEnemyScreen
  };
  var GameModel = class extends GameState {
    setScreen(screen) {
      if (!(screen in SCREEN_MAP)) {
        throw new Error("Nope...");
      }
      super.setScreen(screen);
    }
    pushScreen(screen, state = null) {
      if (!(screen in SCREEN_MAP)) {
        throw new Error("Nope...");
      }
      super.pushScreen(screen, state);
    }
  };
  var App2 = class extends Component {
    static template = xml`<t t-component="screen" game="game"/>`;
    setup() {
      this.game = useState(new GameModel());
      preventSleep();
      window.app = this;
    }
    get screen() {
      return SCREEN_MAP[this.game.screen];
    }
  };
  mount(App2, document.body);
})();
//# sourceMappingURL=app.js.map
