import requests

def get_divar_views(ad_url):
    try:
        token = ad_url.rstrip('/').split('/')[-1]
        api_url = f"https://api.divar.ir/v1/api/post/{token}"
        headers = {'User-Agent': 'Mozilla/5.0'}
        res = requests.get(api_url, headers=headers)
        res.raise_for_status()
        data = res.json()
        views = data.get('data', {}).get('seo', {}).get('counts', {}).get('visits', 0)
        return views
    except Exception as e:
        return f"Error: {e}"

# Usage
link = input("Enter Divar ad link: ")
print(get_divar_views(link))