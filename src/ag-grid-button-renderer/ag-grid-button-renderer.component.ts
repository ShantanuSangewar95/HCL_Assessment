import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-ag-grid-button-renderer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<button type="button" (click)="onClick($event)">Edit</button>`,
  styleUrl: './ag-grid-button-renderer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgGridButtonRendererComponent implements ICellRendererAngularComp { 

  params:any;
  label: string = "";

  agInit(params:any): void {
    this.params = params;
    this.label = this.params.label || null;
  }


  refresh(params?: any): boolean {
    return true;
  }

  onClick($event:any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(this.params);

    }
  }

}
