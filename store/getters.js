export default () => ({
    // implement sortMatches
    sortMatches: state => [...state.matches].sort((a, b) => b.match_date - a.match_date),

  })