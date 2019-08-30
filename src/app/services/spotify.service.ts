import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) {
    console.log("Spotify service listo");
  }

  getQuery( query: string ){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDsDYXlzETghamGrDKCveazPKFI1h_8Qh-MouqhvrLoZQnkP0IEqR3cMQi_MX1_IUHgFcNK_Yl8lq3RaGE'
    });

    return this.http.get(url, { headers });

  };

  getNewReleases() {

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQACcxpVTZpI8GD_gaGQV-3-FwgIGT0AtYPE5e9fzRm38oysYiJXtRZbk4kmYWI7jJUcPgLHYms5vXh9M68'
    // });
    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data => {
                return data['albums'].items;
              }));

  }

  getArtistas(termino: string){

    // const headers = new HttpHeaders({
    //   'Authorization': 'Bearer BQACcxpVTZpI8GD_gaGQV-3-FwgIGT0AtYPE5e9fzRm38oysYiJXtRZbk4kmYWI7jJUcPgLHYms5vXh9M68'
    // });

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items ));


  }

  getArtista(id: string){

    return this.getQuery(`artists/${ id }`);
                //.pipe( map( data => data['artists'].items ));

  }

  getTopTracks(id: string){

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks'] ));

  }

}
