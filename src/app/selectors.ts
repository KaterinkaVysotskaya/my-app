import {AppStoreType} from "./store";
import {useAppSelector} from "../common/hooks/react-redux-hooks";
import {useSelector} from "react-redux";

export const selectProfile = (state: AppStoreType) => state.profile
export const State = () => {
  const profile = useSelector(selectProfile)
}
