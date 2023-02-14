import React, { useContext, useState } from "react";
import { UserContext } from "@/context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "@/utils/erroresFirebase";
import FormError from "@/components/FormError";
import { formValidate } from "@/utils/formValidate";
import FormInput from "@/components/FormInput";
import Title from "@/components/Title";
import Button from "@/components/Button";

import { useFirestoreName } from "@/hooks/useFirestoreName";

const Register = () => {
  const navegate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const { addData } = useFirestoreName();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({});

  const onSubmit = async ({ email, password, userName }) => {
    try {
      setLoading(true);
      await registerUser(email, password);

      console.log("Usuario Creado");
      await addData(userName);

      navegate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title text="Conviertete en miembro de Ingravity Roller" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Nombre"
          type="text"
          placeholder="Ingresa tu nombre"
          {...register("userName", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>
        <FormInput
          type="email"
          placeholder="Ingrese tu correo"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingresa tu contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Contraseña"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Confirma contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Confirma contraseña"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>
        <div className="flex items-center justify-center">
          <Button type="submit" text="Crear Usuario" loading={loading} />
        </div>
      </form>
    </>
  );
};

export default Register;
