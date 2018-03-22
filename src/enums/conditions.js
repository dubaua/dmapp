export default {
  1: {
    id: 1,
    title: "Blinded",
    causes: [19],
    modifiers: {
      perception: -10
    },
    descriptions: [
      "The creature grants combat advantage",
      "The creature can’t see any target (It’s targets have total concealment)",
      "The creature takes a −10 penalty to Perception checks",
      "The creature can’t flank an enemy"
    ]
  },
  2: {
    id: 2,
    title: "Dazed",
    causes: [19],
    modifiers: {},
    descriptions: [
      "The creature grants combat advantage",
      "The creature can take either a standard action, a move action, or a minor action on its turn (it can also take free actions). The creature can’t take immediate actions or opportunity actions",
      "The creature can’t flank an enemy"
    ]
  },
  3: {
    id: 3,
    title: "Deafened",
    causes: [],
    modifiers: {
      perception: -10
    },
    descriptions: ["The creature can’t hear anything", "The creature take a −10 penalty to Perception checks"]
  },
  4: {
    id: 4,
    title: "Dominated",
    causes: [19],
    modifiers: {},
    descriptions: [
      "The creature can’t take actions. Instead, the dominator chooses a single action for it to take on its turn (standard, move, minor or free). The dominator may only choose powers or game features that can be used at-will, such as at-will powers. Anything with a limited used once per encounter or once per day doesn’t qualify",
      "The creature grants combat advantage",
      "The creature can’t flank",
      "Despite this condition, the dominated creature’s allies remain allies, and its enemies remain enemies",
      "If the dominator tries to force the creature into a pit or other hindering terrain, the creature gets a saving throw to avoid entering the terrain"
    ]
  },
  5: {
    id: 5,
    title: "Dying",
    causes: [17],
    modifiers: {},
    descriptions: [
      "The creature is unconscious",
      "The creature makes a death saving throw every round. Failing three death saving throws before a rest results in death, as does reaching the negative bloodied value in hit points",
      "The condition ends as soon as the creature receives healing. (The character is conscious, but remains prone.)"
    ]
  },
  6: {
    id: 6,
    title: "Grabbed",
    causes: [8],
    modifiers: {},
    descriptions: [
      "A grabbed creature is immobilized as long as the grab persists, and can be forced to move by the grabber",
      "The grabbed condition ends when the grabber stops maintaining the grab, or the grabber becomes unable to take actions, or the grabbed creature leaves the grabbing effect’s range. The condition also ends if the grabbed creature makes a successful escape"
    ]
  },
  7: {
    id: 7,
    title: "Helpless",
    causes: [19],
    modifiers: {},
    descriptions: ["The creature grants combat advantage", "The creature can be the target of a coup de grace"]
  },
  8: {
    id: 8,
    title: "Immobilized",
    causes: [],
    modifiers: {},
    descriptions: [
      "The creature can’t move from its space, although it can teleport and can be forced to move by a pull, a push, or a slide. The creature can otherwise attack and take actions normally"
    ]
  },
  9: {
    id: 9,
    title: "Marked",
    causes: [],
    modifiers: {},
    descriptions: [
      "The creature takes a −2 penalty to attack rolls for any attack that doesn’t target the creature that marked it",
      "The creature can be subjected only to one mark at a time. Newer marks supersede older ones",
      "A mark ends when its creator dies or is unconscious"
    ]
  },
  10: {
    id: 10,
    title: "Petrified",
    causes: [17],
    modifiers: {
      resist: 20
    },
    descriptions: [
      "The creature have been turned to stone",
      "The creature is unconscious",
      "The creature gains resist 20 to all damage",
      "The creature don’t age"
    ]
  },
  11: {
    id: 11,
    title: "Prone",
    causes: [],
    modifiers: {
      attack: -2
    },
    descriptions: [
      "The creature grants combat advantage to enemies making melee attacks against it",
      "The creature gets a +2 bonus to all defenses against ranged attacks from nonadjacent enemies",
      "The creature is lying on the ground. (If it is flying, it safely descend a distance equal to its fly speed. If it don’t reach the ground, it fall.)",
      "The creature takes a −2 penalty to attack rolls"
    ]
  },
  12: {
    id: 12,
    title: "Removed from play",
    causes: [],
    modifiers: {},
    descriptions: [
      "The creature can’t take actions",
      "The creature has neither line of sight nor line of effect to anything, and nothing has line of sight or line of effect to it"
    ]
  },
  13: {
    id: 13,
    title: "Restrained",
    causes: [19],
    modifiers: {
      attack: -2
    },
    descriptions: [
      "The creature can’t move, unless it teleport. It can’t be pulled, pushed or slid",
      "The creature takes a −2 penalty to attack rolls",
      "The creature grants combat advantage"
    ]
  },
  14: {
    id: 14,
    title: "Slowed",
    causes: [],
    modifiers: {},
    descriptions: [
      "The creature’s speed becomes 2 if it was higher than that. This speed applies to all its movement modes, but it does not apply to forced movement, teleportation or any movement that doesn’t use the creature’s speed. A creature that is slowed while moving must stop moving if it has already moved 2 or more squares",
      "The creature can’t benefit from bonuses to speed, but may use powers or actions that allow the creature to move farther than its speed (e.g. the run action)"
    ]
  },
  15: {
    id: 15,
    title: "Stunned",
    causes: [19],
    modifiers: {},
    descriptions: [
      "The creature grants combat advantage",
      "The creature can’t take actions",
      "The creature can’t flank an enemy",
      "The creature falls if it is flying, unless it can hover"
    ]
  },
  16: {
    id: 16,
    title: "Surprised",
    causes: [19],
    modifiers: {},
    descriptions: [
      "The creature grants combat advantage",
      "The creature can’t take actions",
      "The creature can’t flank an enemy"
    ]
  },
  17: {
    id: 17,
    title: "Unconscious",
    causes: [7, 11],
    modifiers: {
      ac: -5,
      fort: -5,
      ref: -5,
      will: -5,
    },
    descriptions: [
      "The creature is helpless",
      "The creature takes a −5 penalty to all defenses",
      "The creature can’t take actions",
      "The creature falls prone, if possible",
      "The creature can’t flank an enemy",
      "The creature is unaware of its surroundings"
    ]
  },
  18: {
    id: 18,
    title: "Weakened",
    causes: [],
    modifiers: {},
    descriptions: [
      "The creature attacks deal half damage. However, two kinds of damage that creature deal are not affected: ongoing damage, and damage that is not generated by an attack roll"
    ]
  },
  19: {
    id: 19,
    title: "Grants Combat Advantage",
    causes: [],
    modifiers: {
      ac: -2,
      fort: -2,
      ref: -2,
      will: -2,
    },
    descriptions: [
      "Creatures that able to see creature grants combat advantage gains a +2 bonus to its attack roll"
    ]
  }
};
