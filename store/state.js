export default () => ({
    showModal: false,
    showGameModal: false,
    team: {
        teamName: '',
        player1: {
            name: '',
            score: 0
        },
        player2: {
            name: '',
            score: 0
        },
        score: '',
        createdAt: '',
        updatedAt: '',
        teamLogoUrl: '',
        teamLogo: '',
        wins: 0,
        losses: 0,
        teamScore: 0,
        id: '',
        teamId: '',
        
    },
    teams: [],
    newPlayers: [],
    match: {},
    matches: [],
    sortedMatches: [],
    trendingPlayer: [],
    modalTitle: '',
    editModalIsOpen: false,
    user: {
        uid: '',
        email: '',
        displayName: '',
        photoURL: '',
        emailVerified: false
    }
  })