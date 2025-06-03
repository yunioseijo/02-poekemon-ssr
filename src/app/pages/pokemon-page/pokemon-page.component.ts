import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pokemon-page',
  imports: [CommonModule],
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private pokemonService = inject(PokemonsService);
  private route = inject(ActivatedRoute);

  public pokemon = signal<Pokemon | null>(null);
  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    if (!pokemonId) {
      console.error('Pokemon ID not found in route parameters');
      return;
    }
    this.pokemonService.loadPokemonById(pokemonId).subscribe(pokemon => this.pokemon.set(pokemon));
  }



}


