// ===== 命令历史记录管理 =====

const CommandHistory = {
    history: [],
    currentIndex: -1,
    maxHistory: 100,
    
    // 初始化
    init() {
        // 从 localStorage 加载历史记录
        const savedHistory = localStorage.getItem('fakecli_history');
        if (savedHistory) {
            try {
                this.history = JSON.parse(savedHistory);
            } catch (e) {
                console.error('加载历史记录失败:', e);
                this.history = [];
            }
        }
    },
    
    // 添加命令到历史
    addCommand(command) {
        if (!command || command.trim() === '') return;
        
        // 如果与上一条命令相同，不添加
        if (this.history.length > 0 && this.history[this.history.length - 1] === command) {
            return;
        }
        
        // 添加到历史记录
        this.history.push(command);
        
        // 限制历史记录数量
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        }
        
        // 重置当前索引
        this.currentIndex = this.history.length;
        
        // 保存到 localStorage
        this.save();
    },
    
    // 获取上一条命令
    getPreviousCommand() {
        if (this.history.length === 0) return '';
        
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
        
        return this.history[this.currentIndex];
    },
    
    // 获取下一条命令
    getNextCommand() {
        if (this.history.length === 0) return '';
        
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
        } else {
            // 到达最新位置，返回空字符串
            this.currentIndex = this.history.length;
            return '';
        }
        
        return this.history[this.currentIndex];
    },
    
    // 获取所有历史记录
    getHistory() {
        return [...this.history];
    },
    
    // 清空历史记录
    clear() {
        this.history = [];
        this.currentIndex = -1;
        this.save();
    },
    
    // 重置当前索引
    resetIndex() {
        this.currentIndex = this.history.length;
    },
    
    // 保存到 localStorage
    save() {
        try {
            localStorage.setItem('fakecli_history', JSON.stringify(this.history));
        } catch (e) {
            console.error('保存历史记录失败:', e);
        }
    }
};

// 初始化历史记录
CommandHistory.init();
