"use client";

import { revalidateTasks } from "@/app/actions";
import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import CustomButton from "@/components/common/Button/CustomButton";
import Calendar from "@/components/common/Input/Calender";
import Dropdown, { DropdownOption } from "@/components/common/Input/Dropdown";
import InputField from "@/components/common/Input/InputField";
import { ITask } from "@/interfaces/ITask";
import { createTask, updateTask } from "@/services/task.services";
import { createTaskSchema } from "@/validators/task";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

interface Props {
  task?: ITask;
}

const CreateTask = ({ task }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const status = [
    { label: "Completed", value: "completed" },
    { label: "In Progress", value: "in progress" },
    { label: "Pending", value: "pending" },
    { label: "On Hold", value: "on hold" },
  ];

  const formik = useFormik<Omit<ITask, "id">>({
    initialValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
      dueDate: task ? new Date(task.dueDate) : new Date(),
      status: task ? task.status : "",
    },
    onSubmit: async (values) => {
      mutation.mutate();
    },
    validationSchema: toFormikValidationSchema(createTaskSchema),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      if (task) {
        return await updateTask(formikValues, task.id);
      }

      return await createTask(formikValues);
    },
    onSuccess: async (data) => {
      await revalidateTasks();
      router.push("/");
    },
    onError: (error) => {
      setIsLoading(false);
    },
  });

  const formikValues = formik.values;
  const formikErrors = formik.errors;

  const handleChangeTitle = useCallback((e: any) => {
    formik.setFieldTouched("title", false);
    formik.handleChange(e);
  }, []);

  const handleChangeDescription = useCallback((e: any) => {
    formik.setFieldTouched("description", false);
    formik.handleChange(e);
  }, []);

  const handleSelectStatus = (selected: DropdownOption | null) => {
    formik.setFieldValue("status", selected?.value);
  };

  const handleSelectDate = (selected: Date | null) => {
    formik.setFieldValue("dueDate", selected);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col justify-self-center justify-center gap-2 bg-white rounded-lg p-4"
    >
      <Breadcrumb
        previousPages={[{ text: "Home", url: "/" }]}
        currentPage={task ? "Edit Task" : "Create Task"}
      />

      <InputField
        name="title"
        placeholder="Enter Title"
        value={formikValues.title}
        onChange={handleChangeTitle}
        className=" border-gray-500 mt-4"
        error={
          Boolean(formikErrors.title && formik.touched.title)
            ? formikErrors.title
            : ""
        }
      />

      <InputField
        name="description"
        placeholder="Enter Description"
        value={formikValues.description}
        onChange={handleChangeDescription}
        className=" border-gray-500"
        error={
          Boolean(formikErrors.description && formik.touched.description)
            ? formikErrors.description
            : ""
        }
      />

      <div>
        <Dropdown
          options={status}
          onSelect={handleSelectStatus}
          placeholder="Select status"
          className="w-64 shadow-none"
          btnClassName={`h-[42px] px-4 shadow-none ${
            formikValues.status ? "text-gray-900" : "text-gray-500"
          } `}
          option={{
            label: formikValues.status,
            value: formikValues.status.toLocaleLowerCase(),
          }}
        />

        {Boolean(formikErrors.status && formik.touched.status) && (
          <p className="text-red-500 text-sm">{formikErrors.status}</p>
        )}
      </div>

      <Calendar
        className="left-0 w-64 shadow-none"
        btnClassName="h-[42px] shadow-none"
        onSelect={handleSelectDate}
        date={formikValues.dueDate}
      />

      <CustomButton
        loading={isLoading}
        type="submit"
        className={`bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white py-2 px-3 rounded-md mt-4`}
      >
        {task ? "Update" : "Create"}
      </CustomButton>
    </form>
  );
};

export default CreateTask;
