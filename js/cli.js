// ===== 文章数据 =====
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

// ===== 命令定义 =====
const commands = {
    pwd: {
        execute: () => '/user/',
        description: '显示当前工作目录'
    },
    whoami: {
        execute: () => "I don't know, sorry~",
        description: '显示当前用户'
    },
    ls: {
        execute: () => {
            let output = '';
            // 按时间倒序排列
            [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(article => {
                output += `<a href="article.html?file=${article.file}" target="_blank" class="article-link">[${article.date}] ${article.title}</a>\n`;
            });
            return output;
        },
        description: '列出文章列表'
    }
};

// ===== 主函数 =====
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const output = document.getElementById('output');
    
    // 聚焦输入框
    input.focus();
    
    // 点击终端区域聚焦输入框
    document.querySelector('.terminal-body').addEventListener('click', () => {
        input.focus();
    });
    
    // 监听回车键
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeCommand(input.value.trim());
            input.value = '';
        }
    });
    
    // 执行命令
    function executeCommand(command) {
        // 显示用户输入的命令
        const commandLine = document.createElement('div');
        commandLine.className = 'output-line';
        commandLine.innerHTML = `<span class="prompt">user@fake-cli:~$</span> ${escapeHtml(command)}`;
        output.appendChild(commandLine);
        
        // 执行命令并显示结果
        if (command) {
            const resultLine = document.createElement('div');
            resultLine.className = 'output-line';
            
            if (commands[command]) {
                resultLine.innerHTML = commands[command].execute();
            } else {
                resultLine.innerHTML = `<span class="text-red">bash: ${escapeHtml(command)}: 未找到命令</span>`;
            }
            
            output.appendChild(resultLine);
        }
        
        // 滚动到底部
        output.scrollTop = output.scrollHeight;
    }
    
    // HTML 转义函数
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
