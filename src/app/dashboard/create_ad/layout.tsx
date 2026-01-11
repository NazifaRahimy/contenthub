import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create_Ad",
  description: "Create a new ad or post on ContentHub."
};

export default function CreateAdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
