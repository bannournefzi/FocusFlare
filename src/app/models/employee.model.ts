export interface Employee {
  id?: string;
  employeeName: string;
  employeeCompany: string;
  joiningDate: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  description: string;
  permissions: string[];
  project?: string;
}
