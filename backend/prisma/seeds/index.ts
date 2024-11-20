import { PrismaClient } from '@prisma/client';
import { seedAdmin } from './admin';
import { seedUser } from './user';
import { seedDrivers } from './driver';

const prisma = new PrismaClient();
async function main() {
  const admins = await prisma.admin.count();
  const users = await prisma.user.count();
  const drivers = await prisma.driver.count();

  if ( admins === 0 ) {
    await seedAdmin(prisma);
  }

  if ( users === 0 ) {
    await seedUser(prisma);
  }

  if ( drivers === 0 ) {
    await seedDrivers(prisma);
  }
}

main()
.catch((e) => {
  console.error(e);
  e.process.exit(1);
})
.finally(async() => {
  await prisma.$disconnect();
});
