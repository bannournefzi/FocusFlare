import { Employee } from './employee.model';

export class Project {
  id?: string;
  name!: string;
  category!: string;
  startDate!: Date;
  endDate!: Date;
  budget!: number;
  priority!: string;
  description?: string;
  progress!: number;
  employees: Employee[]; // Ensure employees is initialized

  constructor() {
    this.employees = []; // ✅ Ensures it's always defined
  }
}
