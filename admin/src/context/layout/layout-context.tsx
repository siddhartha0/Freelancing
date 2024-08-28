import React, { createContext, useContext, useState } from "react";

interface contextPropTypes {
  children: React.ReactNode;
}

interface layoutcontextPropTypes {
  sidebarStatus: boolean;
  setSidebarStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const layoutContext = createContext<layoutcontextPropTypes | null>(null);

export const UseLayoutContext = React.memo(({ children }: contextPropTypes) => {
  const [sidebarStatus, setSidebarStatus] = useState(true);

  return (
    <layoutContext.Provider value={{ sidebarStatus, setSidebarStatus }}>
      {children}
    </layoutContext.Provider>
  );
});

export const useLayoutContent = () => {
  const context = useContext(layoutContext);
  return context;
};
