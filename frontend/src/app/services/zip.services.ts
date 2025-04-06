import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ZipService {
  constructor(private _http: HttpClient) {
  }

  public processZip(url: string): Observable<any> {
    return this._http.post('http://localhost:3000/api/process-zip', {url: url});
  }

  public getFiles(page: number): Observable<any> {
    return this._http.get(`http://localhost:3000/api/files?page=${page}&limit=10`);
  }
}
