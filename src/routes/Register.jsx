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
import ButtonLoading from "@/components/ButtonLoading";

const Register = () => {
  const navegate = useNavigate();
  const { registerUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "bryan1@test.com",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password);
      console.log("Usuario Creado");
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
      <Title text="Register" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese password"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingresa tu password"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Confirme password"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repite contraseña"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>
        {loading ? <ButtonLoading /> : <Button type="submit" text="Register" />}
      </form>
    </>
  );
};

export default Register;
