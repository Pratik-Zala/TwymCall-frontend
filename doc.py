import json
import uuid
import random
from datetime import datetime, timedelta
import requests

def get_dynamic_content():
    """Fetches large random content from a public API."""
    try:
        # Using a public API that generates random paragraphs of lorem ipsum text
        num_paragraphs = random.randint(10, 25)  # Generate a larger number of paragraphs
        response = requests.get(f'https://loripsum.net/api/{num_paragraphs}/long/plaintext')
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Failed to fetch dynamic content: {e}")
        # Fallback content in case the API fails
        return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " * 50

def generate_random_datetime(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return (start_date + timedelta(days=random_days)).isoformat() + "Z"

def generate_drive_item(index):
    created_time = generate_random_datetime(datetime(2025, 6, 1), datetime(2025, 6, 20))
    modified_time = generate_random_datetime(datetime(2025, 6, 21), datetime(2025, 6, 27))
    dynamic_content = get_dynamic_content()

    return {
        "metadata": {
            "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)/$entity",
            "@microsoft.graph.downloadUrl": "",
            "createdBy": {
                "application": {
                    "id": str(uuid.uuid4()),
                    "displayName": f"i:0i.t|ms.sp.ext|{uuid.uuid4()}@example-tenant"
                },
                "user": {
                    "email": "pratik.zala@thetwym.com",
                    "id": str(uuid.uuid4()),
                    "displayName": "pratik zala"
                }
            },
            "createdDateTime": created_time,
            "eTag": "\"{},28\"".format(uuid.uuid4()),
            "id": str(uuid.uuid4()).replace("-", "").upper()[:32],
            "lastModifiedBy": {
                "user": {
                    "email": "pratik.zala@thetwym.com",
                    "id": str(uuid.uuid4()),
                    "displayName": "pratik zala"
                }
            },
            "lastModifiedDateTime": modified_time,
            "name": f"Service Agreement {index+1}.docx",
            "parentReference": {
                "driveType": "business",
                "driveId": f"b!{uuid.uuid4().hex}",
                "id": str(uuid.uuid4()),
                "name": "Documents",
                "path": "/drive/root:",
                "siteId": str(uuid.uuid4())
            },
            "webUrl": "",
            "cTag": "\"c:{},22\"".format(uuid.uuid4()),
            "file": {
                "hashes": {
                    "quickXorHash": "QrusZmEHoziLzgJfHS8eAKXvT+4="
                },
                "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            },
            "fileSystemInfo": {
                "createdDateTime": created_time,
                "lastModifiedDateTime": modified_time
            },
            "shared": {
                "scope": "users"
            },
            "size": random.randint(15000, 18000)
        },
        "content": {
            "text": f"PROFESSIONAL SERVICES AGREEMENT - Document {index + 1}\n\n{dynamic_content}"
        }
    }

def generate_multiple_items(count=5, output_file="service_agreements.json"):
    data = [generate_drive_item(i) for i in range(count)]
    with open(output_file, "w") as f:
        json.dump(data, f, indent=2)
    print(f"Generated {count} documents and saved to {output_file}")

if __name__ == "__main__":
    generate_multiple_items(count=10)
