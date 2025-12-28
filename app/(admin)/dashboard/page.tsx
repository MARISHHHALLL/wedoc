import HeaderWithComponent from "@/components/shared/HeaderWithComponent";
import { ServiceCard } from "@/components/dashboard/service-card";
import { AddServiceCardSheet } from "@/components/dashboard/add-service-card-sheet";
import prisma from "@/lib/prisma";

const DashboardPage = async () => {
  const serviceCards = await prisma.serviceCard.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col gap-[30px] p-[60px] min-h-screen w-full">
        <HeaderWithComponent
          title="Dashboard"
          rightComponent={<AddServiceCardSheet />}
        />
        {serviceCards.length > 0 ? (
          <div className="flex flex-row gap-6 flex-wrap">
            {serviceCards.map((card) => (
              <div key={card.id}>
                <ServiceCard
                  name={card.name}
                  price={card.price}
                  description={card.description}
                  logo={card.logo}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <p>No service cards found. Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
