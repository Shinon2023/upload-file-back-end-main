import { PrismaClient, Role, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const saltOrRounds = 10;
  // Seed users
  await prisma.file.deleteMany({});
  await prisma.uploadFile.deleteMany({});
  await prisma.form.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.submitDate.deleteMany({});

  const submitDates: Prisma.SubmitDateCreateInput[] = [
    {
      date: new Date('2024-01-01T12:00:00Z'),
      endDate: new Date('2024-02-01T12:00:00Z'),
    },
    {
      date: new Date('2024-03-01T12:00:00Z'),
      endDate: new Date('2024-04-01T12:00:00Z'),
    },
    {
      date: new Date('2023-01-01T12:00:00Z'),
      endDate: new Date('2023-02-01T12:00:00Z'),
    },
    {
      date: new Date('2023-03-01T12:00:00Z'),
      endDate: new Date('2023-04-01T12:00:00Z'),
    },
  ];
  for (const submitDate of submitDates) {
    await prisma.submitDate.create({
      data: submitDate,
    });
  }
  const users = [
    {
      Name: 'John Doe',
      Prefix: 'Mr.',
      Faculty: 'Engineering',
      Course: 'Computer Science',
      Email: 'johndoe@example.com',
      PhoneNumber: '123-456-7890',
      Password: await bcrypt.hash('securepassword1', saltOrRounds), // Ideally, hash this password before seeding
      Bio: 'A passionate software engineer with a love for algorithms.',
      Role: Role.ADMIN,
    },
    {
      Name: 'Jane Smith',
      Prefix: 'Dr.',
      Faculty: 'Science',
      Course: 'Biology',
      Email: 'janesmith@example.com',
      PhoneNumber: '098-765-4321',
      Password: await bcrypt.hash('securepassword2', saltOrRounds), // Ideally, hash this password before seeding
      Bio: 'Biologist specializing in genetics and molecular biology.',
      Role: Role.ADMIN,
    },
    {
      Name: 'Alice Johnson',
      Prefix: 'Ms.',
      Faculty: 'Arts',
      Course: 'Graphic Design',
      Email: 'alicejohnson@example.com',
      PhoneNumber: '555-123-4567',
      Password: await bcrypt.hash('securepassword3', saltOrRounds), // Ideally, hash this password before seeding
      Bio: 'Creative designer with a focus on user experience.',
      Role: Role.USER,
    },
    {
      Name: 'Jack Heriction',
      Prefix: 'Ms.',
      Faculty: 'Arts',
      Course: 'Graphic Design',
      Email: 'jackheriction@example.com',
      PhoneNumber: '555-123-4567',
      Password: await bcrypt.hash('securepassword4', saltOrRounds), // Ideally, hash this password before seeding
      Bio: 'Creative designer with a focus on user experience.',
      Role: Role.USER,
    },
  ];

  // Create users in the database
  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.users.create({
      data: user,
    });
    createdUsers.push(createdUser);
  }

  // Seed forms with createDate for 3 different years (2022, 2023, 2024)
  const forms: Prisma.FormCreateInput[] = [
    {
      level: 1,
      UploadFile: {
        create: [
          {
            File: { create: { fileName: 'file1.pdf' } },
          },
          {
            File: { create: { fileName: 'file2.pdf' } },
          },
          {
            File: { create: { fileName: 'file3.pdf' } },
          },
          {
            File: { create: { fileName: 'file4.pdf' } },
          },
          {
            File: { create: { fileName: 'file5.pdf' } },
          },
        ],
      },
      user: {
        connect: {
          UserID: createdUsers[0].UserID, // John Doe
        },
      }, // John Doe
    },
    {
      level: 2,
      UploadFile: {
        create: [
          {
            File: { create: { fileName: 'file1.pdf' } },
          },
          {
            File: { create: { fileName: 'file2.pdf' } },
          },
          {
            File: { create: { fileName: 'file3.pdf' } },
          },
          {
            File: { create: { fileName: 'file4.pdf' } },
          },
          {
            File: { create: { fileName: 'file5.pdf' } },
          },
        ],
      },
      user: {
        connect: {
          UserID: createdUsers[1].UserID, // Jane Smith
        },
      }, // Jane Smith
    },
    {
      level: 3,
      UploadFile: {
        create: [
          {
            File: { create: { fileName: 'file1.pdf' } },
          },
          {
            File: { create: { fileName: 'file2.pdf' } },
          },
          {
            File: { create: { fileName: 'file3.pdf' } },
          },
          {
            File: { create: { fileName: 'file4.pdf' } },
          },
          {
            File: { create: { fileName: 'file5.pdf' } },
          },
        ],
      },
      user: {
        connect: {
          UserID: createdUsers[2].UserID, // Alice Johnson
        },
      }, // Alice Johnson
    },
  ];

  // Create forms in the database
  // for (const form of forms) {
  //   await prisma.form.create({
  //     data: form,
  //   });
  // }

  console.log('Seed data for users and forms created successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
