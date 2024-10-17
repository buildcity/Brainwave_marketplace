from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import os
import requests
from dotenv import load_dotenv

app = FastAPI()
load_dotenv()

PINATA_API_KEY = os.getenv('PINATA_API_KEY')
PINATA_API_SECRET = os.getenv('PINATA_API_SECRET')

class Metadata(BaseModel):
    wallet_id: str

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...), metadata: Metadata = None):
    if metadata is None or not metadata.wallet_id:
        raise HTTPException(status_code=400, detail="NEAR wallet ID is required")
    
    # Check file type
    if file.content_type not in ["text/csv", "application/json"]:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    # Prepare IPFS upload
    url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
    headers = {
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_API_SECRET
    }

    # Read file contents
    contents = await file.read()
    files = {
        'file': (file.filename, contents),
        'pinataMetadata': (None, json.dumps({
            'name': file.filename,
            'keyvalues': {
                'file_type': file.content_type,
                'uploaded_by': metadata.wallet_id
            }
        })),
        'pinataOptions': (None, json.dumps({
            'cidVersion': 1
        }))
    }

    response = requests.post(url, files=files, headers=headers)
    
    if response.status_code == 200:
        return {"status": "success", "response": response.json()}
    else:
        raise HTTPException(status_code=response.status_code, detail=response.text)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)