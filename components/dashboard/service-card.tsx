import { cn } from "@/lib/utils";
import Image from "next/image";

interface ServiceCardProps {
  name: string;
  price: number;
  description: string;
  logo?: string | null;
  className?: string;
}

export function ServiceCard({
  name,
  price,
  description,
  logo,
  className,
}: ServiceCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  // Check if logo is a URL/path to an image
  const isLogoImage = logo && (logo.startsWith("/") || logo.startsWith("http"));

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden min-h-[334px] w-[297px]",
        className
      )}
    >
      <div className="min-h-[231px] bg-gradient-to-b from-white to-transparent rounded-t-[60px] squircle flex items-center justify-center px-6">
        {isLogoImage ? (
          <Image
            src={logo}
            alt={`${name} logo`}
            width={297}
            height={230}
            className="w-full h-[230px] object-contain"
          />
        ) : (
          <span className="text-blue font-bold text-3xl lowercase">
            {logo || name.toLowerCase()}.
          </span>
        )}
      </div>

      <div className="min-h-[130px] w-[95%] self-center squircle rounded-[35px] bg-white p-5 flex flex-col items-start gap-2.5">
        <div className="w-full flex flex-row items-center justify-between">
          <h3 className="font-semibold text-black text-[20px] leading-[32px] tracking-[-0.04em] truncate">
            {name}
          </h3>
          <span className="text-blue font-semibold text-[20px] leading-[32px] tracking-[-0.04em]">
            {formattedPrice}
          </span>
        </div>

        <div className="flex-shrink-0">
          <p className="text-sm text-black/50 font-normal leading-6 tracking-[-0.04em] line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
