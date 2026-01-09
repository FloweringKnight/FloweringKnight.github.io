// ===== 搜索功能模块 =====

const SearchModule = {
    // 搜索命令历史
    searchHistory: function(keyword) {
        const history = CommandHistory.getHistory();
        const matches = [];

        history.forEach((cmd, index) => {
            if (cmd.toLowerCase().includes(keyword.toLowerCase())) {
                matches.push({
                    index: index + 1,
                    command: cmd
                });
            }
        });

        return matches;
    },

    // 搜索文章内容
    async searchArticles(keyword) {
        const matches = [];

        for (const article of articles) {
            try {
                const response = await fetch(`articles/${article.file}`);
                const content = await response.text();
                const lines = content.split('\n');

                const articleMatches = [];
                lines.forEach((line, index) => {
                    if (line.toLowerCase().includes(keyword.toLowerCase())) {
                        articleMatches.push({
                            line: index + 1,
                            content: line.trim().substring(0, 60)
                        });
                    }
                });

                if (articleMatches.length > 0) {
                    matches.push({
                        article: article,
                        matches: articleMatches
                    });
                }
            } catch (error) {
                console.error(`Error loading article: ${article.file}`, error);
            }
        }

        return matches;
    },

    // 格式化历史搜索结果
    formatHistoryResults: function(matches, keyword) {
        if (matches.length === 0) {
            return `<span class="text-secondary">未找到包含 "${escapeHtml(keyword)}" 的历史命令</span>`;
        }

        let output = `<span class="text-green">搜索结果: ${escapeHtml(keyword)}</span>\n`;
        output += `找到 ${matches.length} 条匹配记录:\n\n`;

        matches.forEach(match => {
            output += `  ${match.index}   ${escapeHtml(match.command)}\n`;
        });

        output += `\n<span class="text-secondary">使用 "!<序号>" 重新执行命令</span>`;
        return output;
    },

    // 格式化文章搜索结果
    formatArticleResults: function(matches, keyword) {
        if (matches.length === 0) {
            return `<span class="text-secondary">未找到包含 "${escapeHtml(keyword)}" 的文章</span>`;
        }

        const totalMatches = matches.reduce((sum, m) => sum + m.matches.length, 0);
        let output = `<span class="text-green">搜索结果: "${escapeHtml(keyword)}"</span>\n`;
        output += `找到 ${matches.length} 篇文章，共 ${totalMatches} 处匹配:\n\n`;

        matches.forEach((match, index) => {
            output += `[${index + 1}] ${escapeHtml(match.article.title)} (${match.matches.length} 处匹配)\n`;
            match.matches.slice(0, 3).forEach(m => {
                output += `    > 第 ${m.line} 行: ${escapeHtml(m.content)}...\n`;
            });
            if (match.matches.length > 3) {
                output += `    ... 还有 ${match.matches.length - 3} 处匹配\n`;
            }
            output += '\n';
        });

        output += `<span class="text-secondary">输入 "cat <文件名>" 查看完整文章</span>`;
        return output;
    }
};
