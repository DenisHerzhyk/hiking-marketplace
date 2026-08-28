-- Adds role-based access control and a single-use email verification token.
-- All statements are additive: existing rows get defaults, existing
-- deployed code that does not know these columns keeps working.

ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';
ALTER TABLE "User" ADD COLUMN "verificationToken" TEXT;
ALTER TABLE "User" ADD COLUMN "verificationTokenExpires" TIMESTAMP(3);

CREATE UNIQUE INDEX "User_verificationToken_key" ON "User"("verificationToken");
