import {
  Match
} from 'meteor/check';

const hasKey = (arrKeys, key) => arrKeys.indexOf(key) >= 0;

const isNotType = (val, type) => typeof val !== type;

const pattern = (session) => {
  if (!Match.test(session, Object))
    return false;

  const strVars = ['_id', 'durationText', 'starteTime', 'endTime'],
    dtVars = ['started', 'ended'];
  let k;
  for (k in session) {
    switch (true) {
    case k === 'position' && hasKey(['RIGHT', 'LEFT'], session[k]):
    case hasKey(dtVars, k) && !(session[k] instanceof Date):
    case hasKey(strVars, k) && isNotType(session[k], 'string'):
      return false;
    }
  }
  return true;
};

export default pattern;
