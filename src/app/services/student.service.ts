import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  selectedStudent: Student;
  students: Student[];
  readonly db_url = 'http://localhost:3000/api/students';

  constructor(private http: HttpClient) {
    this.selectedStudent = new Student();
   }

  getStudents(){
    return this.http.get(this.db_url);
  }

  getStudent(_id: string){
    return this.http.get(this.db_url + `/${_id}`);
  }

  createStudent(student: Student){
    return this.http.post(this.db_url, student);
  }

  updateStudent(student: Student){
    return this.http.put(this.db_url + `/${student._id}`, student);
  }

  deleteStudent(_id: string){
    return this.http.delete(this.db_url + `/${_id}`);
  }
}
