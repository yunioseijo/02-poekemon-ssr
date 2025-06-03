import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

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
  private title = inject(Title);
  private meta = inject(Meta);


  public pokemon = signal<Pokemon | null>(null);
  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    if (!pokemonId) {
      console.error('Pokemon ID not found in route parameters');
      return;
    }
    this.pokemonService
      .loadPokemonById(pokemonId)
      .pipe(
        tap( ({name, id}) => {
          const pageTitle = `Pokemon: ${name}, ID: ${id}`;
          this.title.setTitle(pageTitle);

          this.meta.updateTag({ name: 'description', content: `Details about ${pageTitle}` });
          this.meta.updateTag({ name: 'og:description', content: `Details about ${pageTitle}` });
          this.meta.updateTag({ name: 'og:title', content: `Details about ${pageTitle} ` });
          this.meta.updateTag({ name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png` });

        })
      )
      .subscribe((pokemon) => this.pokemon.set(pokemon));
  }
}


