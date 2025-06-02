// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  // Create hashed passwords
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  // Create users
  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: { password: passwordSabin },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: { password: passwordAlex },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
    },
  });

  // Create exercises
  const exercise1 = await prisma.exercise.upsert({
    where: { name: 'Développé couché' },
    update: { authorId: user1.id },
    create: {
      name: 'Développé couché',
      description: 'Exercice de base pour le développement des pectoraux.',
      muscles: ['pectoraux', 'triceps', 'épaules'],
      published: true,
      authorId: user1.id,
    },
  });

  const exercise2 = await prisma.exercise.upsert({
    where: { name: 'Curl biceps' },
    update: { authorId: user2.id },
    create: {
      name: 'Curl biceps',
      description: 'Isolation du biceps avec haltères.',
      muscles: ['biceps'],
      published: true,
      authorId: user2.id,
    },
  });

  const exercise3 = await prisma.exercise.upsert({
    where: { name: 'Squat' },
    update: {},
    create: {
      name: 'Squat',
      description: 'Exercice polyarticulaire pour les jambes.',
      muscles: ['quadriceps', 'ischio-jambiers', 'fessiers'],
      published: false,
    },
  });

  console.log({ user1, user2, exercise1, exercise2, exercise3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
