import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FirebaseService } from '../clients.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  newClient: FormGroup;
  items: Array<any>;
  public birthdate: Date;
  public age: number;
  public prom: number;


  constructor(
    private fb: FormBuilder,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getData();
  }

  createForm() {
    this.newClient = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      age: ['', Validators.required ]
    });
  }


  resetFields(){

    this.newClient = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }



  getData(){
    
    this.firebaseService.getUsers()
    .subscribe(result => {
      console.log(result);
      result.forEach(dat =>{
        this.birthdate = dat['edad'];
        var timeDiff = Math.abs(Date.now() - new Date(this.birthdate).getTime());
        this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
        
      })
      this.items = result;

    })
  }


  onSubmit(value){
    this.firebaseService.createUser(value, this.age)
    .then(
      res => {
        this.resetFields();
      }
    )
  }

}