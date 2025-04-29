from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_divar_views(ad_url):
    options = webdriver.ChromeOptions()
    
    # شبیه‌سازی مرورگر واقعی
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
    
    # اختیاری: باز شدن مرورگر برای دیباگ بهتر
    # options.add_argument("--headless")  # در صورت تمایل فعال کن

    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

    try:
        driver.get(ad_url)
        time.sleep(5)

        # گاهی اطلاعات در تگ <p> هست، گاهی <span> یا <div>
        elements = driver.find_elements(By.XPATH, "//*[contains(text(),'بازدید')]")
        for el in elements:
            if 'بازدید' in el.text:
                return el.text.strip()
        return "Could not find view count."
    except Exception as e:
        return f"Error: {e}"
    finally:
        driver.quit()

ad_link = input("Enter Divar ad URL: ")
print(get_divar_views(ad_link))