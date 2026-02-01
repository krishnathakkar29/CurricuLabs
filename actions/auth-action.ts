"use server"

import { auth } from "@/lib/auth";
import { APIError } from "better-auth";


export async function signup({ name, email, password }: {
    name: string;
    email: string;
    password: string;
}) {
    try {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });
  
      return {
        success: true,
        message: "Signup successfull",
      };
    } catch (error) {
      console.log("Error while signup action", JSON.stringify(error));
      if (error instanceof APIError) {
        return {
          success: false,
          message: error.body?.message || "error while signining up",
        };
      }
      return {
        success: false,
        message: "error while signining up, please try again",
      };
    }
  }