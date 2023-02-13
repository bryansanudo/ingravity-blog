import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import { useFirestore } from "@/hooks/useFirestore";
import Button from "@/components/Button";
import { auth } from "@/firebase";
import { formValidate } from "@/utils/formValidate";
import FormInput from "@/components/FormInput";
import FormError from "@/components/FormError";
import { erroresFirebase } from "@/utils/erroresFirebase";

import { useForm } from "react-hook-form";

const Home = () => {
  const { required, patternEmail } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setError,
    setValue,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();

  const [newOriginId, setNewOriginId] = useState();

  useEffect(() => {
    console.log("getData");
    getData();
  }, []);

  if (loading.getData) return <p>Loading data getData...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginId) {
        await updateData(newOriginId, url);
        setNewOriginId("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginId(item.nanoid);
  };

  return (
    <>
      <Title text="Home" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Ingresa url"
          type="text"
          placeholder="Ingrese url"
          {...register("url", {
            required,
            pattern: patternEmail,
          })}
          error={errors.url}
        >
          <FormError error={errors.email} />
        </FormInput>

        {newOriginId ? (
          <Button
            type="submit"
            text="edit url"
            color="red"
            loading={loading.updateData}
          />
        ) : (
          <Button
            type="submit"
            text="add url"
            color="red"
            loading={loading.addData}
          />
        )}
      </form>

      {data.map((item) => (
        <div
          key={item.nanoid}
          className="p-6  bg-white rounded-lg border border-gray-200  dark:bg-gray-800 dark:border-gray-700"
        >
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.nanoid}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {item.origin}
          </p>

          <div className=" flex gap-2">
            {auth.currentUser.uid === item.uid ? (
              <>
                <Button
                  type="button"
                  text="delete"
                  color="red"
                  loading={loading[item.nanoid]}
                  onClick={() => handleClickDelete(item.nanoid)}
                />
                <Button
                  type="button"
                  text="Edit"
                  color="red"
                  onClick={() => handleClickEdit(item)}
                />
              </>
            ) : (
              <p>hola</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
