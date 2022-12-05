import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, shareReplay } from 'rxjs';
import { YoutubeService, YT } from 'src/app/core/youtube';

@Component({
  selector: 'ascendere-player-visibilizacion',
  templateUrl: './player-visibilizacion.component.html',
  styles: [
  ]
})
export class PlayerVisibilizacionComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly youtubeService: YoutubeService,
    private readonly sanitizer: DomSanitizer,
  ) { }

  private videoId$: Observable<string> = this.route.params.pipe(map(r => r['id'] as string));

  video$: Observable<YT.Video | null> = this.videoId$.pipe(
    switchMap(id => this.youtubeService.getVideo$(id, { part: 'snippet' })),
    shareReplay(1),
  );

  videoSource$: Observable<SafeUrl> = this.videoId$.pipe(
    map(id => `https://www.youtube.com/embed/${id}?autoplay=1`),
    map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
  );

}
