import NavBar from "./navbar";
import Footer from "./footer";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="grow px-4 md:px-12 lg:px-20">{children}</main>
      <Footer />
    </div>
  );
}
