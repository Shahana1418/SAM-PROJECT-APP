import re
import json

def parse_sac_text(text):
    # Regex to match the rows based on the observed pattern
    # ID Name Dept Batch RollNo Phone WhatsApp Email Status Gender ...
    # Pattern: \s*(\d+)\s+([\w\s.]+)\s+([A-Z]+)\s+(\d{4})\s+([\w\d]+)\s+(\d{10})\s+(https://wa\.me/\d+)\s+([\w\d.@;]+)
    
    sacs = []
    lines = text.split('\n')
    
    # Header skip or detection could be added here
    for line in lines:
        # Match standard rows
        match = re.search(r'^\s*(\d+)\s+(.*?)\s{2,}([A-Z]{2,}|CDS|DS)\s+(\d{4})\s+([\w\d]+)\s+(\d{10})\s+(https://wa\.me/\d+)\s+([\w\d.@;]+)', line)
        if match:
            sac = {
                "id": match.group(1),
                "name": match.group(2).strip(),
                "dept": match.group(3),
                "batch": match.group(4),
                "rollNo": match.group(5),
                "phone": match.group(6),
                "whatsapp": match.group(7),
                "email": match.group(8).strip(';'),
            }
            sacs.append(sac)
            
    return sacs

if __name__ == "__main__":
    import sys
    # Load all text from stdin
    input_text = sys.stdin.read()
    parsed_sacs = parse_sac_text(input_text)
    print(json.dumps(parsed_sacs, indent=2))
