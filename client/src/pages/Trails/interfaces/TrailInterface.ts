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

export interface Trail {
  id: number;
  type: string;
  tags: TrailTag;
}

export interface TrailCardProps {
  trail: Trail;
}
