/** Seeker data lives in the partitioned `enochia` schema (not `public`). */
export const CELESTIAL_DB_SCHEMA = "enochia" as const;

export const celestialDbOptions = {
  db: { schema: CELESTIAL_DB_SCHEMA }
} as const;
