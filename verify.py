from playwright.sync_api import sync_playwright
import os

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('file://' + os.path.dirname(os.path.abspath(__file__)) + '/index.html')
    page.wait_for_timeout(3500)
    page.screenshot(path="verify_blob.png")
    browser.close()
