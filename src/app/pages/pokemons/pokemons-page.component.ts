import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit, OnDestroy {
  private pokemonService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);
  //Como la aplicación es SSR, ya el servidor mandó los datos y no espera por el ngOnInit
  // public isLoading = signal<boolean>(true);
  private appRef = inject(ApplicationRef);
  // private $appRef = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({isStable});
  // });
  ngOnInit(): void {
    this.loadPokemons();
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }
  ngOnDestroy(): void {
    // this.$appRef.unsubscribe();
  }
  public loadPokemons( page = 0) {
    this.pokemonService.loadPage(page).subscribe( pokemons => {
     this.pokemons.set(pokemons);
    });
  }
}
