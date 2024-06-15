import unittest
import io
from flask import Flask
from routes.upload import uploader

class TestUploadRoutes(unittest.TestCase):
    @classmethod
    def createApp(cls):
        cls.app = Flask(__name__)
        cls.app.register_blueprint(uploader)
        cls.client = cls.app.test_client()
        cls.app.config["TESTING"] = True
    
    def test_text_upload_success(self):
        response = self.client.post("/text", json={"text": "This is a sample text"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"text": "This is a sample text"})
    
    def test_text_upload_notext(self):
        response = self.client.post("/text", json={})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"error": "Please input a text"})
    
    def test_file_upload_success(self):
        data = {
            "file": (io.BytesIO(b"This is some file content used as a sample for test case"), "sample.txt")
        }
        response = self.client.post("/file", content_type="multipart/form-data", data=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("text", response.json)
    
    def test_file_upload_nofile(self):
        response = self.client.post("/file")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"error": "No file in request"})
    
    def test_file_upload_noneselected(self):
        data = {
            "file": (io.BytesIO(b""), "")
        }
        response = self.client.post("/file", content_type="multipart/form-data", data=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"error": "No file selected"})
    
if __name__ == "main":
    unittest.main()

