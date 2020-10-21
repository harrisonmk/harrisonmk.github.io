import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TodoService} from './todo.service';
import {Tarefa} from './tarefa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  todos: Tarefa[] = [];
  form: FormGroup = new FormGroup({
    descricao: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private service: TodoService) {

  }

  ngOnInit() {

  }

  listarTodos() {
    this.service.listar().subscribe(todoList => {
      this.todos = todoList;
    });
  }


  submit() {

    const todo: Tarefa = {...this.form.value};

    this.service.salvar(todo).subscribe(SavedTodo => {
      this.todos.push(SavedTodo);
      this.form.reset();
    });


  }

  delete(todo: Tarefa) {

    this.service.deletar(todo.id).subscribe({next: (response) => this.listarTodos()});

  }


  done(todo: Tarefa){
    this.service.marcarComoConcluido(todo.id).subscribe({
      next: (todoAtualizado) => {
        todo.tarefaRealizada = todoAtualizado.tarefaRealizada;
        todo.horaTarefaConcluida = todoAtualizado.horaTarefaConcluida;
      }
    });
  }

}

