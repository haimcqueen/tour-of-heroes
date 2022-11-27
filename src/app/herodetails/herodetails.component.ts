import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-herodetails',
  templateUrl: './herodetails.component.html',
  styleUrls: ['./herodetails.component.css']
})
export class HerodetailsComponent implements OnInit {

  hero: Hero | undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) {}

  ngOnInit(): void {
      this.getHero()
  }

  getHero() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back()
  }


}
