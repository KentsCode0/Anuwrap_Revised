import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router, RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { AuthService } from '../../../routeservice/auth.service';
import { initFlowbite } from 'flowbite';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-editcollage',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NavigationComponent],
  templateUrl: './editcollage.component.html',
  styleUrl: './editcollage.component.css'
})
export class EditcollageComponent implements OnInit{
  workspaceId: any;
  collage = {
    collage_image_id: "",
    workspace_id: ""
  }

  collageId: any;

  constructor(
    private authService: AuthService,
    private route: Router,
    private aRoute: ActivatedRoute,
    ){}
  ngOnInit(): void {
    if (document !== undefined) {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.collageId = params["params"]["collage_id"];
      this.workspaceId = params["params"]["workspace_id"];
    });

    this.fetchCollage();
  }

  fetchCollage() {
    this.authService.getCollage(this.collageId).subscribe(
      (response) => {
        this.collage.collage_image_id = response.data.collage_image_id;
        console.log(this.collage)
      },
      (error) => {
        console.log("This", error);
      }
    )
  }
  
  editCollage() {
    this.collage["workspace_id"] = this.workspaceId;
    this.authService.editCollage(this.collage, this.collageId).subscribe (
      (response) => {
        this.collage = response.data.collage;
        console.log("Execute")
        this.route.navigate(['../../collage'], {relativeTo: this.aRoute})
      },
      (error) => {
        console.log(error);
      }
    )
  }

  goToCollage() {
    this.route.navigate(['../../collage'], {relativeTo: this.aRoute})
  }
}
