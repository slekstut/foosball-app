export default{
    toggleModal(state){
        state.showModal = !state.showModal;
    },
    closeModal(state){
        state.showModal = false;
        state.showGameModal = false;
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