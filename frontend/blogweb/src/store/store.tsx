import create from "zustand";

type Store = {
    currentUser: Object;
    setCurrentUser: (user: Object) => void;
  };
  
  const useStore = create<Store>((set) => ({
    currentUser: {},
    setCurrentUser: (user: Object) =>
      set((state) => ({
        ...state,
        currentUser: user
      })),
  }));
  
  export default useStore;