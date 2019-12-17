/* eslint-disable @typescript-eslint/explicit-function-return-type */
const records = [
  { id: 1, username: 'cws', password: 'region473', displayName: 'CWS' },
  { id: 2, username: 'monash', password: 'citycouncil', displayName: 'Monash' },
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    const idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
};

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (let i = 0, len = records.length; i < len; i++) {
      const record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};
