# # nlp_fallback.py
# # Enhanced keyword + fuzzy fallback with university data integration and natural language support

# import re
# import json
# from difflib import get_close_matches
# from university_data import get_data
# from faqs import FAQS

# # Precompute FAQ keys
# FAQ_KEYS = list(FAQS.keys())

# def normalize(text: str) -> str:
#     """Lowercase and remove non-alphanumeric characters."""
#     return re.sub(r'[^a-z0-9\s]', '', text.lower())

# def keyword_match(query: str):
#     """Exact or partial keyword match in FAQs."""
#     q = normalize(query)
#     for key in FAQ_KEYS:
#         if key in q or any(word in q for word in key.split()):
#             return FAQS[key]
#     return None

# def fuzzy_match(query: str, cutoff=0.6):
#     """Fuzzy match for FAQ keys."""
#     norm = normalize(query)
#     matches = get_close_matches(norm, FAQ_KEYS, n=1, cutoff=cutoff)
#     if matches:
#         return FAQS[matches[0]]
#     return None

# def university_data_match(query: str):
#     """Check if query matches university data like timetable, fees, faculty, syllabus, hostel, library."""
#     q = normalize(query)

#     # --- 1) Timetable ---
#     days = ["MON", "TUE", "WED", "THUR", "FRI", "SAT"]
#     day_match = None
#     for day in days:
#         if day.lower() in q:
#             day_match = day
#             break

#     section_match = re.search(r"section[-\s]?(\d+)", q)
#     section = f"SECTION-{section_match.group(1)}" if section_match else "SECTION-14"

#     if day_match and section:
#         tt = get_data("timetable", section)
#         if tt and day_match in tt:
#             resp = "\n".join([f"{time}: {cls}" for time, cls in tt[day_match].items()])
#             return resp, "university-data"

#     # --- 2) Faculty ---
#     faculty_match = re.search(r"(who is|my)\s+(\w+)\s+faculty", q)
#     if faculty_match:
#         subject = faculty_match.group(2).upper()
#         faculty = get_data("timetable", "SECTION-14").get("faculty", {}).get(subject)
#         if faculty:
#             return f"The faculty for {subject} is {faculty}", "university-data"

#     # --- 3) Syllabus ---
#     syllabus_match = re.search(r"(syllabus|topics)\s+for\s+(\w+)", q)
#     if syllabus_match:
#         subject = syllabus_match.group(2).upper()
#         syllabus = get_data("timetable", "SECTION-14").get("syllabus", {}).get(subject)
#         if syllabus:
#             resp = f"Syllabus for {subject}:\n" + "\n".join(f"- {t}" for t in syllabus)
#             return resp, "university-data"

#     # --- 4) Fees ---
#     fee_match = re.search(r"(fee|fees).*for\s+(\w+)", q)
#     if fee_match:
#         course = fee_match.group(2).upper()
#         fee = get_data("fees", course)
#         if fee:
#             return f"Fees for {course}: {fee}", "university-data"

#     # --- 5) Hostel ---
#     if "hostel" in q:
#         hostel = get_data("hostel")
#         if hostel:
#             return f"Hostel info:\n{json.dumps(hostel, indent=2)}", "university-data"

#     # --- 6) Library ---
#     if "library" in q:
#         library = get_data("library")
#         if library:
#             return f"Library info:\n{json.dumps(library, indent=2)}", "university-data"

#     return None, None

# def generate_response(query: str):
#     """Main function to generate response."""
#     # 1) Keyword match (FAQS)
#     r = keyword_match(query)
#     if r:
#         return r, "rule-based"

#     # 2) University data match (natural language aware)
#     r, source = university_data_match(query)
#     if r:
#         return r, source

#     # 3) Fuzzy match (FAQS)
#     r = fuzzy_match(query)
#     if r:
#         return r, "fuzzy-match"

#     # 4) Default fallback
#     fallback = ("I couldn't find a direct answer. "
#                 "Please try rephrasing, or ask for contact details (e.g., 'contact exams office').")
#     return fallback, "fallback"


#2 - claude 
# nlp_fallback.py
# Enhanced keyword + fuzzy fallback with university data integration and natural language support

# nlp_fallback.py
# Enhanced keyword + fuzzy fallback with university data integration and natural language support

import re
import json
from difflib import get_close_matches
from university_data import get_data
from faqs import FAQS

# Precompute FAQ keys
FAQ_KEYS = list(FAQS.keys())

def normalize(text: str) -> str:
    """Lowercase and remove non-alphanumeric characters."""
    return re.sub(r'[^a-z0-9\s]', '', text.lower())

def keyword_match(query: str):
    """Exact or partial keyword match in FAQs."""
    q = normalize(query)
    for key in FAQ_KEYS:
        if key in q or any(word in q for word in key.split()):
            return FAQS[key]
    return None

def fuzzy_match(query: str, cutoff=0.6):
    """Fuzzy match for FAQ keys."""
    norm = normalize(query)
    matches = get_close_matches(norm, FAQ_KEYS, n=1, cutoff=cutoff)
    if matches:
        return FAQS[matches[0]]
    return None

def university_data_match(query: str):
    """Check if query matches university data like timetable, fees, faculty, syllabus, hostel, library."""
    q = normalize(query)

    # --- 1) Timetable ---
    if any(word in q for word in ["timetable", "schedule", "classes", "view my timetable"]):
        section_match = re.search(r"section[-\s]?(\d+)", q)
        section = f"SECTION-{section_match.group(1)}" if section_match else "SECTION-14"
        
        days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
        day_names = {"monday": "MON", "tuesday": "TUE", "wednesday": "WED", 
                     "thursday": "THUR", "friday": "FRI", "saturday": "SAT"}
        
        day_match = None
        for day in days:
            if day in q:
                day_match = day_names[day]
                break
        
        if day_match:
            tt = get_data("timetable", section)
            if tt and day_match in tt:
                resp = f"Here's your {day_match} schedule for {section}:\n\n"
                resp += "\n".join([f"{time}: {cls}" for time, cls in tt[day_match].items()])
                return resp, "university-data"
        
        tt = get_data("timetable", section)
        if tt:
            resp = f"Here's the complete timetable for {section}:\n\n"
            for day in ["MON", "TUE", "WED", "THUR", "FRI", "SAT"]:
                if day in tt:
                    resp += f"\n{day}:\n"
                    resp += "\n".join([f"  {time}: {cls}" for time, cls in tt[day].items()])
                    resp += "\n"
            return resp, "university-data"

    # --- 2) Faculty (FIXED) ---
    # Check for faculty-related queries
    if any(word in q for word in ["faculty", "teacher", "professor", "instructor"]):
        # Get all faculty data
        tt = get_data("timetable", "SECTION-14")
        faculty_dict = tt.get("faculty", {})
        
        if "faculty information" in q or q.strip() == "faculty":
            # Show all faculty
            if faculty_dict:
                resp = "Here's the faculty information:\n\n"
                for subject, name in faculty_dict.items():
                    resp += f"{subject}: {name}\n"
                return resp, "university-data"
        else:
            # Try to find subject name in the query
            # Look for common subject abbreviations
            for subject_code in faculty_dict.keys():
                # Check if subject code appears in query (case insensitive)
                if subject_code.lower() in q:
                    return f"The faculty for {subject_code} is {faculty_dict[subject_code]}", "university-data"
            
            # Try more flexible matching - look for words that might be subject codes
            words = q.split()
            for word in words:
                word_upper = word.upper()
                # Check if any word (when uppercased) matches a subject code
                if word_upper in faculty_dict:
                    return f"The faculty for {word_upper} is {faculty_dict[word_upper]}", "university-data"
                
                # Check for partial matches (e.g., "iai" in "IAI")
                for subject_code in faculty_dict.keys():
                    if word_upper in subject_code or subject_code in word_upper:
                        return f"The faculty for {subject_code} is {faculty_dict[subject_code]}", "university-data"

    # --- 3) Syllabus ---
    if any(word in q for word in ["syllabus", "topics", "course content"]):
        tt = get_data("timetable", "SECTION-14")
        syllabus_dict = tt.get("syllabus", {})
        
        # Look for subject in query
        for subject_code in syllabus_dict.keys():
            if subject_code.lower() in q:
                syllabus = syllabus_dict[subject_code]
                resp = f"Syllabus for {subject_code}:\n" + "\n".join(f"- {t}" for t in syllabus)
                return resp, "university-data"
        
        # Try word-by-word matching
        words = q.split()
        for word in words:
            word_upper = word.upper()
            if word_upper in syllabus_dict:
                syllabus = syllabus_dict[word_upper]
                resp = f"Syllabus for {word_upper}:\n" + "\n".join(f"- {t}" for t in syllabus)
                return resp, "university-data"

    # --- 4) Fees ---
    if any(word in q for word in ["fee", "fees", "check fees"]):
        fee_match = re.search(r"(fee|fees).*for\s+(\w+)", q)
        if fee_match:
            course = fee_match.group(2).upper()
            fee = get_data("fees", course)
            if fee:
                return f"Fees for {course}: {fee}", "university-data"
        else:
            fees_data = get_data("fees")
            if fees_data:
                resp = "Here's the fee structure:\n\n"
                for course, amount in fees_data.items():
                    resp += f"{course}: {amount}\n"
                return resp, "university-data"

    # --- 5) Hostel ---
    if "hostel" in q:
        hostel = get_data("hostel")
        if hostel:
            resp = "Hostel Information:\n\n"
            for key, value in hostel.items():
                resp += f"{key.replace('_', ' ').title()}: {value}\n"
            return resp, "university-data"

    # --- 6) Library ---
    if "library" in q or "library hours" in q:
        library = get_data("library")
        if library:
            resp = "Library Information:\n\n"
            for key, value in library.items():
                resp += f"{key.replace('_', ' ').title()}: {value}\n"
            return resp, "university-data"

    return None, None

def generate_response(query: str):
    """Main function to generate response."""
    # 1) Keyword match (FAQS)
    r = keyword_match(query)
    if r:
        return r, "rule-based"

    # 2) University data match (natural language aware)
    r, source = university_data_match(query)
    if r:
        return r, source

    # 3) Fuzzy match (FAQS)
    r = fuzzy_match(query)
    if r:
        return r, "fuzzy-match"

    # 4) Default fallback
    fallback = ("I couldn't find a direct answer. "
                "Please try rephrasing, or ask for contact details (e.g., 'contact exams office').")
    return fallback, "fallback"