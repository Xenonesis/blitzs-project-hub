import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Hire Us" },
  { href: "/how-to-use", label: "Guide" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
              Blitzs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 relative",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 focus:outline-none hover:bg-muted/50 rounded-lg p-1 pr-3 transition-colors duration-200">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.full_name || user.email}
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-transparent focus:ring-primary/50 transition-all duration-200"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium ring-2 ring-transparent focus:ring-primary/50 transition-all duration-200">
                          {user.full_name
                            ? user.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("")
                            : user.email?.split("@")[0].slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm hidden md:inline text-foreground font-medium">
                        {user.full_name || user.email?.split("@")[0]}
                      </span>
                      <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="truncate">
                      {user.full_name || user.email}
                    </DropdownMenuLabel>
                    <div className="px-3 py-1.5 text-xs text-muted-foreground truncate">
                      {user.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/user-dashboard" className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary/60" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary/60" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings#avatar" className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary/60" />
                        Change Avatar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/add-project" className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary/60" />
                        Add Project
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin-dashboard" className="flex items-center gap-2 font-medium">
                            <div className="h-2 w-2 rounded-full bg-amber-500" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onSelect={() => signOut()}
                      className="text-red-600 focus:text-red-600"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild className="hover:bg-muted/50">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="shadow-sm">
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-muted/50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] py-4" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="pt-4 space-y-2 border-t mt-4">
              <div className="px-4 py-2">
                <div className="text-sm font-medium truncate">
                  {user.full_name || user.email?.split("@")[0]}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {user.email}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-md hover:bg-muted transition-colors duration-200">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.full_name || user.email}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                        {user.full_name
                          ? user.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("")
                          : user.email?.split("@")[0].slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium">Menu Options</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  <DropdownMenuItem asChild>
                    <Link to="/user-dashboard" onClick={() => setIsOpen(false)}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" onClick={() => setIsOpen(false)}>
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings#avatar" onClick={() => setIsOpen(false)}>
                      Change Avatar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/add-project" onClick={() => setIsOpen(false)}>
                      Add Project
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin-dashboard" onClick={() => setIsOpen(false)}>
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="text-red-600 focus:text-red-600"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="pt-4 space-y-2 border-t mt-4">
              <Button
                variant="ghost"
                asChild
                className="w-full justify-start hover:bg-muted/50"
              >
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild className="w-full shadow-sm">
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
