"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { useAuth } from "@/lib/auth/auth-context";
import {
  BOOKMARK_STORAGE_KEY,
  type Bookmark,
  type BookmarkStore
} from "@/lib/bookmarks/bookmark-types";
import { createClientIfConfigured } from "@/lib/supabase/client";
import {
  addBookmark as addBookmarkRemote,
  fetchBookmarks,
  removeBookmark as removeBookmarkRemote
} from "@/lib/supabase/celestial-db";

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  addBookmark: (title: string, href: string) => Bookmark;
  removeBookmark: (id: string) => void;
  isBookmarked: (href: string) => boolean;
  toggleBookmark: (title: string, href: string) => void;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

function loadBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(BOOKMARK_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BookmarkStore;
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
}

function saveBookmarks(bookmarks: Bookmark[]) {
  localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify({ items: bookmarks }));
}

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const cloudReady = useRef(false);

  useEffect(() => {
    setBookmarks(loadBookmarks());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const supabase = createClientIfConfigured();
    if (!user || !supabase) {
      cloudReady.current = false;
      setBookmarks(loadBookmarks());
      return;
    }

    let cancelled = false;
    cloudReady.current = false;

    (async () => {
      try {
        const remote = await fetchBookmarks(supabase, user.id);
        const local = loadBookmarks();
        if (cancelled) return;

        const byHref = new Map<string, Bookmark>();
        for (const b of remote) {
          byHref.set(b.href, {
            id: b.id,
            title: b.title,
            href: b.href,
            savedAt: b.savedAt
          });
        }
        for (const b of local) {
          if (!byHref.has(b.href)) {
            const saved = await addBookmarkRemote(supabase, user.id, {
              title: b.title,
              href: b.href
            });
            byHref.set(saved.href, {
              id: saved.id,
              title: saved.title,
              href: saved.href,
              savedAt: saved.savedAt
            });
          }
        }
        const merged = Array.from(byHref.values()).sort(
          (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
        );
        setBookmarks(merged);
        saveBookmarks(merged);
        cloudReady.current = true;
      } catch {
        setBookmarks(loadBookmarks());
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (user && !cloudReady.current) return;
    saveBookmarks(bookmarks);
  }, [bookmarks, hydrated, user]);

  const addBookmark = useCallback(
    (title: string, href: string) => {
      const localEntry: Bookmark = {
        id: crypto.randomUUID(),
        title,
        href,
        savedAt: new Date().toISOString()
      };

      setBookmarks((b) => {
        if (b.some((x) => x.href === href)) return b;
        return [localEntry, ...b];
      });

      const supabase = createClientIfConfigured();
      if (user && supabase && cloudReady.current) {
        void addBookmarkRemote(supabase, user.id, { title, href })
          .then((saved) => {
            setBookmarks((b) =>
              b.map((x) => (x.href === href ? { ...x, id: saved.id, savedAt: saved.savedAt } : x))
            );
          })
          .catch(() => {});
      }

      return localEntry;
    },
    [user]
  );

  const removeBookmark = useCallback(
    (id: string) => {
      setBookmarks((b) => {
        const target = b.find((x) => x.id === id);
        const supabase = createClientIfConfigured();
        if (user && supabase && cloudReady.current && target) {
          void removeBookmarkRemote(supabase, user.id, target.href).catch(() => {});
        }
        return b.filter((x) => x.id !== id);
      });
    },
    [user]
  );

  const isBookmarked = useCallback(
    (href: string) => bookmarks.some((b) => b.href === href),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (title: string, href: string) => {
      const existing = bookmarks.find((b) => b.href === href);
      if (existing) {
        removeBookmark(existing.id);
      } else {
        addBookmark(title, href);
      }
    },
    [bookmarks, addBookmark, removeBookmark]
  );

  const value = useMemo(
    () => ({ bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark }),
    [bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark]
  );

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarkProvider");
  return ctx;
}
