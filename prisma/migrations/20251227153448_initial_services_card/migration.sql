-- CreateTable
CREATE TABLE "service_card" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "logo" TEXT,
    "buttonText" TEXT,
    "buttonLink" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "service_card_isActive_idx" ON "service_card"("isActive");

-- CreateIndex
CREATE INDEX "service_card_order_idx" ON "service_card"("order");
