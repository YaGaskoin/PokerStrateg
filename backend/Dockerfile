FROM python:3.10-alpine
EXPOSE 8000/tcp
RUN mkdir /app
WORKDIR /app/
# Установка пакетов python и зависимостей необходимых для их сборки
RUN apk add --no-cache --virtual build-deps \
    curl \
    make gcc g++ `# для сборки пакетов` \
    postgresql-dev `# для psycopg2` \
    libjpeg-turbo-dev zlib-dev libffi-dev cairo-dev libwebp-dev `# для pillow`
# Зависимости необходимые для работы
RUN apk add --no-cache \
    git `# для установки зависимостей из git` \
    libpq `# для psycopg2` \
    libjpeg-turbo zlib libffi cairo libwebp `# для pillow`
RUN apk add --no-cache bash
COPY / /app/
RUN pip install poetry
RUN poetry config virtualenvs.create false
#RUN poetry config installer.max-workers 10
RUN poetry install --no-interaction --no-ansi
RUN apk del --no-cache build-deps



