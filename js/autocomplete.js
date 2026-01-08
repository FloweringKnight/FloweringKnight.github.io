// ===== Tab 自动补全 =====

const Autocomplete = {
    // 命令列表
    commands: commandList,
    
    // 文章列表
    articles: articles,
    
    // 获取补全建议
    getSuggestions(input) {
        const trimmedInput = input.trim();
        if (!trimmedInput) return [];
        
        const suggestions = [];
        
        // 补全命令
        const commandMatches = this.commands.filter(cmd => 
            cmd.startsWith(trimmedInput)
        );
        suggestions.push(...commandMatches.map(cmd => ({
            type: 'command',
            text: cmd
        })));
        
        // 补全 cat 命令的文件参数
        if (trimmedInput.startsWith('cat ')) {
            const filePrefix = trimmedInput.substring(4).trim();
            const fileMatches = this.articles.filter(article => 
                article.file.startsWith(filePrefix)
            );
            suggestions.push(...fileMatches.map(article => ({
                type: 'file',
                text: `cat ${article.file}`
            })));
        }
        
        return suggestions;
    },
    
    // 获取单个补全
    getCompletion(input) {
        const trimmedInput = input.trim();
        if (!trimmedInput) return null;
        
        // 命令补全
        const commandMatch = this.commands.find(cmd => 
            cmd.startsWith(trimmedInput)
        );
        if (commandMatch) {
            return commandMatch;
        }
        
        // cat 命令文件补全
        if (trimmedInput.startsWith('cat ')) {
            const filePrefix = trimmedInput.substring(4).trim();
            const fileMatch = this.articles.find(article => 
                article.file.startsWith(filePrefix)
            );
            if (fileMatch) {
                return `cat ${fileMatch.file}`;
            }
        }
        
        return null;
    },
    
    // 显示所有匹配项
    showMatches(input, outputElement) {
        const suggestions = this.getSuggestions(input);
        
        if (suggestions.length === 0) return false;
        
        if (suggestions.length === 1) {
            // 只有一个匹配，直接补全
            return suggestions[0].text;
        }
        
        // 多个匹配，显示所有匹配项
        let output = '<span class="text-green">匹配项:</span>\n';
        suggestions.forEach(suggestion => {
            const color = suggestion.type === 'command' ? 'text-blue' : 'text-yellow';
            output += `  <span class="${color}">${escapeHtml(suggestion.text)}</span>\n`;
        });
        
        const matchLine = document.createElement('div');
        matchLine.className = 'output-line';
        matchLine.innerHTML = output;
        outputElement.appendChild(matchLine);
        
        return false;
    }
};

// HTML 转义函数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
