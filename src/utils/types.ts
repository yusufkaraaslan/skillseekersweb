// TypeScript types for Skill Seekers API

export interface Config {
  name: string;
  description: string;
  type: 'single-source' | 'unified';
  category: string;
  tags: string[];
  primary_source: string;
  max_pages: number | null;
  file_size: number;
  last_updated: string;
  download_url: string;
  config_file: string;
}

export interface ConfigsResponse {
  version: string;
  total: number;
  filters: Record<string, string> | null;
  configs: Config[];
}

export interface CategoriesResponse {
  total_categories: number;
  categories: Record<string, number>;
}

export interface ApiError {
  detail: string;
}

export type ViewMode = 'grid' | 'list';

export interface FilterOptions {
  category?: string;
  tag?: string;
  type?: 'single-source' | 'unified';
  search?: string;
}
