-- CreateTable
CREATE TABLE "public"."Local" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);
