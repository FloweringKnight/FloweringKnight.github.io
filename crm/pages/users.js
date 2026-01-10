// 用户管理页面模块
const UsersPage = {
    render() {
        return `
            <div class="users-page">
                <!-- 操作栏 -->
                <div class="main-card mb-6">
                    <div class="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex items-center space-x-4 w-full md:w-auto">
                            <div class="relative flex-1 md:flex-none">
                                <input type="text" id="userSearch" placeholder="搜索用户..." class="input-field w-full md-w-64">
                                <i class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                            <select id="roleFilter" class="select-field w-full md:w-32">
                                <option value="">全部角色</option>
                                <option value="销售经理">销售经理</option>
                                <option value="销售代表">销售代表</option>
                                <option value="销售助理">销售助理</option>
                            </select>
                            <select id="statusFilter" class="select-field w-full md:w-32">
                                <option value="">全部状态</option>
                                <option value="活跃">活跃</option>
                                <option value="离线">离线</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" onclick="UsersPage.showAddModal()">
                            <i class="fas fa-plus"></i>
                            <span>添加用户</span>
                        </button>
                    </div>
                </div>

                <!-- 用户列表 -->
                <div class="main-card">
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>用户信息</th>
                                    <th>邮箱</th>
                                    <th>角色</th>
                                    <th>部门</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="userTableBody">
                                ${CRMData.users.map(user => this.renderUserRow(user)).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 添加用户模态框 -->
                <div id="addUserModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                    <div class="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                        <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 class="text-lg font-semibold">添加用户</h3>
                            <button onclick="UsersPage.closeModal('addUserModal')" class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="p-6">
                            <form id="addUserForm" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1">姓名</label>
                                    <input type="text" name="name" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">邮箱</label>
                                    <input type="email" name="email" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">角色</label>
                                    <select name="role" class="select-field w-full">
                                        <option value="销售经理">销售经理</option>
                                        <option value="销售代表">销售代表</option>
                                        <option value="销售助理">销售助理</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">部门</label>
                                    <select name="department" class="select-field w-full">
                                        <option value="销售部">销售部</option>
                                        <option value="市场部">市场部</option>
                                        <option value="技术部">技术部</option>
                                        <option value="运营部">运营部</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">状态</label>
                                    <select name="status" class="select-field w-full">
                                        <option value="活跃">活跃</option>
                                        <option value="离线">离线</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button onclick="UsersPage.closeModal('addUserModal')" class="btn btn-secondary">取消</button>
                            <button onclick="UsersPage.addUser()" class="btn btn-primary">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // 初始化搜索
        const searchInput = document.getElementById('userSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterUsers(e.target.value);
            });
        }

        // 初始化筛选
        const roleFilter = document.getElementById('roleFilter');
        if (roleFilter) {
            roleFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }

        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }
    },

    renderUserRow(user) {
        return `
            <tr>
                <td>
                    <div class="flex items-center space-x-3">
                        <img src="https://i.pravatar.cc/100?u=${user.email}" alt="${user.name}" class="avatar">
                        <div>
                            <p class="font-medium">${user.name}</p>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td><span class="badge badge-blue">${user.role}</span></td>
                <td>${user.department}</td>
                <td>
                    <span class="flex items-center space-x-2">
                        <span class="w-2 h-2 rounded-full ${user.status === '活跃' ? 'bg-green-500' : 'bg-gray-400'}"></span>
                        <span>${user.status}</span>
                    </span>
                </td>
                <td>
                    <div class="flex items-center space-x-2">
                        <button class="btn btn-sm btn-secondary" onclick="UsersPage.showEditModal(${user.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-secondary" onclick="UsersPage.showPermissions(${user.id})">
                            <i class="fas fa-key"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="UsersPage.deleteUser(${user.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    showAddModal() {
        document.getElementById('addUserModal').classList.remove('hidden');
        document.getElementById('addUserModal').classList.add('flex');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
        document.getElementById(modalId).classList.remove('flex');
    },

    addUser() {
        const form = document.getElementById('addUserForm');
        const formData = new FormData(form);

        const newUser = {
            id: CRMData.users.length + 1,
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role'),
            department: formData.get('department'),
            status: formData.get('status')
        };

        CRMData.users.push(newUser);
        this.closeModal('addUserModal');
        PageManager.initUsers();
    },

    showEditModal(id) {
        const user = CRMData.users.find(u => u.id === id);
        if (user) {
            alert(`编辑用户：\n姓名：${user.name}\n邮箱：${user.email}\n角色：${user.role}\n部门：${user.department}\n状态：${user.status}`);
        }
    },

    showPermissions(id) {
        alert(`权限管理：\n用户 ID: ${id}\n\n角色权限配置功能开发中...`);
    },

    deleteUser(id) {
        if (confirm('确定要删除这个用户吗？')) {
            CRMData.users = CRMData.users.filter(u => u.id !== id);
            PageManager.initUsers();
        }
    },

    filterUsers(keyword) {
        const filtered = CRMData.users.filter(u =>
            u.name.includes(keyword) ||
            u.email.includes(keyword)
        );
        this.renderFilteredUsers(filtered);
    },

    applyFilters() {
        let filtered = [...CRMData.users];

        const role = document.getElementById('roleFilter')?.value;
        const status = document.getElementById('statusFilter')?.value;

        if (role) {
            filtered = filtered.filter(u => u.role === role);
        }

        if (status) {
            filtered = filtered.filter(u => u.status === status);
        }

        this.renderFilteredUsers(filtered);
    },

    renderFilteredUsers(users) {
        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = users.map(user => this.renderUserRow(user)).join('');
    }
};
