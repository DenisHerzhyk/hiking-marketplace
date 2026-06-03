import { LatLngTuple } from "leaflet";

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
  startLat?: number;
  startLon?: number;
  endLat?: number;
  endLon?: number;
}

export interface Trail {
  id: number;
  type: string;
  tags: TrailTag;
  geometry: LatLngTuple[];
}

export interface TrailCardProps {
  trail: Trail;
}
