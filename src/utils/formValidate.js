export const formValidate = (getValues) => {
  return {
    required: {
      value: true,
      message: "Campo obligatorio",
    },
    pattern: {
      message: "Formato de email inorrecto",
    },
    minLength: {
      value: 6,
      message: "Mínimo 6 carácteres",
    },

    validateTrim: {
      trim: (v) => {
        if (!v.trim()) {
          return "No se permiten espacios en blanco, escribe algo";
        }
        return true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => v === value || "No coinciden las contraseñas",
      };
    },
  };
};
