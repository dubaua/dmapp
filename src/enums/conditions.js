
// chained key contains array of chained condition ids

export default {
  BLINDED: 1,
  DAZED: 2,
  DEAFENED: 3,
  DOMINATED: 4,
  DYING: 5,
  GRABBED: 6,
  GRANTS_CA: 7,
  HELPLESS: 8,
  IMMOBILIZED: 9,
  MARKED: 10,
  PETRIFIED: 11,
  PRONE: 12,
  REMOVED_FROM_PLAY: 13,
  RESTRAINED: 14,
  SLOWED: 15,
  STUNNED: 16,
  SURPRISED: 17,
  TIRED_OF_RUNNING: 18,
  UNCONSCIOUS: 19,
  WEAKENED: 20,
  properties: {
    1: {
      id: 1,
      title: 'Blinded',
      chained: [7],
      modifiers: {
        perception: -10,
      },
      descriptions: [
        'The creature grants combat advantage',
        'The creature can’t see any target (It’s targets have total concealment)',
        'The creature takes a −10 penalty to Perception checks',
        'The creature can’t flank an enemy',
      ],
    },
    2: {
      id: 2,
      title: 'Dazed',
      chained: [7],
      modifiers: {},
      descriptions: [
        'The creature grants combat advantage',
        'The creature can take either a standard action, a move action, or a minor action on its turn (it can also take free actions). The creature can’t take immediate actions or opportunity actions',
        'The creature can’t flank an enemy',
      ],
    },
    3: {
      id: 3,
      title: 'Deafened',
      chained: [],
      modifiers: {
        perception: -10,
      },
      descriptions: [
        'The creature can’t hear anything',
        'The creature take a −10 penalty to Perception checks',
      ],
    },
    4: {
      id: 4,
      title: 'Dominated',
      chained: [7],
      modifiers: {},
      descriptions: [
        'The creature can’t take actions. Instead, the dominator chooses a single action for it to take on its turn (standard, move, minor or free). The dominator may only choose powers or game features that can be used at-will, such as at-will powers. Anything with a limited used once per encounter or once per day doesn’t qualify',
        'The creature grants combat advantage',
        'The creature can’t flank',
        'Despite this condition, the dominated creature’s allies remain allies, and its enemies remain enemies',
        'If the dominator tries to force the creature into a pit or other hindering terrain, the creature gets a saving throw to avoid entering the terrain',
      ],
    },
    5: {
      id: 5,
      title: 'Dying',
      chained: [19],
      modifiers: {},
      descriptions: [
        'The creature is unconscious',
        'The creature makes a death saving throw every round. Failing three death saving throws before a rest results in death, as does reaching the negative bloodied value in hit points',
        'The condition ends as soon as the creature receives healing. (The character is conscious, but remains prone.)',
      ],
    },
    6: {
      id: 6,
      title: 'Grabbed',
      chained: [9],
      modifiers: {},
      descriptions: [
        'A grabbed creature is immobilized as long as the grab persists, and can be forced to move by the grabber',
        'The grabbed condition ends when the grabber stops maintaining the grab, or the grabber becomes unable to take actions, or the grabbed creature leaves the grabbing effect’s range. The condition also ends if the grabbed creature makes a successful escape',
      ],
    },
    7: {
      id: 7,
      title: 'Grants CA',
      chained: [],
      modifiers: {
        ac: -2,
        fort: -2,
        ref: -2,
        will: -2,
      },
      descriptions: [
        'Creatures that able to see creature grants combat advantage gains a +2 bonus to its attack roll',
      ],
    },
    8: {
      id: 8,
      title: 'Helpless',
      chained: [7],
      modifiers: {},
      descriptions: [
        'The creature grants combat advantage',
        'The creature can be the target of a coup de grace',
      ],
    },
    9: {
      id: 9,
      title: 'Immobilized',
      chained: [],
      modifiers: {},
      descriptions: [
        'The creature can’t move from its space, although it can teleport and can be forced to move by a pull, a push, or a slide. The creature can otherwise attack and take actions normally',
      ],
    },
    10: {
      id: 10,
      title: 'Marked',
      chained: [],
      modifiers: {},
      descriptions: [
        'The creature takes a −2 penalty to attack rolls for any attack that doesn’t target the creature that marked it',
        'The creature can be subjected only to one mark at a time. Newer marks supersede older ones',
        'A mark ends when its creator dies or is unconscious',
      ],
    },
    11: {
      id: 11,
      title: 'Petrified',
      chained: [19],
      modifiers: {
        resist: 20,
      },
      descriptions: [
        'The creature have been turned to stone',
        'The creature is unconscious',
        'The creature gains resist 20 to all damage',
        'The creature don’t age',
      ],
    },
    12: {
      id: 12,
      title: 'Prone',
      chained: [],
      modifiers: {
        attack: -2,
      },
      descriptions: [
        'The creature grants combat advantage to enemies making melee attacks against it',
        'The creature gets a +2 bonus to all defenses against ranged attacks from nonadjacent enemies',
        'The creature is lying on the ground. (If it is flying, it safely descend a distance equal to its fly speed. If it don’t reach the ground, it fall.)',
        'The creature takes a −2 penalty to attack rolls',
      ],
    },
    13: {
      id: 13,
      title: 'Removed from play',
      chained: [],
      modifiers: {},
      descriptions: [
        'The creature can’t take actions',
        'The creature has neither line of sight nor line of effect to anything, and nothing has line of sight or line of effect to it',
      ],
    },
    14: {
      id: 14,
      title: 'Restrained',
      chained: [7],
      modifiers: {
        attack: -2,
      },
      descriptions: [
        'The creature can’t move, unless it teleport. It can’t be pulled, pushed or slid',
        'The creature takes a −2 penalty to attack rolls',
        'The creature grants combat advantage',
      ],
    },
    15: {
      id: 15,
      title: 'Slowed',
      chained: [],
      modifiers: {},
      descriptions: [
        'The creature’s speed becomes 2 if it was higher than that. This speed applies to all its movement modes, but it does not apply to forced movement, teleportation or any movement that doesn’t use the creature’s speed. A creature that is slowed while moving must stop moving if it has already moved 2 or more squares',
        'The creature can’t benefit from bonuses to speed, but may use powers or actions that allow the creature to move farther than its speed (e.g. the run action)',
      ],
    },
    16: {
      id: 16,
      title: 'Stunned',
      chained: [7],
      modifiers: {},
      descriptions: [
        'The creature grants combat advantage',
        'The creature can’t take actions',
        'The creature can’t flank an enemy',
        'The creature falls if it is flying, unless it can hover',
      ],
    },
    17: {
      id: 17,
      title: 'Surprised',
      chained: [7],
      modifiers: {},
      descriptions: [
        'The creature grants combat advantage',
        'The creature can’t take actions',
        'The creature can’t flank an enemy',
      ],
    },
    18: {
      id: 18,
      title: 'Tired of running',
      chained: [7],
      modifiers: {
        attack: -5,
      },
      descriptions: [
        'The creature takes a −5 penalty to attack rolls until the start of its next turn',
        'Creatures grants combat advantage to all enemies until the start of its next turn',
        'Creatures provokes opportunity attacks each time it leaves a threatened square',
      ],
    },
    19: {
      id: 19,
      title: 'Unconscious',
      chained: [7, 8, 12],
      modifiers: {
        ac: -5,
        fort: -5,
        ref: -5,
        will: -5,
      },
      descriptions: [
        'The creature is helpless',
        'The creature takes a −5 penalty to all defenses',
        'The creature can’t take actions',
        'The creature falls prone, if possible',
        'The creature can’t flank an enemy',
        'The creature is unaware of its surroundings',
      ],
    },
    20: {
      id: 20,
      title: 'Weakened',
      chained: [],
      modifiers: {},
      descriptions: [
        'The creature attacks deal half damage. However, two kinds of damage that creature deal are not affected: ongoing damage, and damage that is not generated by an attack roll',
      ],
    },
  },
};
