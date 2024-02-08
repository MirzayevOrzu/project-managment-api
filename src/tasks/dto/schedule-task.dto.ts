import { IsDateString } from 'class-validator';

export class ScheduleTaskDto {
    @IsDateString()
    due_date: string;
}
