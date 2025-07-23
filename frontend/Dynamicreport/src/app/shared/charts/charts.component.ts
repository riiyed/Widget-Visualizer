import { Component, OnInit } from '@angular/core';
import { ChartDataService } from 'src/app/service/chart-data.service';
import { AgChartOptions } from 'ag-charts-community';

interface GraphConfig {
  chartType: string;
  xAxis: string;
  yAxis: string;
  chartOptions: AgChartOptions | null;
  timestamp: string;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chartData: any[] = [];
  availableKeys: string[] = [];
  graphs: GraphConfig[] = [];

  sharedGraph: Omit<GraphConfig, 'chartOptions' | 'timestamp'> = {
    chartType: 'bar',
    xAxis: '',
    yAxis: ''
  };

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    this.chartDataService.getChartData().subscribe(data => {
      if (data && data.length) {
        this.chartData = data;
        this.availableKeys = Object.keys(data[0]);
      } else {
        alert("Execute a query first");
      }
    });

    this.loadSavedGraphs();
  }

  addGraph() {
    const { chartType, xAxis, yAxis } = this.sharedGraph;

    if (!xAxis || !yAxis) {
      alert("Please select valid X and Y axis values.");
      return;
    }

    const graph: GraphConfig = {
      chartType,
      xAxis,
      yAxis,
      chartOptions: null,
      timestamp: new Date().toISOString()
    };

    const preparedData = this.prepareChartData(graph);

    try {
      switch (chartType) {
        case 'bar':
          graph.chartOptions = this.createBarChart(preparedData, graph);
          break;
        case 'line':
          graph.chartOptions = this.createLineChart(preparedData, graph);
          break;
        case 'area':
          graph.chartOptions = this.createAreaChart(preparedData, graph);
          break;
      }

      this.graphs.push(graph);
    } catch (error) {
      console.error(error);
      alert("Failed to generate chart.");
    }
  }

  removeGraph(index: number) {
    this.graphs.splice(index, 1);
  }

  clearGraphs() {
    this.graphs = [];
  }

  prepareChartData(graph: GraphConfig) {
    return this.chartData.map(item => ({
      [graph.xAxis]: item[graph.xAxis],
      [graph.yAxis]: this.parseNumericValue(item[graph.yAxis])
    }));
  }

  parseNumericValue(value: any): number {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const clean = value.replace(/[^0-9.-]/g, '');
      const parsed = parseFloat(clean);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  }

  createBarChart(data: any[], graph: GraphConfig): AgChartOptions {
    return {
      data,
      series: [{
        type: 'bar',
        xKey: graph.xAxis,
        yKey: graph.yAxis,
        fill: '#3498db',
        strokeWidth: 0
      }],
      axes: [
        { type: 'category', position: 'bottom', title: { text: graph.xAxis } },
        { type: 'number', position: 'left', title: { text: graph.yAxis } }
      ],
      background: { fill: 'white' }
    };
  }

  createLineChart(data: any[], graph: GraphConfig): AgChartOptions {
    return {
      data,
      series: [{
        type: 'line',
        xKey: graph.xAxis,
        yKey: graph.yAxis,
        stroke: '#3498db',
        strokeWidth: 2,
        marker: {
          enabled: true,
          size: 6,
          fill: '#3498db'
        }
      }],
      axes: [
        { type: 'category', position: 'bottom', title: { text: graph.xAxis } },
        { type: 'number', position: 'left', title: { text: graph.yAxis } }
      ],
      background: { fill: 'white' }
    };
  }

  createAreaChart(data: any[], graph: GraphConfig): AgChartOptions {
    return {
      data,
      series: [{
        type: 'area',
        xKey: graph.xAxis,
        yKey: graph.yAxis,
        fill: '#2ecc71',
        stroke: '#27ae60',
        strokeWidth: 2,
        marker: {
          enabled: true,
          fill: '#27ae60',
          stroke: '#1e8449'
        }
      }],
      axes: [
        { type: 'category', position: 'bottom', title: { text: graph.xAxis } },
        { type: 'number', position: 'left', title: { text: graph.yAxis } }
      ],
      background: { fill: 'white' }
    };
  }

  saveGraph(index: number) {
    const graph = this.graphs[index];
    const payload = {
      chartType: graph.chartType,
      coordinates: JSON.stringify({
        email: localStorage.getItem('email') || 'unknown@example.com',
        xAxis: graph.xAxis,
        yAxis: graph.yAxis,
        timestamp: graph.timestamp
      })
    };

    this.chartDataService.saveGraphData(payload).subscribe({
      next: () => alert('✅ Graph saved successfully!'),
      error: () => alert('❌ Failed to save graph.')
    });
  }

  loadSavedGraphs() {
    this.chartDataService.getSavedGraphs().subscribe(data => {
      this.graphs = data.map(item => {
        const coords = JSON.parse(item.coordinates);
        return {
          chartType: item.chartType,
          xAxis: coords.xAxis,
          yAxis: coords.yAxis,
          timestamp: coords.timestamp,
          chartOptions: null
        };
      });

      // Create chart options for each loaded graph
      this.graphs.forEach(graph => {
        const preparedData = this.prepareChartData(graph);
        switch (graph.chartType) {
          case 'bar':
            graph.chartOptions = this.createBarChart(preparedData, graph);
            break;
          case 'line':
            graph.chartOptions = this.createLineChart(preparedData, graph);
            break;
          case 'area':
            graph.chartOptions = this.createAreaChart(preparedData, graph);
            break;
        }
      });
    });
  }
}
