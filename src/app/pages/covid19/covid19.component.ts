import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoCovid19Service } from 'src/app/services/info-covid19.service';
import {FormControl} from '@angular/forms';
import Swal from 'sweetalert2';
import { ChartDataSets } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { covid19Pais, covid19PaisInfo } from '../../interfaces/info-covid19-pais.interface';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {
  formSeleccionar = new FormControl();
  public listaPaisesSeleccionar: string[];
  formQuitar = new FormControl();
  public listaPaisesQuitar: string[] = [];

  public infoPaises: any;
  public totalInfectados: number = 0;
  public totalMuertos: number = 0;
  public totalRecuperados: number = 0;

  constructor(private infoCOVID19: InfoCovid19Service) { }

  ngOnInit() {
    this.obtenerInfoPaises();
  }

  obtenerInfoPaises() {
    this.infoCOVID19.getInfoPaises().subscribe( (datos: covid19Pais[]) => {
      this.infoPaises = datos;
      this.listaPaisesSeleccionar = Object.keys(datos);
      this.rellenarLineChartLabel();
      this.obtenerTotales();
      // console.log(this.infoPaises);
    },
    error => {
      console.log(JSON.stringify(error));
    });
  }

  obtenerTotales(){
    for (let dat of Object.keys(this.infoPaises)) {
      let ulti: number = (this.infoPaises[dat].length - 1);
      this.totalInfectados += this.infoPaises[dat][ulti].confirmed;
      this.totalMuertos += this.infoPaises[dat][ulti].deaths;
      this.totalRecuperados += this.infoPaises[dat][ulti].recovered;
    }
  }

  obtenerInfoPais(pais: string){
    let arrayInfo = [[], [], []];
    let infoPais: covid19PaisInfo[];
    infoPais = this.infoPaises[pais];
    for (let InPa in Object.keys(infoPais)) {
      arrayInfo[0].push(infoPais[InPa].confirmed);
      arrayInfo[1].push(infoPais[InPa].deaths);
      arrayInfo[2].push(infoPais[InPa].recovered);
    }
    return arrayInfo;
  }

  obtenerInfoPaisesSeleccionados() {
    this.reiniciarLineCharts();
    for (let pais of this.listaPaisesQuitar) {
      let infoPais = this.obtenerInfoPais(pais);
      this.rellenarLineCharts(pais, infoPais[0], infoPais[1], infoPais[2]);
    }
  }

  anadirPaises() {
    if (this.formSeleccionar.value) {
      for (let pais of this.formSeleccionar.value) {
        this.anadirItemLista(this.listaPaisesQuitar, pais);
        this.quitarItemLista(this.listaPaisesSeleccionar, pais);
      }
      this.ordenarListas();
      this.obtenerInfoPaisesSeleccionados();
      this.alerta('success','','Añadido/s Correctamente','La grafica se a actualizado');
    } else {
      this.alerta('warning','','Seleccione algun Pais para añadir','');
    }
    this.reiniciarFormularios();
  }

  quitarPaises() {
    if (this.formQuitar.value) {
      for (let pais of this.formQuitar.value) {
        this.anadirItemLista(this.listaPaisesSeleccionar, pais);
        this.quitarItemLista(this.listaPaisesQuitar, pais);
      }
      this.ordenarListas();
      this.obtenerInfoPaisesSeleccionados();
      this.alerta('success','','Quitado/s Correctamente','La grafica se a actualizado');
    } else {
      this.alerta('warning','','Seleccione algun Pais para quitar','');
    }
    this.reiniciarFormularios();
  }

  quitarItemLista( lista: string[], item: string ) {
    let i = lista.indexOf( item );
    if ( i !== -1 ) {
      lista.splice( i, 1 );
    }
  }

  anadirItemLista( lista: string[], item: string ){
    if (lista.indexOf( item ) === -1) {
      lista.push(item);
    }
  }

  ordenarListas() {
    this.listaPaisesSeleccionar.sort();
    this.listaPaisesQuitar.sort();
  }

  reiniciarFormularios(){
    this.formSeleccionar = new FormControl();
    this.formQuitar = new FormControl();
  }

  alerta(icono, titulo, texto, foot) {
    Swal.fire({
      icon: icono,
      title: titulo,
      text: texto,
      footer: foot
    });
  }

  //Graficas
  public lineChartContagiados: ChartDataSets[] = [];
  public lineChartMuertos: ChartDataSets[] = [];
  public lineChartRecuperados: ChartDataSets[] = [];

  public lineChartLabels: Label[] = [];

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';

  reiniciarLineCharts() {
    this.lineChartContagiados = [];
    this.lineChartMuertos = [];
    this.lineChartRecuperados = [];
  }

  rellenarLineCharts(pais: string, contagiados: number[], muertos: number[], recuperados: number[]){
    this.lineChartContagiados.push({data: contagiados , label: pais});
    this.lineChartMuertos.push({data: muertos , label: pais});
    this.lineChartRecuperados.push({data: recuperados , label: pais});
  }

  rellenarLineChartLabel() {
    for (let dat of Object.keys(this.infoPaises['Spain'])) {
      this.lineChartLabels.push(this.infoPaises['Spain'][dat].date);
    }
  }



  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }
}
