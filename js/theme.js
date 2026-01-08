// ===== 主题管理 =====

const ThemeManager = {
    // 主题配置
    themes: {
        dark: {
            name: 'Dark',
            colors: {
                '--bg-primary': '#1a1b26',
                '--bg-secondary': '#24283b',
                '--text-primary': '#a9b7c6',
                '--text-secondary': '#5c6370',
                '--accent-green': '#98c379',
                '--accent-blue': '#61afef',
                '--accent-yellow': '#e5c07b',
                '--accent-red': '#e06c75',
                '--border-color': '#3e4451'
            }
        },
        light: {
            name: 'Light',
            colors: {
                '--bg-primary': '#ffffff',
                '--bg-secondary': '#f6f8fa',
                '--text-primary': '#24292e',
                '--text-secondary': '#586069',
                '--accent-green': '#22863a',
                '--accent-blue': '#0366d6',
                '--accent-yellow': '#b08800',
                '--accent-red': '#d73a49',
                '--border-color': '#e1e4e8'
            }
        },
        nord: {
            name: 'Nord',
            colors: {
                '--bg-primary': '#2e3440',
                '--bg-secondary': '#3b4252',
                '--text-primary': '#d8dee9',
                '--text-secondary': '#7b88a1',
                '--accent-green': '#a3be8c',
                '--accent-blue': '#81a1c1',
                '--accent-yellow': '#ebcb8b',
                '--accent-red': '#bf616a',
                '--border-color': '#4c566a'
            }
        },
        dracula: {
            name: 'Dracula',
            colors: {
                '--bg-primary': '#282a36',
                '--bg-secondary': '#44475a',
                '--text-primary': '#f8f8f2',
                '--text-secondary': '#6272a4',
                '--accent-green': '#50fa7b',
                '--accent-blue': '#8be9fd',
                '--accent-yellow': '#f1fa8c',
                '--accent-red': '#ff5555',
                '--border-color': '#44475a'
            }
        }
    },
    
    // 初始化
    init() {
        // 从 localStorage 加载主题
        const savedTheme = localStorage.getItem('fakecli_theme');
        if (savedTheme && this.themes[savedTheme]) {
            this.setTheme(savedTheme);
        }
    },
    
    // 设置主题
    setTheme(themeName) {
        if (!this.themes[themeName]) {
            console.error(`主题 "${themeName}" 不存在`);
            return false;
        }

        const theme = this.themes[themeName];
        const root = document.documentElement;

        // 设置 data-theme 属性（用于 CSS 特定主题选择器）
        root.setAttribute('data-theme', themeName);

        // 应用主题颜色
        Object.keys(theme.colors).forEach(colorVar => {
            root.style.setProperty(colorVar, theme.colors[colorVar]);
        });

        // 保存到 localStorage
        localStorage.setItem('fakecli_theme', themeName);

        return true;
    },
    
    // 获取当前主题
    getCurrentTheme() {
        return localStorage.getItem('fakecli_theme') || 'dark';
    },
    
    // 获取所有主题
    getAllThemes() {
        return Object.keys(this.themes);
    }
};

// 初始化主题管理器
ThemeManager.init();
