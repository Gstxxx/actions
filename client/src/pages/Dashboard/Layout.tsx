import { Outlet } from "react-router-dom";

export function LayoutDash() {
  return (
    <div >
      <main>
        <Outlet />
      </main>
    </div>
  )
}
