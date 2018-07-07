FROM openjdk:8-jre-alpine

ENV SPRING_OUTPUT_ANSI_ENABLED=ALWAYS \


CMD echo "The application will start in 0s..." && \
    java -Djava.security.egd=file:/dev/./urandom -jar /app.war > /tmp/gateway.log 2>&1

EXPOSE 8080 5701/udp

ADD *.war /app.war
