// ===== 文章加载逻辑 =====
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleFile = urlParams.get('file');
    
    if (!articleFile) {
        showError('未指定文章文件');
        return;
    }
    
    loadArticle(articleFile);
});

// 加载文章
async function loadArticle(filename) {
    const titleEl = document.getElementById('article-title');
    const dateEl = document.getElementById('article-date');
    const contentEl = document.getElementById('article-content');
    
    try {
        const response = await fetch(`articles/${filename}`);
        if (!response.ok) {
            throw new Error('文章加载失败');
        }
        
        const markdown = await response.text();
        
        // 解析文章元数据
        const { title, date, content } = parseArticle(markdown);
        
        // 设置文章内容
        titleEl.textContent = title;
        dateEl.textContent = date;
        
        // 渲染 Markdown 内容
        if (typeof marked !== 'undefined') {
            contentEl.innerHTML = marked.parse(content);
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
    let content = markdown;
    
    // 提取标题 (第一个 # 开头的行)
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    if (titleMatch) {
        title = titleMatch[1].trim();
    }
    
    // 提取日期 (查找日期格式的行)
    const dateMatch = markdown.match(/\*\*(?:日期|发布时间|Date)\*\*[:：]\s*(\d{4}-\d{2}-\d{2})/i);
    if (dateMatch) {
        date = dateMatch[1];
    }
    
    return { title, date, content };
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
