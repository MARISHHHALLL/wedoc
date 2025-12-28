"use client";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronRight } from "@hugeicons/core-free-icons";
import { Field, FieldGroup, FieldLabel, FieldSet, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
});

type signinSchema = z.infer<typeof schema>;

export default function SigninForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<signinSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: signinSchema) => {
    setIsLoading(true);
    setError(null);

    try {
      await authClient.signIn.email(
        {
          email: data.email,
          password: data.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            setIsLoading(false);
            router.push("/");
            router.refresh();
          },
          onError: (error) => {
            setError(error.error.message || "Failed to sign in. Please check your credentials.");
            setIsLoading(false);
          },
        }
      );
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              {error && (
                <FieldError className="mb-2">
                  {error}
                </FieldError>
              )}
              <Field>
                <FieldLabel htmlFor="email">Adresse éléctronique</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="olivia@untitledui.com"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <FieldError errors={[errors.email]} />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                <Input
                  id="password"
                  placeholder="Mot de passe"
                  type="password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
                {errors.password && (
                  <FieldError errors={[errors.password]} />
                )}
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
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Retour
            </Button>
            <Button
              type="submit"
              className="bg-blue text-white hover:bg-blue/80 !px-5"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}{" "}
              {!isLoading && (
                <HugeiconsIcon
                  icon={ChevronRight}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              )}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}

