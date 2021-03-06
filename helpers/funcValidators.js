export const isEmpty = value => {
  return (
    typeof value === "undefined" ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && !value.trim().length)
  );
};
export const isString = value => typeof value === "string";
export const isEmailValid = email => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const isAlphanumeric = value => {
  const alphanumericRegex = /^[a-z0-9]+$/i;
  return alphanumericRegex.test(value);
};
