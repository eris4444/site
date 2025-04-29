import requests
from bs4 import BeautifulSoup

def get_divar_views(ad_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    }

    try:
        response = requests.get(ad_url, headers=headers)
        response.raise_for_status()
    except requests.RequestException as e:
        return f"خطا در دریافت صفحه: {e}"

    soup = BeautifulSoup(response.text, 'html.parser')

    # پیدا کردن عدد بازدید در صفحه
    try:
        views_tag = soup.find('span', string=lambda t: t and 'بازدید' in t)
        if views_tag:
            return views_tag.text.strip()
        else:
            return "تعداد بازدید پیدا نشد. ممکنه ساختار صفحه تغییر کرده باشه."
    except Exception as e:
        return f"خطا در تجزیه صفحه: {e}"

# تست
ad_link = input("لینک آگهی دیوار را وارد کنید: ")
print(get_divar_views(ad_link))