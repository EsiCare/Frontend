import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

import * as d3Utils from 'd3';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

const GRAPH1 = [
    { date: new Date('2010-01-01'), value: 10.73 },
    { date: new Date('2010-01-06'), value: 100.97 },
    { date: new Date('2010-01-07'), value: 110.58 },
    { date: new Date('2010-01-08'), value: 151.98 },
    { date: new Date('2010-01-11'), value: 150.11 },
];

const GRAPH2 = [
    { date: new Date('2010-01-01'), value: 57.72 },
    { date: new Date('2010-01-04'), value: 150.65 },
    { date: new Date('2010-01-05'), value: 30.43 },
    { date: new Date('2010-01-06'), value: 155.93 },
    { date: new Date('2010-01-11'), value: 60.72 },
]

@Component({
    selector: 'app-line-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
    @ViewChild('graph') graphFigure!: ElementRef;

    title = 'Line Chart';

    private margin = { top: 10, right: 60, bottom: 20, left: 50 };
    private width!: number;
    private height!: number;
    private x: any;
    private y: any;
    private svg: any;
    private line!: d3Shape.Line<[number, number]>;

    constructor() {
    }

    ngOnInit() {

    }


    onResize(event: any) {
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    }
    ngAfterViewInit() {
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    }

    private initSvg() {
        this.width = this.graphFigure.nativeElement.clientWidth - this.margin.right - this.margin.left;
        this.height = this.graphFigure?.nativeElement.clientHeight - this.margin.bottom - this.margin.top;

        if (this.svg) {
            d3.select('#graph').select("g").remove();
        }
        this.svg = d3.select('#graph')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private initAxis() {
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.x.domain(d3Array.extent([...GRAPH1, ...GRAPH2], (d) => d.date));


        let yMax = -1;
        for (let item of GRAPH1) {
            yMax = Math.max(yMax, item.value);
        }
        for (let item of GRAPH2) {
            yMax = Math.max(yMax, item.value);
        }

        this.y.domain(d3Array.extent(Array.from({ length: yMax }, (_, i) => i + 1), (d) => d));
    }

    private drawAxis() {
        this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(
                d3Axis.axisBottom(this.x).tickFormat(d => (d as Date).toString().split(' ')[0])
            );

        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(
                d3Axis.axisLeft(this.y).tickSizeInner(-this.width)
            );



    }

    private drawLine() {
        this.svg.append('path')
            .datum(GRAPH1)
            .attr('class', 'line line-first')
            .attr('d', d3Shape.line()
            .curve(d3Utils.curveBasis)
            
                .x((d: any) => this.x(d.date))
                .y((d: any) => this.y(d.value)));

        this.svg.append('path')
            .datum(GRAPH2)
            .attr('class', 'line line-second')
            .attr('d',

                d3Shape.line()
                    .curve(d3Utils.curveBasis)
                    .x((d: any) => this.x(d.date))
                    .y((d: any) => this.y(d.value))
                    

            );
    }



}