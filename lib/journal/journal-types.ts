export type JournalEntryType =
  | "reflection"
  | "observation"
  | "freeform"
  | "practice"
  | "question"
  | "discovery";

export type JournalEntry = {
  id: string;
  type: JournalEntryType;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  linkedLesson?: string;
  linkedAethyr?: string;
  linkedCall?: number;
  mood?: string;
};

export type JournalStore = {
  entries: JournalEntry[];
};
