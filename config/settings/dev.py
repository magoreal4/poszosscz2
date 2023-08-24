from .base import *

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

INSTALLED_APPS += [
    'theme',
    'django_browser_reload',
]

MIDDLEWARE += [
  "django_browser_reload.middleware.BrowserReloadMiddleware",
]

TAILWIND_APP_NAME = 'theme'

INTERNAL_IPS = [
    "127.0.0.1",
]

NPM_BIN_PATH = "D:/Program Files/nodejs/npm.cmd"