import React from "react";
import SideBar from "./components/SideBar";
import CategoryCard from './components/CategoryCard';

const homepage = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="bg-white">
        <CategoryCard />
      </div>
    </div>
  );
};

export default homepage;
