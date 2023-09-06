export const validationSchema = {
  projectName: {
    isRequired: {
      message: "Имя проекта обязательно для заполнения",
    },
  },

  level: {
    isRequired: {
      message: "Выберите вариант сложности",
    },
  },
  priority: {
    isRequired: {
      message: "Укажите, хотите ли Вы выполнить задачу как можно раньше",
    },
  },
  agreement: {
    isContainValue: {
      message: "Согласие на обработку данных обязательно",
      param: "1",
    },
  },
};
