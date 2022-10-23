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
        createdAt: ''
    },
    teams: [],
    newPlayers: [],
    match: {},
    matches: [],
    sortedMatches: [],
    trendingPlayerName: null,
    trendingPlayerScore: 0,
  })