from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_register_and_login_flow():
    username = "autotestuser"
    email = "autotestuser@example.com"
    password = "secret123"

    register_response = client.post(
        "/register",
        json={"username": username, "email": email, "password": password},
    )
    assert register_response.status_code == 200, register_response.text

    login_response = client.post(
        "/login",
        json={"email": email, "password": password},
    )
    assert login_response.status_code == 200, login_response.text
    data = login_response.json()
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == email
