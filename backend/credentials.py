# credentials.py

import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

credentials = {
    "url": os.getenv("IBM_WATSONX_URL"),
    "apikey": os.getenv("IBM_WATSONX_APIKEY")
}

project_id = os.getenv("IBM_WATSONX_PROJECT_ID")

