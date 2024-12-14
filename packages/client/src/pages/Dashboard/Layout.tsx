import { Outlet } from "react-router-dom";
import { NavbarDashboard } from "@/components/NavbarDashboard.tsx";

export function LayoutDash() {
  return (
    <div >
      <div className="container mx-auto px-4 py-8">
        {window.location.pathname.startsWith('/dashboard') && <NavbarDashboard />}
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
