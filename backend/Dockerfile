FROM continuumio/miniconda3 AS development

WORKDIR /app

COPY requirements.txt /app

RUN pip install -r requirements.txt 

COPY . .

RUN python manage.py migrate

EXPOSE 8000

ENTRYPOINT ["python"] 

CMD ["manage.py", "runserver", "0.0.0.0:8000"]