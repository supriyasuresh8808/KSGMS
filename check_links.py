import re
from glob import glob

html_files = glob('*.html')
pattern = re.compile(r'(?:href|action|onclick)=["\']([^"\']+)["\']')

broken_links = []

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        matches = pattern.findall(content)
        for match in matches:
            if match == '#' or match == '':
                broken_links.append((file, match))

print("Broken/Empty Links (# or empty):")
for file, link in broken_links:
    print(f" - {file}: {link}")
