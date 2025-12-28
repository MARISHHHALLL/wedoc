"use client";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronRight } from "@hugeicons/core-free-icons";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createServiceCardSchema,
  type CreateServiceCard,
} from "@/app/actions/service-cards/service-card";
import { useActionState, useEffect, startTransition, useState } from "react";
import { createServiceCard } from "@/app/actions/service-cards";
import { useRouter } from "next/navigation";

interface DashboardComponentProps {
  trigger?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const DashboardComponent = ({
  trigger,
  open,
  setOpen,
}: DashboardComponentProps) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createServiceCard,
    null
  );
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(createServiceCardSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      logo: "",
      buttonText: "",
      buttonLink: "",
      isActive: true,
      order: 0,
    },
  });

  const logoUrl = watch("logo");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      setLogoFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CreateServiceCard) => {
    let logoUrl = data.logo;

    // Upload logo file if selected
    if (logoFile) {
      setUploadingLogo(true);
      try {
        const formData = new FormData();
        formData.append("file", logoFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          alert(error.error || "Failed to upload logo");
          setUploadingLogo(false);
          return;
        }

        const result = await response.json();
        logoUrl = result.url;
      } catch (error) {
        console.error("Error uploading logo:", error);
        alert("Failed to upload logo");
        setUploadingLogo(false);
        return;
      } finally {
        setUploadingLogo(false);
      }
    }

    startTransition(() => {
      formAction({ ...data, logo: logoUrl || undefined });
    });
  };

  useEffect(() => {
    if (state?.success) {
      reset();
      setLogoFile(null);
      setLogoPreview(null);
      startTransition(() => {
        setOpen?.(false);
        router.refresh();
      });
    }
  }, [state, reset, router, setOpen]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto p-[30px]"
      >
        <SheetHeader>
          <SheetTitle>Create Service Card</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new service card.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                {state && !state.success && (
                  <FieldError className="mb-2">{state.error}</FieldError>
                )}
                {state?.success && (
                  <div className="mb-2 p-3 bg-green-100 text-green-800 rounded-md">
                    Service card created successfully!
                  </div>
                )}

                <Field>
                  <FieldLabel htmlFor="name">Name *</FieldLabel>
                  <Input
                    id="name"
                    placeholder="e.g., AWS, Deel, Miro"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && <FieldError errors={[errors.name]} />}
                </Field>

                <Field>
                  <FieldLabel htmlFor="price">Price *</FieldLabel>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    aria-invalid={!!errors.price}
                    {...register("price", { valueAsNumber: true })}
                  />
                  {errors.price && <FieldError errors={[errors.price]} />}
                </Field>

                <Field>
                  <FieldLabel htmlFor="description">Description *</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Enter description..."
                    rows={4}
                    aria-invalid={!!errors.description}
                    {...register("description")}
                  />
                  {errors.description && (
                    <FieldError errors={[errors.description]} />
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="logo">Logo *</FieldLabel>
                  <div className="space-y-3">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      aria-invalid={!!errors.logo}
                      className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue file:text-white hover:file:bg-blue/80"
                    />
                    {(logoPreview || logoUrl) && (
                      <div className="mt-2">
                        <p className="text-sm text-muted-foreground mb-2">
                          Preview:
                        </p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={logoPreview || logoUrl || ""}
                          alt="Logo preview"
                          className="h-20 w-20 object-contain border rounded-lg p-2 bg-gray-50"
                        />
                      </div>
                    )}
                  </div>
                  {errors.logo && <FieldError errors={[errors.logo]} />}
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload an image file (max 5MB)
                  </p>
                </Field>

                <Field>
                  <FieldLabel htmlFor="buttonText">Button Text</FieldLabel>
                  <Input
                    id="buttonText"
                    placeholder="e.g., Ottieni l'offerta"
                    aria-invalid={!!errors.buttonText}
                    {...register("buttonText")}
                  />
                  {errors.buttonText && (
                    <FieldError errors={[errors.buttonText]} />
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="buttonLink">
                    Button Link (URL)
                  </FieldLabel>
                  <Input
                    id="buttonLink"
                    type="url"
                    placeholder="https://example.com"
                    aria-invalid={!!errors.buttonLink}
                    {...register("buttonLink")}
                  />
                  {errors.buttonLink && (
                    <FieldError errors={[errors.buttonLink]} />
                  )}
                </Field>

                <Field orientation="horizontal">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      className="w-4 h-4 rounded border-gray-300"
                      {...register("isActive")}
                    />
                    <FieldLabel
                      htmlFor="isActive"
                      className="!mb-0 cursor-pointer"
                    >
                      Active
                    </FieldLabel>
                  </div>
                  {errors.isActive && <FieldError errors={[errors.isActive]} />}
                </Field>

                <Field>
                  <FieldLabel htmlFor="order">Order</FieldLabel>
                  <Input
                    id="order"
                    type="number"
                    placeholder="0"
                    aria-invalid={!!errors.order}
                    {...register("order", { valueAsNumber: true })}
                  />
                  {errors.order && <FieldError errors={[errors.order]} />}
                  <p className="text-sm text-muted-foreground mt-1">
                    Lower numbers appear first (0 is first)
                  </p>
                </Field>
              </FieldGroup>
            </FieldSet>
          </FieldGroup>

          <SheetFooter className="mt-6 gap-2">
            <SheetClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              className="bg-blue text-white hover:bg-blue/80"
              disabled={isPending || uploadingLogo}
            >
              {uploadingLogo
                ? "Uploading..."
                : isPending
                ? "Creating..."
                : "Create Service Card"}{" "}
              {!isPending && !uploadingLogo && (
                <HugeiconsIcon
                  icon={ChevronRight}
                  size={24}
                  color="currentColor"
                  strokeWidth={1.5}
                />
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardComponent;
