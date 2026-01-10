// 客户管理页面模块
const CustomersPage = {
    render() {
        return `
            <div class="customers-page">
                <!-- 操作栏 -->
                <div class="main-card mb-6">
                    <div class="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex items-center space-x-4 w-full md:w-auto">
                            <div class="relative flex-1 md:flex-none">
                                <input type="text" id="customerSearch" placeholder="搜索客户..." class="input-field w-full md:w-64">
                                <i class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                            <select id="customerFilter" class="select-field w-full md:w-32">
                                <option value="">全部状态</option>
                                <option value="活跃">活跃</option>
                                <option value="潜在">潜在</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" onclick="CustomersPage.showAddModal()">
                            <i class="fas fa-plus"></i>
                            <span>添加客户</span>
                        </button>
                    </div>
                </div>

                <!-- 客户列表 -->
                <div class="main-card">
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>客户信息</th>
                                    <th>公司</th>
                                    <th>联系电话</th>
                                    <th>状态</th>
                                    <th>客户价值</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="customerTableBody">
                                ${CRMData.customers.map(customer => `
                                    <tr>
                                        <td>
                                            <div class="flex items-center space-x-3">
                                                <img src="${customer.avatar}" alt="${customer.name}" class="avatar">
                                                <div>
                                                    <p class="font-medium">${customer.name}</p>
                                                    <p class="text-sm text-gray-500">${customer.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${customer.company}</td>
                                        <td>${customer.phone}</td>
                                        <td><span class="badge ${Utils.getStatusBadge(customer.status)}">${customer.status}</span></td>
                                        <td>${Utils.formatCurrency(customer.value)}</td>
                                        <td>
                                            <div class="flex items-center space-x-2">
                                                <button class="btn btn-sm btn-secondary" onclick="CustomersPage.showDetail(${customer.id})">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <button class="btn btn-sm btn-secondary" onclick="CustomersPage.showEditModal(${customer.id})">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-sm btn-danger" onclick="CustomersPage.deleteCustomer(${customer.id})">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- 分页 -->
                    <div class="p-4 border-t border-gray-200 flex items-center justify-between">
                        <p class="text-sm text-gray-500">显示 1-${CRMData.customers.length} 共 ${CRMData.customers.length} 条记录</p>
                        <div class="flex items-center space-x-2">
                            <button class="btn btn-sm btn-secondary" disabled>
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <button class="btn btn-sm btn-primary">1</button>
                            <button class="btn btn-sm btn-secondary" disabled>
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 添加客户模态框 -->
                <div id="addCustomerModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                    <div class="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                        <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 class="text-lg font-semibold">添加客户</h3>
                            <button onclick="CustomersPage.closeModal('addCustomerModal')" class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="p-6">
                            <form id="addCustomerForm" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1">客户姓名</label>
                                    <input type="text" name="name" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">公司名称</label>
                                    <input type="text" name="company" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">联系电话</label>
                                    <input type="tel" name="phone" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">邮箱</label>
                                    <input type="email" name="email" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">状态</label>
                                    <select name="status" class="select-field w-full">
                                        <option value="潜在">潜在</option>
                                        <option value="活跃">活跃</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">客户价值</label>
                                    <input type="number" name="value" required class="input-field w-full">
                                </div>
                            </form>
                        </div>
                        <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button onclick="CustomersPage.closeModal('addCustomerModal')" class="btn btn-secondary">取消</button>
                            <button onclick="CustomersPage.addCustomer()" class="btn btn-primary">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // 初始化搜索功能
        const searchInput = document.getElementById('customerSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterCustomers(e.target.value);
            });
        }

        // 初始化筛选功能
        const filterSelect = document.getElementById('customerFilter');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.filterByStatus(e.target.value);
            });
        }
    },

    showAddModal() {
        document.getElementById('addCustomerModal').classList.remove('hidden');
        document.getElementById('addCustomerModal').classList.add('flex');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
        document.getElementById(modalId).classList.remove('flex');
    },

    addCustomer() {
        const form = document.getElementById('addCustomerForm');
        const formData = new FormData(form);

        const newCustomer = {
            id: CRMData.customers.length + 1,
            name: formData.get('name'),
            company: formData.get('company'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            status: formData.get('status'),
            value: parseInt(formData.get('value')),
            avatar: `https://i.pravatar.cc/100?img=${CRMData.customers.length + 10}`
        };

        CRMData.customers.push(newCustomer);
        this.closeModal('addCustomerModal');
        this.refreshTable();
    },

    showDetail(id) {
        const customer = CRMData.customers.find(c => c.id === id);
        if (customer) {
            alert(`客户详情：\n姓名：${customer.name}\n公司：${customer.company}\n电话：${customer.phone}\n邮箱：${customer.email}\n状态：${customer.status}\n价值：${Utils.formatCurrency(customer.value)}`);
        }
    },

    showEditModal(id) {
        alert(`编辑客户 ID: ${id}`);
    },

    deleteCustomer(id) {
        if (confirm('确定要删除这个客户吗？')) {
            CRMData.customers = CRMData.customers.filter(c => c.id !== id);
            this.refreshTable();
        }
    },

    filterCustomers(keyword) {
        const filtered = CRMData.customers.filter(c =>
            c.name.includes(keyword) ||
            c.company.includes(keyword) ||
            c.email.includes(keyword)
        );
        this.renderTable(filtered);
    },

    filterByStatus(status) {
        if (!status) {
            this.renderTable(CRMData.customers);
        } else {
            const filtered = CRMData.customers.filter(c => c.status === status);
            this.renderTable(filtered);
        }
    },

    refreshTable() {
        this.renderTable(CRMData.customers);
    },

    renderTable(customers) {
        const tbody = document.getElementById('customerTableBody');
        tbody.innerHTML = customers.map(customer => `
            <tr>
                <td>
                    <div class="flex items-center space-x-3">
                        <img src="${customer.avatar}" alt="${customer.name}" class="avatar">
                        <div>
                            <p class="font-medium">${customer.name}</p>
                            <p class="text-sm text-gray-500">${customer.email}</p>
                        </div>
                    </div>
                </td>
                <td>${customer.company}</td>
                <td>${customer.phone}</td>
                <td><span class="badge ${Utils.getStatusBadge(customer.status)}">${customer.status}</span></td>
                <td>${Utils.formatCurrency(customer.value)}</td>
                <td>
                    <div class="flex items-center space-x-2">
                        <button class="btn btn-sm btn-secondary" onclick="CustomersPage.showDetail(${customer.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="CustomersPage.showEditModal(${customer.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="CustomersPage.deleteCustomer(${customer.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }
};
