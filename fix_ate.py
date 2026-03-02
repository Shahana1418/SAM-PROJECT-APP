import json

file_path = "/home/shahana-v/Downloads/drive-download-20260224T095615Z-1-001/SAM-PROJECT/data/ate_subjects.js"
with open(file_path, 'r') as f:
    content = f.read()

# strip "const ATE_SUBJECTS = " and ";"
json_str = content.replace("const ATE_SUBJECTS = ", "").strip()
if json_str.endswith(";"): json_str = json_str[:-1]

data = json.loads(json_str)

data["AU3601"]["cos"] = {
    "CO1": "Differentiate the various emissions formed in IC engines",
    "CO2": "Analyze the effects of pollution on human health and environment",
    "CO3": "Design the control techniques for minimizing emissions",
    "CO4": "Categorize the emission norms",
    "CO5": "Identify suitable methods to reduce the noise emissions"
}

data["AU3401"]["cos"] = {
    "CO1": "Understand the role, properties and testing of various fuels",
    "CO2": "Explain the refining process of petroleum",
    "CO3": "Analyze the effects of engine friction and lubrication theory",
    "CO4": "Compare different types of lubricants and additives",
    "CO5": "Select appropriate fuels and lubricants for automotive applications"
}

with open(file_path, 'w') as f:
    f.write("const ATE_SUBJECTS = " + json.dumps(data, indent=4) + ";\n")

print("Fixed ATE_SUBJECTS")
