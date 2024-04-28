# NutriPic
## UWB HACKS AI 2024!


Using just a single image of a meal, NutriPic employs computer vision and deep learning techniques to identify food types and generate nutrition information for the user.

### Built with
This application was built using ```Node.js v20.12.2``` and ```Python``` using following libraries, packages, and modules:
* [Express]([https://pypi.org/project/beautifulsoup4/](https://expressjs.com/)) - Local Server
* [multer]([https://pypi.org/project/requests/](https://www.npmjs.com/package/multer)) - Middleware
* [sharp]([https://pypi.org/project/lxml/](https://www.npmjs.com/package/sharp)) - Image Conversion
* [node-fetch]([https://pypi.org/project/cchardet/](https://www.npmjs.com/package/node-fetch)) - Fetch API
* [requests]([https://docs.python.org/3/library/csv.html](https://pypi.org/project/requests/)) - Python HTTP
* [python-dotenv]([https://docs.python.org/3/library/pickle.html](https://pypi.org/project/python-dotenv/)) - Python Environment Variables

---
### Installation and Usage
You must have a well supported-version of ```Python``` (including pip) installed, and of course an up-to-date ```node.js``` with the included ```node-modules```. When the project is installed, run  ```node server.js``` to start a localhost server on port 3000.


---

### How it Works

This program utilizes the LogMeal API to retrieve food recognition and nutritional informational data. The front-end is built with HTML/CSS/Javascript, with a functional back-end that primarily uses Node.js, Express.js, and Python. After running the express server, the webpages are hosted on the localhost:3000. 

The user may click the upload file button to input an image of a meal (according to the LogMeal API requirements), this captures the data of the image, passes it to server.js where it is converted to a .jpg file. The file is then passed to the LogMeal API for recognition and nutritional information. This information is downloaded as a .json and is parsed out for the client-side Javascript to display in the HTML page.
