import json

def parse_json(content: str) -> dict:
    content = content.strip()

    if content.startswith("```"):
        content = (
            content
            .replace("```json","")
            .replace("```","")
            .strip()
        )

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise ValueError(
            f"Invalid JSON:\n\n{content}"
        )