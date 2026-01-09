// ===== 文章加载逻辑 =====
document.addEventListener('DOMContentLoaded', () => {
    // 应用主题
    applyTheme();

    const urlParams = new URLSearchParams(window.location.search);
    const articleFile = urlParams.get('file');

    if (!articleFile) {
        showError('未指定文章文件');
        return;
    }

    loadArticle(articleFile);
});

// 应用主题
function applyTheme() {
    const savedTheme = localStorage.getItem('fakecli_theme') || 'dark';
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
}

// 加载文章
async function loadArticle(filename) {
    const titleEl = document.getElementById('article-title');
    const dateEl = document.getElementById('article-date');
    const tagsEl = document.getElementById('article-tags');
    const contentEl = document.getElementById('article-content');

    try {
        const response = await fetch(`articles/${filename}`);
        if (!response.ok) {
            throw new Error('文章加载失败');
        }

        const markdown = await response.text();

        // 解析文章元数据
        const { title, date, tags, content } = parseArticle(markdown);

        // 设置文章内容
        titleEl.textContent = title;
        dateEl.textContent = date;

        // 设置标签
        if (tags && tags.length > 0) {
            tagsEl.innerHTML = tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
        } else {
            tagsEl.innerHTML = '未分类';
        }

        // 渲染 Markdown 内容
        if (typeof marked !== 'undefined') {
            contentEl.innerHTML = marked.parse(content);

            // 生成目录
            generateTOC();
        } else {
            contentEl.innerHTML = `<p>Markdown 解析库未加载，请确保 marked.min.js 已正确引入。</p>`;
        }

    } catch (error) {
        console.error('文章加载错误:', error);
        showError(`文章加载失败: ${error.message}`);
    }
}

// 解析文章元数据
function parseArticle(markdown) {
    let title = '无标题';
    let date = '未知日期';
    let tags = [];
    let content = markdown;

    // 解析 YAML Front Matter
    if (markdown.startsWith('---')) {
        const lines = markdown.split('\n');
        let inFrontMatter = true;

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].startsWith('---')) {
                inFrontMatter = false;
                content = lines.slice(i + 1).join('\n');
                break;
            }

            if (inFrontMatter) {
                // 提取标题
                const titleMatch = lines[i].match(/^title:\s*(.+)$/i);
                if (titleMatch) {
                    title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
                }

                // 提取日期
                const dateMatch = lines[i].match(/^date:\s*(.+)$/i);
                if (dateMatch) {
                    date = dateMatch[1].trim().replace(/^['"]|['"]$/g, '');
                }

                // 提取标签
                const tagsMatch = lines[i].match(/^tags:\s*(.+)$/i);
                if (tagsMatch) {
                    const tagsStr = tagsMatch[1].trim();
                    // 解析数组格式 [tag1, tag2]
                    if (tagsStr.startsWith('[') && tagsStr.endsWith(']')) {
                        tags = tagsStr.slice(1, -1).split(',').map(t => t.trim()).filter(t => t);
                    } else {
                        // 空格分隔
                        tags = tagsStr.split(/\s+/).filter(t => t);
                    }
                }
            }
        }
    }

    // 如果没有从 Front Matter 提取到标题，从 Markdown 内容中提取
    if (title === '无标题') {
        const titleMatch = content.match(/^#\s+(.+)$/m);
        if (titleMatch) {
            title = titleMatch[1].trim();
        }
    }

    // 如果没有从 Front Matter 提取到日期，从 Markdown 内容中查找
    if (date === '未知日期') {
        const dateMatch = content.match(/\*\*(?:日期|发布时间|Date)\*\*[:：]\s*(\d{4}-\d{2}-\d{2})/i);
        if (dateMatch) {
            date = dateMatch[1];
        }
    }

    return { title, date, tags, content };
}

// 显示错误
function showError(message) {
    const titleEl = document.getElementById('article-title');
    const dateEl = document.getElementById('article-date');
    const contentEl = document.getElementById('article-content');

    titleEl.textContent = '错误';
    dateEl.textContent = '';
    contentEl.innerHTML = `<div class="error">${message}</div>`;
}

// ===== 目录生成 =====
function generateTOC() {
    const tocNav = document.getElementById('toc-nav');
    const contentEl = document.getElementById('article-content');

    if (!tocNav || !contentEl) return;

    // 获取所有标题
    const headings = contentEl.querySelectorAll('h1, h2, h3');

    if (headings.length === 0) {
        document.querySelector('.article-toc').style.display = 'none';
        return;
    }

    // 清空目录
    tocNav.innerHTML = '';

    // 为每个标题添加 ID 并生成目录项
    headings.forEach((heading, index) => {
        // 生成 ID
        const id = `heading-${index}`;
        heading.id = id;

        // 创建目录项
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

        // 点击事件
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // 更新 URL hash
            history.pushState(null, null, `#${id}`);

            // 更新活动状态
            updateActiveTOC(id);
        });

        tocNav.appendChild(link);
    });

    // 监听滚动事件，更新活动目录项
    window.addEventListener('scroll', () => {
        updateActiveTOCOnScroll();
    });

    // 初始化活动状态
    updateActiveTOCOnScroll();
}

// 更新活动目录项
function updateActiveTOC(activeId) {
    const tocItems = document.querySelectorAll('.toc-item');

    tocItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${activeId}`) {
            item.classList.add('active');
        }
    });
}

// 根据滚动位置更新活动目录项
function updateActiveTOCOnScroll() {
    const contentEl = document.getElementById('article-content');
    if (!contentEl) return;

    const headings = contentEl.querySelectorAll('h1, h2, h3');
    const scrollPosition = window.scrollY + 100;

    let activeId = null;

    headings.forEach((heading) => {
        const headingTop = heading.offsetTop;

        if (headingTop <= scrollPosition) {
            activeId = heading.id;
        }
    });

    if (activeId) {
        updateActiveTOC(activeId);
    }
}

// HTML 转义函数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
