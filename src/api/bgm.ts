import { apiClient } from './client'
import type { BGMTrack } from '../types'

export async function fetchPublicBgmApi(): Promise<BGMTrack[]> {
  const response = await apiClient.get<BGMTrack[]>('/bgm')
  return response.data
}
