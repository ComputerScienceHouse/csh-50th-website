import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <span className="text-2xl font-display font-bold text-gradient">CSH 50th Weekend</span>
            <p className="mt-4 text-muted-foreground max-w-md">
              Celebrating 50 years of Computer Science House.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Live Home
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-muted-foreground hover:text-foreground transition-colors">
                  Timeline
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Events
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ticket Deck
                </Link>
              </li>
              <li>
                <a
                  href="/registration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Registration
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Computer Science House Reunion Weekend.
          </p>
        </div>
      </div>
    </footer>
  );
}
