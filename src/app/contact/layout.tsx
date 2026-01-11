import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the ContentHub team for support or inquiries.",
};
export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

