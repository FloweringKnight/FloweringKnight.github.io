// ===== 标签管理模块 =====

const TagsModule = {
    // 缓存标签数据
    tagsCache: null,

    // 解析文章标签
    async parseArticleTags() {
        if (this.tagsCache) {
            return this.tagsCache;
        }

        const tagMap = new Map();

        for (const article of articles) {
            try {
                const response = await fetch(`articles/${article.file}`);
                const content = await response.text();
                const lines = content.split('\n');

                let currentArticle = {
                    ...article,
                    tags: []
                };

                // 解析 YAML Front Matter
                if (lines[0].startsWith('---')) {
                    let inFrontMatter = true;
                    for (let i = 1; i < lines.length; i++) {
                        if (lines[i].startsWith('---')) {
                            inFrontMatter = false;
                            break;
                        }

                        if (lines[i].startsWith('tags:')) {
                            const tagsLine = lines[i].replace('tags:', '').trim();
                            // 解析数组格式 [tag1, tag2]
                            if (tagsLine.startsWith('[') && tagsLine.endsWith(']')) {
                                currentArticle.tags = tagsLine
                                    .slice(1, -1)
                                    .split(',')
                                    .map(t => t.trim())
                                    .filter(t => t);
                            }
                        }
                    }
                }

                // 添加到标签映射
                currentArticle.tags.forEach(tag => {
                    if (!tagMap.has(tag)) {
                        tagMap.set(tag, []);
                    }
                    tagMap.get(tag).push(currentArticle);
                });

                // 如果没有标签，添加到 "未分类"
                if (currentArticle.tags.length === 0) {
                    if (!tagMap.has('未分类')) {
                        tagMap.set('未分类', []);
                    }
                    tagMap.get('未分类').push(currentArticle);
                }

            } catch (error) {
                console.error(`Error parsing tags for ${article.file}:`, error);
            }
        }

        this.tagsCache = tagMap;
        return tagMap;
    },

    // 获取所有标签
    async getAllTags() {
        const tagMap = await this.parseArticleTags();
        return Array.from(tagMap.entries())
            .map(([tag, articles]) => ({
                name: tag,
                count: articles.length,
                articles: articles
            }))
            .sort((a, b) => b.count - a.count); // 按文章数量降序
    },

    // 格式化标签列表
    async formatTagsList() {
        const tags = await this.getAllTags();

        if (tags.length === 0) {
            return '<span class="text-secondary">暂无标签</span>';
        }

        let output = '<span class="text-green">可用标签:</span>\n\n';

        tags.forEach(tag => {
            const maxLength = Math.max(12, tag.name.length + 2);
            output += `${tag.name.padEnd(maxLength)}(${tag.count} 篇文章)\n`;
        });

        output += '\n<span class="text-secondary">使用 "tags <标签名>" 查看该标签下的文章</span>';
        output += '\n<span class="text-secondary">使用 "ls -t <标签名>" 按标签筛选文章</span>';

        return output;
    },

    // 根据标签名获取文章
    async getArticlesByTag(tagName) {
        const tagMap = await this.parseArticleTags();
        const normalizedTag = tagName.trim().toLowerCase();

        // 模糊匹配标签
        for (const [tag, articles] of tagMap) {
            if (tag.toLowerCase() === normalizedTag) {
                return articles;
            }
        }

        return null;
    },

    // 格式化标签下的文章列表
    async formatArticlesByTag(tagName) {
        const articlesByTag = await this.getArticlesByTag(tagName);

        if (!articlesByTag) {
            return `<span class="text-red">错误: 标签 "${escapeHtml(tagName)}" 不存在</span>\n\n使用 "tags" 查看所有可用标签`;
        }

        let output = `<span class="text-green">标签 "${escapeHtml(tagName)}" 下的文章 (${articlesByTag.length} 篇):</span>\n\n`;

        // 按时间倒序排列
        [...articlesByTag]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .forEach(article => {
                output += `<a href="article.html?file=${article.file}" target="_blank" class="article-link">[${article.date}] ${article.title}</a>\n`;
            });

        return output;
    }
};
