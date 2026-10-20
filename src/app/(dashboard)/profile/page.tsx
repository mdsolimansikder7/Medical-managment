import type { Metadata } from "next";

import { ProfileView } from "@/components/profile/profile-view";

export const metadata: Metadata = {
  title: "My profile",
  description: "Manage your MediCare profile, password and active sessions.",
};

export default function ProfilePage() {
  return <ProfileView />;
}
