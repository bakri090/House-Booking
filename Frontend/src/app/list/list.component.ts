import { Component, OnInit } from '@angular/core';
import { Icard } from '../card/icard';
import { HttpClient } from '@angular/common/http';
import { HousingServiceService } from '../services/housingService.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
constructor(private housingService: HousingServiceService) {}

  ngOnInit(): void {
    this.housingService.getProperties().subscribe({
      next: (data) => {
        this.Propreties = data as Icard[];
      }
    });
  }
Propreties: Icard[] ;



}
