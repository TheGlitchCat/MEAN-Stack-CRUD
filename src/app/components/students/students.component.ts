import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/models/student';

declare var M : any;

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
  providers: [StudentService]
})
export class StudentsComponent implements OnInit {

  constructor(private StudentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  addStudent(sFrom: NgForm){
    if(sFrom.value._id){
      this.StudentService.updateStudent(sFrom.value).subscribe((res:any) => {
        this.resetForm();
        M.toast({html: res.status});
        this.getStudents();
      });
    }else{
      this.StudentService.createStudent(sFrom.value).subscribe((res:any) =>{
        this.resetForm();
        M.toast({html: res.status});
        this.getStudents();
      });
    }
  }

  getStudents(){
    this.StudentService.getStudents().subscribe((res) => {
      this.StudentService.students = res as Student[];
      
    });
  }

  editStudent(student: Student){
    this.StudentService.selectedStudent = student;
  }

  deleteStudent(_id: string){
    if(confirm('Are you sure?')){
      this.StudentService.deleteStudent(_id).subscribe((res:any) =>{
        M.toast({html: res.status});
        this.getStudents();
      });
    }
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
      this.StudentService.selectedStudent = new Student();
    }
  }

}
