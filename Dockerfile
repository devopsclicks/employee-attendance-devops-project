FROM amazoncorretto:17-alpine

WORKDIR /app

COPY target/employee-api-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
