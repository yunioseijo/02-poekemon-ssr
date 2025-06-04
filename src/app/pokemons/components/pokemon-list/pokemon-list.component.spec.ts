import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';
import { PokemonListComponent } from './pokemon-list.component';

const mockPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur'},
]

import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PokemonListComponent', () => {

  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    // fixture.detectChanges();
    fixture.componentRef.setInput('pokemons', []);
    expect(component).toBeTruthy();
  });
  it('should render the pokemons list correctly', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();
    expect(compiled.querySelectorAll('pokemon-card').length).toBe(mockPokemons.length);
  });
  it('should render "No pokemons"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(compiled.querySelector('div.no-pokemons') ).toBeTruthy();
  });
  it('should render "No pokemons"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();
    expect(compiled.querySelector('div')?.innerText ).toContain('No hay pokemons');
  });
});
