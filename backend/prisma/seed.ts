import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  await prisma.program.deleteMany();
  await prisma.session.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.muscle.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash('adminpass', saltRounds);
  const userPassword = await bcrypt.hash('userpass', saltRounds);

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      isAdmin: true,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@example.com',
      password: userPassword,
      isAdmin: false,
    },
  });

  const pecs = await prisma.muscle.create({ data: { name: 'Pectoraux' } });
  const biceps = await prisma.muscle.create({ data: { name: 'Biceps' } });
  const legs = await prisma.muscle.create({ data: { name: 'Jambes' } });
  const back = await prisma.muscle.create({ data: { name: 'Dos' } });
  const shoulders = await prisma.muscle.create({ data: { name: 'Épaules' } });


  const benchPress = await prisma.exercise.create({
    data: {
      name: 'Développé couché',
      description: 'Exercice de base pour le développement des pectoraux.',
      published: true,
      authorId: admin.id,
      muscles: {
        connect: [{ id: pecs.id }],
      },
    },
  });

  const curl = await prisma.exercise.create({
    data: {
      name: 'Curl biceps',
      description: 'Isolation du biceps avec haltères.',
      published: true,
      authorId: user.id,
      muscles: {
        connect: [{ id: biceps.id }],
      },
    },
  });

  const squat = await prisma.exercise.create({
    data: {
      name: 'Squat',
      description: 'Exercice fondamental pour les jambes.',
      published: true,
      authorId: admin.id,
      muscles: {
        connect: [{ id: legs.id }],
      },
    },
  });

  const row = await prisma.exercise.create({
    data: {
      name: 'Rowing barre',
      description: 'Exercice pour renforcer le dos.',
      published: true,
      authorId: user.id,
      muscles: {
        connect: [{ id: back.id }],
      },
    },
  });

  const shoulderPress = await prisma.exercise.create({
    data: {
      name: 'Développé militaire',
      description: 'Exercice pour les épaules.',
      published: false,
      authorId: admin.id,
      muscles: {
        connect: [{ id: shoulders.id }],
      },
    },
  });

  const session1 = await prisma.session.create({
    data: {
      name: 'Séance Pecs & Bras',
      authorId: admin.id,
      exercises: {
        connect: [{ id: benchPress.id }, { id: curl.id }],
      },
    },
  });

  const session2 = await prisma.session.create({
    data: {
      name: 'Séance Jambes & Dos',
      authorId: user.id,
      exercises: {
        connect: [{ id: squat.id }, { id: row.id }],
      },
    },
  });

  await prisma.program.create({
    data: {
      name: 'Programme Débutant',
      description: 'Un programme pour débuter la musculation, simple et efficace.',
      authorId: admin.id,
      sessions: {
        connect: [{ id: session1.id }, { id: session2.id }],
      },
    },
  });

  await prisma.program.create({
    data: {
      name: 'Programme Avancé',
      description: 'Programme intensif avec travail ciblé.',
      authorId: user.id,
      sessions: {
        connect: [{ id: session1.id }],
      },
    },
  });

  console.log('✅ Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur pendant le seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
