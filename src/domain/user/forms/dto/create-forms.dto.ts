import { IsOptional } from 'class-validator';

export class CreateFormsDto {
  @IsOptional()
  readonly level: number;
}
