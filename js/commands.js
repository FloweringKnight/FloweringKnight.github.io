// ===== 命令定义 =====

// 文章数据
const articles = [
    {
        date: '2026-01-28',
        title: '从零开始设计AI Agent 2：智能旅行规划助手',
        file: '从零开始设计AI Agent 2：智能旅行规划助手.md'
    },
    {
        date: '2026-01-25',
        title: '从零开始设计AI Agent',
        file: '从零开始设计AI Agent.md'
    },
    {
        date: '2026-01-16',
        title: 'AI进化简史与DeepSeek新篇章：当模型学会“查字典”',
        file: 'AI进化简史与DeepSeek新篇章：当模型学会“查字典”.md'
    },
    {
        date: '2026-01-13',
        title: '程序员眼中的古老宝藏：NetHack 游戏教程与体验',
        file: '程序员眼中的古老宝藏：NetHack 游戏教程与体验.md'
    },
    {
        date: '2026-01-11',
        title: '我与 Claude Skills 的初次相遇',
        file: '我与Claude Skills的初次相遇.md'
    },
    {
        date: '2025-12-19',
        title: 'Arch Linux 安装',
        file: 'ArchLinux安装.md'
    },
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
    'theme',
    'search',
    'search-articles',
    'tags',
    'theme-preview'
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
        execute: async (args) => {
            const showDetail = args.includes('-l');
            const tagFilterIndex = args.indexOf('-t');
            const filteredByTag = tagFilterIndex !== -1 ? args[tagFilterIndex + 1] : null;

            let articlesToList = [...articles];

            // 按标签筛选
            if (filteredByTag) {
                const articlesByTag = await TagsModule.getArticlesByTag(filteredByTag);
                if (!articlesByTag) {
                    return `<span class="text-red">错误: 标签 "${filteredByTag}" 不存在</span>\n\n使用 "tags" 查看所有可用标签`;
                }
                articlesToList = articlesByTag;
            }

            let output = '';
            // 按时间倒序排列
            articlesToList.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(article => {
                if (showDetail) {
                    output += `<span class="text-blue">[</span>${article.date}<span class="text-blue">]</span> ${article.title} (${article.file})\n`;
                } else {
                    output += `<a href="article.html?file=${article.file}" target="_blank" class="article-link">[${article.date}] ${article.title}</a>\n`;
                }
            });

            // 如果是标签筛选，添加标签说明
            if (filteredByTag) {
                output = `<span class="text-green">标签 "${filteredByTag}" 下的文章 (${articlesToList.length} 篇):</span>\n\n` + output;
            }

            return output;
        },
        description: '列出文章列表',
        usage: 'ls [-l] [-t <标签>]'
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
            return '<span class="text-green">FAKE-CLI</span> v3.0.0\n\n作者: FloweringKnight\n技术栈: HTML/CSS/JavaScript\n部署: GitHub Pages';
        },
        description: '显示版本信息',
        usage: 'version'
    },
    
    theme: {
        execute: (args) => {
            if (args.length === 0) {
                return '<span class="text-red">错误: 请指定主题名称</span>\n可用主题: dark, light, nord, dracula, solarized, monokai, github, gruvbox\n用法: theme <主题名>';
            }

            const theme = args[0];
            const availableThemes = ['dark', 'light', 'nord', 'dracula', 'solarized', 'monokai', 'github', 'gruvbox'];

            if (!availableThemes.includes(theme)) {
                return `<span class="text-red">错误: 主题 "${theme}" 不存在</span>\n使用 "theme-preview" 查看所有可用主题`;
            }

            ThemeManager.setTheme(theme);
            return `<span class="text-green">主题已切换为: ${theme}</span>`;
        },
        description: '切换主题',
        usage: 'theme <主题名>'
    },

    search: {
        execute: (args) => {
            if (args.length === 0) {
                return '<span class="text-red">错误: 请指定搜索关键词</span>\n用法: search <关键词>';
            }

            const keyword = args.join(' ');
            const matches = SearchModule.searchHistory(keyword);
            return SearchModule.formatHistoryResults(matches, keyword);
        },
        description: '搜索命令历史',
        usage: 'search <关键词>'
    },

    'search-articles': {
        execute: async (args) => {
            if (args.length === 0) {
                return '<span class="text-red">错误: 请指定搜索关键词</span>\n用法: search-articles <关键词>';
            }

            const keyword = args.join(' ');
            const output = document.createElement('div');
            output.innerHTML = '<span class="text-secondary">正在搜索...</span>';

            const matches = await SearchModule.searchArticles(keyword);
            return SearchModule.formatArticleResults(matches, keyword);
        },
        description: '搜索文章内容',
        usage: 'search-articles <关键词>'
    },

    tags: {
        execute: async (args) => {
            // tags -a [文章名] [tag1] [tag2] ...
            if (args[0] === '-a' || args[0] === '--add') {
                if (args.length < 3) {
                    return '<span class="text-red">错误: 参数不足</span>\n用法: tags -a <文章名> <标签1> <标签2> ...';
                }

                const filename = args[1];
                const newTags = args.slice(2);

                // 查找文章
                const article = articles.find(a => a.file === filename || a.title === filename);
                if (!article) {
                    return `<span class="text-red">错误: 文件 "${filename}" 不存在</span>`;
                }

                try {
                    const response = await fetch(`articles/${article.file}`);
                    const content = await response.text();

                    // 检查是否有 Front Matter
                    if (!content.startsWith('---')) {
                        // 添加 Front Matter
                        const firstLine = content.split('\n')[0];
                        let updatedContent = `---
title: ${article.title}
date: ${article.date}
tags: [${newTags.join(', ')}]
---
${content}`;

                        // 保存文件（这里需要后端支持，前端无法直接写入文件）
                        return `<span class="text-yellow">注意: 前端无法直接修改文件</span>

请在文章文件中手动添加以下 Front Matter:

\`\`\`markdown
---
title: ${article.title}
date: ${article.date}
tags: [${newTags.join(', ')}]
---

文章内容...
\`\`\`

然后刷新页面即可看到标签`;
                    }

                    // 已有 Front Matter，更新 tags
                    const lines = content.split('\n');
                    let inFrontMatter = true;
                    let tagsFound = false;
                    let updatedLines = [];

                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i].startsWith('---')) {
                            if (!inFrontMatter) {
                                updatedLines.push(lines[i]);
                                inFrontMatter = false;
                                continue;
                            }
                            // 第一个 --- 之后继续
                            updatedLines.push(lines[i]);
                            continue;
                        }

                        if (inFrontMatter) {
                            // 查找并更新 tags 行
                            if (lines[i].toLowerCase().startsWith('tags:')) {
                                updatedLines.push(`tags: [${newTags.join(', ')}]`);
                                tagsFound = true;
                            } else {
                                updatedLines.push(lines[i]);
                            }
                        } else {
                            updatedLines.push(lines[i]);
                        }
                    }

                    if (!tagsFound) {
                        // 在 Front Matter 结束前添加 tags
                        const frontMatterEndIndex = updatedLines.findIndex(line => line === '---' && updatedLines.indexOf(line) > 0);
                        if (frontMatterEndIndex > 0) {
                            updatedLines.splice(frontMatterEndIndex, 0, `tags: [${newTags.join(', ')}]`);
                        }
                    }

                    const updatedContent = updatedLines.join('\n');

                    return `<span class="text-yellow">注意: 前端无法直接修改文件</span>

请将以下内容添加到文件 "${article.file}" 的 Front Matter 中:

\`\`\`markdown
tags: [${newTags.join(', ')}]
\`\`\`

文件路径: articles/${article.file}`;
                } catch (error) {
                    return `<span class="text-red">错误: 无法读取文章文件 - ${error.message}</span>`;
                }
            }

            // tags [标签名] - 查看标签下的文章
            if (args.length === 1) {
                const tagName = args[0];
                return await TagsModule.formatArticlesByTag(tagName);
            }

            // tags - 列出所有标签
            return await TagsModule.formatTagsList();
        },
        description: '浏览标签、查看标签下的文章或为文章添加标签',
        usage: 'tags [-a <文章名> <标签1> <标签2> ...] | [标签名]'
    },

    'theme-preview': {
        execute: () => {
            const themes = [
                { name: 'dark', color: '#1a1b26' },
                { name: 'light', color: '#ffffff' },
                { name: 'nord', color: '#2e3440' },
                { name: 'dracula', color: '#282a36' },
                { name: 'solarized', color: '#fdf6e3', isNew: true },
                { name: 'monokai', color: '#272822', isNew: true },
                { name: 'github', color: '#0d1117', isNew: true },
                { name: 'gruvbox', color: '#282828', isNew: true }
            ];

            let output = '<span class="text-green">可用主题预览:</span>\n\n';

            themes.forEach(theme => {
                const badge = theme.isNew ? ' [新增]' : ' [默认]';
                output += `${theme.name.padEnd(12)}■■■■■${badge}\n`;
            });

            output += '\n<span class="text-secondary">使用 "theme <主题名>" 切换主题</span>';
            return output;
        },
        description: '预览所有主题',
        usage: 'theme-preview'
    }
};

// HTML 转义函数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
