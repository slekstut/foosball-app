export default {
    toggleModal(state) {
        state.showModal = !state.showModal;
    },
    closeModal(state) {
        state.showModal = false;
        state.showGameModal = false;
    },
    toggleGameModal(state) {
        state.showGameModal = !state.showGameModal;
    },
    setNewTeam(state, team) {
        state.newTeam = team;
    },
    // fetchTeams
    setTeams(state, teams) {
        state.teams = teams;
    },
    setNewMatch(state, match) {
        state.match = match;
    },
    setMatches(state, matches) {
        state.matches = matches;
    },
    // sort matches by date
    sortMatches(state) {
        state.sortedMatches = [...state.matches].sort(function (a, b) {
            a = a.match_date.split('-').join('');
            b = b.match_date.split('-').join('');
            return a > b ? -1 : a < b ? 1 : 0;
        });

    }
}