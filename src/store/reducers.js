import {combineReducers} from 'redux';
import {HomeReducer as home} from '../routes/Home/module/home';
import {TrackDriverReducer as trackDriver} from '../components/TrackDriver/module/trackDriver';

export const makeRootReducer = () => {
  console.log(home, 'homeeeeee');
  console.log(trackDriver, 'jajajjaja');
  return combineReducers({
    home,
    trackDriver,
  });
};

export default makeRootReducer;
