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

        // 补全 theme 命令的主题参数
        if (trimmedInput.startsWith('theme ')) {
            const themePrefix = trimmedInput.substring(6).trim();
            const themes = ['dark', 'light', 'nord', 'dracula', 'solarized', 'monokai', 'github', 'gruvbox'];

            const themeMatches = themes.filter(theme =>
                theme.startsWith(themePrefix)
            );
            suggestions.push(...themeMatches.map(theme => ({
                type: 'theme',
                text: `theme ${theme}`
            })));
        }

        // 补全 tags 命令的参数
        if (trimmedInput.startsWith('tags')) {
            const parts = trimmedInput.split(/\s+/);
            if (parts.length === 1) {
                suggestions.push({ type: 'command', text: 'tags -a' });
            } else if (parts[1] === '-a' || parts[1] === '--add') {
                // 补全文章名
                const articlePrefix = parts[2] || '';
                const articleMatches = this.articles.filter(article =>
                    article.file.startsWith(articlePrefix) || article.title.includes(articlePrefix)
                );
                articleMatches.forEach(article => {
                    suggestions.push({
                        type: 'file',
                        text: `tags -a ${article.file}`
                    });
                });
            }
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

        // theme 命令主题补全
        if (trimmedInput.startsWith('theme ')) {
            const themePrefix = trimmedInput.substring(6).trim();
            const themes = ['dark', 'light', 'nord', 'dracula', 'solarized', 'monokai', 'github', 'gruvbox'];

            const themeMatch = themes.find(theme =>
                theme.startsWith(themePrefix)
            );
            if (themeMatch) {
                return `theme ${themeMatch}`;
            }
        }

        // tags 命令补全
        if (trimmedInput.startsWith('tags -a') || trimmedInput.startsWith('tags --add')) {
            const parts = trimmedInput.split(/\s+/);
            if (parts.length === 2) {
                // 补全文章名
                const articlePrefix = parts[2] || '';
                const articleMatch = this.articles.find(article =>
                    article.file.startsWith(articlePrefix) || article.title.includes(articlePrefix)
                );
                if (articleMatch) {
                    return `tags -a ${articleMatch.file}`;
                }
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
            let color = 'text-blue';
            if (suggestion.type === 'file') color = 'text-yellow';
            if (suggestion.type === 'theme') color = 'text-green';
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
