FROM golang:1.23.4 AS build

WORKDIR /app

COPY go.* ./

RUN go mod download

COPY . . 

RUN go build -o /app/JPN202-Library 

EXPOSE 8080

CMD ["./JPN202-Library"]
