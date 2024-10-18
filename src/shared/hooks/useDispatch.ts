import { useContext } from "react";
import { StoreContext, StoreContextType } from "@/shared/providers";

export const useDispatch = (): StoreContextType["dispatch"] => {
  const { dispatch } = useContext(StoreContext);

  return dispatch;
};
