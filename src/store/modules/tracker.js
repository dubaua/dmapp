/* eslint-disable no-shadow, no-console */

const state = {
  combatants: {
    1: {
      id: 1,
      name: "Mob 1",
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
        path: "url"
      }
    },
    2: {
      id: 2,
      name: "Mob 2",
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
        path: "url"
      }
    },
    3: {
      id: 3,
      name: "Mob 3",
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
        path: "url"
      }
    }
  },
  turn: 0
};

const getters = {
  combatants: state => Object.values(state.combatants),
  sortedCombatants: (state, getters) =>
    getters.combatants.slice(0).sort((a, b) => b.initiative - a.initiative),
  targets: (state, getters) => getters.combatants.filter(c => c.target),
  hit: (state, getters) => getters.targets.filter(c => c.hit),
  miss: (state, getters) => getters.targets.filter(c => !c.hit)
};

const mutations = {
  nextTurn(state) {
    state.turn++; // eslint-disable-line no-plusplus
  },
  updateCombatant(state, { target, key, value }) {
    state.combatants[target][key] = value;
  }
};

export default {
  state,
  getters,
  mutations
};
