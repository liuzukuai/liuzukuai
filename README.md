# AI Life Coach 个人成长助手

## 版本信息
当前版本：v0.1

### v0.1 功能列表
- 基础对话功能：支持用户与AI助手进行文本对话
- 流式响应：实时显示AI回复内容
- 简洁用户界面：清晰的对话区域布局
- 响应式设计：适配PC和移动设备
- 上下文记忆：保持对话连贯性

## 项目简介
这是一个基于火山方舟DeepSeek R1 API开发的个人成长辅导网站。通过与AI助手的对话交互，用户可以获得个性化的建议和指导，帮助个人成长。

## 技术架构
### 前端
- 使用HTML5和CSS3构建用户界面
- 采用响应式设计，适配不同设备
- 使用Flexbox布局实现页面结构
- 纯原生JavaScript处理交互逻辑

### 后端
- Node.js服务器处理API请求
- Express框架提供Web服务
- 集成火山方舟DeepSeek R1 API

## 页面结构
### 主页面 (index.html)
- 顶部：标题栏
- 中间：对话区域
  - 聊天记录显示区
  - 消息输入框
  - 发送按钮
- 底部：版权信息

## 功能特点
1. 实时对话：支持与AI助手进行实时对话
2. 流式响应：采用流式输出显示AI回复
3. 上下文记忆：保持对话上下文，提供连贯的交互体验
4. 响应式设计：完美适配PC和移动设备

## 开发规范
- 使用语义化HTML标签
- CSS采用BEM命名规范
- 代码添加详细的中文注释
- 遵循W3C标准

## 启动方式
1. 安装依赖：`npm install`
2. 启动服务器：`npm start`
3. 访问地址：`http://localhost:3000`

## 注意事项
- API请求超时时间：60秒
- AI参数设置：temperature=0.6
- 需要正确配置API密钥