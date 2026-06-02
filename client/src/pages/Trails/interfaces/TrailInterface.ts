export interface TrailTag {
  name?: string;
  photos?: string[];
  distance?: string;
  difficulty?: string;
  sac_scale?: string;
  network?: string;
  website?: string;
  operator?: string;
  ascent?: string;
  description?: string;
}

export interface RoutePoint {
  lat: number;
  lon: number;
}

export interface Trail {
  id: number;
  type: string;
  tags: TrailTag;
  geometry: RoutePoint[];
}

export interface TrailCardProps {
  trail: Trail;
}
