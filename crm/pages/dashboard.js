// 仪表盘页面模块
const DashboardPage = {
    charts: {},

    render() {
        const totalCustomers = CRMData.customers.length;
        const totalOpportunities = CRMData.opportunities.length;
        const totalValue = CRMData.opportunities.reduce((sum, opp) => sum + opp.value, 0);
        const pendingTasks = CRMData.tasks.filter(t => t.status === '待处理').length;

        return `
            <div class="dashboard-page">
                <!-- KPI卡片 -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="kpi-card p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">总客户数</p>
                                <h3 class="text-3xl font-bold">${totalCustomers}</h3>
                                <p class="text-sm text-green-600 mt-2">
                                    <i class="fas fa-arrow-up mr-1"></i>
                                    <span>12%</span>
                                    <span class="text-gray-500 ml-1">较上月</span>
                                </p>
                            </div>
                            <div class="stat-icon bg-blue-100 text-blue-600">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">销售机会</p>
                                <h3 class="text-3xl font-bold">${totalOpportunities}</h3>
                                <p class="text-sm text-green-600 mt-2">
                                    <i class="fas fa-arrow-up mr-1"></i>
                                    <span>8%</span>
                                    <span class="text-gray-500 ml-1">较上月</span>
                                </p>
                            </div>
                            <div class="stat-icon bg-green-100 text-green-600">
                                <i class="fas fa-chart-line"></i>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">总价值</p>
                                <h3 class="text-3xl font-bold">${Utils.formatCurrency(totalValue)}</h3>
                                <p class="text-sm text-green-600 mt-2">
                                    <i class="fas fa-arrow-up mr-1"></i>
                                    <span>15%</span>
                                    <span class="text-gray-500 ml-1">较上月</span>
                                </p>
                            </div>
                            <div class="stat-icon bg-purple-100 text-purple-600">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">待处理任务</p>
                                <h3 class="text-3xl font-bold">${pendingTasks}</h3>
                                <p class="text-sm text-yellow-600 mt-2">
                                    <i class="fas fa-clock mr-1"></i>
                                    <span>3个</span>
                                    <span class="text-gray-500 ml-1">即将到期</span>
                                </p>
                            </div>
                            <div class="stat-icon bg-yellow-100 text-yellow-600">
                                <i class="fas fa-tasks"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 图表区域 -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div class="chart-container p-6">
                        <h3 class="font-semibold mb-4">销售趋势</h3>
                        <canvas id="salesChart" height="300"></canvas>
                    </div>

                    <div class="chart-container p-6">
                        <h3 class="font-semibold mb-4">客户分布</h3>
                        <canvas id="customerChart" height="300"></canvas>
                    </div>
                </div>

                <!-- 近期活动和待办任务 -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="main-card">
                        <div class="p-6 border-b border-gray-200">
                            <h3 class="font-semibold">近期活动</h3>
                        </div>
                        <div class="p-6">
                            <div class="space-y-4">
                                <div class="flex items-start space-x-4">
                                    <div class="flex-shrink-0">
                                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <i class="fas fa-phone text-blue-600"></i>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">与张伟电话沟通</p>
                                        <p class="text-xs text-gray-500">2小时前</p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div class="flex-shrink-0">
                                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <i class="fas fa-envelope text-green-600"></i>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">发送李娜项目提案</p>
                                        <p class="text-xs text-gray-500">5小时前</p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div class="flex-shrink-0">
                                        <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <i class="fas fa-file text-purple-600"></i>
                                        </div>
                                    </div>
                                    <div class="flex-1">
                                        <p class="text-sm font-medium">完成王强的合同</p>
                                        <p class="text-xs text-gray-500">昨天</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="main-card">
                        <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 class="font-semibold">待办任务</h3>
                            <button class="btn btn-sm btn-secondary" onclick="PageManager.navigateTo('tasks')">
                                查看全部
                            </button>
                        </div>
                        <div class="p-6">
                            <div class="space-y-3">
                                ${CRMData.tasks.slice(0, 3).map(task => `
                                    <div class="task-item p-3 border border-gray-200 rounded-lg priority-${task.priority === '高' ? 'high' : task.priority === '中' ? 'medium' : 'low'}">
                                        <div class="flex items-center justify-between">
                                            <div class="flex items-center space-x-3">
                                                <input type="checkbox" class="w-4 h-4" ${task.status === '已完成' ? 'checked' : ''}>
                                                <span class="text-sm font-medium ${task.status === '已完成' ? 'line-through text-gray-500' : ''}">${task.title}</span>
                                            </div>
                                            <span class="badge ${Utils.getPriorityBadge(task.priority)}">${task.priority}</span>
                                        </div>
                                        <p class="text-xs text-gray-500 mt-2 ml-7">
                                            <i class="fas fa-calendar-alt mr-1"></i>
                                            ${task.dueDate}
                                            <span class="mx-2">|</span>
                                            <i class="fas fa-user mr-1"></i>
                                            ${task.assignee}
                                        </p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        this.initSalesChart();
        this.initCustomerChart();

        // 强制设置canvas高度，防止不断增高
        setTimeout(() => {
            document.getElementById('salesChart').style.height = '300px';
            document.getElementById('customerChart').style.height = '300px';
        }, 100);
    },

    initSalesChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        this.charts.sales = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                datasets: [{
                    label: '销售额',
                    data: [120000, 190000, 150000, 220000, 180000, 250000],
                    borderColor: '#0969da',
                    backgroundColor: 'rgba(9, 105, 218, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
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

    initCustomerChart() {
        const ctx = document.getElementById('customerChart');
        if (!ctx) return;

        this.charts.customer = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['活跃客户', '潜在客户', '流失客户'],
                datasets: [{
                    data: [CRMData.customers.filter(c => c.status === '活跃').length,
                           CRMData.customers.filter(c => c.status === '潜在').length,
                           2],
                    backgroundColor: [
                        '#238636',
                        '#58a6ff',
                        '#da3633'
                    ]
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
};
