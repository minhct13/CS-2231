from bs4 import BeautifulSoup
import json

def extract_html(html_f):
    # load the HTML page into a BeautifulSoup object
    with open(html_f) as f:
        soup = BeautifulSoup(f, 'html.parser')

    sections = []

    articleBody=soup.find_all("div", {"itemprop": "articleBody"})
    current_section = {"title": str(articleBody[0].h2), "content": ''}
    chapter_section = articleBody[0].h2.find_next_siblings(limit=999999999999999999)

    for element in chapter_section:
        if element.name == "h2":
            if current_section:
                sections.append(current_section)
            current_section = {"title": str(element), "content": ''}
        else:
            current_section["content"]+=str(element)

    # Append the last section
    if current_section:
        sections.append(current_section)

    # partition the HTML into multiple parts
    topic = str(soup.find('ul', {'class': 'tags'}))
    title = str(soup.find('h1', {'class': 'post-title'}))
    introduction = sections[0]
    formulas = sections[1]
    examples = sections[2]

    # create a dictionary containing the partitions
    data = {'topic': topic, 'title': title, 'introduction': introduction, "formulas":formulas, "examples":examples}

    # save the data as JSON
    html_f = os.path.basename(html_f)
    with open(f'./json/{html_f}.json', 'w', encoding='utf-8') as f:

        json.dump(data, f, ensure_ascii=False)



if __name__ == "__main__":
    import os 
    import glob

    # path to directory containing HTML files
    directory = "./html"

    # loop through all HTML files in directory
    for file_path in glob.glob(directory + "/*.html"):
        extract_html(file_path)