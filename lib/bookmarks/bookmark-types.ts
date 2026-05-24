export type Bookmark = {
  id: string;
  title: string;
  href: string;
  savedAt: string;
};

export type BookmarkStore = {
  items: Bookmark[];
};

export const BOOKMARK_STORAGE_KEY = "celestial-archive-bookmarks";
