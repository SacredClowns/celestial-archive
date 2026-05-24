import { AppChromeClient } from "@/components/layout/app-chrome-client";

export function AppChrome({ children }: { children: React.ReactNode }) {
  return <AppChromeClient>{children}</AppChromeClient>;
}
