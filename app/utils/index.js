export const dotEnd = (value, min, max, component) => {
    if (value.toString().length > max) {
      return value.toString().substring(min, max) + component;
    } else {
      return value.toString();
    }
  };
  