const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

function getAccessToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('accessToken')
}

async function request(path: string, opts: RequestInit = {}) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  const token = getAccessToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers,
    ...opts,
  })

  if (res.status === 401) {
    // unauthorized — clear tokens
    if (typeof window !== 'undefined') localStorage.removeItem('accessToken')
    throw new Error('Unauthorized')
  }

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }

  // Some endpoints return empty 204
  if (res.status === 204) return null
  return res.json()
}

export function setTokens(access: string, refresh?: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem('accessToken', access)
  if (refresh) localStorage.setItem('refreshToken', refresh)
}

export function logout() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export async function getFighters(params?: { page?: number; search?: string }) {
  const qs = new URLSearchParams()
  if (params?.page) qs.set('page', String(params.page))
  if (params?.search) qs.set('search', params.search)
  const suffix = qs.toString() ? `?${qs.toString()}` : ''
  return request(`/fighters/${suffix}`)
}

export async function getFighter(id: number) {
  return request(`/fighters/${id}/`)
}

export async function login(username: string, password: string) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
  // expect JWT pair
  if (data && data.access) setTokens(data.access, data.refresh)
  return data
}

export async function register(username: string, password: string, email?: string) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, email }),
  })
}

export async function me() {
  return request('/auth/me')
}

export async function getEvents() {
  return request('/events/')
}

export async function getTeam() {
  return request('/teams/my/')
}

export async function updateTeam(payload: any) {
  return request('/teams/update/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getStandings(leagueId: number) {
  return request(`/scoring/league/${leagueId}/`)
}

export async function getLeagues() {
  return request('/leagues/')
}

export async function createLeague(payload: { name: string; is_public?: boolean }) {
  return request('/leagues/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function joinLeague(leagueId: number) {
  return request(`/leagues/${leagueId}/join/`, {
    method: 'POST',
  })
}

export async function createTeam(leagueId: number, fighterIds: number[] = []) {
  return request('/teams/create/', {
    method: 'POST',
    body: JSON.stringify({ league_id: leagueId, fighter_ids: fighterIds }),
  })
}
