import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Menu, User } from "lucide-react";

import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { signOutAction } from "@/features/auth/actions/sign-out";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Import the Scroll Wrapper
import { ScrollHeader } from "./scroll-header";

export async function Navbar() {
  const authData = await getCurrentUser();
  const user = authData?.user;

  const displayUsername = user?.username || "Collector";
  const userInitials = displayUsername.substring(0, 2).toUpperCase();

  const handleSignOut = async () => {
    "use server";
    await signOutAction();
    redirect("/");
  };

  return (
    <ScrollHeader>
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer group">
          <div className="flex items-center justify-center transition-transform group-hover:scale-105">
            <Image 
              src="/logo.webp" 
              alt="Passivoo Logo" 
              width={32} 
              height={32} 
              className="object-contain"
              priority 
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-100">
            Passivoo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
                <Avatar className="h-9 w-9 border border-slate-800 hover:border-amber-500/50 transition-colors">
                  <AvatarFallback className="bg-slate-900 text-amber-500 font-medium">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-slate-950 border-slate-800 text-slate-200">
                <div className="px-2 py-1.5 text-sm font-medium text-slate-400">
                  @{displayUsername}
                </div>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-slate-900 focus:text-slate-100">
                  <Link href="/collections" className="w-full">My Passport</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-red-950 focus:text-red-400 text-red-400">
                  <form action={handleSignOut} className="w-full">
                    <button type="submit" className="w-full text-left cursor-pointer">
                      Sign Out
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="text-sm font-medium text-slate-300 hover:text-amber-500 transition-colors cursor-pointer"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="text-sm font-medium h-9 px-4 inline-flex items-center justify-center rounded-md bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all cursor-pointer"
              >
                Create Passport
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Navigation (Sheet) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="p-2 -mr-2 text-slate-300 hover:text-amber-500 transition-colors cursor-pointer focus:outline-none">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-slate-950 border-slate-800 text-slate-200 w-[280px] p-6">
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="text-slate-100 flex items-center gap-2">
                  <Image 
                    src="/logo.webp" 
                    alt="Passivoo Logo" 
                    width={20} 
                    height={20} 
                    className="object-contain"
                  />
                  Passivoo
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                      <Avatar className="h-10 w-10 border border-slate-800">
                        <AvatarFallback className="bg-slate-900 text-amber-500 font-medium">
                            {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-100">@{displayUsername}</span>
                        <span className="text-xs text-slate-500 truncate max-w-[150px]">{user.email}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <Link href="/collections" className="text-sm font-medium text-slate-300 hover:text-amber-500 cursor-pointer">
                        My Passport
                      </Link>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-800">
                      <form action={handleSignOut}>
                        <button type="submit" className="text-sm font-medium text-red-400 hover:text-red-300 cursor-pointer flex items-center gap-2 w-full text-left">
                          <User className="h-4 w-4" />
                          Sign Out
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4 mt-4">
                    <Link 
                      href="/register" 
                      className="w-full h-11 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:from-amber-400 hover:to-amber-500 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    >
                      Create Passport
                    </Link>
                    <Link 
                      href="/login" 
                      className="w-full h-11 inline-flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-200 font-medium hover:border-amber-500/50 hover:text-amber-500 transition-colors cursor-pointer"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
      </div>
    </ScrollHeader>
  );
}