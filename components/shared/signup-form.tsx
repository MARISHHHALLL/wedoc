"use client";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronRight } from "@hugeicons/core-free-icons";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type signupSchema = z.infer<typeof schema>;

export default function SignupForm() {
  const { register, handleSubmit } = useForm<signupSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: signupSchema) => {
    try {
      await authClient.signUp.email(
        {
          name: data.email.split("@")[0],
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            alert("Account created successfully");
          },
          onError: (error) => {
            alert(error.error.message);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Adresse éléctronique</FieldLabel>
                <Input
                  id="email"
                  placeholder="olivia@untitledui.com"
                  {...register("email")}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  placeholder="Mot de passe"
                  type="password"
                  {...register("password")}
                />
              </Field>
              <Field>
                <Link
                  href="/forgot-password"
                  className="text-blue text-sm font-semibold leading-6 tracking-[-0.04em] px-[10px] w-fit"
                >
                  Mot de passe oublié ?
                </Link>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button
              type="button"
              className="bg-white text-blue hover:bg-white/80"
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="bg-blue text-white hover:bg-blue/80 !px-5"
            >
              Submit{" "}
              <HugeiconsIcon
                icon={ChevronRight}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
              />{" "}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
