-- CreateTable
CREATE TABLE "organizacao" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "organizacao" TEXT NOT NULL,
    "cidade" TEXT NOT NULL DEFAULT 'undefined',
    "estado" TEXT NOT NULL DEFAULT 'undefined',
    "isActivated" BOOLEAN NOT NULL DEFAULT false,

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
    "organizacaoId" TEXT NOT NULL,
    "nivelIndependencia" TEXT NOT NULL,
    "gatoOuCachorro" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "imagesUrl" TEXT[],
    "requisitosDoacao" TEXT[],

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizacao_email_key" ON "organizacao"("email");

-- CreateIndex
CREATE UNIQUE INDEX "organizacao_organizacao_key" ON "organizacao"("organizacao");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organizacaoId_fkey" FOREIGN KEY ("organizacaoId") REFERENCES "organizacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
