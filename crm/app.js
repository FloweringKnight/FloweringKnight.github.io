// CRM系统主应用文件

// 全局数据存储
const CRMData = {
    customers: [
        { id: 1, name: '张伟', company: '科技有限公司', phone: '13800138001', email: 'zhangwei@company.com', status: '活跃', value: 50000, avatar: 'https://i.pravatar.cc/100?img=1' },
        { id: 2, name: '李娜', company: '创新集团', phone: '13800138002', email: 'lina@company.com', status: '潜在', value: 80000, avatar: 'https://i.pravatar.cc/100?img=2' },
        { id: 3, name: '王强', company: '贸易公司', phone: '13800138003', email: 'wangqiang@company.com', status: '活跃', value: 120000, avatar: 'https://i.pravatar.cc/100?img=3' },
        { id: 4, name: '赵敏', company: '互联网科技', phone: '13800138004', email: 'zhaomin@company.com', status: '活跃', value: 200000, avatar: 'https://i.pravatar.cc/100?img=4' },
        { id: 5, name: '刘洋', company: '咨询公司', phone: '13800138005', email: 'liuyang@company.com', status: '潜在', value: 60000, avatar: 'https://i.pravatar.cc/100?img=5' },
        { id: 6, name: '陈静', company: '制造企业', phone: '13800138006', email: 'chenjing@company.com', status: '活跃', value: 150000, avatar: 'https://i.pravatar.cc/100?img=6' }
    ],
    opportunities: [
        { id: 1, name: '企业级软件采购', customer: '张伟', stage: '提案', value: 50000, probability: 50, expectedClose: '2025-02-15' },
        { id: 2, name: '系统集成项目', customer: '李娜', stage: '谈判', value: 80000, probability: 75, expectedClose: '2025-02-20' },
        { id: 3, name: '硬件设备采购', customer: '王强', stage: '成交', value: 120000, probability: 90, expectedClose: '2025-01-20' },
        { id: 4, name: '咨询服务合同', customer: '赵敏', stage: '提案', value: 200000, probability: 40, expectedClose: '2025-03-01' },
        { id: 5, name: '年度维护服务', customer: '刘洋', stage: '需求分析', value: 60000, probability: 25, expectedClose: '2025-03-15' }
    ],
    tasks: [
        { id: 1, title: '跟进张伟的采购意向', priority: '高', status: '进行中', assignee: '张三', dueDate: '2025-01-15' },
        { id: 2, title: '准备李娜的项目提案', priority: '高', status: '待处理', assignee: '李四', dueDate: '2025-01-16' },
        { id: 3, title: '发送王强的合同', priority: '中', status: '待处理', assignee: '张三', dueDate: '2025-01-17' },
        { id: 4, title: '安排赵敏的演示会议', priority: '中', status: '进行中', assignee: '王五', dueDate: '2025-01-18' },
        { id: 5, title: '更新刘洋的客户信息', priority: '低', status: '已完成', assignee: '张三', dueDate: '2025-01-10' },
        { id: 6, title: '准备月度销售报告', priority: '中', status: '进行中', assignee: '李四', dueDate: '2025-01-20' }
    ],
    marketing: [
        { id: 1, name: '春季产品推广', type: '线上广告', status: '进行中', budget: 50000, leads: 120, startDate: '2025-01-01', endDate: '2025-03-31' },
        { id: 2, name: '行业展会', type: '线下活动', status: '计划中', budget: 80000, leads: 50, startDate: '2025-02-15', endDate: '2025-02-17' },
        { id: 3, name: '邮件营销活动', type: '邮件营销', status: '已完成', budget: 10000, leads: 80, startDate: '2024-12-01', endDate: '2024-12-31' }
    ],
    users: [
        { id: 1, name: '张三', email: 'zhangsan@company.com', role: '销售经理', department: '销售部', status: '活跃' },
        { id: 2, name: '李四', email: 'lisi@company.com', role: '销售代表', department: '销售部', status: '活跃' },
        { id: 3, name: '王五', email: 'wangwu@company.com', role: '销售代表', department: '销售部', status: '活跃' },
        { id: 4, name: '赵六', email: 'zhaoliu@company.com', role: '销售助理', department: '销售部', status: '离线' }
    ]
};

// 页面管理器
const PageManager = {
    currentPage: 'dashboard',

    init() {
        // 绑定侧边栏点击事件
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                if (page) {
                    this.navigateTo(page);
                }
            });
        });

        // 初始化所有页面
        this.initDashboard();
        this.initCustomers();
        this.initOpportunities();
        this.initTasks();
        this.initMarketing();
        this.initReports();
        this.initUsers();
        this.initSettings();

        // 初始化侧边栏
        this.initSidebar();
    },

    navigateTo(page) {
        // 更新侧边栏激活状态
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.page === page) {
                item.classList.add('active');
            }
        });

        // 切换页面显示
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(page).classList.add('active');

        // 更新页面标题
        const titles = {
            dashboard: '仪表盘',
            customers: '客户管理',
            opportunities: '销售机会',
            tasks: '任务中心',
            marketing: '营销活动',
            reports: '报表分析',
            users: '用户管理',
            settings: '系统设置'
        };
        document.getElementById('pageTitle').textContent = titles[page];

        // 移动端关闭侧边栏
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebarOverlay').classList.remove('show');

        this.currentPage = page;
    },

    initSidebar() {
        // 移动端侧边栏切换
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                overlay.classList.toggle('show');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
            });
        }

        // 下拉菜单
        this.initDropdowns();
    },

    initDropdowns() {
        // 通知下拉菜单
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationDropdown = document.getElementById('notificationDropdown');

        if (notificationBtn && notificationDropdown) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationDropdown.classList.toggle('show');
                document.getElementById('profileDropdown')?.classList.remove('show');
            });
        }

        // 用户下拉菜单
        const profileBtn = document.getElementById('profileDropdownBtn');
        const profileDropdown = document.getElementById('profileDropdown');

        if (profileBtn && profileDropdown) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profileDropdown.classList.toggle('show');
                document.getElementById('notificationDropdown')?.classList.remove('show');
            });
        }

        // 点击外部关闭下拉菜单
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        });

        // 阻止下拉菜单内部点击关闭
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        });
    },

    initDashboard() {
        const dashboardSection = document.getElementById('dashboard');
        dashboardSection.innerHTML = DashboardPage.render();
        DashboardPage.init();
    },

    initCustomers() {
        const customersSection = document.getElementById('customers');
        customersSection.innerHTML = CustomersPage.render();
        CustomersPage.init();
    },

    initOpportunities() {
        const opportunitiesSection = document.getElementById('opportunities');
        opportunitiesSection.innerHTML = OpportunitiesPage.render();
        OpportunitiesPage.init();
    },

    initTasks() {
        const tasksSection = document.getElementById('tasks');
        tasksSection.innerHTML = TasksPage.render();
        TasksPage.init();
    },

    initMarketing() {
        const marketingSection = document.getElementById('marketing');
        marketingSection.innerHTML = MarketingPage.render();
        MarketingPage.init();
    },

    initReports() {
        const reportsSection = document.getElementById('reports');
        reportsSection.innerHTML = ReportsPage.render();
        ReportsPage.init();
    },

    initUsers() {
        const usersSection = document.getElementById('users');
        usersSection.innerHTML = UsersPage.render();
        UsersPage.init();
    },

    initSettings() {
        const settingsSection = document.getElementById('settings');
        settingsSection.innerHTML = SettingsPage.render();
        SettingsPage.init();
    }
};

// 工具函数
const Utils = {
    formatDate(date) {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },

    formatCurrency(value) {
        return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(value);
    },

    getPriorityBadge(priority) {
        const badges = {
            '高': 'badge-danger',
            '中': 'badge-warning',
            '低': 'badge-success'
        };
        return badges[priority] || 'badge-gray';
    },

    getStatusBadge(status) {
        const badges = {
            '活跃': 'badge-success',
            '潜在': 'badge-blue',
            '进行中': 'badge-warning',
            '待处理': 'badge-gray',
            '已完成': 'badge-success',
            '计划中': 'badge-blue',
            '已完成': 'badge-success'
        };
        return badges[status] || 'badge-gray';
    }
};

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    PageManager.init();
});
