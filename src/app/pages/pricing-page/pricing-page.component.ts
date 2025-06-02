import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID);
  //Como ahora estoy haciendo SSR en el coligo se ejecuta del lado del servidor y del lado del cliente,
  // por lo que tengo que inyectar el PLATFORM_ID para saber si estoy en el servidor o en el cliente

  ngOnInit(): void {
    // if(isPlatformBrowser(this.platform)) {
    //   document.title = 'Pricing Page';
    // }
    //Esto cambiaría el dom en el lado del navegador, pero la página que sirve al cliente sigue con el titulo por defecto del index.html

    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'This is the Pricing page of our application.' });
    this.meta.updateTag({ name: 'og:titile', content: 'Pricing Page' });
  }


}
