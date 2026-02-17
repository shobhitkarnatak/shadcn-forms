import { SidebarTrigger } from "./ui/sidebar";

export default function AppHeader() {
  return (
    <header className="flex h-12 items-center gap-3 border-b bg-card px-4">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <div className="flex items-center gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 ">
              <p>Forms</p>
            </div>
          </div>
      </div>
    </header>
  );
}
