import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()

def process_image(image_path):
    api_user_token = os.environ["API_USER_TOKEN"]
    headers = {'Authorization': 'Bearer ' + api_user_token}

    # Single/Several Dishes Detection
    url = 'https://api.logmeal.com/v2/image/segmentation/complete'
    resp = requests.post(url, files={'image': open(image_path, 'rb')}, headers=headers)

    # Nutritional information
    url = 'https://api.logmeal.com/v2/recipe/nutritionalInfo'
    resp = requests.post(url, json={'imageId': resp.json()['imageId']}, headers=headers)

    return resp.json()  # display nutritional info


def save_nutritional_info(result):
    try:
        # Extracting only the necessary details
        selected_nutrients = {
            "foodName": result.get("foodName", ["Unknown"])[0],  # Get the first food name or "Unknown"
            "calories": result["nutritional_info"]["totalNutrients"]["ENERC_KCAL"]["quantity"],
            "total_fat": result["nutritional_info"]["totalNutrients"]["FAT"]["quantity"],
            "sodium": result["nutritional_info"]["totalNutrients"]["NA"]["quantity"],
            "carbs": result["nutritional_info"]["totalNutrients"]["CHOCDF"]["quantity"],
            "sugar": result["nutritional_info"]["totalNutrients"]["SUGAR"]["quantity"],
            "protein": result["nutritional_info"]["totalNutrients"]["PROCNT"]["quantity"]
        }
    except KeyError as e:
        print(f"Key error: {e} - Check your JSON structure.")
        selected_nutrients = {}

    # Saving the extracted information into a new JSON file
    with open('selected_nutritional_info.json', 'w') as f:
        json.dump(selected_nutrients, f, indent=4)
    print("Selected nutritional information saved to 'selected_nutritional_info.json'")

if __name__ == '__main__':
    image_path = "root/11-resources/02-images/01-upload/meal.jpg"
    result = process_image(image_path)
    
    # Save the full result to a JSON file
    with open('output.json', 'w') as file:
        json.dump(result, file, indent=4)

    # Save only the selected nutritional information
    save_nutritional_info(result)