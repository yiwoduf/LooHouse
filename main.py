from flask import Flask
from api import create_app

app = create_app()

def lambda_handler(event, context):
    return app(event, context)

if __name__ == '__main__':
    app.run(port=5328)
