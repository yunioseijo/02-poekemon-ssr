import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon : SimplePokemon = {
  id: '1',
  name: 'bulbasaur'
}

describe('PokemonCardComponent', () => {

  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
  it( 'should have the SimplePokemon signal inputVa1ue' , () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

it('should render the pokemon name and image correctly' , () => {
  const pokemonName = compiled.querySelector('h2');
  expect(pokemonName).toBeTruthy();
  const pokemonImage = compiled.querySelector('img');
  expect(pokemonImage).toBeTruthy();
  expect(pokemonName?.textContent).toContain(mockPokemon.name);
  expect(pokemonImage?.src).toContain(mockPokemon.id);
})

it('should have the proper ng-reflect-router-link' , () => {
  const divWithLink = compiled.querySelector('div[ng-reflect-router-link]');
  expect(divWithLink).toBeTruthy();
  expect(divWithLink?.getAttribute('ng-reflect-router-link')).toBe(`/pokemons/${mockPokemon.name}`);
})

});
