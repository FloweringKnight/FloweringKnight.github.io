// 报表分析页面模块
const ReportsPage = {
    charts: {},

    render() {
        return `
            <div class="reports-page">
                <!-- 时间筛选 -->
                <div class="main-card mb-6">
                    <div class="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex items-center space-x-4 w-full md:w-auto">
                            <select id="reportPeriod" class="select-field w-full md:w-40">
                                <option value="month">本月</option>
                                <option value="quarter">本季度</option>
                                <option value="year">本年度</option>
                            </select>
                            <div class="flex items-center space-x-2">
                                <input type="date" class="input-field">
                                <span>至</span>
                                <input type="date" class="input-field">
                            </div>
                        </div>
                        <button class="btn btn-secondary" onclick="ReportsPage.exportReport()">
                            <i class="fas fa-download"></i>
                            <span>导出报表</span>
                        </button>
                    </div>
                </div>

                <!-- 销售报表 -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div class="chart-container p-6">
                        <h3 class="font-semibold mb-4">月度销售趋势</h3>
                        <canvas id="monthlySalesChart" height="300"></canvas>
                    </div>

                    <div class="chart-container p-6">
                        <h3 class="font-semibold mb-4">产品销售分布</h3>
                        <canvas id="productSalesChart" height="300"></canvas>
                    </div>
                </div>

                <!-- 客户分析 -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div class="main-card p-6">
                        <h3 class="font-semibold mb-4">客户增长</h3>
                        <div class="text-center py-8">
                            <p class="text-4xl font-bold text-green-600">+12%</p>
                            <p class="text-sm text-gray-500 mt-2">较上月增长</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div class="text-center">
                                <p class="text-2xl font-bold">${CRMData.customers.length}</p>
                                <p class="text-xs text-gray-500">总客户数</p>
                            </div>
                            <div class="text-center">
                                <p class="text-2xl font-bold text-blue-600">8</p>
                                <p class="text-xs text-gray-500">新增客户</p>
                            </div>
                        </div>
                    </div>

                    <div class="main-card p-6">
                        <h3 class="font-semibold mb-4">客户价值分布</h3>
                        <canvas id="customerValueChart" height="200"></canvas>
                    </div>

                    <div class="main-card p-6">
                        <h3 class="font-semibold mb-4">销售漏斗</h3>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm">需求分析</span>
                                <div class="flex-1 mx-4">
                                    <div class="progress-bar">
                                        <div class="progress-fill bg-blue-500" style="width: 100%"></div>
                                    </div>
                                </div>
                                <span class="text-sm font-medium">${CRMData.opportunities.filter(o => o.stage === '需求分析').length}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm">提案</span>
                                <div class="flex-1 mx-4">
                                    <div class="progress-bar">
                                        <div class="progress-fill bg-yellow-500" style="width: 75%"></div>
                                    </div>
                                </div>
                                <span class="text-sm font-medium">${CRMData.opportunities.filter(o => o.stage === '提案').length}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm">谈判</span>
                                <div class="flex-1 mx-4">
                                    <div class="progress-bar">
                                        <div class="progress-fill bg-orange-500" style="width: 50%"></div>
                                    </div>
                                </div>
                                <span class="text-sm font-medium">${CRMData.opportunities.filter(o => o.stage === '谈判').length}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm">成交</span>
                                <div class="flex-1 mx-4">
                                    <div class="progress-bar">
                                        <div class="progress-fill bg-green-500" style="width: 25%"></div>
                                    </div>
                                </div>
                                <span class="text-sm font-medium">${CRMData.opportunities.filter(o => o.stage === '成交').length}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 团队业绩 -->
                <div class="main-card mb-6">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="font-semibold">团队业绩排名</h3>
                    </div>
                    <div class="p-6">
                        <div class="overflow-x-auto">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>排名</th>
                                        <th>销售代表</th>
                                        <th>销售额</th>
                                        <th>成交数量</th>
                                        <th>线索转化率</th>
                                        <th>表现</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div class="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center font-bold">1</div>
                                        </td>
                                        <td>
                                            <div class="flex items-center space-x-3">
                                                <img src="https://i.pravatar.cc/100?img=11" class="avatar">
                                                <span class="font-medium">张三</span>
                                            </div>
                                        </td>
                                        <td>${Utils.formatCurrency(350000)}</td>
                                        <td>12</td>
                                        <td>35%</td>
                                        <td>
                                            <span class="badge badge-success">
                                                <i class="fas fa-arrow-up"></i> 优秀
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center font-bold">2</div>
                                        </td>
                                        <td>
                                            <div class="flex items-center space-x-3">
                                                <img src="https://i.pravatar.cc/100?img=12" class="avatar">
                                                <span class="font-medium">李四</span>
                                            </div>
                                        </td>
                                        <td>${Utils.formatCurrency(280000)}</td>
                                        <td>9</td>
                                        <td>30%</td>
                                        <td>
                                            <span class="badge badge-blue">
                                                <i class="fas fa-minus"></i> 良好
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div class="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">3</div>
                                        </td>
                                        <td>
                                            <div class="flex items-center space-x-3">
                                                <img src="https://i.pravatar.cc/100?img=13" class="avatar">
                                                <span class="font-medium">王五</span>
                                            </div>
                                        </td>
                                        <td>${Utils.formatCurrency(220000)}</td>
                                        <td>7</td>
                                        <td>28%</td>
                                        <td>
                                            <span class="badge badge-warning">
                                                <i class="fas fa-arrow-down"></i> 一般
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- 营销ROI -->
                <div class="main-card">
                    <div class="p-6 border-b border-gray-200">
                        <h3 class="font-semibold">营销活动ROI分析</h3>
                    </div>
                    <div class="p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${CRMData.marketing.map(m => {
                                const roi = m.leads > 0 ? ((m.leads * 2000) / m.budget * 100).toFixed(1) : 0;
                                return `
                                    <div class="p-4 border border-gray-200 rounded-lg">
                                        <div class="flex items-center justify-between mb-2">
                                            <h4 class="font-medium">${m.name}</h4>
                                            <span class="badge ${roi >= 200 ? 'badge-success' : roi >= 100 ? 'badge-blue' : 'badge-warning'}">${roi}%</span>
                                        </div>
                                        <div class="space-y-2 text-sm">
                                            <div class="flex justify-between">
                                                <span class="text-gray-500">预算</span>
                                                <span>${Utils.formatCurrency(m.budget)}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span class="text-gray-500">线索</span>
                                                <span>${m.leads}</span>
                                            </div>
                                            <div class="progress-bar mt-2">
                                                <div class="progress-fill ${roi >= 200 ? 'bg-green-500' : roi >= 100 ? 'bg-blue-500' : 'bg-yellow-500'}" style="width: ${Math.min(roi, 100)}%"></div>
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        this.initMonthlySalesChart();
        this.initProductSalesChart();
        this.initCustomerValueChart();
    },

    initMonthlySalesChart() {
        const ctx = document.getElementById('monthlySalesChart');
        if (!ctx) return;

        this.charts.monthlySales = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                datasets: [
                    {
                        label: '销售额',
                        data: [120000, 190000, 150000, 220000, 180000, 250000],
                        backgroundColor: '#0969da',
                        borderRadius: 4
                    },
                    {
                        label: '目标',
                        data: [150000, 180000, 200000, 220000, 250000, 300000],
                        backgroundColor: '#d0d7de',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '¥' + (value / 10000) + '万';
                            }
                        }
                    }
                }
            }
        });
    },

    initProductSalesChart() {
        const ctx = document.getElementById('productSalesChart');
        if (!ctx) return;

        this.charts.productSales = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['软件产品', '硬件设备', '咨询服务', '维护服务'],
                datasets: [{
                    data: [35, 25, 25, 15],
                    backgroundColor: [
                        '#0969da',
                        '#238636',
                        '#9e6a03',
                        '#da3633'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    },

    initCustomerValueChart() {
        const ctx = document.getElementById('customerValueChart');
        if (!ctx) return;

        this.charts.customerValue = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['高价值', '中价值', '低价值'],
                datasets: [{
                    data: [
                        CRMData.customers.filter(c => c.value >= 100000).length,
                        CRMData.customers.filter(c => c.value >= 50000 && c.value < 100000).length,
                        CRMData.customers.filter(c => c.value < 50000).length
                    ],
                    backgroundColor: [
                        '#238636',
                        '#9e6a03',
                        '#57606a'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    },

    exportReport() {
        alert('报表导出功能开发中...');
    }
};
