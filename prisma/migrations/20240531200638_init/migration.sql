-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(164) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(164) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Column" (
    "id" VARCHAR(164) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "send_mail" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" VARCHAR(164) NOT NULL,
    "description" VARCHAR(255),
    "owner_id" VARCHAR(164) NOT NULL,
    "column_id" VARCHAR(164) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_column_id_fkey" FOREIGN KEY ("column_id") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
