_.mixin({
  withoutNonAsciiChars: (str) => str.replace(/[^\x00-\x7F]/g, "")
});
