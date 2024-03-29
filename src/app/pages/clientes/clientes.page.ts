import { PostProvider } from 'src/providers/post-provider';
import { Component, OnInit, Provider } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes : any = [];
  limit : number = 10;
  start : number = 0;
  nome: string = "";

  constructor(private router: Router, private provider: PostProvider) { }

  ionViewWillEnter(){
    this.clientes = [];
    this.start = 0;
    this.Carregar();
  }


// update listview
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  
// infinite scroll
loadData(event) {
 
    this.start += this.limit;

    setTimeout(() => {
      this.Carregar().then(() =>{
        event.target.complete();
      });
    }, 500);
  
}

  ngOnInit() {
   
  }

  addCliente(){
    this.router.navigate(['/add-cliente']);
  }

  Carregar() {
    return new Promise(resolve => {
      let dados = {
        request: 'getdata',

        limit : this.limit,
        start : this.start
      };
      this.provider.inserirApi(dados, 'inserirCliente.php').subscribe(data => {
          for( let cliente of data['result']){
            this.clientes.push(cliente);
          }
          resolve(true);
      });
    });
  }


  Buscar() {
    return new Promise(resolve => {
      let dados = {
        request: 'buscar',
        nome: this.nome,
      };
      this.provider.inserirApi(dados, 'inserirCliente.php').subscribe(data => {
          this.clientes = [];
          for( let cliente of data['result']){
            this.clientes.push(cliente);
          }
          resolve(true);
      });
    });
  }


  editar(id, nome, telefone, email){
    this.router.navigate(['/add-cliente/' + id + '/' + nome + '/' + telefone + '/' + email]);

   }
   excluir(id){

    let dados = {
      request : 'excluir',
      id : id
    };

    this.provider.inserirApi(dados, 'inserirCliente.php').subscribe(data => {
       this.ionViewWillEnter();
    });

   }

   mostrar(id, nome, telefone, email){
    this.router.navigate(['/mostrar-cliente/' + id + '/' + nome + '/' + telefone + '/' + email]);

   }

}
