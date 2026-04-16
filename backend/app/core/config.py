from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "Temirxan"
    DB_HOST: str = "localhost"
    DB_PORT: str = "5433"
    DB_NAME: str = "expense_analytics"

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+psycopg2://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    @property
    def ASYNC_DATABASE_URL(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

settings = Settings()
