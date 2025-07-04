from flask_cors import CORS
from server import create_app 
 
app = create_app()

CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

if __name__ == '__main__':
    app.run(debug=True)
