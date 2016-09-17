import moment from 'moment';
export function currentDay(state = {
  _id: moment().format('YYYYMMDD')
}, action){
  return state;
}
