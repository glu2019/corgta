from pydantic import BaseSettings

class Settings(BaseSettings):
    
    API_VERSION: str = "/api"
    PROJECT_NAME: str = "Corgta"
    SERVER_NAME: str = "localhost"
    SERVER_HOST: str = "0.0.0.0"
    JWT_AUTH = {
        "JWT_SECRET_KEY":'&&-7rpo7(9_6^@07c=g#u^god5k*&rs@n=p_8re32v(nsp0v=e',
        "JWT_ACCESS_TOKEN_EXPIRE_MINUTES":  60 * 24 * 8,
        "ALGORITHM": "HS256"
    }
    # BACKEND_CORS_ORIGINS is a JSON-formatted list of origins
    # e.g: '["http://localhost", "http://localhost:4200", "http://localhost:3000", \
    # "http://localhost:8080", "http://local.dockertoolbox.tiangolo.com"]'
    BACKEND_CORS_ORIGINS: list[str] = ["*"]

settings = Settings()