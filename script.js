async function askDeepSeek(question) {
    const apiKey = 'sk-570c7cf6021f4b1790a70d9470d83801'; // توکن شما
    const apiUrl = 'https://api.deepseek.com/v1/chat/completions'; // آدرس API (فرضی)

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: `شما یک دستیار برنامه‌نویسی هستید. فقط به سوالات مربوط به برنامه‌نویسی پاسخ دهید. اگر سوال غیرمرتبط باشد، پاسخ دهید: "لطفاً فقط سوالات برنامه‌نویسی بپرسید."\n\nسوال: ${question}`,
            max_tokens: 150
        })
    });

    const data = await response.json();
    return data.choices[0].text; // پاسخ API
}

// مثال استفاده
document.getElementById('ask-button').addEventListener('click', async () => {
    const question = document.getElementById('question-input').value;
    const answer = await askDeepSeek(question);
    document.getElementById('answer').innerText = answer;
});
