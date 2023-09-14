import validateRules from "./validateRules";

export const validate = (values, config) => {
  const errors = {};

  for (const name in values) {
    const validationRules = config[name];
    for (const rule in validationRules) {
      const { message, param } = validationRules[rule];

      const validator = validateRules[rule];

      const hasError = validator && !validator(values[name], param);

      if (hasError) {
        errors[name] = message;
        break;
      }
    }
  }

  return errors;
};
