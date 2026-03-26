-- Seed admin user
INSERT INTO "User" ("id", "email", "passwordHash", "name", "role", "createdAt", "updatedAt")
VALUES (
  'admin-derek-001',
  'derek@apollosrm.com',
  '$2b$12$fW6Ns0xl6it/PfNrK8uG9.3Abzv49FeORkhni0SHCg66bNHfqIDsC',
  'Derek Anderson',
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT ("email") DO UPDATE SET "role" = 'ADMIN', "updatedAt" = NOW();
