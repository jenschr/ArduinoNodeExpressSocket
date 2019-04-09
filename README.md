# ArduinoNodeExpressSocket

import and run:

    npm install

start the server:

    npm start
    
upload test code to your Arduino:

    void setup() {
      Serial.begin(9600);
    }
    
    void loop() {
      Serial.println("text from");
      delay(2000);
      Serial.println("your Arduino");
      delay(2000);
    }

browse to http://localhost:3001 to see live data from the Arduino
