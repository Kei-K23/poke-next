import Navigation from "@/components/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navigation />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </main>
  );
}
