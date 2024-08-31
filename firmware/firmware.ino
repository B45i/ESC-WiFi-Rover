#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <AsyncJson.h>
#include <ArduinoJson.h>
#include <DNSServer.h>
#include <ESP8266mDNS.h>
#include <FS.h>  // For SPIFFS

AsyncWebServer server(80);
DNSServer dnsServer;

class CaptiveRequestHandler : public AsyncWebHandler {
  public:
    CaptiveRequestHandler() {}
    virtual ~CaptiveRequestHandler() {}

    bool canHandle(AsyncWebServerRequest* request) override {
      return true; // Handle all requests
    }

    void handleRequest(AsyncWebServerRequest* request) override {
      request->send(SPIFFS, "/www/index.html"); // Serve index.html for all requests
    }
};

void setupNetwork() {
  WiFi.softAP("ESP8266-AP");
  Serial.println("Access Point Started");
  Serial.println(WiFi.softAPIP());
  dnsServer.start(53, "*", WiFi.softAPIP()); // Captive portal DNS
}

void setupServer() {
  // Serve static files from SPIFFS
  server.serveStatic("/", SPIFFS, "/www/").setDefaultFile("index.html").setCacheControl("max-age=60000");

  // Handle joystick endpoints with status code only
  server.on("/left", HTTP_POST, [](AsyncWebServerRequest *request) {
    Serial.println("Received /left request");
    request->send(200); // Send status 200 OK
  });

  server.on("/right", HTTP_POST, [](AsyncWebServerRequest *request) {
    Serial.println("Received /right request");
    request->send(200); // Send status 200 OK
  });

  server.on("/up", HTTP_POST, [](AsyncWebServerRequest *request) {
    Serial.println("Received /up request");
    request->send(200); // Send status 200 OK
  });

  server.on("/down", HTTP_POST, [](AsyncWebServerRequest *request) {
    Serial.println("Received /down request");
    request->send(200); // Send status 200 OK
  });

  server.on("/x", HTTP_POST, [](AsyncWebServerRequest *request) {
    Serial.println("Received /x request");
    request->send(200); // Send status 200 OK
  });

  server.on("/y", HTTP_POST, [](AsyncWebServerRequest *request) {
    Serial.println("Received /y request");
    request->send(200); // Send status 200 OK
  });

  // Handle all other requests with the captive portal
  server.addHandler(new CaptiveRequestHandler()).setFilter(ON_AP_FILTER); // Only on access point

  server.begin();
}

void setup() {
  Serial.begin(115200); // Higher baud rate for better performance
  SPIFFS.begin(); // Initialize SPIFFS
  setupNetwork();
  setupServer();
}

void loop() {
  dnsServer.processNextRequest(); // Handle DNS requests for captive portal
}
