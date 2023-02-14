import React, { useContext, useState } from "react";
import { UserContext } from "@/context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "@/utils/erroresFirebase";
import { formValidate } from "@/utils/formValidate";

import FormError from "@/components/FormError";
import FormInput from "@/components/FormInput";
import Title from "@/components/Title";
import Button from "@/components/Button";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navegate = useNavigate();
  const { required, patternEmail, minLength, validateTrim } = formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },

    setError,
  } = useForm({});

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await loginUser(email, password);

      console.log("Usuario Creado");
      navegate("/");
    } catch (error) {
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
      <Title text="Inicio de Sesion" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Usuario"
          type="email"
          placeholder="Ingresa tu correo"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>
        <FormInput
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu Contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <div className="flex items-center justify-center ">
          <Button type="submit" text="Iniciar" loading={loading} />
        </div>
      </form>
    </>
  );
};

export default Login;
