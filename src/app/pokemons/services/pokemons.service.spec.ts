import { HttpClient, HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { PokemonsService } from './pokemons.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { PokeAPIResponse, Pokemon, SimplePokemon } from '../interfaces';
import { catchError, tap } from 'rxjs';

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    // {
    //   name: 'venusaur',
    //   url: 'https://pokeapi.co/api/v2/pokemon/3/',
    // },
    // {
    //   name: 'charmander',
    //   url: 'https://pokeapi.co/api/v2/pokemon/4/',
    // },
  ],
};
const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];
const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of simplePokemons', () => {
    service.loadPage(1)
      .subscribe((pokemons) => {
        expect(pokemons).toEqual(expectedPokemons);
      });
    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });
  it('should load page 5  of simplePokemons', () => {
    service.loadPage(5)
      .subscribe((pokemons) => {
        expect(pokemons).toEqual(expectedPokemons);
      });
    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?offset=80&limit=20'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });
  it('should load pokemon by id', () => {
    service.loadPokemonById('1')
      .subscribe((pokemon: any) => {
        expect(pokemon).toEqual(expectedPokemons[0]);
      });
      const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/1'
    );
      req.flush(mockPokemon);
  });
  //Disparar errores
  it('should catch error if pokemon not found', () => {
    const pokemonName= 'no-existe'
    service.loadPokemonById(pokemonName)
    .pipe(
      catchError( (err: HttpErrorResponse) => {
        expect(err.error).toContain('Pokemon not Found');
        expect(err.status).toEqual(404);
        expect(err.statusText).toContain('Not Found');

        return [];
      }),
    )
      .subscribe();
      const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      req.flush('Pokemon not Found', { status: 404, statusText: 'Not Found' });
  });
});
