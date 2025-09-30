# university_data.py
# Load university-specific data (timetable, fees, hostel, library) from JSON

import json
import os

# Path to the JSON data file
DATA_FILE = os.path.join(os.path.dirname(__file__), "data", "university_data.json")

# Load JSON data once at startup
try:
    with open(DATA_FILE, "r") as f:
        UNIVERSITY_DATA = json.load(f)
except FileNotFoundError:
    print(f"[Error] University data file not found: {DATA_FILE}")
    UNIVERSITY_DATA = {}
except json.JSONDecodeError:
    print(f"[Error] Invalid JSON in {DATA_FILE}")
    UNIVERSITY_DATA = {}

def get_data(category, key=None):
    """
    Fetch data from the JSON store.
    
    :param category: e.g., 'timetable', 'fees', 'hostel', 'library'
    :param key: e.g., 'CS101' for course-specific data
    :return: dictionary or string, or None if not found
    """
    cat_data = UNIVERSITY_DATA.get(category, {})
    if key:
        return cat_data.get(key)
    return cat_data
