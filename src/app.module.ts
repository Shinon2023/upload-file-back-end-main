import { Module } from '@nestjs/common';
import { UsersModule } from './domain/user/users/users.module';
import { FormsModule } from './domain/user/forms/forms.module';
import { CalendarModule } from './calendar/calendar.module';
import { AuthModule } from './configuration/auth/auth.module';
import { RolesModule } from './configuration/roles/roles.module';
import { UploadsModule } from './domain/uploads/uploads.module';
import { LoginModule as AdminLoginModule } from './domain/admin/login/login.module';
import { RouterModule } from '@nestjs/core';
import { FormsAdminModule } from './domain/admin/forms/forms.module';

const ROUTES = [
  {
    path: 'admin',
    children: [
      {
        path: 'login',
        module: AdminLoginModule,
      },
      {
        path: 'forms',
        module: FormsAdminModule,
      },
    ],
  },
];

@Module({
  imports: [
    RolesModule,
    UsersModule,
    AuthModule,
    FormsModule,
    CalendarModule,
    UploadsModule,
    AdminLoginModule,
    FormsAdminModule,
    RouterModule.register(ROUTES),
  ],
})
export class AppModule {}
