// ===== 主 CLI 逻辑 =====

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('command-input');
    const output = document.getElementById('output');
    const promptElement = document.querySelector('.prompt');
    
    // 初始化
    input.focus();
    
    // 点击终端区域聚焦输入框
    document.querySelector('.terminal-body').addEventListener('click', () => {
        input.focus();
    });
    
    // 监听键盘事件
    input.addEventListener('keydown', (e) => {
        // 回车键 - 执行命令
        if (e.key === 'Enter') {
            e.preventDefault();
            executeCommand(input.value.trim());
            input.value = '';
            return;
        }
        
        // Tab 键 - 自动补全
        if (e.key === 'Tab') {
            e.preventDefault();
            handleTabCompletion(input.value);
            return;
        }
        
        // 上箭头 - 历史记录上一条
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const previousCommand = CommandHistory.getPreviousCommand();
            if (previousCommand !== '') {
                input.value = previousCommand;
                // 移动光标到末尾
                input.setSelectionRange(input.value.length, input.value.length);
            }
            return;
        }
        
        // 下箭头 - 历史记录下一条
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextCommand = CommandHistory.getNextCommand();
            input.value = nextCommand;
            // 移动光标到末尾
            input.setSelectionRange(input.value.length, input.value.length);
            return;
        }
    });
    
    // 输入时重置历史记录索引
    input.addEventListener('input', () => {
        CommandHistory.resetIndex();
    });
    
    // 执行命令
    function executeCommand(command) {
        // 显示用户输入的命令
        const commandLine = document.createElement('div');
        commandLine.className = 'output-line';
        commandLine.innerHTML = `<span class="prompt">${getPrompt()}</span> ${escapeHtml(command)}`;
        output.appendChild(commandLine);
        
        // 执行命令并显示结果
        if (command) {
            const args = parseCommandArgs(command);
            const commandName = args[0].toLowerCase();
            const commandArgs = args.slice(1);
            
            if (commands[commandName]) {
                const result = commands[commandName].execute(commandArgs);

                // 处理异步命令（返回 Promise）
                if (result instanceof Promise) {
                    const loadingLine = document.createElement('div');
                    loadingLine.className = 'output-line';
                    loadingLine.innerHTML = '<span class="text-secondary">正在执行...</span>';
                    output.appendChild(loadingLine);
                    output.scrollTop = output.scrollHeight;

                    result.then(actualResult => {
                        loadingLine.innerHTML = actualResult;
                        output.scrollTop = output.scrollHeight;
                    }).catch(error => {
                        loadingLine.innerHTML = `<span class="text-red">错误: ${error.message}</span>`;
                    });
                } else {
                    // 检查是否是 clear 命令
                    if (result === '__CLEAR__') {
                        clearScreen();
                    } else {
                        const resultLine = document.createElement('div');
                        resultLine.className = 'output-line';
                        resultLine.innerHTML = result;
                        output.appendChild(resultLine);
                    }
                }

                // 添加到历史记录
                CommandHistory.addCommand(command);
            } else {
                // 检查是否是历史命令引用 (!n)
                if (command.startsWith('!')) {
                    const index = parseInt(command.substring(1));
                    const history = CommandHistory.getHistory();
                    if (index > 0 && index <= history.length) {
                        const historyCommand = history[index - 1];
                        input.value = historyCommand;
                        executeCommand(historyCommand);
                        return;
                    }
                }
                
                const resultLine = document.createElement('div');
                resultLine.className = 'output-line';
                resultLine.innerHTML = `<span class="text-red">bash: ${escapeHtml(command)}: 未找到命令</span>`;
                output.appendChild(resultLine);
                
                // 添加到历史记录
                CommandHistory.addCommand(command);
            }
        }
        
        // 滚动到底部
        output.scrollTop = output.scrollHeight;
    }
    
    // 解析命令参数
    function parseCommandArgs(command) {
        return command.trim().split(/\s+/);
    }
    
    // 获取提示符
    function getPrompt() {
        return 'user@fake-cli:~$';
    }
    
    // 清屏
    function clearScreen() {
        output.innerHTML = '';
    }
    
    // Tab 自动补全处理
    function handleTabCompletion(inputValue) {
        const trimmedInput = inputValue.trim();
        if (!trimmedInput) return;
        
        const completion = Autocomplete.getCompletion(trimmedInput);
        if (completion) {
            input.value = completion;
        } else {
            // 显示所有匹配项
            Autocomplete.showMatches(trimmedInput, output);
            output.scrollTop = output.scrollHeight;
        }
    }
    
    // HTML 转义函数
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
