import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent{

  nuevasCanciones: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor( private spotify: SpotifyService ) {

    this.error = false;
    this.loading = true

    this.spotify.getNewReleases()
      .subscribe( (data: any) => {
        console.log( data);
        this.nuevasCanciones = data;
        this.loading = false;
    }, ( errorServicio ) => {
        this.loading = false;
        this.error = true;
        this.mensajeError = errorServicio.error.error.message;
    });

  }

}
