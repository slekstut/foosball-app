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
   //setTrendingPlayers
    setTrendingPlayers(state, trendingPlayerData) {
        state.trendingPlayer = trendingPlayerData;
    },
    setModalInputsForEdit(state, team) {
        state.team.teamName = team.teamName;
        state.team.player1.name = team.player1.name;
        state.team.player2.name = team.player2.name;
        state.team.teamLogoUrl = team.teamLogoUrl;
    },
    setModalTitle(state, title) {
        state.modalTitle = title;
    },
    setTeam(state, team) {
        state.team = team;
    },
    triggerEdit(state, condition) {
        state.triggeredEditModal = condition;
    },
    updateTeamName(state, value) {
        state.team.teamName = value;
    },
    updateTeamPlayer1Name(state, value) {
        state.team.player1.name = value;
    },
    updateTeamPlayer2Name(state, value) {
        state.team.player2.name = value;
    },
    updateTeamLogoUrl(state, value) {
        state.team.teamLogoUrl = value;
    }
}