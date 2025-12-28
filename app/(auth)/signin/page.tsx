import Image from "next/image";
import React from "react";
import SigninForm from "@/components/shared/signin-form";

const SignInPage = () => {
  return (
    <div className="w-full py-[50px] gap-[30px] flex flex-row items-center justify-center bg-[#F5F5F5]">
      <div className="min-w-[440px] flex flex-col gap-[30px] ">
        <h1 className="text-[48px] font-semibold leading-[57px] tracking-[-0.04em]">
          Se{" "}
          <span className="text-blue">
            connecter
            <br />
          </span>{" "}
          professionnelle.
        </h1>
        <div className="flex flex-col gap-[30px]">
          <SigninForm />
        </div>
      </div>
      <div>
        <Image
          src="/images/hero-image.png"
          alt="hero-image"
          width={470}
          height={527}
          className="w-[470px] h-[527px] object-cover"
        />
      </div>
    </div>
  );
};

export default SignInPage;
