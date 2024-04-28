import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()

def process_image(image_path):
    #img = 'root/11-resources/02-images/01-upload/meal.jpg'
    api_user_token = os.environ["API_USER_TOKEN"]
    headers = {'Authorization': 'Bearer ' + api_user_token}

    # Single/Several Dishes Detection
    url = 'https://api.logmeal.com/v2/image/segmentation/complete'
    resp = requests.post(url,files={'image': open(image_path, 'rb')},headers=headers)

    # Nutritional information
    url = 'https://api.logmeal.com/v2/recipe/nutritionalInfo'
    resp = requests.post(url,json={'imageId': resp.json()['imageId']}, headers=headers)

    return resp.json() # display nutritional info

if __name__ == '__main__':
    result = process_image("root/11-resources/02-images/01-upload/meal.jpg")
    
    # Save the result to a JSON file
    with open('output.json', 'w') as file:
        json.dump(result, file, indent=4)