-- CreateTable
CREATE TABLE "organizacao" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "petsId" TEXT NOT NULL,

    CONSTRAINT "organizacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobre" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "porte" TEXT NOT NULL,
    "nivelEnergia" TEXT NOT NULL,
    "ambiente" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizacao_email_key" ON "organizacao"("email");

-- AddForeignKey
ALTER TABLE "organizacao" ADD CONSTRAINT "organizacao_petsId_fkey" FOREIGN KEY ("petsId") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
