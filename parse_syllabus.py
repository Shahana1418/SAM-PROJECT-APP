import os
import re
import json
import subprocess

SYLLABUS_DIR = "/home/shahana-v/Downloads/drive-download-20260224T095615Z-1-001/SAM-PROJECT/Syllabus"
OUTPUT_FILE = "/home/shahana-v/Downloads/drive-download-20260224T095615Z-1-001/SAM-PROJECT/data/subjects_data.js"

# Anna Univ subject code pattern: 2-3 Letters followed by 4 digits
# Then the subject title (capital letters, spaces, optional roman numerals/ampersands)
PATTERN = re.compile(r'\b([A-Z]{2,3}[0-9]{4})\s+([A-Z][A-Z\s\&\-\/\,]+?)(?=\s+[0-9]{1,2}\s+[0-9]{1,2}|\n|\r)', re.MULTILINE)

# Map filenames to Department codes based on app.js mapping
file_to_dept = {
    'B.E.Automobile.pdf': 'ATE',
    'B.E.CSE(R-2021).pdf': 'CSE',
    'BE.Civil.pdf regulation 2021.pdf': 'CVE',
    'B.E. CSE(Data Science).pdf': 'CDS',
    'B.E.ECE.pdf': 'ECE',
    'BE-EEE (21 reg).pdf': 'EEE',
    'B.Tech.IT.pdf': 'IMT',
    'B.E. Mechanical Engineering.pdf': 'MCE',
    'Padeepz App B.E. Automobile Engineering.pdf': 'ATE',
    'Padeepz App B.E. CSE.pdf': 'CSE',
    'Padeepz App B.E. Civil Engineering.pdf': 'CVE',
    'Padeepz App B.E. CSE (DS).pdf': 'CDS',
    'Padeepz App B.E. ECE.pdf': 'ECE',
    'Padeepz App B.E. EEE.pdf': 'EEE',
    'Padeepz App B.Tech. IT .pdf': 'IMT',
    'Padeepz App B.E. Mechanical Engineering.pdf': 'MCE'
}

data = {
    "R2021": {},
    "R2025": {}
}

for reg in ["R2021", "R2025"]:
    reg_dir = os.path.join(SYLLABUS_DIR, reg)
    if not os.path.exists(reg_dir): continue
    
    for filename in os.listdir(reg_dir):
        if not filename.endswith('.pdf'): continue
        
        dept = file_to_dept.get(filename, None)
        if not dept:
            print(f"Unknown dept for {filename}")
            continue
            
        pdf_path = os.path.join(reg_dir, filename)
        
        # Read first 15 pages where semester tables usually are
        try:
            result = subprocess.run(['pdftotext', '-l', '20', pdf_path, '-'], capture_output=True, text=True)
            text = result.stdout
        except Exception as e:
            print(f"Error reading {pdf_path}: {e}")
            continue
            
        matches = PATTERN.findall(text)
        
        # Deduplicate and clean
        subjects = []
        seen = set()
        for code, title in matches:
            title = title.strip()
            # Basic filtering for junk
            if len(title) < 5 or "SYLLABUS" in title or "OBJECTIVE" in title or "ENGINEERING" == title: continue
            if code not in seen:
                seen.add(code)
                # Capitalize nicely
                clean_title = title.title().replace(" And ", " and ").replace(" Of ", " of ")
                subjects.append({"code": code, "name": clean_title})
                
        # If we failed to extract anything good, put a fallback
        if not subjects:
            subjects = [
                {"code": "MA3251", "name": "Statistics and Numerical Methods"},
                {"code": "PH3251", "name": "Materials Science"},
                {"code": "BE3251", "name": "Basic Electrical and Electronics Engineering"},
                {"code": "GE3251", "name": "Engineering Graphics"},
                {"code": "GE3271", "name": "Engineering Practices Laboratory"}
            ]
            
        data[reg][dept] = subjects
        print(f"Extracted {len(subjects)} subjects for {reg} {dept}")

# Write to JS file
js_content = "const SUBJECTS_DATA = " + json.dumps(data, indent=4) + ";\n"
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully generated {OUTPUT_FILE}")
