-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "version" TEXT,
    "profile_update_limit" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "managementsIds" TEXT,
    "cortex_status" BOOLEAN DEFAULT true,
    "cortex_token" TEXT,
    "cortex_status_person" BOOLEAN DEFAULT true,
    "cortex_token_person" TEXT,
    "cetic_status" BOOLEAN DEFAULT true,
    "cetic_token" TEXT,
    "sinalid_status" BOOLEAN DEFAULT true,
    "sinalid_token" TEXT,
    "sinalid_cookie" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);
