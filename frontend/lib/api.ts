import axios from 'axios';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('fms_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('fms_token');
      localStorage.removeItem('fms_admin');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export const login = (data: object) => api.post('/auth/login', data);
export const register = (data: object) => api.post('/auth/register', data);
export const getMe = () => api.get('/auth/me');

export const getDashboard = () => api.get('/dashboard');

export const getTeams = () => api.get('/teams');
export const createTeam = (data: object) => api.post('/teams', data);
export const updateTeam = (id: string, data: object) => api.put(`/teams/${id}`, data);
export const deleteTeam = (id: string) => api.delete(`/teams/${id}`);

export const getPlayers = () => api.get('/players');
export const getPlayersByTeam = (teamId: string) => api.get(`/players/team/${teamId}`);
export const createPlayer = (data: object) => api.post('/players', data);
export const updatePlayer = (id: string, data: object) => api.put(`/players/${id}`, data);
export const deletePlayer = (id: string) => api.delete(`/players/${id}`);

export const getMatches = () => api.get('/matches');
export const createMatch = (data: object) => api.post('/matches', data);
export const updateMatch = (id: string, data: object) => api.put(`/matches/${id}`, data);
export const deleteMatch = (id: string) => api.delete(`/matches/${id}`);

export const getLeagues = () => api.get('/leagues');
export const createLeague = (data: object) => api.post('/leagues', data);
export const updateLeague = (id: string, data: object) => api.put(`/leagues/${id}`, data);
export const deleteLeague = (id: string) => api.delete(`/leagues/${id}`);
