import {Injectable} from '@angular/core';
import {Tarefa} from './tarefa';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  //apiUrl = 'http://localhost:8080/api/todos';
  apiUrl: string = environment.apiURL;

  constructor(private http: HttpClient) {
  }

  salvar(todo: Tarefa): Observable<Tarefa> {

    return this.http.post<Tarefa>(this.apiUrl, todo);

  }

  listar(): Observable<Tarefa[]>{
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  deletar(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);

  }


  marcarComoConcluido(id: number): Observable<Tarefa> {
    const url = `${this.apiUrl}/${id}/concluido`;
    return this.http.patch<Tarefa>(url,{});

  }

}
