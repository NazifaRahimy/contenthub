import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages ",
  description: "View and manage unread user messages in ContentHub.",
};

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
