const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestUser() {
  const hashedPassword = await bcrypt.hash('testuser', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      username: 'testuser',
      passwordHash: hashedPassword,
      role: 'USER'
    }
  });
  
  console.log('Test user created:', user);
  await prisma.$disconnect();
}

createTestUser();
