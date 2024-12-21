import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';
import * as d3 from 'd3';


interface GraphData {
  title: string;
  done_at: string;
  actor: string;
  obs: string[];
}

@Component({
  selector: 'app-graph-popup',
  templateUrl: './graph-popup.component.html',
  styleUrls: ['./graph-popup.component.css']
})


export class GraphPopupComponent implements OnInit {



  constructor(public popupService: PopupService) { }


  ngOnInit(): void {
    this.drawBars(this.data);
  }


  onClick(e: any) {
    e.stopPropagation();
  }
  private data = [
    { name: "HB", bottom: 10, top: 15 },
    { name: "WBC", bottom: 5, top: 15 },
    { name: "PLT", bottom: 10, top: 2 },
    { name: "Glycémie", bottom: 10, top: 6 },
    { name: "Créatinine", bottom: 10, top: 6 },
    { name: "Urée", bottom: 10, top: 6 },
    { name: "Cholestérol", bottom: 10, top: 6 },
    { name: "Triglycérides", bottom: 10, top: 6 },
    { name: "ALT", bottom: 10, top: 6 },
    { name: "CRP", bottom: 10, top: 6 },
  ];
  private cols = ["name", "bottom", "top"];


  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);


  private drawBars(data: any[]): void {

    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");




    var subgroups = this.cols.slice(1)
    var groups = d3.map(data, (d: any) => { return d.name })
    let height_max = 0;
    for (let col of data) {
      height_max = Math.max(height_max, col.bottom + col.top);
    }

    var color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#61CAE8', '#DCE5F7'])



    var x = d3.scaleBand()
      .domain(groups as any)
      .range([0, this.width])
      .padding([0.7] as any)
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x).tickSizeOuter(0));
    var y = d3.scaleLinear()
      .domain([0, height_max])
      .range([this.height, 0]);
    this.svg.append("g")
      .call(d3.axisLeft(y));

    var stackedData = d3.stack()
      .keys(subgroups)(data as any)

    // Show the bars
    this.svg.append("g")
      .selectAll("g")
      .data(stackedData)
      .enter().append("g")
      .attr("fill", (d: any) => { return color(d.key); })
      .selectAll("rect")
      .data((d: any) => { return d; })
      .enter().append("rect")
      .attr("x", (d: any) => { return x(d.data.name); })
      .attr("y", (d: any) => { return y(d[1]); })
      .attr("height", (d: any) => { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())

    this.svg.append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d: any) => d.top) 
      .attr("x", (d: any) => {
        return x(d.name);
      })
      .attr("y", (d: any) => { return y(d.top + d.bottom + 0.5); })
      .attr("text-anchor", "middle") 
      .attr("fill", "black") 
      .style("font-size", "12px")
      .attr("transform", "translate(8,0)");



    this.svg.append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d: any) => d.bottom) 
      .attr("x", (d: any) => {
        return x(d.name);
      })
      .attr("y", (d: any) => { return y(d.bottom + 0.5); })
      .attr("text-anchor", "middle") 
      .attr("fill", "black")
      .style("font-size", "12px")
      .attr("transform", "translate(8,0)");

  }




}

