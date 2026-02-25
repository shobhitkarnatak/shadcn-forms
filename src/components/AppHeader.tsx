import { HeaderInformation } from "@/data/components";
import { SidebarTrigger } from "./ui/sidebar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AppHeader() {
  const location = useLocation()
  const [headerInfo, setHeaderInfo] = useState("");

  useEffect(() => {
    for (let i = 0; i <= 4; i++) {
      if (location?.pathname?.includes(HeaderInformation[i]?.name)) {
        setHeaderInfo(HeaderInformation[i]?.text);
        break;
      }
    }
  })

  return (
    <header className="flex h-12 items-center gap-3 border-b bg-card px-4">
      <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
      <div className="flex items-center gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 ">
            <p>{headerInfo}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
