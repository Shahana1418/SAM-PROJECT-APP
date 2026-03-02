import re
import json
import subprocess

pdf_path = "/home/shahana-v/Downloads/drive-download-20260224T095615Z-1-001/SAM-PROJECT/Syllabus/R2021/B.E.Automobile.pdf"

try:
    result = subprocess.run(["pdftotext", pdf_path, "-"], capture_output=True, text=True)
    text = result.stdout
except Exception as e:
    print(f"Error: {e}")
    exit(1)

subs = [
    ("MA3251", "Statistics and Numerical Methods"),
    ("PH3251", "Materials Science"),
    ("BE3251", "Basic Electrical and Electronics Engineering"),
    ("GE3251", "Engineering Graphics"),
    ("GE3271", "Engineering Practices Laboratory"),
    ("BE3271", "Basic Electrical and Electronics Engineering Laboratory"),
    ("AU3401", "Fuels and Lubricants"),
    ("AU3402", "Automotive Chassis"),
    ("AU3403", "Vehicle Body Engineering"),
    ("AU3404", "Automotive Transmission"),
    ("ML3391", "Mechanics of Solids"),
    ("AU3601", "Automotive Pollution and Control")
]

db = {}

for code, name in subs:
    idx = text.find(code)
    if idx == -1:
        print(f"Could not find {code}")
        continue
    
    # We want to find the actual syllabus section. The index table has the code too.
    # The actual syllabus starts with the code, name, and usually "COURSE OBJECTIVES" nearby.
    chunks = [m.start() for m in re.finditer(code, text)]
    best_idx = chunks[-1] # Usually the last mention is the actual syllabus
    for i in chunks:
        if "COURSE OBJECTIVES" in text[i:i+500] or "OBJECTIVES" in text[i:i+500]:
            best_idx = i
            break
            
    chunk = text[best_idx:best_idx+6000]
    
    units = {}
    for i, roman in enumerate(["I", "II", "III", "IV", "V"]):
        m = re.search(r'UNIT\s+' + roman + r'\s+(.*?)\n', chunk)
        if m:
            title = m.group(1).strip()
            title = ''.join([c for c in title if not c.isdigit()]).strip() # remove hours
            units[str(i+1)] = title.title()
        else:
            units[str(i+1)] = f"Unit {i+1} Syllabus"
            
    co_idx = chunk.find("COURSE OUTCOMES")
    cos = {}
    if co_idx != -1:
        co_chunk = chunk[co_idx:co_idx+2000]
        co_matches = re.findall(r'(CO[1-5])\s*(.*?)(?=CO[1-5]|PO1|\n\n|TOTAL)', co_chunk, re.IGNORECASE | re.DOTALL)
        for g in co_matches:
            c_key = g[0].upper().replace(" ", "")
            c_val = g[1].strip().replace('\n', ' ')
            if len(c_val) > 10:
                cos[c_key] = c_val
                
    for i in range(5):
        key = f"CO{i+1}"
        if key not in cos:
            cos[key] = f"Understand internal concepts of Unit {i+1} for {name}."
            
    db[code] = {
        "name": name,
        "units": units,
        "cos": cos
    }

out = "/home/shahana-v/Downloads/drive-download-20260224T095615Z-1-001/SAM-PROJECT/data/ate_subjects.js"
with open(out, 'w') as f:
    f.write("const ATE_SUBJECTS = " + json.dumps(db, indent=4) + ";\n")
print(f"Written to {out}")
