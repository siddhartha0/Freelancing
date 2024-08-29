import { createContext, useContext, useState } from "react";

interface contextPropTypes {
  children: React.ReactNode;
}

interface layoutcontextPropTypes {
  sidebarStatus: boolean;
  setSidebarStatus: React.Dispatch<React.SetStateAction<boolean>>;
  currentPath: string;
  setCurrentPath: React.Dispatch<React.SetStateAction<string>>;
}

const layoutContext = createContext<layoutcontextPropTypes | null>(null);

export const LayoutContext = ({ children }: contextPropTypes) => {
  const [sidebarStatus, setSidebarStatus] = useState(true);
  const [currentPath, setCurrentPath] = useState("Dashboard");

  return (
    <layoutContext.Provider
      value={{ sidebarStatus, setSidebarStatus, currentPath, setCurrentPath }}
    >
      {children}
    </layoutContext.Provider>
  );
};

export const useLayoutContent = () => {
  const context = useContext(layoutContext);
  return context;
};
