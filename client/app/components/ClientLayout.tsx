"use client";
import { usePathname } from "next/navigation";
import { NavBar } from "./index";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const noNavbarRoutes = ["/login", "/signup"];

  return (
    <div className="kanit-regular">
      <section className="p-7 md:px-10 lg:px-14 bg-azure-blue md:bg-cotton-white">
        {!noNavbarRoutes.includes(pathname) && <NavBar />}
      </section>
      {children}
    </div>
  );
}

export default ClientLayout
