import { EmployeeService } from './../employee.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees:any;
  country:any;
  state:any;
  city:any;
  selectedHobby:any = [];
  hobbiesArr = [
    {"key": "cricket", "value": "cricket"},
    {"key": "chess", "value": "chess"},
    {"key": "dance", "value": "dance"}
  ]
  @ViewChild('id',{static: false}) id: ElementRef;
  @ViewChild('name',{static: false}) name: ElementRef;
  @ViewChild('salary',{static: false}) salary: ElementRef;
  @ViewChild('hobbies',{static: false}) hobbies: ElementRef;

  editMode:boolean = false;
  editIndex:number;

  constructor(private empService: EmployeeService) { }

  ngOnInit() {
    this.getEmployee();
    this.getCountry();
  }

  getEmployee(){
    this.empService.getEmployee().subscribe((res:any)=>{
      this.employees = res;
      console.log(this.employees)
    })
  }

  getCountry(){
    this.empService.getCountry().subscribe((res:any)=>{
      this.country = res;
      console.log(this.country)
    })
  }

  getState(event){
    this.empService.getState().subscribe((res:any)=>{
      let state = res;
      this.state = state.filter(x=> x.country_id == +event.target.value)
      //console.log(this.state)
    })
  }
  getCity(event){
    console.log(+event.target.value)
    this.empService.getCity().subscribe((res:any)=>{
      let city = res;
      this.city = city.filter(x=> x.state_id == +event.target.value)
      console.log(this.city)
    })
  }
  
  onAddEmployee(id, name, salary){
    let hobby = this.selectedHobby.toString();
    if(this.editMode) {
      this.employees[this.editIndex] = {
        id: +id.value,
        name: name.value,
        salary: +salary.value,
        hobbies: hobby
      }
      this.editMode = false;
      this.id.nativeElement.value = '';
      this.name.nativeElement.value = '';
      this.salary.nativeElement.value = '';
      this.selectedHobby = '';

    } else {
     
      this.employees.push({
        id: +id.value,
        name: name.value,
        salary: +salary.value,
        hobbies: hobby
      });
      console.log(this.employees)
    }
    
  }
  onSaveEmployee(){
    console.log('aa', this.employees)

    this.empService.saveEmployee(this.employees).subscribe(res=>{
      console.log(res)
    })
  }



  onEditEmployee(ind){
    this.editMode = true;
    this.editIndex = ind;
    this.id.nativeElement.value = this.employees[ind].id;
    this.name.nativeElement.value = this.employees[ind].name;
    this.salary.nativeElement.value = this.employees[ind].salary;
    this.selectedHobby = this.employees[ind].hobbies.split(',');
    //this.hobbies.nativeElement.value = this.employees[ind].hobbies.split(',');
  }

  onDeleteEmployee(ind){
    this.employees.splice(ind, 1)
  }

  onChangeHobby(event){
    let index = this.selectedHobby.indexOf(event.target.value);
    if(index === -1) {
      this.selectedHobby.push(event.target.value)
    } else {
      this.selectedHobby.splice(index, 1)
    }
    
    console.log('ccccc', this.selectedHobby)
  }

}
