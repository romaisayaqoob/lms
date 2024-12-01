import Header from "./Header";
import SideBar from "./SideBar";

export default function Layout({ children }) {

  return (
    <div className="flex h-screen">
      <div className="w-64 fixed inset-y-0 z-50">
        <SideBar />
      </div>
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
