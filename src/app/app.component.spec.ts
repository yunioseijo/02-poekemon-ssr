import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import NavbarComponent from './shared/components/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compile: HTMLElement;
  let app: AppComponent;
  @Component({
    selector: 'app-navbar',
    standalone: true,
  })
  class NavbarComponentMock{

  }

  beforeEach(async () => {
    TestBed.overrideComponent(AppComponent, {
      set: {
        imports: [NavbarComponentMock],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    });
    // ! Recomendado
    // await TestBed.configureTestingModule({
    //   imports: [AppComponent],
    //   providers: [provideRouter([])],
    // })
    // .overrideComponent(AppComponent, {
    //   add: {
    //     imports: [NavbarComponentMock]
    //   },
    //   remove: {
    //     imports: [NavbarComponent]
    //   }
    // })
    // .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compile = fixture.nativeElement as HTMLElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render navbar and router-outlet`, () => {
    expect(compile.querySelector('app-navbar')).toBeTruthy();
    expect(compile.querySelector('router-outlet')).toBeTruthy();
  });
});
