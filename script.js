// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.backgroundColor = 'var(--secondary-color)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 获取表单数据
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // 简单的表单验证
            if (!name || !email || !message) {
                showMessage('请填写所有必填字段', 'error');
                return;
            }

            // 这里可以添加实际的表单提交逻辑
            // 例如使用AJAX发送数据到服务器

            // 模拟表单提交
            showMessage('消息发送成功！我会尽快回复您。', 'success');

            // 清空表单
            this.reset();
        });
    }

    // 显示消息函数
    function showMessage(message, type) {
        // 创建消息元素
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;

        // 添加样式
        messageElement.style.position = 'fixed';
        messageElement.style.top = '20px';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translateX(-50%)';
        messageElement.style.padding = '15px 25px';
        messageElement.style.borderRadius = '5px';
        messageElement.style.color = 'white';
        messageElement.style.fontSize = '16px';
        messageElement.style.zIndex = '9999';
        messageElement.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';

        // 根据类型设置背景色
        if (type === 'success') {
            messageElement.style.backgroundColor = '#2ecc71';
        } else if (type === 'error') {
            messageElement.style.backgroundColor = '#e74c3c';
        }

        // 添加到页面
        document.body.appendChild(messageElement);

        // 3秒后移除
        setTimeout(() => {
            messageElement.style.opacity = '0';
            messageElement.style.transition = 'opacity 0.5s';

            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 500);
        }, 3000);
    }

    // 添加滚动时的动画效果
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .skill-item, .project-card');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初始加载时检查一次

    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1;
            transform: translateY(0);
        }

        .about-content, .skill-item, .project-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
});