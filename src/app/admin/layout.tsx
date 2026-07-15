export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      {children}
    </div>
  );
}
