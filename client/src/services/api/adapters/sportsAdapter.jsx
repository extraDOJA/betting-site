import { API_ENDPOINTS } from "../config";
import { ApiClient } from "../core/apiClient";

// Define the URLs for the sport endpoints
const SPORTS_URLS = {
  POPULAR_LEAGUES: "/leagues/popular/",
  LEAGUES: "/leagues/",
  POPULAR_MATCHES: "/matches/popular/",
  BET: "/bet/",
  BETS: "/bets/",
  VALIDATE_BETS: "/bets/validate/",
};

// Create the SportAdapter class
class SportsAdapter {
  constructor() {
    this.client = new ApiClient(API_ENDPOINTS.SPORTS);
  }

  async getPopularLeagues() {
    return this.client.get(SPORTS_URLS.POPULAR_LEAGUES);
  }

  async getSportsWithLeagues() {
    return this.client.get(SPORTS_URLS.LEAGUES);
  }

  async getPopularMatches() {
    return this.client.get(SPORTS_URLS.POPULAR_MATCHES);
  }

  async getUserBets(statusFilter, page = 1, pageSize = 5) {
    const params = { page, page_size: pageSize };
    if (statusFilter) params.status = statusFilter;
    return this.client.get(SPORTS_URLS.BETS, params);
  }

  async createBetSlip(betSlipData) {
    return this.client.post(SPORTS_URLS.BET, betSlipData);
  }

  async validateBetsAvailability(betSlipData) {
    return this.client.post(SPORTS_URLS.VALIDATE_BETS, betSlipData);
  }

  async getLeagueDetails(leagueSlug) {
    return this.client.get(`${SPORTS_URLS.LEAGUES}${leagueSlug}/`);
  }

  async getLeagueMatches(leagueSlug) {
    return this.client.get(`${SPORTS_URLS.LEAGUES}${leagueSlug}/matches/`);
  }
}

export const sportsAdapter = new SportsAdapter();
