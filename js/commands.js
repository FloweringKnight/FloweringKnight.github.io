// ===== 命令定义 =====

// 文章数据
const articles = [
    { 
        date: '2025-01-15', 
        title: '如何使用 CLI 工具', 
        file: 'cli-guide.md' 
    },
    { 
        date: '2025-01-10', 
        title: 'JavaScript 异步编程', 
        file: 'async-js.md' 
    },
    { 
        date: '2025-01-05', 
        title: '我的第一个终端项目', 
        file: 'first-terminal.md' 
    }
];

// 命令列表（用于自动补全）
const commandList = [
    'pwd',
    'whoami',
    'ls',
    'clear',
    'help',
    'cat',
    'cd',
    'echo',
    'date',
    'history',
    'exit',
    'version',
    'theme'
];

// 当前目录状态
let currentDirectory = '/user';

// ===== 命令实现 =====

const commands = {
    pwd: {
        execute: () => currentDirectory,
        description: '显示当前工作目录',
        usage: 'pwd'
    },
    
    whoami: {
        execute: () => "I don't know, sorry~",
        description: '显示当前用户',
        usage: 'whoami'
    },
    
    ls: {
        execute: (args) => {
            const showDetail = args.includes('-l');
            
            let output = '';
            // 按时间倒序排列
            [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(article => {
                if (showDetail) {
                    output += `<span class="text-blue">[</span>${article.date}<span class="text-blue">]</span> ${article.title} (${article.file})\n`;
                } else {
                    output += `<a href="article.html?file=${article.file}" target="_blank" class="article-link">[${article.date}] ${article.title}</a>\n`;
                }
            });
            
            return output;
        },
        description: '列出文章列表',
        usage: 'ls [-l]'
    },
    
    clear: {
        execute: () => {
            return '__CLEAR__';
        },
        description: '清空终端屏幕',
        usage: 'clear'
    },
    
    help: {
        execute: (args) => {
            const targetCommand = args[0];
            
            if (targetCommand && commands[targetCommand]) {
                const cmd = commands[targetCommand];
                return `<span class="text-green">${targetCommand}</span>\n  描述: ${cmd.description}\n  用法: ${cmd.usage}`;
            }
            
            let output = '<span class="text-green">可用命令:</span>\n\n';
            Object.keys(commands).forEach(cmd => {
                output += `  <span class="text-blue">${cmd}</span> - ${commands[cmd].description}\n`;
            });
            
            output += '\n<span class="text-secondary">提示: 使用 "help <命令名>" 查看详细帮助</span>';
            return output;
        },
        description: '显示帮助信息',
        usage: 'help [命令名]'
    },
    
    cat: {
        execute: (args) => {
            if (args.length === 0) {
                return '<span class="text-red">错误: 请指定要查看的文件</span>\n用法: cat <文件名>';
            }
            
            const filename = args[0];
            const article = articles.find(a => a.file === filename);
            
            if (!article) {
                return `<span class="text-red">错误: 文件 "${filename}" 不存在</span>`;
            }
            
            return `<span class="text-blue">提示: 使用 "ls" 命令查看可用文章，点击文章标题可在新标签页中阅读</span>\n\n[${article.date}] ${article.title}\n\n在新标签页打开: <a href="article.html?file=${filename}" target="_blank" class="article-link">${filename}</a>`;
        },
        description: '查看文章内容',
        usage: 'cat <文件名>'
    },
    
    cd: {
        execute: (args) => {
            if (args.length === 0) {
                return '<span class="text-red">错误: 请指定目录路径</span>\n用法: cd <目录路径>';
            }
            
            const dir = args[0];
            
            if (dir === '..') {
                if (currentDirectory !== '/') {
                    currentDirectory = currentDirectory.substring(0, currentDirectory.lastIndexOf('/')) || '/';
                }
                return '';
            } else if (dir === '~' || dir === '/') {
                currentDirectory = '/user';
                return '';
            } else {
                return `<span class="text-red">错误: 目录 "${dir}" 不存在</span>\n可用目录: ~, /, ..`;
            }
        },
        description: '切换目录',
        usage: 'cd <目录路径>'
    },
    
    echo: {
        execute: (args) => {
            return args.join(' ');
        },
        description: '输出文本',
        usage: 'echo <文本>'
    },
    
    date: {
        execute: () => {
            const now = new Date();
            return now.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                weekday: 'long'
            });
        },
        description: '显示当前日期和时间',
        usage: 'date'
    },
    
    history: {
        execute: () => {
            const history = CommandHistory.getHistory();
            if (history.length === 0) {
                return '<span class="text-secondary">暂无历史记录</span>';
            }
            
            let output = '<span class="text-green">命令历史:</span>\n';
            history.forEach((cmd, index) => {
                output += `  ${index + 1}  ${escapeHtml(cmd)}\n`;
            });
            
            return output;
        },
        description: '显示命令历史',
        usage: 'history'
    },
    
    exit: {
        execute: () => {
            // 延迟关闭页面，让用户看到告别信息
            setTimeout(() => {
                window.close();
            }, 3000);
            return '<span class="text-green">Goodbye! 页面即将关闭...</span>';
        },
        description: '退出终端（关闭页面）',
        usage: 'exit'
    },
    
    version: {
        execute: () => {
            return '<span class="text-green">FAKE-CLI</span> v2.0.0\n\n作者: FloweringKnight\n技术栈: HTML/CSS/JavaScript\n部署: GitHub Pages';
        },
        description: '显示版本信息',
        usage: 'version'
    },
    
    theme: {
        execute: (args) => {
            if (args.length === 0) {
                return '<span class="text-red">错误: 请指定主题名称</span>\n可用主题: dark, light, nord, dracula\n用法: theme <主题名>';
            }
            
            const theme = args[0];
            if (!['dark', 'light', 'nord', 'dracula'].includes(theme)) {
                return `<span class="text-red">错误: 主题 "${theme}" 不存在</span>\n可用主题: dark, light, nord, dracula`;
            }
            
            ThemeManager.setTheme(theme);
            return `<span class="text-green">主题已切换为: ${theme}</span>`;
        },
        description: '切换主题',
        usage: 'theme <主题名>'
    }
};

// HTML 转义函数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
