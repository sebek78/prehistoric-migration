import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss']
})
export class MenuButtonComponent implements OnInit {
  @Input() link: string | undefined;
  @Input() innerText: string;
  @Input() minWidth: string | undefined;
  @Input() disabled: boolean | undefined;

  constructor() {}
  ngOnInit(): void {}
}
