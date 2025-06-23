import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  // 🔄 Nettoyage
  await prisma.userExerciseSession.deleteMany();
  await prisma.followedProgram.deleteMany();
  await prisma.session.deleteMany();
  await prisma.program.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.muscle.deleteMany();
  await prisma.user.deleteMany();

  // 👤 Création users
  const [admin, user] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpass', saltRounds),
        isAdmin: true,
      },
    }),
    prisma.user.create({
      data: {
        name: 'User',
        email: 'user@example.com',
        password: await bcrypt.hash('userpass', saltRounds),
      },
    }),
  ]);

  // 💪 Muscles créés uniquement par l’admin
  const [pectoraux, triceps, jambes, dos, epaules] = await Promise.all([
    prisma.muscle.create({ data: { name: 'Pectoraux', createdById: admin.id } }),
    prisma.muscle.create({ data: { name: 'Triceps', createdById: admin.id } }),
    prisma.muscle.create({ data: { name: 'Jambes', createdById: admin.id } }),
    prisma.muscle.create({ data: { name: 'Dos', createdById: admin.id } }),
    prisma.muscle.create({ data: { name: 'Épaules', createdById: admin.id } }),
  ]);

  // 🏋️ Exercices
  const [benchPress, curl, squat] = await Promise.all([
    prisma.exercise.create({
      data: {
        name: 'Développé couché',
        description: 'Exercice pour les pectoraux',
        authorId: admin.id,
        muscles: { connect: [{ id: pectoraux.id }, { id: triceps.id }] },
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Curl biceps',
        description: 'Exercice pour les biceps',
        authorId: user.id,
        muscles: { connect: [{ id: triceps.id }] },
      },
    }),
    prisma.exercise.create({
      data: {
        name: 'Squat',
        description: 'Exercice pour les jambes',
        authorId: admin.id,
        muscles: { connect: [{ id: jambes.id }] },
      },
    }),
  ]);

  // 🧪 Sessions
  const [session1, session2] = await Promise.all([
    prisma.session.create({
      data: {
        name: 'Pecs & Triceps',
        authorId: admin.id,
        exercises: { connect: [{ id: benchPress.id }, { id: curl.id }] },
      },
    }),
    prisma.session.create({
      data: {
        name: 'Jambes only',
        authorId: user.id,
        exercises: { connect: [{ id: squat.id }] },
      },
    }),
  ]);

  // 📦 Programmes
  const [programAdmin, programUser] = await Promise.all([
    prisma.program.create({
      data: {
        name: 'Programme Admin',
        description: 'Programme complet pour débuter',
        authorId: admin.id,
        sessions: { connect: [{ id: session1.id }, { id: session2.id }] },
      },
    }),
    prisma.program.create({
      data: {
        name: 'Programme User',
        description: 'Programme custom utilisateur',
        authorId: user.id,
        sessions: { connect: [{ id: session1.id }] },
      },
    }),
  ]);

  // ✅ Suivi d’un seul programme par user
  await prisma.followedProgram.create({
    data: {
      userId: user.id,
      programId: programAdmin.id,
    },
  });

  // 🏁 Sets/Reps personnalisés
  await prisma.userExerciseSession.createMany({
    data: [
      { userId: user.id, sessionId: session1.id, exerciseId: benchPress.id, sets: 4, reps: 10 },
      { userId: user.id, sessionId: session1.id, exerciseId: curl.id, sets: 3, reps: 12 },
      { userId: admin.id, sessionId: session1.id, exerciseId: benchPress.id, sets: 5, reps: 8 },
    ],
  });

  console.log('✅ Base de données initialisée avec succès !');
}

main().catch((e) => {
  console.error('❌ Erreur pendant le seed:', e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
