import { createContext, useReducer } from "react";

const init = {
  name: undefined,
  add: 0,
};
export const ClickMe = createContext(init);

const ClickReducer = (state, action) => {
  switch (action.type) {
    case "notclick":
      return {
        name: undefined,
        add: 0,
      };
    case "click":
      return {
        name: action.payload.name,
        add: action.payload.add,
      };
    default:
      return state;
  }
};

export const ClickMeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClickReducer, init);

  return (
    <ClickMe.Provider value={{ state, dispatch}}>
      {children}
    </ClickMe.Provider>
  );
};
