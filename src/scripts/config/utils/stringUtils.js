import _ from "lodash";

_.mixin({
  withoutNonAsciiChars: (str) => _.deburr(str).replace(/[^\x00-\x7F]/g, ""),
  escapeForRegExp: (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
});
