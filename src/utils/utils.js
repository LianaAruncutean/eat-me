export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

export const groupBy = function(list, key) {
  return list.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};