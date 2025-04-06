import {Component} from '@angular/core';
import {ZipService} from "./services/zip.services";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ZipService]
})
export class AppComponent {
  title = 'zip-frontend';
  public zipUrl: string;
  public loading: boolean;
  public response: string;
  public activeTab: string;
  public archivos: any;

  currentPage = 1;
  totalPages = 1;
  totalItems = 0;

  constructor(private _zipService: ZipService) {
    this.response = 'Proceso Iniciado....';
    this.activeTab = 'upload';
    this.loading = false;
    this.zipUrl = '';
  }

  public viewData(): void {
    this.loadPages(this.currentPage);
  }

  public processZip(): void {
    if (!this._validUrl(this.zipUrl)) {
      alert('Por favor ingresá una URL válida.');

      return;
    }

    this.loading = true;

    this._zipService.processZip(this.zipUrl).subscribe({
      next: (response: any) => {
        this.loading = false;

        if (response.success) {
          this.response = '¡Proceso completado!';
        } else {
          this.response = 'Error al procesar ZIP';
        }
      },
      error: (error) => {
        this.response = 'Error al procesar ZIP';
        this.loading = false;

        console.log('Error:', error)
      },
    });
  }

  public setTab(evento: string): void {
    this.activeTab = evento;
  }

  public loadPages(page: number): void {
    this._zipService.getFiles(page).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.archivos = response.data;
          this.totalItems = response.total;
          this.totalPages = response.totalPages;
          this.currentPage = response.currentPage;
        }
      },
      error: (e) => console.error(e),
    });
  }

  private _validUrl(url: string): boolean {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocolo
      '([\\w\\d-]+\\.)+[\\w-]{2,}' + // dominio
      '(\\/\\S*)?$', 'i'); // ruta opcional

    return pattern.test(url);
  }
}
