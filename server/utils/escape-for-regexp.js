export const escapeForRegexp = string => string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
