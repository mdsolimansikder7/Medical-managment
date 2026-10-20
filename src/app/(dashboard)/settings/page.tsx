import type { Metadata } from "next";

import { SettingsView } from "@/components/settings/settings-view";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage appearance, notifications, regional preferences and security.",
};

export default function SettingsPage() {
  return <SettingsView />;
}
