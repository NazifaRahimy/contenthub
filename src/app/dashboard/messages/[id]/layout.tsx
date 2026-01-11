import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message Details",
  description: "Read and manage a specific user message.",
};

export default function MessageDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

