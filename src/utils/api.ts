// API client for Skill Seekers backend

import type { Config, ConfigsResponse, CategoriesResponse, FilterOptions } from './types';

const API_BASE = 'https://api.skillseekersweb.com';

/**
 * Fetch all configs with optional filters
 */
export async function fetchConfigs(filters?: FilterOptions): Promise<Config[]> {
  try {
    const params = new URLSearchParams();

    if (filters?.category) params.append('category', filters.category);
    if (filters?.tag) params.append('tag', filters.tag);
    if (filters?.type) params.append('type', filters.type);

    const url = `${API_BASE}/api/configs${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch configs: ${response.statusText}`);
    }

    const data: ConfigsResponse = await response.json();
    return data.configs;
  } catch (error) {
    console.error('Error fetching configs:', error);
    throw error;
  }
}

/**
 * Fetch a specific config by name
 */
export async function fetchConfigByName(name: string): Promise<Config> {
  try {
    const response = await fetch(`${API_BASE}/api/configs/${name}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch config: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching config ${name}:`, error);
    throw error;
  }
}

/**
 * Fetch all categories with counts
 */
export async function fetchCategories(): Promise<Record<string, number>> {
  try {
    const response = await fetch(`${API_BASE}/api/categories`);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    const data: CategoriesResponse = await response.json();
    return data.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Download a config file
 */
export function getDownloadUrl(configName: string): string {
  return `${API_BASE}/api/download/${configName}`;
}

/**
 * Client-side filtering for configs
 */
export function filterConfigs(configs: Config[], filters: FilterOptions): Config[] {
  let filtered = [...configs];

  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(config => config.category === filters.category);
  }

  // Filter by tag
  if (filters.tag) {
    filtered = filtered.filter(config => config.tags.includes(filters.tag!));
  }

  // Filter by type
  if (filters.type) {
    filtered = filtered.filter(config => config.type === filters.type);
  }

  // Filter by search query
  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(config =>
      config.name.toLowerCase().includes(query) ||
      config.description.toLowerCase().includes(query) ||
      config.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  return filtered;
}

/**
 * Extract unique tags from configs
 */
export function extractUniqueTags(configs: Config[]): string[] {
  const tagSet = new Set<string>();
  configs.forEach(config => {
    config.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
