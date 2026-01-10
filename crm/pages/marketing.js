// 营销活动页面模块
const MarketingPage = {
    render() {
        return `
            <div class="marketing-page">
                <!-- KPI卡片 -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div class="kpi-card p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">活动总数</p>
                                <h3 class="text-3xl font-bold">${CRMData.marketing.length}</h3>
                            </div>
                            <div class="stat-icon bg-blue-100 text-blue-600">
                                <i class="fas fa-bullhorn"></i>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">总线索数</p>
                                <h3 class="text-3xl font-bold">${CRMData.marketing.reduce((sum, m) => sum + m.leads, 0)}</h3>
                            </div>
                            <div class="stat-icon bg-green-100 text-green-600">
                                <i class="fas fa-users"></i>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">总预算</p>
                                <h3 class="text-3xl font-bold">${Utils.formatCurrency(CRMData.marketing.reduce((sum, m) => sum + m.budget, 0))}</h3>
                            </div>
                            <div class="stat-icon bg-purple-100 text-purple-600">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                        </div>
                    </div>

                    <div class="kpi-card p-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">进行中</p>
                                <h3 class="text-3xl font-bold">${CRMData.marketing.filter(m => m.status === '进行中').length}</h3>
                            </div>
                            <div class="stat-icon bg-yellow-100 text-yellow-600">
                                <i class="fas fa-chart-line"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 操作栏 -->
                <div class="main-card mb-6">
                    <div class="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex items-center space-x-4 w-full md:w-auto">
                            <div class="relative flex-1 md:flex-none">
                                <input type="text" id="marketingSearch" placeholder="搜索活动..." class="input-field w-full md:w-64">
                                <i class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                            <select id="marketingFilter" class="select-field w-full md:w-32">
                                <option value="">全部状态</option>
                                <option value="计划中">计划中</option>
                                <option value="进行中">进行中</option>
                                <option value="已完成">已完成</option>
                            </select>
                            <select id="typeFilter" class="select-field w-full md:w-32">
                                <option value="">全部类型</option>
                                <option value="线上广告">线上广告</option>
                                <option value="线下活动">线下活动</option>
                                <option value="邮件营销">邮件营销</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" onclick="MarketingPage.showAddModal()">
                            <i class="fas fa-plus"></i>
                            <span>创建活动</span>
                        </button>
                    </div>
                </div>

                <!-- 活动列表 -->
                <div class="main-card">
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>活动名称</th>
                                    <th>类型</th>
                                    <th>状态</th>
                                    <th>预算</th>
                                    <th>线索数</th>
                                    <th>ROI</th>
                                    <th>活动期间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="marketingTableBody">
                                ${CRMData.marketing.map(m => this.renderMarketingRow(m)).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 添加活动模态框 -->
                <div id="addMarketingModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                    <div class="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                        <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 class="text-lg font-semibold">创建营销活动</h3>
                            <button onclick="MarketingPage.closeModal('addMarketingModal')" class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="p-6">
                            <form id="addMarketingForm" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1">活动名称</label>
                                    <input type="text" name="name" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">活动类型</label>
                                    <select name="type" class="select-field w-full">
                                        <option value="线上广告">线上广告</option>
                                        <option value="线下活动">线下活动</option>
                                        <option value="邮件营销">邮件营销</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">预算</label>
                                    <input type="number" name="budget" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">开始日期</label>
                                    <input type="date" name="startDate" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">结束日期</label>
                                    <input type="date" name="endDate" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">描述</label>
                                    <textarea name="description" rows="3" class="input-field w-full"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button onclick="MarketingPage.closeModal('addMarketingModal')" class="btn btn-secondary">取消</button>
                            <button onclick="MarketingPage.addMarketing()" class="btn btn-primary">创建</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // 初始化搜索
        const searchInput = document.getElementById('marketingSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterMarketing(e.target.value);
            });
        }

        // 初始化筛选
        const statusFilter = document.getElementById('marketingFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }

        const typeFilter = document.getElementById('typeFilter');
        if (typeFilter) {
            typeFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }
    },

    renderMarketingRow(m) {
        // 计算ROI (线索数 * 平均价值 / 预算 * 100%)
        const roi = m.leads > 0 ? ((m.leads * 2000) / m.budget * 100).toFixed(1) : 0;

        return `
            <tr>
                <td>
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <i class="fas fa-${m.type === '线上广告' ? 'desktop' : m.type === '线下活动' ? 'users' : 'envelope'} text-blue-600"></i>
                        </div>
                        <div>
                            <p class="font-medium">${m.name}</p>
                        </div>
                    </div>
                </td>
                <td>${m.type}</td>
                <td><span class="badge ${Utils.getStatusBadge(m.status)}">${m.status}</span></td>
                <td>${Utils.formatCurrency(m.budget)}</td>
                <td>${m.leads}</td>
                <td>
                    <div class="flex items-center space-x-2">
                        <div class="progress-bar w-20">
                            <div class="progress-fill ${roi >= 200 ? 'bg-green-500' : roi >= 100 ? 'bg-yellow-500' : 'bg-red-500'}" style="width: ${Math.min(roi, 100)}%"></div>
                        </div>
                        <span class="text-sm">${roi}%</span>
                    </div>
                </td>
                <td>${m.startDate} 至 ${m.endDate}</td>
                <td>
                    <div class="flex items-center space-x-2">
                        <button class="btn btn-sm btn-secondary" onclick="MarketingPage.showDetail(${m.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="MarketingPage.showEditModal(${m.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="MarketingPage.deleteMarketing(${m.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    showAddModal() {
        document.getElementById('addMarketingModal').classList.remove('hidden');
        document.getElementById('addMarketingModal').classList.add('flex');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
        document.getElementById(modalId).classList.remove('flex');
    },

    addMarketing() {
        const form = document.getElementById('addMarketingForm');
        const formData = new FormData(form);

        const newMarketing = {
            id: CRMData.marketing.length + 1,
            name: formData.get('name'),
            type: formData.get('type'),
            status: '计划中',
            budget: parseInt(formData.get('budget')),
            leads: 0,
            startDate: formData.get('startDate'),
            endDate: formData.get('endDate')
        };

        CRMData.marketing.push(newMarketing);
        this.closeModal('addMarketingModal');
        PageManager.initMarketing();
    },

    showDetail(id) {
        const m = CRMData.marketing.find(m => m.id === id);
        if (m) {
            const roi = m.leads > 0 ? ((m.leads * 2000) / m.budget * 100).toFixed(1) : 0;
            alert(`活动详情：\n名称：${m.name}\n类型：${m.type}\n状态：${m.status}\n预算：${Utils.formatCurrency(m.budget)}\n线索数：${m.leads}\nROI：${roi}%\n期间：${m.startDate} 至 ${m.endDate}`);
        }
    },

    showEditModal(id) {
        alert(`编辑活动 ID: ${id}`);
    },

    deleteMarketing(id) {
        if (confirm('确定要删除这个活动吗？')) {
            CRMData.marketing = CRMData.marketing.filter(m => m.id !== id);
            PageManager.initMarketing();
        }
    },

    filterMarketing(keyword) {
        const filtered = CRMData.marketing.filter(m =>
            m.name.includes(keyword) ||
            m.type.includes(keyword)
        );
        this.renderFilteredMarketing(filtered);
    },

    applyFilters() {
        let filtered = [...CRMData.marketing];

        const status = document.getElementById('marketingFilter')?.value;
        const type = document.getElementById('typeFilter')?.value;

        if (status) {
            filtered = filtered.filter(m => m.status === status);
        }

        if (type) {
            filtered = filtered.filter(m => m.type === type);
        }

        this.renderFilteredMarketing(filtered);
    },

    renderFilteredMarketing(marketing) {
        const tbody = document.getElementById('marketingTableBody');
        tbody.innerHTML = marketing.map(m => this.renderMarketingRow(m)).join('');
    }
};
