import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const userEmail: string = "josue@email.com";

  try {
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: { 
        role: Role.ADMIN
      },
    });

    console.log(`✅ Succès : ${updatedUser.firstName} ${updatedUser.lastName} est désormais ${updatedUser.role}.`);
  } catch (error) {
    console.error("❌ Erreur : L'utilisateur n'a pas été trouvé ou l'email est incorrect.");
  }
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });