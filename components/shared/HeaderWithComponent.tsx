import React from "react";

const HeaderWithComponent = ({
  title = "dashboard",
  rightComponent,
}: {
  title: string;
  rightComponent: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      {rightComponent}
    </div>
  );
};

export default HeaderWithComponent;
