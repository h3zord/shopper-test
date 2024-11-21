-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL,
    "comment" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "minimum_kilometers" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "travels" (
    "id" TEXT NOT NULL,
    "origin_latitude" DECIMAL(65,30) NOT NULL,
    "origin_longitude" DECIMAL(65,30) NOT NULL,
    "destination_latitude" DECIMAL(65,30) NOT NULL,
    "destination_longitude" DECIMAL(65,30) NOT NULL,
    "distance_in_meters" DECIMAL(65,30) NOT NULL,
    "duration_in_seconds" INTEGER NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "customer_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "travels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "travels" ADD CONSTRAINT "travels_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
