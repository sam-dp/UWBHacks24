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
        # Assume each food item might have individual nutritional info
        food_items = []
        for i, food_name in enumerate(result.get("foodName", [])):
            # Extract nutritional info for each food item
            nutrients = result["nutritional_info_per_item"][i]["nutritional_info"]["totalNutrients"]
            food_info = {
                "foodName": food_name,
                "calories": nutrients["ENERC_KCAL"]["quantity"],
                "total_fat": nutrients["FAT"]["quantity"],
                "sodium": nutrients["NA"]["quantity"],
                "carbs": nutrients["CHOCDF"]["quantity"],
                "sugar": nutrients["SUGAR"]["quantity"],
                "protein": nutrients["PROCNT"]["quantity"]
            }
            food_items.append(food_info)

    except KeyError as e:
        print(f"Key error: {e} - Check your JSON structure.")
        food_items = []

    # Saving the extracted information into a new JSON file
    with open('selected_nutritional_info.json', 'w') as f:
        json.dump(food_items, f, indent=4)
    print("Selected nutritional information saved to 'selected_nutritional_info.json'")

if __name__ == '__main__':
    image_path = "root/11-resources/02-images/01-upload/meal.jpg"
    result = process_image(image_path)
    
    # Save the full result to a JSON file
    with open('output.json', 'w') as file:
        json.dump(result, file, indent=4)

    # Save only the selected nutritional information
    save_nutritional_info(result)