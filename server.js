// 导入所需模块
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

// 创建Express应用
const app = express();

// 配置CORS选项
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// 启用CORS和JSON解析
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

// DeepSeek R1 API配置
const API_KEY = '24263969-6d1f-4af8-a417-3af539361f0c';
const API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

// 处理聊天请求的路由
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    // 准备请求数据
    const requestData = {
      model: 'deepseek-v3-241226',
      messages: [
        { role: 'system', content: '你是一位专业的Life Coach，擅长通过对话帮助他人成长。你会倾听用户的问题，给出有针对性的建议和指导。' },
        ...messages
      ],
      temperature: 0.6,
      stream: true
    };

    // 设置API请求选项
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(requestData),
      timeout: 60000 // 60秒超时
    };

    // 发送流式响应
    const response = await fetch(API_URL, fetchOptions);
    
    // 设置响应头
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 处理流式响应
    response.body.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      lines.forEach(line => {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data !== '[DONE]') {
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0].delta.content || '';
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            } catch (e) {
              console.error('解析响应数据失败:', e);
            }
          }
        }
      });
    });

    response.body.on('end', () => {
      res.write('data: [DONE]\n\n');
      res.end();
    });

    // 错误处理
    response.body.on('error', (err) => {
      console.error('流处理错误:', err);
      res.end();
    });

  } catch (error) {
    console.error('请求处理错误:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});