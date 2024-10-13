import requests

# Define the base URL of your FastAPI application
BASE_URL = "http://127.0.0.1:8000"

def test_root():
    """Test the root endpoint ("/")"""
    response = requests.get(f"{BASE_URL}/")
    print(f"GET /: {response.status_code}")
    print(response.json())

def test_read_item(item_id, query=None):
    """Test the /items/{item_id} endpoint"""
    params = {"q": query} if query else {}
    response = requests.get(f"{BASE_URL}/items/{item_id}", params=params)
    print(f"GET /items/{item_id}: {response.status_code}")
    print(response.json())

if __name__ == "__main__":
    print("Testing FastAPI Backend...")

    # Test the root endpoint
    test_root()

    # Test the /items/{item_id} endpoint with and without a query parameter
    test_read_item(1)
    test_read_item(2, query="test-query")