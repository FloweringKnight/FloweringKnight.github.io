# Arch Linux安装

**日期**: 2025-12-19

我们省去前置的一系列问题，诸如“我该不该用linux？”、“我该用哪个发行版？”、“这些发行版有什么不同？”、“我想玩的游戏不能玩，为什么我不用WSL呢？”
让我们假设我们无论如何想要一台linux主机，并确定了要装Arch，那么我们开始吧。

## 启动U盘
- 下载Arch Linux的iso
- 制作启动U盘
- U盘根目录放进Arch镜像
- 修改BIOS启动顺序
- 启动（root@archiso）
## 修改字体
- `setfont /usr/share/kbd/consolefonts/LatGrkCyr-12x22.psfu.gz`
   + _这个字体较大_
   + *键盘布局与按键默认即可，若想修改可以用loadkeys*
   + *修改键位可以创建conf文件，然后用loadkeys加载*
   + *iso自带vim，若要修改配置，新增.vimrc文件即可*
## wifi联网
- `ip link`
   + *查看无线网卡，假设我的网卡名为wlan0*
- `ip link set wlan0 up`
- `iwlist wlan0 scan`
   + *用wlan0网卡扫描都有那些信号*
   + *用这个显示出无线名称* -> `iwlist wlan0 scan | grep ESSID`
- `wpa_passphrase wifi_name wifi_pwd > file_name.conf`
   + *亲测，wifi密码中不能用 ^ 这个符号，会导致存的conf文件中的密码变化，原因未知。。。*
- `wpa_supplicate -c file_name.conf -i wlan0 &`
   + *使用刚才保存的配置文件联网，并后台运行*
- `dhcpcd &`
   + *动态分配IP地址，并后台运行*
   + *至此连上互联网，可以ping验证下*
## 同步时间
- `timedatectl set-ntp true`
## 格式化硬盘
- `fdisk -l`
   + *查看设备中的硬盘，假设我的硬盘名是 /dev/disk1*
- `fdisk /dev/disk1`
   + `m` 帮助
   + `p` 打印分区信息
   + `g` 创建一个新的GPT label
   + `n` 创建一个新的分区
      + 一个可行的方案：分区1（/dev/disk1p1,1G,引导盘）分区3（/dev/disk1p3,6G,SWAP盘）分区2（/dev/disk1p2,剩余的所有大小，主分区）
   + `w`  **写入**
- `mkfs.fat -F32 /dev/disk1p1`
   + *引导分区必须是FAT32格式*
- `mkfs.ext4 /dev/disk1p2`
   + *主分区可以是ext4格式*
- `mkswap /dev/disk1p3`
- `swapon /dev/disk1p3`
   + *制作并打开swap分区*
## 修改pacman源
- `vim /etc/pacman.conf`
   + `Color` 取消注释
   + `Color` 下一行增加 `ILoveCandy`
   + `:wq`
- `vim /etc/pacman.d/mirrorlist`
   + *找china，去掉注释*
## 挂载硬盘
- `mount /dev/disk1p2 /mnt`
   + `ls /mnt` 查看一下，是否有lost+found，有就是挂载上了
- `mkdir /mnt/boot`
- `mount /dev/disk1p1 /mnt/boot`
## 安装系统
- `pacstrap /mnt base linux linux-firmware`
   + *安装linux内核和框架*
## 生成fstab文件
- `genfstab -U /mnt >> /mnt/etc/fatab`
## 修改本地语言
- `vim /mnt/etc/locale.gen`
   + *找 **en_US.UTF-8**，去掉注释*
   + ***zh_CN.UTF-8*** *以后再说，全英文能减少一些莫名其妙的BUG*
- `vim /mnt/etc/locale.conf`
   + *添加  `LANG=en_US.UTF-8`*
   + `:wq`
## 修改hostname
- `vim /mnt/etc/hostname`
   + *给系统起个名字，比如CSL*
## 修改hosts
- `vim /mnt/etc/hosts`
   + *添加以下内容*
    ```
     127.0.0.1   localhost
     ::1         localhost
     127.0.0.1   CSL.localdomain   CSL
     ```
# 以下在新系统中操作
## 更改/更新 新系统的一些配置
- `arch-chroot /mnt`
   + *进入新系统*
- `ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime`
- `hwclock --systohc`
- `locale-gen`
- `passwd`
   + *修改新系统的root密码*
## 安装必备的软件
- `pacman -S grub efibootmgr intel-ucode os-prober`
- `mkdir /boot/grub`
- `grub-mkconfig > /boot/grub/grub.cfg`
- `uname -m`
   + `x86_64`  *查询本机架构*
- `grub-install --target=x86_64-efi --efi-directory=/boot`
   + *其他架构更改参数即可*
- `pacman -S wpa_supplicate dhcpcd vi neovim zsh`
   + *网络工具一定要安装！！！其他工具按需，因为可以连上网之后再慢慢装*
---

# 重启
### 退出archroot后，kill掉wpa_supplicate和dhcpcd，然后reboot，拔掉U盘
### 出现grub的引导页面，大功告成。

---
# 新系统
## 联网
- `wpa_passphrase wifi_name wifi_pwd > file_name.conf`
- `wpa_supplicate -c file_name.conf -i wlan0 &`
- `dhcpcd &`
## 装点好东西
- `pacman -S man`
- `pacman -S base-devel`
## 修改权限配置
- `visudo`
   + *找到 `%wheel ALL=(ALL) ALL` ,去掉注释*
## 更新
- `pacman -Syyu`
## 汉化
- `vim /etc/locale.gen`
   + *找到 `zh_CN.UTF-8` 去掉注释*
- `locale-gen`
   + `locale -a` *查询系统支持的所有语言*
- `mkdir /etc/skel/.config`
- `vim /etc/skel/.config/locale.conf`
   + *添加* `LANG=zh_CN.UTF-8`
- `useradd -m -G wheel username`
   + *这里username可以替换成你想要的账号*
   + *wheel组是管理员权限，允许这个组的成员可以使用sudo*
- `passwd username`
   + *这里username和上一条联动*
   + *修改用户密码*
---
# KDE桌面（使用username登录而非root）
## 安装xorg
- `sudo pacman -S xorg xorg-server xorg-xinit xorg-twm xorg-xclock xterm`
## 安装显卡驱动(intel集成显卡)
- `sudo pacman -S xf86-video-intel`
## 安装KDE桌面环境
- `sudo pacman -S plasma kde-applications`
## 安装桌面管理器（KDE官方推荐SDDM）
- `sudo pacman -S sddm sddm-kcm`
## 配置SDDM
- `sudo vim /etc/sddm.conf`
   + *添加以下内容*
   ```
     [Theme]
     CursorTheme=breeze_cursors
     Font=Noto Sans
     ```
## 安装网络管理工具
- `sudo pacman -S networkmanager`
## 设置开启启动
- `systemctl enable sddm.service`
## 重启
- `reboot`














