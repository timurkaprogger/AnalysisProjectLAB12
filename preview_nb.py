import json

with open(r'c:\Users\AcerGO15\Downloads\proekt\analysis.ipynb', 'r', encoding='utf-8') as f:
    notebook = json.load(f)

with open(r'c:\Users\AcerGO15\Downloads\proekt\notebook_preview.txt', 'w', encoding='utf-8') as out:
    for i, cell in enumerate(notebook.get('cells', [])):
        if cell.get('cell_type') in ['markdown', 'code']:
            out.write(f"--- Cell {i} ({cell.get('cell_type')}) ---\n")
            out.write(''.join(cell.get('source', [])))
            out.write("\n\n")
