import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TabService } from '../service/tab/tab.service';
import { RecursionService } from '../service/recursion/recursion.service';
import { SeriesService } from '../service/series/series.service';
import { IonItem, IonInput, IonCardTitle, IonCardContent, IonContent, IonLabel, IonCard, IonCardHeader, IonButton, IonList } from "@ionic/angular/standalone";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicepage',
  templateUrl: './servicepage.page.html',
  styleUrls: ['./servicepage.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonItem, IonInput, IonCardTitle, IonCardContent, IonContent, IonLabel, IonCard, IonCardHeader, IonButton, IonList, HeaderComponent]
})

export class ServicepagePage implements OnInit {
  xyTab = new Map();
  xySeries = new Map();
  xyRecursion = new Map;
  xyInput: string[] = [];

  constructor(
    private tabService: TabService,
    private seriesService: SeriesService,
    private recursionService: RecursionService
  ) {
    Chart.register(...registerables);
  }

  xx: string[] = [];
  yySer: number[] = [];
  yyRec: number[] = [];
  yyTab: number[] = [];

  @ViewChild('lineCanvas') private lineCanvas?: ElementRef;
  lineChart: any;

  ngOnInit() {}

  lineChartMake(): void {
    if (this.lineChart instanceof Chart) {
      this.lineChart.destroy();
    }

    this.lineChart = new Chart(this.lineCanvas?.nativeElement, {
      type: 'line',
      data: {
        labels: this.xx,
        datasets: [
          {
            label: 'Табулювання',
            data: this.yyTab,
            fill: false,
            borderColor: 'salmon',
            borderWidth: 1,
            borderDashOffset: 0.0,
            pointRadius: 2,
            spanGaps: false,
          },
          {
            label: 'Рекурсія',
            data: this.yyRec,
            fill: false,
            borderColor: '#123456',
            borderWidth: 1,
            borderDashOffset: 0.0,
            pointRadius: 4,
            spanGaps: false,
          },
          {
            label: 'Ряд',
            data: this.yySer,
            fill: false,
            borderColor: 'aqua',
            borderWidth: 1,
            borderDashOffset: 0.0,
            pointRadius: 6,
            spanGaps: false,
          }
        ],   
      },
      options: {
        responsive: true,
        scales: {
          x: {
            suggestedMin: 0,
            title: {
              display: true,
              text: 'X'
            },
            ticks: {
              stepSize: 0.001,
            }
          },
          y: {
            title: {
              display: true,
              text: 'Y'
            },
            ticks: {
              stepSize: 0.001,
            }
          }
        }
      }     
    });
  }
  ras(xn: any, xk: any, h: any) {
    // try {
      let xn1 = parseFloat(xn),
        xk1 = parseFloat(xk),
        h1 = parseFloat(h);
      this.xx = [];
      this.yyTab = [];
      console.log('Табулювання');
      debugger;
      let obj = this.tabService.getTab(xn1, xk1, h1);
      this.xx = obj.x;
      this.yyTab = obj.y;
      console.log('Ряд');
      this.xySeries = this.seriesService.getTab(xn1, xk1, h1);
      console.log('Рекурсія');
      this.xyRecursion = this.recursionService.getTab(xn1, xk1, h1);
      console.log('Помилка тут')
      this.input();
      console.log('Помилка тут 2')
      this.lineChartMake();
    // } catch {
    //   console.log('Виникла помилка під час виконання функції ras')
    // }
  }
  input() {
    this.yySer = new Array();
    this.yyRec = new Array();
    this.xyInput = [];
    debugger;
    this.xx.forEach((value, index) => {
      let s = '';
      let y: number = 0;
      y = this.yyTab[index];
      s = y.toFixed(4) + ' ';
      y = this.xySeries.get(value);
      this.yySer.push(y);
      s = s + y.toFixed(4) + ' ';
      y = this.xyRecursion.get(value);
      this.yyRec.push(y);
      s = s + '' + y.toFixed(4);
      console.log(s);
      this.xyInput.push(s);
    });
  }
  
}
