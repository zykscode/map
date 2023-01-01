import requests
import PyPDF2
import io

# Send a GET request to the webpage and retrieve the HTML content
url = "https://www.inecnigeria.org/2019-senatorial-district-elections-result/"
html = requests.get(url).text

# Parse the HTML content
soup = BeautifulSoup(html, 'html.parser')

# Find all elements in the HTML that contain PDF links
elements = soup.find_all("div", class_="col-lg-12")

# Modify the code to check whether element.a is not None before accessing the href attribute
pdf_links = [element.a.get('href') for element in elements if element.a is not None and element.a.get('href').endswith('.pdf')]

# Iterate over the list of PDF links and download each PDF file
for link in pdf_links:
    # Create the full URL by joining the base URL with the file path
    base_url = "https://www.inecnigeria.org"
    full_url = urllib.parse.urljoin(base_url, link)
    
    # Open the PDF file from the URL
    pdf_file = requests.get(full_url).content
    # Create a buffer that supports the seek operation
    buffer = io.BytesIO(pdf_file)
    # Create a PDF reader
    pdf_reader = PyPDF2.PdfFileReader(buffer)
    # Extract the text from the PDF file
    text = pdf_reader.extractText()
    
    # Save the text to a file
    with open('election_result.txt', 'w') as f:
        f.write(text)
