import React from "react";
import { Button, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import axios from "axios";

interface AdminLoginProps {
  username: string;
  password: string;
}

function AdminLogin() {
  const form = useForm<AdminLoginProps>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: isNotEmpty("Please enter a username"),
      password: isNotEmpty("Please enter a password"),
    },
  });

  // Handle form submission
  const handleSubmit = (values: AdminLoginProps) => {
    try {
      axios
        .post("http://localhost:8080/v1/validateAdmin", values)
        .then((res) => {
          if (res.status === 200) {
            console.log("Login successful", res.data);

            localStorage.setItem("adminid", res.data.Adminid);
            alert("Clearence granted, welcome admin");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-amber-50 py-16 text-black">
      <div className="w-96 bg-gray-50 shadow-lg rounded-lg p-8 mx-auto ">
        <form
          className=" flex flex-col space-y-8 "
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            label="Username"
            placeholder="Enter username"
            required
            {...form.getInputProps("username")}
          />
          <TextInput
            label="Password"
            placeholder="Enter password"
            type="password"
            required
            {...form.getInputProps("password")}
          />
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
