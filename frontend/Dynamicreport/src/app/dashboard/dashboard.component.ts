import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Dashboard metrics
  pendingOrders = 32;
  newCustomers = 124;
  messages = 45;
  conversionRate = 80;

  // Sample loan data for charts (converted to Indian Rupees)
  sampleLoanData = [
    { month: 'Jan', loanAmount: 37500000, approvals: 85, rejections: 15, interestRate: 5.5, defaultRate: 2.1 },
    { month: 'Feb', loanAmount: 43333333, approvals: 92, rejections: 8, interestRate: 5.8, defaultRate: 1.9 },
    { month: 'Mar', loanAmount: 31666667, approvals: 78, rejections: 22, interestRate: 6.0, defaultRate: 2.3 },
    { month: 'Apr', loanAmount: 54166667, approvals: 95, rejections: 5, interestRate: 5.9, defaultRate: 1.8 },
    { month: 'May', loanAmount: 60000000, approvals: 88, rejections: 12, interestRate: 6.2, defaultRate: 2.0 },
    { month: 'Jun', loanAmount: 49166667, approvals: 91, rejections: 9, interestRate: 6.1, defaultRate: 1.7 }
  ];

  // 1. Loan Amount Trends (Bar Chart) - Updated for Rupees
  public loanAmountChart: AgChartOptions = {
    data: this.sampleLoanData,
    title: {
      text: 'Monthly Loan Amounts',
      fontSize: 18,
      fontWeight: 'bold'
    },
    subtitle: {
      text: 'Loan disbursement trends over time (in INR)'
    },
    series: [
      {
        type: 'bar',
        xKey: 'month',
        yKey: 'loanAmount',
        yName: 'Loan Amount (₹)',
        fill: '#3498db',
        stroke: '#2980b9',
        strokeWidth: 2,
        label: {
          enabled: true,
          formatter: (params) => '₹' + (params.value / 10000000).toFixed(1) + 'Cr'
        }
      }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Month' }
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Amount (₹)' },
        label: {
          formatter: (params) => '₹' + (params.value / 10000000).toFixed(1) + 'Cr'
        }
      }
    ]
  };

  // 2. Approval vs Rejection Rates (Line Chart) - No currency change needed
  public approvalRateChart: AgChartOptions = {
    data: this.sampleLoanData,
    title: {
      text: 'Loan Approval vs Rejection Rates',
      fontSize: 18,
      fontWeight: 'bold'
    },
    series: [
      {
        type: 'line',
        xKey: 'month',
        yKey: 'approvals',
        yName: 'Approvals (%)',
        stroke: '#27ae60',
        strokeWidth: 3,
        marker: {
          enabled: true,
          fill: '#27ae60',
          size: 8
        }
      },
      {
        type: 'line',
        xKey: 'month',
        yKey: 'rejections',
        yName: 'Rejections (%)',
        stroke: '#e74c3c',
        strokeWidth: 3,
        marker: {
          enabled: true,
          fill: '#e74c3c',
          size: 8
        }
      }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Month' }
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Percentage (%)' },
        min: 0,
        max: 100
      }
    ],
    legend: {
      enabled: true,
      position: 'bottom'
    }
  };

  // 3. Monthly Performance Overview (Area Chart) - Updated for Rupees
  public performanceOverviewChart: AgChartOptions = {
    data: this.sampleLoanData,
    title: {
      text: 'Monthly Loan Performance Overview',
      fontSize: 18,
      fontWeight: 'bold'
    },
    subtitle: {
      text: 'Performance trends in INR'
    },
    series: [
      {
        type: 'area',
        xKey: 'month',
        yKey: 'loanAmount',
        yName: 'Loan Amount (₹)',
        fill: '#3498db',
        fillOpacity: 0.6,
        stroke: '#2980b9',
        strokeWidth: 3
      }
    ],
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Month' }
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Amount (₹)' },
        label: {
          formatter: (params) => '₹' + (params.value / 10000000).toFixed(1) + 'Cr'
        }
      }
    ]
  };

  // Navigation properties (unchanged)
  sidebarItems = [
    { name: 'Dashboard', icon: '📊', active: true, route: '/dashboard' }
  ];

  userInterfaceItems = [
    { name: 'Blocks', icon: '🧱', active: false },
    { name: 'Widgets', icon: '🔧', active: false },
    { name: 'Elements', icon: '⚡', active: false },
    { name: 'Tables', icon: '📋', active: false },
    { name: 'Forms', icon: '📝', active: false }
  ];

  developItems = [
    { name: 'Components', icon: '🔨', active: false },
    { name: 'Layout', icon: '📐', active: false },
    { name: 'Multi Level Menu', icon: '📂', active: false }
  ];

  pageItems = [
    { name: 'Register', icon: '👤', active: false, route: '/dashboard/register' },
    { name: 'Login', icon: '🔐', active: false, route: '/dashboard/login' },
    { name: 'DB Connection', icon: '🗄️', active: false, route: '/dashboard/dbconnection' },
    { name: 'Query', icon: '🔍', active: false, route: '/dashboard/query' },
    { name: 'Graphs', icon: '📊', active: false, route: '/dashboard/charts' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.refreshChartData();
  }

  refreshChartData(): void {
    console.log('Chart data refreshed');
  }

  navigateToPage(route: string): void {
    this.router.navigate([route]);
  }

  setActiveItem(clickedItem: any, items: any[]): void {
    items.forEach(item => item.active = false);
    clickedItem.active = true;
  }
}
