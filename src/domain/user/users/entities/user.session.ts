import { Prisma, Role } from '@prisma/client';

export interface userSession {
  id: Prisma.UsersUncheckedCreateInput['UserID'];
  email: Prisma.UsersUncheckedCreateInput['Email'];
  name: Prisma.UsersUncheckedCreateInput['Name'];
  role: Role;
}
