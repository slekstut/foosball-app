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
    // updateTeamPlayersScore
    // updateTeamPlayersScore(state, { teamName, player, score }) {
    //     state.teamName[player].score = score;

    // },

    setNewPlayers(state, newPlayer) {
        state.newPlayers = newPlayer;
    },
    setNewMatch(state, match) {
        state.match = match;
    },
    setMatches(state, matches) {
        state.matches = matches;
    },
    // sort matches by date
    sortMatches(state, sortedMatches) {
       state.sortMatches = sortedMatches;
    },
    getTrendingPlayer(state, trendingPlayer) {
        state.trendingPlayerName = trendingPlayer.name;
        state.trendingPlayerScore = trendingPlayer.score;
    }
    
}