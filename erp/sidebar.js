/**
 * ERP系统侧边栏组件
 * 所有页面共用此侧边栏
 */

function renderSidebar(activePage) {
    const sidebarHTML = `
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="logo">
                <h1>
                    <div class="logo-icon">E</div>
                    ERP资产管理系统
                </h1>
            </div>

            <nav class="nav-menu">
                <a href="index.html" class="nav-item ${activePage === 'dashboard' ? 'active' : ''}">
                    <span class="nav-icon">📊</span>
                    <span class="nav-label">首页工作台</span>
                </a>
                <a href="asset-list.html" class="nav-item ${activePage === 'asset' ? 'active' : ''}">
                    <span class="nav-icon">📦</span>
                    <span class="nav-label">资产台账</span>
                </a>
                <a href="asset-add.html" class="nav-item ${activePage === 'add' ? 'active' : ''}">
                    <span class="nav-icon">➕</span>
                    <span class="nav-label">资产入库</span>
                </a>
                <a href="asset-borrow.html" class="nav-item ${activePage === 'borrow' ? 'active' : ''}">
                    <span class="nav-icon">📝</span>
                    <span class="nav-label">资产领用</span>
                </a>
                <a href="inventory-check.html" class="nav-item ${activePage === 'inventory' ? 'active' : ''}">
                    <span class="nav-icon">🔍</span>
                    <span class="nav-label">资产盘点</span>
                    <span class="nav-badge">3</span>
                </a>
                <a href="asset-repair.html" class="nav-item ${activePage === 'repair' ? 'active' : ''}">
                    <span class="nav-icon">🔧</span>
                    <span class="nav-label">资产维护</span>
                </a>
                <a href="asset-scrap.html" class="nav-item ${activePage === 'scrap' ? 'active' : ''}">
                    <span class="nav-icon">🗑️</span>
                    <span class="nav-label">资产报废</span>
                </a>
                <a href="asset-transfer.html" class="nav-item ${activePage === 'transfer' ? 'active' : ''}">
                    <span class="nav-icon">🔄</span>
                    <span class="nav-label">资产调拨</span>
                </a>
                <a href="reports.html" class="nav-item ${activePage === 'reports' ? 'active' : ''}">
                    <span class="nav-icon">📈</span>
                    <span class="nav-label">资产报表</span>
                </a>
                <a href="settings.html" class="nav-item ${activePage === 'settings' ? 'active' : ''}">
                    <span class="nav-icon">⚙️</span>
                    <span class="nav-label">系统设置</span>
                </a>
            </nav>

            <div class="sidebar-footer">
                <div class="user-profile" style="cursor: pointer;" onclick="showUserMenu()">
                    <div class="user-avatar">
                        <img src="https://avatars.githubusercontent.com/u/24404389" alt="张明">
                    </div>
                    <div class="user-info">
                        <div class="user-name">张明</div>
                        <div class="user-role">资产管理员</div>
                    </div>
                </div>
                <button class="btn btn-small" style="margin-top: 12px; width: 100%; padding: 8px; font-size: 12px;" onclick="logout()">
                    <span>🚪</span>
                    退出登录
                </button>
            </div>
        </aside>
    `;
    
    // 找到app-container，将sidebar插入为第一个子元素
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
        appContainer.insertAdjacentHTML('afterbegin', sidebarHTML);
    }
}

// 退出登录功能
function logout() {
    if (confirm('确定要退出登录吗？')) {
        // 清除登录状态
        localStorage.removeItem('erp_logged_in');
        localStorage.removeItem('erp_username');
        // 跳转到登录页
        window.location.href = 'login.html';
    }
}

// 显示用户菜单
function showUserMenu() {
    alert('用户功能菜单：\n1. 查看个人资料\n2. 修改密码\n3. 切换角色');
}

// 页面加载完成后渲染侧边栏
document.addEventListener('DOMContentLoaded', function() {
    // 根据当前页面确定active状态
    const currentPage = window.location.pathname;
    let activePage = 'dashboard';

    if (currentPage.includes('asset-list') || currentPage.includes('asset-detail')) {
        activePage = 'asset';
    } else if (currentPage.includes('asset-add')) {
        activePage = 'add';
    } else if (currentPage.includes('asset-borrow')) {
        activePage = 'borrow';
    } else if (currentPage.includes('asset-transfer')) {
        activePage = 'transfer';
    } else if (currentPage.includes('asset-repair')) {
        activePage = 'repair';
    } else if (currentPage.includes('asset-scrap')) {
        activePage = 'scrap';
    } else if (currentPage.includes('inventory')) {
        activePage = 'inventory';
    } else if (currentPage.includes('reports')) {
        activePage = 'reports';
    } else if (currentPage.includes('settings')) {
        activePage = 'settings';
    }

    renderSidebar(activePage);
});
