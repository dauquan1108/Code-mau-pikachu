import { combineReducers} from "redux";
import tasks from './list'

const myReducer = combineReducers({
    tasks,
});

export default myReducer;
