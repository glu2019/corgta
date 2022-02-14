FROM python:3.10.1
RUN apt-get update
EXPOSE 8000
RUN mkdir /usr/local/corgta
RUN mkdir /usr/local/corgta/backend/
WORKDIR /usr/local/corgta/backend/

COPY ./requirements.txt /usr/local/corgta/backend
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

COPY . /usr/local/corgta/backend/
ENTRYPOINT ["sh", "/usr/local/corgta/backend/entrypoint.sh"]