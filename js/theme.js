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
        },
        solarized: {
            name: 'Solarized',
            colors: {
                '--bg-primary': '#fdf6e3',
                '--bg-secondary': '#eee8d5',
                '--text-primary': '#657b83',
                '--text-secondary': '#93a1a1',
                '--accent-green': '#859900',
                '--accent-blue': '#268bd2',
                '--accent-yellow': '#b58900',
                '--accent-red': '#dc322f',
                '--border-color': '#b58900'
            }
        },
        monokai: {
            name: 'Monokai',
            colors: {
                '--bg-primary': '#272822',
                '--bg-secondary': '#3e3d32',
                '--text-primary': '#f8f8f2',
                '--text-secondary': '#75715e',
                '--accent-green': '#a6e22e',
                '--accent-blue': '#66d9ef',
                '--accent-yellow': '#e6db74',
                '--accent-red': '#f92672',
                '--border-color': '#49483e'
            }
        },
        github: {
            name: 'GitHub',
            colors: {
                '--bg-primary': '#0d1117',
                '--bg-secondary': '#161b22',
                '--text-primary': '#c9d1d9',
                '--text-secondary': '#8b949e',
                '--accent-green': '#238636',
                '--accent-blue': '#58a6ff',
                '--accent-yellow': '#d29922',
                '--accent-red': '#f85149',
                '--border-color': '#30363d'
            }
        },
        gruvbox: {
            name: 'Gruvbox',
            colors: {
                '--bg-primary': '#282828',
                '--bg-secondary': '#1d2021',
                '--text-primary': '#ebdbb2',
                '--text-secondary': '#928374',
                '--accent-green': '#98971a',
                '--accent-blue': '#458588',
                '--accent-yellow': '#d79921',
                '--accent-red': '#cc241d',
                '--border-color': '#3c3836'
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
