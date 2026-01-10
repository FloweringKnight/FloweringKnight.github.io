// 销售机会页面模块
const OpportunitiesPage = {
    currentView: 'kanban', // kanban 或 list

    render() {
        return `
            <div class="opportunities-page">
                <!-- 操作栏 -->
                <div class="main-card mb-6">
                    <div class="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex items-center space-x-4 w-full md:w-auto">
                            <div class="relative flex-1 md:flex-none">
                                <input type="text" id="opportunitySearch" placeholder="搜索机会..." class="input-field w-full md:w-64">
                                <i class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                            <button class="btn btn-secondary" onclick="OpportunitiesPage.toggleView()">
                                <i class="fas fa-th-large"></i>
                                <span>切换视图</span>
                            </button>
                        </div>
                        <button class="btn btn-primary" onclick="OpportunitiesPage.showAddModal()">
                            <i class="fas fa-plus"></i>
                            <span>创建机会</span>
                        </button>
                    </div>
                </div>

                <!-- 看板视图 -->
                <div id="kanbanView" class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="kanban-column">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold">需求分析</h3>
                            <span class="badge badge-blue">${this.getStages().count[0]}</span>
                        </div>
                        <div id="stage-需求分析">
                            ${CRMData.opportunities.filter(o => o.stage === '需求分析').map(opp => this.renderCard(opp)).join('')}
                        </div>
                    </div>

                    <div class="kanban-column">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold">提案</h3>
                            <span class="badge badge-warning">${this.getStages().count[1]}</span>
                        </div>
                        <div id="stage-提案">
                            ${CRMData.opportunities.filter(o => o.stage === '提案').map(opp => this.renderCard(opp)).join('')}
                        </div>
                    </div>

                    <div class="kanban-column">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold">谈判</h3>
                            <span class="badge badge-purple">${this.getStages().count[2]}</span>
                        </div>
                        <div id="stage-谈判">
                            ${CRMData.opportunities.filter(o => o.stage === '谈判').map(opp => this.renderCard(opp)).join('')}
                        </div>
                    </div>

                    <div class="kanban-column">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="font-semibold">成交</h3>
                            <span class="badge badge-success">${this.getStages().count[3]}</span>
                        </div>
                        <div id="stage-成交">
                            ${CRMData.opportunities.filter(o => o.stage === '成交').map(opp => this.renderCard(opp)).join('')}
                        </div>
                    </div>
                </div>

                <!-- 列表视图 -->
                <div id="listView" class="main-card hidden">
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>机会名称</th>
                                    <th>客户</th>
                                    <th>阶段</th>
                                    <th>金额</th>
                                    <th>概率</th>
                                    <th>预计成交</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="opportunityTableBody">
                                ${CRMData.opportunities.map(opp => `
                                    <tr>
                                        <td><span class="font-medium">${opp.name}</span></td>
                                        <td>${opp.customer}</td>
                                        <td><span class="badge ${this.getStageBadge(opp.stage)}">${opp.stage}</span></td>
                                        <td>${Utils.formatCurrency(opp.value)}</td>
                                        <td>
                                            <div class="flex items-center space-x-2">
                                                <div class="progress-bar w-24">
                                                    <div class="progress-fill ${this.getProgressBarClass(opp.probability)}" style="width: ${opp.probability}%"></div>
                                                </div>
                                                <span class="text-sm">${opp.probability}%</span>
                                            </div>
                                        </td>
                                        <td>${opp.expectedClose}</td>
                                        <td>
                                            <div class="flex items-center space-x-2">
                                                <button class="btn btn-sm btn-secondary" onclick="OpportunitiesPage.showDetail(${opp.id})">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button class="btn btn-sm btn-secondary" onclick="OpportunitiesPage.showEditModal(${opp.id})">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-sm btn-danger" onclick="OpportunitiesPage.deleteOpportunity(${opp.id})">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 添加机会模态框 -->
                <div id="addOpportunityModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                    <div class="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                        <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 class="text-lg font-semibold">创建销售机会</h3>
                            <button onclick="OpportunitiesPage.closeModal('addOpportunityModal')" class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="p-6">
                            <form id="addOpportunityForm" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1">机会名称</label>
                                    <input type="text" name="name" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">客户</label>
                                    <select name="customer" class="select-field w-full">
                                        ${CRMData.customers.map(c => `<option value="${c.name}">${c.name} - ${c.company}</option>`).join('')}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">金额</label>
                                    <input type="number" name="value" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">阶段</label>
                                    <select name="stage" class="select-field w-full">
                                        <option value="需求分析">需求分析</option>
                                        <option value="提案">提案</option>
                                        <option value="谈判">谈判</option>
                                        <option value="成交">成交</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">概率 (%)</label>
                                    <input type="number" name="probability" min="0" max="100" value="25" class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">预计成交日期</label>
                                    <input type="date" name="expectedClose" required class="input-field w-full">
                                </div>
                            </form>
                        </div>
                        <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button onclick="OpportunitiesPage.closeModal('addOpportunityModal')" class="btn btn-secondary">取消</button>
                            <button onclick="OpportunitiesPage.addOpportunity()" class="btn btn-primary">创建</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // 初始化搜索
        const searchInput = document.getElementById('opportunitySearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterOpportunities(e.target.value);
            });
        }
    },

    getStages() {
        return {
            count: [
                CRMData.opportunities.filter(o => o.stage === '需求分析').length,
                CRMData.opportunities.filter(o => o.stage === '提案').length,
                CRMData.opportunities.filter(o => o.stage === '谈判').length,
                CRMData.opportunities.filter(o => o.stage === '成交').length
            ]
        };
    },

    renderCard(opp) {
        return `
            <div class="kanban-card" draggable="true">
                <div class="flex items-center justify-between mb-2">
                    <h4 class="font-medium text-sm">${opp.name}</h4>
                    <span class="text-xs text-gray-500">${opp.customer}</span>
                </div>
                <div class="flex items-center justify-between text-xs text-gray-500">
                    <span>${Utils.formatCurrency(opp.value)}</span>
                    <span>${opp.probability}%</span>
                </div>
                <div class="progress-bar mt-2">
                    <div class="progress-fill ${this.getProgressBarClass(opp.probability)}" style="width: ${opp.probability}%"></div>
                </div>
            </div>
        `;
    },

    getStageBadge(stage) {
        const badges = {
            '需求分析': 'badge-blue',
            '提案': 'badge-warning',
            '谈判': 'badge-purple',
            '成交': 'badge-success'
        };
        return badges[stage] || 'badge-gray';
    },

    getProgressBarClass(probability) {
        if (probability < 30) return 'bg-red-500';
        if (probability < 70) return 'bg-yellow-500';
        return 'bg-green-500';
    },

    toggleView() {
        const kanbanView = document.getElementById('kanbanView');
        const listView = document.getElementById('listView');

        if (this.currentView === 'kanban') {
            this.currentView = 'list';
            kanbanView.classList.add('hidden');
            listView.classList.remove('hidden');
        } else {
            this.currentView = 'kanban';
            listView.classList.add('hidden');
            kanbanView.classList.remove('hidden');
        }
    },

    showAddModal() {
        document.getElementById('addOpportunityModal').classList.remove('hidden');
        document.getElementById('addOpportunityModal').classList.add('flex');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
        document.getElementById(modalId).classList.remove('flex');
    },

    addOpportunity() {
        const form = document.getElementById('addOpportunityForm');
        const formData = new FormData(form);

        const newOpp = {
            id: CRMData.opportunities.length + 1,
            name: formData.get('name'),
            customer: formData.get('customer'),
            stage: formData.get('stage'),
            value: parseInt(formData.get('value')),
            probability: parseInt(formData.get('probability')),
            expectedClose: formData.get('expectedClose')
        };

        CRMData.opportunities.push(newOpp);
        this.closeModal('addOpportunityModal');
        PageManager.initOpportunities();
    },

    showDetail(id) {
        const opp = CRMData.opportunities.find(o => o.id === id);
        if (opp) {
            alert(`机会详情：\n名称：${opp.name}\n客户：${opp.customer}\n阶段：${opp.stage}\n金额：${Utils.formatCurrency(opp.value)}\n概率：${opp.probability}%\n预计成交：${opp.expectedClose}`);
        }
    },

    showEditModal(id) {
        alert(`编辑机会 ID: ${id}`);
    },

    deleteOpportunity(id) {
        if (confirm('确定要删除这个机会吗？')) {
            CRMData.opportunities = CRMData.opportunities.filter(o => o.id !== id);
            PageManager.initOpportunities();
        }
    },

    filterOpportunities(keyword) {
        const filtered = CRMData.opportunities.filter(o =>
            o.name.includes(keyword) ||
            o.customer.includes(keyword)
        );

        // 更新列表视图
        const tbody = document.getElementById('opportunityTableBody');
        tbody.innerHTML = filtered.map(opp => `
            <tr>
                <td><span class="font-medium">${opp.name}</span></td>
                <td>${opp.customer}</td>
                <td><span class="badge ${this.getStageBadge(opp.stage)}">${opp.stage}</span></td>
                <td>${Utils.formatCurrency(opp.value)}</td>
                <td>
                    <div class="flex items-center space-x-2">
                        <div class="progress-bar w-24">
                            <div class="progress-fill ${this.getProgressBarClass(opp.probability)}" style="width: ${opp.probability}%"></div>
                        </div>
                        <span class="text-sm">${opp.probability}%</span>
                    </div>
                </td>
                <td>${opp.expectedClose}</td>
                <td>
                    <div class="flex items-center space-x-2">
                        <button class="btn btn-sm btn-secondary" onclick="OpportunitiesPage.showDetail(${opp.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="OpportunitiesPage.showEditModal(${opp.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="OpportunitiesPage.deleteOpportunity(${opp.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
};
