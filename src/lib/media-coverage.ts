/** Client media coverage scans — add images as received (displayed full width, as-is). */
export type MediaCoverageInsert = {
  id: string;
  image: string;
  alt: string;
};

export const MEDIA_COVERAGE_INSERTS: MediaCoverageInsert[] = [];
