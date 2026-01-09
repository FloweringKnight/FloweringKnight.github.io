// ===== 自定义主题模块 =====

const CustomTheme = {
    // localStorage 键
    STORAGE_KEY: 'custom-themes',

    // 获取所有自定义主题
    getCustomThemes() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    },

    // 保存自定义主题
    saveTheme(name, colors) {
        const themes = this.getCustomThemes();
        themes[name] = {
            name: name,
            colors: colors,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(themes));
    },

    // 删除自定义主题
    deleteTheme(name) {
        const themes = this.getCustomThemes();
        if (themes[name]) {
            delete themes[name];
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(themes));
            return true;
        }
        return false;
    },

    // 获取指定主题
    getTheme(name) {
        const themes = this.getCustomThemes();
        return themes[name] || null;
    },

    // 应用主题
    applyTheme(name) {
        const theme = this.getTheme(name);
        if (!theme) {
            return false;
        }

        const root = document.documentElement;
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });

        // 保存当前主题到 localStorage
        localStorage.setItem('current-theme', name);
        return true;
    },

    // 导出主题为 JSON
    exportTheme(name) {
        const theme = this.getTheme(name);
        if (!theme) {
            return null;
        }
        return JSON.stringify(theme, null, 2);
    },

    // 从 JSON 导入主题
    importTheme(jsonString) {
        try {
            const theme = JSON.parse(jsonString);
            if (!theme.name || !theme.colors) {
                return { success: false, error: '无效的主题格式' };
            }

            this.saveTheme(theme.name, theme.colors);
            return { success: true, name: theme.name };
        } catch (error) {
            return { success: false, error: 'JSON 格式错误' };
        }
    },

    // 获取所有可用主题（包括系统主题）
    getAllThemes() {
        const systemThemes = ['dark', 'light', 'nord', 'dracula', 'solarized', 'monokai', 'github', 'gruvbox'];
        const customThemes = Object.keys(this.getCustomThemes());

        return {
            system: systemThemes,
            custom: customThemes
        };
    },

    // 格式化主题列表
    formatThemeList() {
        const themes = this.getAllThemes();
        let output = '<span class="text-green">可用主题:</span>\n\n';

        output += '<span class="text-blue">系统主题:</span>\n';
        themes.system.forEach(theme => {
            output += `  - ${theme}\n`;
        });

        if (themes.custom.length > 0) {
            output += '\n<span class="text-blue">自定义主题:</span>\n';
            themes.custom.forEach(theme => {
                output += `  - ${theme}\n`;
            });
        }

        output += '\n<span class="text-secondary">使用 "theme <主题名>" 切换主题</span>';

        return output;
    }
};
