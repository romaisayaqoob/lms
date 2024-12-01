// components/SideBar.js
import React from "react";
import { Layout, Mail, Search, Shield } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();

  const menuList = [
    { id: 1, name: "Browse", icon: Search, path: "/browse" },
    { id: 2, name: "Dashboard", icon: Layout, path: "/dashboard" },
    { id: 3, name: "Upgrade", icon: Shield, path: "/upgrade" },
    { id: 4, name: "Newsletter", icon: Mail, path: "/newsletter" },
  ];

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-md">
      <div className="p-5 border-b">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </div>
      <div className="flex flex-col">
        {menuList.map((item) => (
          <div
            key={item.id}
            className="flex gap-2 items-center p-4 px-6 text-gray-500 hover:bg-gray-100 cursor-pointer"
            onClick={() => router.push(item.path)}
          >
            <item.icon />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
