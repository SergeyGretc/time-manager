export const validationSchema = {
  email: {
    isRequired: {
      message: "Электронная почта обязательна для заполнения",
    },
    isEmail: {
      message: "Email введён некорректно",
    },
  },
  name: {
    isRequired: {
      message: "Имя обязательно для заполнения",
    },
    min: {
      message: "Описание должно содержать минимум 2 символа",
      param: 2,
    },
  },
  password: {
    isRequired: {
      message: "Пароль обязателен для заполнения",
    },
    min: {
      message: "Описание должно содержать минимум 8 символов",
      param: 8,
    },
    isCapitalSymbol: {
      message: "Должен быть хотя бы один заглавный символ",
    },
    isContainDigit: {
      message: "Должен быть хотя бы один символ с цифрой",
    },
  },
};
