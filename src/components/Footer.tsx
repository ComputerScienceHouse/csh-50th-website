import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <span className="text-2xl font-display font-bold text-gradient">CSH 50th Anniversary Weekend</span>
            <p className="mt-4 text-muted-foreground max-w-md">
              Celebrating 50 years of Computer Science House.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Computer Science House
          </p>
        </div>
      </div>
    </footer>
  );
}
