export const formatBet = (betType, matchDetails) => ({
  betType,
  homeTeam: matchDetails.home_team,
  awayTeam: matchDetails.away_team,
  odds: betType === "home" ? matchDetails.home_win_odds : betType === "away" ? matchDetails.away_win_odds : matchDetails.draw_odds,
});
