// 系统设置页面模块
const SettingsPage = {
    render() {
        return `
            <div class="settings-page">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- 设置导航 -->
                    <div class="main-card">
                        <div class="p-6 border-b border-gray-200">
                            <h3 class="font-semibold">设置菜单</h3>
                        </div>
                        <nav class="p-4">
                            <ul class="space-y-2">
                                <li>
                                    <a href="#" class="block px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium" onclick="SettingsPage.showSection('profile')">
                                        <i class="fas fa-user w-5 text-center mr-2"></i>
                                        个人资料
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 rounded-lg hover:bg-gray-100" onclick="SettingsPage.showSection('security')">
                                        <i class="fas fa-shield-alt w-5 text-center mr-2"></i>
                                        安全设置
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 rounded-lg hover:bg-gray-100" onclick="SettingsPage.showSection('notifications')">
                                        <i class="fas fa-bell w-5 text-center mr-2"></i>
                                        通知设置
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 rounded-lg hover:bg-gray-100" onclick="SettingsPage.showSection('appearance')">
                                        <i class="fas fa-palette w-5 text-center mr-2"></i>
                                        外观设置
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 rounded-lg hover:bg-gray-100" onclick="SettingsPage.showSection('data')">
                                        <i class="fas fa-database w-5 text-center mr-2"></i>
                                        数据管理
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <!-- 设置内容 -->
                    <div class="lg:col-span-2">
                        <!-- 个人资料 -->
                        <div id="section-profile" class="main-card">
                            <div class="p-6 border-b border-gray-200">
                                <h3 class="font-semibold">个人资料</h3>
                                <p class="text-sm text-gray-500 mt-1">管理您的个人信息</p>
                            </div>
                            <div class="p-6">
                                <form class="space-y-6">
                                    <div class="flex items-center space-x-6">
                                        <div class="relative">
                                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="头像" class="w-24 h-24 rounded-full object-cover">
                                            <button type="button" class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700">
                                                <i class="fas fa-camera text-sm"></i>
                                            </button>
                                        </div>
                                        <div>
                                            <p class="font-medium">更换头像</p>
                                            <p class="text-sm text-gray-500">支持 JPG、PNG 格式，最大 2MB</p>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium mb-2">姓名</label>
                                            <input type="text" value="张三" class="input-field w-full">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium mb-2">工号</label>
                                            <input type="text" value="EMP001" class="input-field w-full" disabled>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium mb-2">邮箱</label>
                                        <input type="email" value="zhangsan@company.com" class="input-field w-full">
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium mb-2">电话</label>
                                        <input type="tel" value="13800138000" class="input-field w-full">
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium mb-2">部门</label>
                                        <input type="text" value="销售部" class="input-field w-full" disabled>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium mb-2">职位</label>
                                        <input type="text" value="销售经理" class="input-field w-full" disabled>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium mb-2">个人简介</label>
                                        <textarea rows="4" class="input-field w-full">热爱销售工作，拥有5年行业经验，擅长客户关系管理和销售团队领导。</textarea>
                                    </div>

                                    <div class="flex justify-end space-x-3">
                                        <button type="button" class="btn btn-secondary">取消</button>
                                        <button type="button" class="btn btn-primary" onclick="alert('个人资料已保存！')">保存更改</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <!-- 安全设置 -->
                        <div id="section-security" class="main-card hidden">
                            <div class="p-6 border-b border-gray-200">
                                <h3 class="font-semibold">安全设置</h3>
                                <p class="text-sm text-gray-500 mt-1">管理您的账户安全</p>
                            </div>
                            <div class="p-6">
                                <form class="space-y-6">
                                    <div>
                                        <label class="block text-sm font-medium mb-2">当前密码</label>
                                        <input type="password" class="input-field w-full">
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium mb-2">新密码</label>
                                            <input type="password" class="input-field w-full">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium mb-2">确认新密码</label>
                                            <input type="password" class="input-field w-full">
                                        </div>
                                    </div>

                                    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                        <div class="flex items-start space-x-3">
                                            <i class="fas fa-exclamation-triangle text-yellow-600 mt-0.5"></i>
                                            <div class="text-sm">
                                                <p class="font-medium text-yellow-800">密码要求</p>
                                                <ul class="mt-1 text-yellow-700 space-y-1">
                                                    <li>至少 8 个字符</li>
                                                    <li>包含大小写字母</li>
                                                    <li>包含数字</li>
                                                    <li>包含特殊字符</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 class="font-medium mb-4">两步验证</h4>
                                        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <p class="font-medium">启用两步验证</p>
                                                <p class="text-sm text-gray-500">增强账户安全性</p>
                                            </div>
                                            <label class="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" class="sr-only peer">
                                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>

                                    <div class="flex justify-end space-x-3">
                                        <button type="button" class="btn btn-secondary">取消</button>
                                        <button type="button" class="btn btn-primary" onclick="alert('密码已更新！')">更新密码</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <!-- 通知设置 -->
                        <div id="section-notifications" class="main-card hidden">
                            <div class="p-6 border-b border-gray-200">
                                <h3 class="font-semibold">通知设置</h3>
                                <p class="text-sm text-gray-500 mt-1">管理您的通知偏好</p>
                            </div>
                            <div class="p-6">
                                <div class="space-y-6">
                                    <div>
                                        <h4 class="font-medium mb-4">邮件通知</h4>
                                        <div class="space-y-3">
                                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p class="font-medium">新客户提醒</p>
                                                    <p class="text-sm text-gray-500">当有新客户注册时通知</p>
                                                </div>
                                                <label class="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" checked class="sr-only peer">
                                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p class="font-medium">销售机会更新</p>
                                                    <p class="text-sm text-gray-500">销售机会状态变更时通知</p>
                                                </div>
                                                <label class="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" checked class="sr-only peer">
                                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p class="font-medium">任务提醒</p>
                                                    <p class="text-sm text-gray-500">任务即将到期时通知</p>
                                                </div>
                                                <label class="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" checked class="sr-only peer">
                                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 class="font-medium mb-4">系统通知</h4>
                                        <div class="space-y-3">
                                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p class="font-medium">系统公告</p>
                                                    <p class="text-sm text-gray-500">接收系统更新和公告</p>
                                                </div>
                                                <label class="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" checked class="sr-only peer">
                                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <p class="font-medium">周报提醒</p>
                                                    <p class="text-sm text-gray-500">每周发送工作周报提醒</p>
                                                </div>
                                                <label class="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" class="sr-only peer">
                                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex justify-end">
                                        <button type="button" class="btn btn-primary" onclick="alert('通知设置已保存！')">保存更改</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 外观设置 -->
                        <div id="section-appearance" class="main-card hidden">
                            <div class="p-6 border-b border-gray-200">
                                <h3 class="font-semibold">外观设置</h3>
                                <p class="text-sm text-gray-500 mt-1">自定义系统外观</p>
                            </div>
                            <div class="p-6">
                                <div class="space-y-6">
                                    <div>
                                        <h4 class="font-medium mb-4">主题</h4>
                                        <div class="grid grid-cols-3 gap-4">
                                            <div class="p-4 border-2 border-blue-500 rounded-lg cursor-pointer bg-white">
                                                <div class="h-16 bg-gray-100 rounded mb-2"></div>
                                                <p class="text-center font-medium">浅色</p>
                                            </div>
                                            <div class="p-4 border-2 border-gray-200 rounded-lg cursor-pointer bg-gray-800">
                                                <div class="h-16 bg-gray-700 rounded mb-2"></div>
                                                <p class="text-center font-medium text-white">深色</p>
                                            </div>
                                            <div class="p-4 border-2 border-gray-200 rounded-lg cursor-pointer">
                                                <div class="h-16 bg-gradient-to-r from-gray-100 to-gray-800 rounded mb-2"></div>
                                                <p class="text-center font-medium">自动</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 class="font-medium mb-4">语言</h4>
                                        <select class="select-field w-full">
                                            <option value="zh-CN">简体中文</option>
                                            <option value="zh-TW">繁體中文</option>
                                            <option value="en-US">English</option>
                                        </select>
                                    </div>

                                    <div>
                                        <h4 class="font-medium mb-4">时区</h4>
                                        <select class="select-field w-full">
                                            <option value="Asia/Shanghai">亚洲/上海 (UTC+8)</option>
                                            <option value="Asia/Hong_Kong">亚洲/香港 (UTC+8)</option>
                                            <option value="Asia/Tokyo">亚洲/东京 (UTC+9)</option>
                                        </select>
                                    </div>

                                    <div class="flex justify-end">
                                        <button type="button" class="btn btn-primary" onclick="alert('外观设置已保存！')">保存更改</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 数据管理 -->
                        <div id="section-data" class="main-card hidden">
                            <div class="p-6 border-b border-gray-200">
                                <h3 class="font-semibold">数据管理</h3>
                                <p class="text-sm text-gray-500 mt-1">管理您的数据</p>
                            </div>
                            <div class="p-6">
                                <div class="space-y-6">
                                    <div class="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                                        <h4 class="font-medium text-blue-800 mb-2">数据导出</h4>
                                        <p class="text-sm text-blue-700 mb-4">导出您的所有数据以便备份或迁移</p>
                                        <button class="btn btn-secondary" onclick="alert('数据导出功能开发中...')">
                                            <i class="fas fa-download mr-2"></i>
                                            导出数据
                                        </button>
                                    </div>

                                    <div class="p-4 border border-green-200 bg-green-50 rounded-lg">
                                        <h4 class="font-medium text-green-800 mb-2">数据备份</h4>
                                        <p class="text-sm text-green-700 mb-4">创建数据的完整备份副本</p>
                                        <button class="btn btn-secondary" onclick="alert('数据备份功能开发中...')">
                                            <i class="fas fa-database mr-2"></i>
                                            创建备份
                                        </button>
                                    </div>

                                    <div class="p-4 border border-red-200 bg-red-50 rounded-lg">
                                        <h4 class="font-medium text-red-800 mb-2">删除账户</h4>
                                        <p class="text-sm text-red-700 mb-4">永久删除您的账户和所有数据，此操作不可恢复</p>
                                        <button class="btn btn-danger" onclick="if(confirm('确定要删除账户吗？此操作不可恢复！')){alert('账户删除功能开发中...')}">
                                            <i class="fas fa-trash mr-2"></i>
                                            删除账户
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    init() {
        // 初始化完成
    },

    showSection(sectionId) {
        // 隐藏所有设置部分
        document.querySelectorAll('[id^="section-"]').forEach(section => {
            section.classList.add('hidden');
        });

        // 显示选中的部分
        document.getElementById(`section-${sectionId}`).classList.remove('hidden');

        // 更新导航高亮
        const navLinks = document.querySelectorAll('.settings-page nav a');
        navLinks.forEach(link => {
            link.classList.remove('bg-blue-50', 'text-blue-600', 'font-medium');
            link.classList.add('hover:bg-gray-100');

            if (link.textContent.includes(this.getSectionName(sectionId))) {
                link.classList.add('bg-blue-50', 'text-blue-600', 'font-medium');
                link.classList.remove('hover:bg-gray-100');
            }
        });
    },

    getSectionName(sectionId) {
        const names = {
            'profile': '个人资料',
            'security': '安全设置',
            'notifications': '通知设置',
            'appearance': '外观设置',
            'data': '数据管理'
        };
        return names[sectionId] || '';
    }
};
