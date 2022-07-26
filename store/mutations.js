export default{
    toggleModal(state){
        state.showModal = !state.showModal;
    },
    toggleGameModal(state){
        state.showGameModal = !state.showGameModal;
    },
    setNewTeam(state, team){
        state.newTeam = team;
    },
    // fetchTeams
    setTeams(state, teams){
        state.teams = teams;
        console.log(teams)
    }

  }