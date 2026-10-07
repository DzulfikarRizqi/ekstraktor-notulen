from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    database_url: str = "sqlite:///./dev.db"
    gemini_api_key: str = ""
    gemini_model: str = "gemini-2.5-flash"
    lm_studio_base_url: str = "http://localhost:1234/v1"
    lm_studio_model: str = "qwen2.5-3b-instruct"
    conf_threshold: float = 0.6
    embed_verify_threshold: float = 0.5
    use_embedding_fallback: bool = True
    embedding_model: str = "intfloat/multilingual-e5-small"

    def validate_required(self) -> None:
        if not self.gemini_api_key:
            raise RuntimeError(
                "Konfigurasi environment tidak valid: GEMINI_API_KEY wajib diisi."
            )


@lru_cache
def get_settings() -> Settings:
    settings = Settings()
    settings.validate_required()
    return settings


settings = get_settings()