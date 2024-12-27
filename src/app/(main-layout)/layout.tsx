import Navigation from "@/components/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  );
}
