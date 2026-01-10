// 任务中心页面模块
const TasksPage = {
    currentView: 'list', // list 或 calendar

    render() {
        return `
            <div class="tasks-page">
                <!-- 操作栏 -->
                <div class="main-card mb-6">
                    <div class="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div class="flex items-center space-x-4 w-full md:w-auto">
                            <div class="relative flex-1 md:flex-none">
                                <input type="text" id="taskSearch" placeholder="搜索任务..." class="input-field w-full md:w-64">
                                <i class="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                            <select id="taskFilter" class="select-field w-full md:w-32">
                                <option value="">全部状态</option>
                                <option value="待处理">待处理</option>
                                <option value="进行中">进行中</option>
                                <option value="已完成">已完成</option>
                            </select>
                            <select id="priorityFilter" class="select-field w-full md:w-32">
                                <option value="">全部优先级</option>
                                <option value="高">高</option>
                                <option value="中">中</option>
                                <option value="低">低</option>
                            </select>
                        </div>
                        <div class="flex items-center space-x-3">
                            <button class="btn btn-secondary" onclick="TasksPage.toggleView()">
                                <i class="fas fa-calendar-alt"></i>
                                <span>日历视图</span>
                            </button>
                            <button class="btn btn-primary" onclick="TasksPage.showAddModal()">
                                <i class="fas fa-plus"></i>
                                <span>添加任务</span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 列表视图 -->
                <div id="listView" class="main-card">
                    <div class="overflow-x-auto">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th width="40">完成</th>
                                    <th>任务名称</th>
                                    <th>优先级</th>
                                    <th>状态</th>
                                    <th>负责人</th>
                                    <th>截止日期</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="taskTableBody">
                                ${CRMData.tasks.map(task => this.renderTaskRow(task)).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- 任务统计 -->
                    <div class="p-4 border-t border-gray-200">
                        <div class="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p class="text-2xl font-bold text-gray-600">${CRMData.tasks.filter(t => t.status === '待处理').length}</p>
                                <p class="text-sm text-gray-500">待处理</p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-yellow-600">${CRMData.tasks.filter(t => t.status === '进行中').length}</p>
                                <p class="text-sm text-gray-500">进行中</p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold text-green-600">${CRMData.tasks.filter(t => t.status === '已完成').length}</p>
                                <p class="text-sm text-gray-500">已完成</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 日历视图 -->
                <div id="calendarView" class="main-card hidden">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-lg font-semibold" id="calendarMonth"></h3>
                            <div class="flex items-center space-x-2">
                                <button class="btn btn-sm btn-secondary" onclick="TasksPage.prevMonth()">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button class="btn btn-sm btn-secondary" onclick="TasksPage.nextMonth()">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                        <div id="calendarGrid" class="grid grid-cols-7 gap-2">
                            <!-- 日历内容将由JS生成 -->
                        </div>
                    </div>
                </div>

                <!-- 添加任务模态框 -->
                <div id="addTaskModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                    <div class="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
                        <div class="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h3 class="text-lg font-semibold">添加任务</h3>
                            <button onclick="TasksPage.closeModal('addTaskModal')" class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="p-6">
                            <form id="addTaskForm" class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1">任务名称</label>
                                    <input type="text" name="title" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">优先级</label>
                                    <select name="priority" class="select-field w-full">
                                        <option value="高">高</option>
                                        <option value="中">中</option>
                                        <option value="低">低</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">负责人</label>
                                    <select name="assignee" class="select-field w-full">
                                        ${CRMData.users.map(u => `<option value="${u.name}">${u.name}</option>`).join('')}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">截止日期</label>
                                    <input type="date" name="dueDate" required class="input-field w-full">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">描述</label>
                                    <textarea name="description" rows="3" class="input-field w-full"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button onclick="TasksPage.closeModal('addTaskModal')" class="btn btn-secondary">取消</button>
                            <button onclick="TasksPage.addTask()" class="btn btn-primary">保存</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // 初始化搜索
        const searchInput = document.getElementById('taskSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterTasks(e.target.value);
            });
        }

        // 初始化筛选
        const statusFilter = document.getElementById('taskFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }

        const priorityFilter = document.getElementById('priorityFilter');
        if (priorityFilter) {
            priorityFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }

        // 初始化日历
        this.initCalendar();
    },

    renderTaskRow(task) {
        return `
            <tr class="task-item priority-${task.priority === '高' ? 'high' : task.priority === '中' ? 'medium' : 'low'}">
                <td>
                    <input type="checkbox" ${task.status === '已完成' ? 'checked' : ''} onchange="TasksPage.toggleTaskStatus(${task.id})">
                </td>
                <td>
                    <span class="${task.status === '已完成' ? 'line-through text-gray-500' : 'font-medium'}">${task.title}</span>
                </td>
                <td><span class="badge ${Utils.getPriorityBadge(task.priority)}">${task.priority}</span></td>
                <td><span class="badge ${Utils.getStatusBadge(task.status)}">${task.status}</span></td>
                <td>${task.assignee}</td>
                <td>${task.dueDate}</td>
                <td>
                    <div class="flex items-center space-x-2">
                        <button class="btn btn-sm btn-secondary" onclick="TasksPage.showEditModal(${task.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="TasksPage.deleteTask(${task.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    },

    toggleView() {
        const listView = document.getElementById('listView');
        const calendarView = document.getElementById('calendarView');

        if (this.currentView === 'list') {
            this.currentView = 'calendar';
            listView.classList.add('hidden');
            calendarView.classList.remove('hidden');
            this.initCalendar();
        } else {
            this.currentView = 'list';
            calendarView.classList.add('hidden');
            listView.classList.remove('hidden');
        }
    },

    showAddModal() {
        document.getElementById('addTaskModal').classList.remove('hidden');
        document.getElementById('addTaskModal').classList.add('flex');
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
        document.getElementById(modalId).classList.remove('flex');
    },

    addTask() {
        const form = document.getElementById('addTaskForm');
        const formData = new FormData(form);

        const newTask = {
            id: CRMData.tasks.length + 1,
            title: formData.get('title'),
            priority: formData.get('priority'),
            status: '待处理',
            assignee: formData.get('assignee'),
            dueDate: formData.get('dueDate')
        };

        CRMData.tasks.push(newTask);
        this.closeModal('addTaskModal');
        PageManager.initTasks();
    },

    toggleTaskStatus(id) {
        const task = CRMData.tasks.find(t => t.id === id);
        if (task) {
            task.status = task.status === '已完成' ? '待处理' : '已完成';
            PageManager.initTasks();
        }
    },

    showEditModal(id) {
        alert(`编辑任务 ID: ${id}`);
    },

    deleteTask(id) {
        if (confirm('确定要删除这个任务吗？')) {
            CRMData.tasks = CRMData.tasks.filter(t => t.id !== id);
            PageManager.initTasks();
        }
    },

    filterTasks(keyword) {
        const filtered = CRMData.tasks.filter(t => t.title.includes(keyword));
        this.renderFilteredTasks(filtered);
    },

    applyFilters() {
        let filtered = [...CRMData.tasks];

        const status = document.getElementById('taskFilter')?.value;
        const priority = document.getElementById('priorityFilter')?.value;

        if (status) {
            filtered = filtered.filter(t => t.status === status);
        }

        if (priority) {
            filtered = filtered.filter(t => t.priority === priority);
        }

        this.renderFilteredTasks(filtered);
    },

    renderFilteredTasks(tasks) {
        const tbody = document.getElementById('taskTableBody');
        tbody.innerHTML = tasks.map(task => this.renderTaskRow(task)).join('');
    },

    initCalendar() {
        const today = new Date();
        this.currentYear = today.getFullYear();
        this.currentMonth = today.getMonth();
        this.renderCalendar();
    },

    renderCalendar() {
        const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        document.getElementById('calendarMonth').textContent = `${this.currentYear}年 ${months[this.currentMonth]}`;

        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        const grid = document.getElementById('calendarGrid');
        grid.innerHTML = '';

        // 添加星期标题
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        weekDays.forEach(day => {
            grid.innerHTML += `<div class="text-center font-semibold text-sm text-gray-500 p-2">${day}</div>`;
        });

        // 添加空白天
        for (let i = 0; i < startingDay; i++) {
            grid.innerHTML += '<div class="p-2"></div>';
        }

        // 添加日期
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const tasksForDay = CRMData.tasks.filter(t => t.dueDate === dateStr);
            const isToday = new Date().toDateString() === new Date(this.currentYear, this.currentMonth, day).toDateString();

            grid.innerHTML += `
                <div class="p-2 border border-gray-200 rounded-lg ${isToday ? 'bg-blue-50 border-blue-300' : ''} hover:bg-gray-50">
                    <div class="font-medium ${isToday ? 'text-blue-600' : ''}">${day}</div>
                    ${tasksForDay.map(t => `
                        <div class="mt-1 text-xs truncate badge ${Utils.getPriorityBadge(t.priority)}">${t.title}</div>
                    `).join('')}
                </div>
            `;
        }
    },

    prevMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    },

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }
};
