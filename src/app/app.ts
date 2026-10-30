import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './components/top-bar';
import { FooterBar } from './components/footer-bar';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, TopBar, FooterBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
