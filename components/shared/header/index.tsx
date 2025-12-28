"use client";
import { LogoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { boardNavItems, loginNavItems, navItems } from "@/data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const HeaderComponent = ({
  headerTitle,
  subTitle,
}: {
  headerTitle?: React.ReactNode;
  subTitle?: boolean;
}) => {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  return (
    <div>
      <div className="w-full bg-white">
        <div className="max-w-[941px] mx-auto min-h-[72px] py-[21px] flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-10">
            <Link href="/">
              <LogoIcon />
            </Link>
            <div className="flex flex-row items-center gap-5">
              {session?.user
                ? loginNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-[#001FAE] hover:text-blue/80 font-medium"
                    >
                      {item.label}
                    </Link>
                  ))
                : navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm text-[#001FAE] hover:text-blue/80 font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
            </div>
          </div>
          <div>
            {session?.user ? (
              <div className="flex flex-row items-center gap-5">
                <Button
                  variant="link"
                  className="text-blue hover:text-blue/80 font-semibold tracking-[-0.04em]"
                >
                  Tableau de board{" "}
                  <HugeiconsIcon
                    icon={ChevronRight}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </Button>
                <Button
                  variant="default"
                  onClick={() => authClient.signOut()}
                  className="text-blue bg-[#64CCFF]/15 hover:bg-[#64CCFF]/10 hover:text-blue/80 font-semibold tracking-[-0.04em]"
                >
                  Se déconnecter
                </Button>
              </div>
            ) : (
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="text-blue hover:text-blue/80 font-semibold tracking-[-0.04em]"
                >
                  Se connecter
                  <HugeiconsIcon
                    icon={ChevronRight}
                    size={24}
                    color="currentColor"
                    strokeWidth={1.5}
                  />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      {subTitle && (
        <div className="w-full bg-blue">
          <div className="max-w-[941px] mx-auto min-h-[46px] py-[10px] flex flex-row items-center gap-[36px]">
            {session?.user &&
              boardNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm text-white/80 font-medium",
                    pathname === item.href && "text-white font-bold"
                  )}
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      )}
      {headerTitle && (
        <div className="w-full bg-white">
          <div className="max-w-[941px] mx-auto min-h-[196px] py-10 flex flex-row items-center gap-[36px]">
            <h1 className="text-[48px] font-semibold leading-[56px] tracking-[-0.04em] text-black">
              {headerTitle}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderComponent;
