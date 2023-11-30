from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from pathlib import Path

CLIENT_ROOT = Path(__file__).parent
WEBDRIVER_PATH = CLIENT_ROOT / 'chromedriver.exe'
print(WEBDRIVER_PATH)
# BRAVE_PATH = 'c:\Program Files\BraveSoftware\Brave-Browser\Application\\brave.exe'

options = Options()
service = Service(executable_path=WEBDRIVER_PATH)
# options.add_experimental_option("detach", True)
# options.binary_location = BRAVE_PATH

driver = webdriver.Chrome(options=options, service=service)

driver.get('https://emzyx.github.io/')

while True:
  pass