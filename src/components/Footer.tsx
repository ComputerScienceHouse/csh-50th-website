import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="text-2xl font-display font-bold text-gradient">
              CSH 50th Anniversary
            </span>
            <p className="mt-4 text-muted-foreground max-w-md">
              Celebrating 50 years of Computer Science House. 
              Join us for a weekend of memories, connections, and celebration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/schedule" className="text-muted-foreground hover:text-foreground transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hotels & Transport
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* External Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">External</h4>
            <ul className="space-y-2">
              {/* PLACEHOLDER: Replace with actual URLs */}
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
              <li>
                <a 
                  href="https://csh.rit.edu" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  CSH Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Computer Science House. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
