/* eslint-disable no-shadow, no-console */

const state = {
  combatants: {
    1: {
      id: 1,
      name: 'Mob 1',
      initiative: 17,
      ac: 20,
      fort: 20,
      ref: 20,
      will: 20,
      thp: 0,
      hp: 50,
      target: false,
      hit: false,
      effects: [],
      card: {
        path: 'url Mob 1',
      },
      isPlayer: false,
    },
    2: {
      id: 2,
      name: 'Mob 2',
      initiative: 8,
      ac: 20,
      fort: 20,
      ref: 20,
      will: 20,
      thp: 0,
      hp: 50,
      target: false,
      hit: false,
      effects: [],
      card: {
        path: 'url Mob 2',
      },
      isPlayer: false,
    },
    3: {
      id: 3,
      name: 'Mob 3',
      initiative: 16,
      ac: 15,
      fort: 15,
      ref: 15,
      will: 15,
      thp: 0,
      hp: 25,
      target: false,
      hit: false,
      effects: [],
      card: {
        path: 'url Mob 3',
      },
      isPlayer: false,
    },
    nerilee: {
      id: 'nerilee',
      name: 'Nerilee',
      initiative: 17,
      ac: 15,
      fort: 15,
      ref: 15,
      will: 15,
      thp: 0,
      hp: 25,
      target: false,
      hit: false,
      effects: [],
      card: {
        path: 'url Mob 3',
      },
      isPlayer: true,
    },
  },
  cardUrl: '',
  turn: 0,
};

const getters = {
  combatants: state => Object.values(state.combatants),
  // sort by initiative, if it equals - set player first
  sortedCombatants: (state, getters) =>
    getters.combatants
      .slice(0)
      .sort((a, b) => b.initiative - a.initiative || b.isPlayer - a.isPlayer),
  targets: (state, getters) => getters.combatants.filter(c => c.target),
  hit: (state, getters) => getters.targets.filter(c => c.hit),
  miss: (state, getters) => getters.targets.filter(c => !c.hit),
};

const mutations = {
  nextTurn(state) {
    state.turn++; // eslint-disable-line no-plusplus
  },
  updateCombatant(state, { target, key, value }) {
    state.combatants[target][key] = value;
  },
  setInitiative(state, { id, value }) {
    state.combatants[id].initiative = parseInt(value, 10);
  },
  setTarget(state, { id, value }) {
    state.combatants[id].target = value;
    if (!value) state.combatants[id].hit = false;
  },
  setHit(state, { id, value }) {
    if (value) state.combatants[id].target = true;
    state.combatants[id].hit = value;
  },
  setCardUrl(state, { url }) {
    state.cardUrl = url;
  },
};

export default {
  state,
  getters,
  mutations,
};
