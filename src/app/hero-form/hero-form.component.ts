import { Component } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {

  powers = ['Really Strong', 'Super Smart', 'Change Weather', 'Necromancer']

  model = new Hero(18, 'Spiderman', this.powers[0], "Peter Parker")

  submitted = false

  onSubmit() {
    this.submitted = true
  }

}
