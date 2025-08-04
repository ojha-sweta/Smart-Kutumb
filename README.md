# Smart Home Automation System

A comprehensive full-stack web application for managing IoT devices in a smart home environment. Built with modern technologies and designed for scalability and ease of use.

## 🏠 Features

### Core Functionality
- **User Authentication**: Role-based access control (Admin/User)
- **Device Management**: Control lights, fans, AC units, sensors, and security devices
- **Real-time Updates**: Live status monitoring with simulated WebSocket connections
- **Dashboard**: Intuitive interface for device control and monitoring
- **Admin Panel**: Device management, user administration, and system metrics
- **Notifications**: Real-time alerts and system notifications
- **Energy Monitoring**: Power consumption tracking and analytics

### Device Types Supported
- **Smart Lights**: Brightness and color control
- **Smart Fans**: Variable speed control
- **Air Conditioners**: Temperature and mode settings
- **Sensors**: Temperature, humidity, and threshold monitoring
- **Security Systems**: Status monitoring and alerts
- **Thermostats**: Climate control management

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI library with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **Recharts**: Data visualization
- **Date-fns**: Date manipulation

### Backend (Ready for Integration)
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Socket.io**: Real-time communication
- **JWT**: Authentication tokens

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx          # User authentication
│   ├── dashboard/
│   │   ├── Dashboard.tsx          # Main dashboard view
│   │   ├── DeviceCard.tsx         # Individual device controls
│   │   ├── RoomCard.tsx           # Room-based device grouping
│   │   └── StatsCard.tsx          # System statistics
│   ├── admin/
│   │   ├── AdminPanel.tsx         # Admin dashboard
│   │   ├── DeviceManagement.tsx   # Device CRUD operations
│   │   ├── AddDeviceForm.tsx      # New device creation
│   │   └── SystemMetrics.tsx      # Analytics and charts
│   ├── notifications/
│   │   └── NotificationCenter.tsx # Alert management
│   └── layout/
│       └── Header.tsx             # Navigation header
├── contexts/
│   ├── AuthContext.tsx            # Authentication state
│   └── DeviceContext.tsx          # Device management state
├── types/
│   └── index.ts                   # TypeScript definitions
└── App.tsx                        # Main application
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-home-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Open http://localhost:5173 in your browser
   - Use demo credentials:
     - Admin: `admin` / `admin123`
     - User: `user` / `user123`

## 📱 Usage Guide

### For Users
1. **Login** with your credentials
2. **Dashboard**: View and control all your devices
3. **Device Control**: Toggle devices, adjust settings
4. **Notifications**: Stay updated with system alerts

### For Administrators
1. **Device Management**: Add, edit, or remove devices
2. **User Management**: Control user access and permissions
3. **System Metrics**: Monitor power usage and performance
4. **Analytics**: View charts and system statistics

## 🔧 Configuration

### Environment Variables
```env
# Backend Configuration (when integrated)
MONGODB_URI=mongodb://localhost:27017/smarthome
JWT_SECRET=your-jwt-secret
MQTT_BROKER_URL=mqtt://localhost:1883
```

### Device Configuration
Devices can be configured with various properties:
- **Lights**: Brightness (0-100%), Color
- **Fans**: Speed (1-5 levels)
- **AC Units**: Temperature (16-30°C), Mode
- **Sensors**: Value, Unit, Threshold

## 🏗️ Backend Integration Guide

### API Endpoints (Example Structure)
```javascript
// Device Management
GET    /api/devices          # Get all devices
POST   /api/devices          # Create new device
PUT    /api/devices/:id      # Update device
DELETE /api/devices/:id      # Delete device
POST   /api/devices/:id/toggle # Toggle device state

// Authentication
POST   /api/auth/login       # User login
POST   /api/auth/register    # User registration
POST   /api/auth/logout      # User logout
GET    /api/auth/profile     # Get user profile

// Real-time Updates
WebSocket: /socket.io        # Real-time device updates
```

### Database Schema (MongoDB)
```javascript
// User Schema
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  role: String (admin/user),
  createdAt: Date
}

// Device Schema
{
  _id: ObjectId,
  name: String,
  type: String,
  room: String,
  status: String,
  properties: Object,
  isOnline: Boolean,
  createdAt: Date,
  lastUpdated: Date
}
```

## 🌐 IoT Integration Options

### 1. Node-RED Integration
```bash
# Install Node-RED
npm install -g node-red

# Run Node-RED
node-red

# Access dashboard at http://localhost:1880
```

**Flow Example**:
- MQTT Input → Function Node → HTTP Request → Device Update

### 2. Python Simulation
```python
# mqtt_simulator.py
import paho.mqtt.client as mqtt
import json
import time
import random

def simulate_sensor_data():
    client = mqtt.Client()
    client.connect("localhost", 1883, 60)
    
    while True:
        data = {
            "deviceId": "sensor-001",
            "temperature": round(random.uniform(20, 30), 1),
            "humidity": round(random.uniform(40, 80), 1),
            "timestamp": time.time()
        }
        
        client.publish("sensors/temperature", json.dumps(data))
        time.sleep(30)
```

### 3. Arduino/ESP32 Integration
```cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "your-wifi";
const char* password = "your-password";
const char* mqtt_server = "your-server";

void setup() {
  // WiFi and MQTT setup
  WiFi.begin(ssid, password);
  client.setServer(mqtt_server, 1883);
}

void loop() {
  // Read sensors and publish data
  float temperature = readTemperature();
  publishSensorData("temperature", temperature);
  delay(30000);
}
```

## 📊 System Metrics

The system tracks various metrics:
- **Device Status**: Online/offline, active/inactive
- **Power Consumption**: Real-time and historical data
- **User Activity**: Login patterns, device usage
- **System Performance**: Response times, error rates

## 🔮 Future Enhancements

### Planned Features
1. **Voice Control**
   - Alexa/Google Assistant integration
   - Custom voice commands
   - Speech recognition

2. **Machine Learning**
   - Energy optimization algorithms
   - Usage pattern recognition
   - Predictive maintenance

3. **Mobile Application**
   - React Native mobile app
   - Push notifications
   - Offline functionality

4. **Advanced Analytics**
   - Energy cost optimization
   - Usage insights and recommendations
   - Environmental impact tracking

5. **Integration Expansions**
   - Third-party service APIs
   - Weather service integration
   - Calendar-based automation

6. **Security Enhancements**
   - Two-factor authentication
   - Device encryption
   - Security audit logs

### Implementation Roadmap

**Phase 1: Core Backend**
- [ ] Express.js API server
- [ ] MongoDB integration
- [ ] WebSocket real-time updates
- [ ] JWT authentication

**Phase 2: IoT Integration**
- [ ] MQTT broker setup
- [ ] Device communication protocols
- [ ] Sensor data processing
- [ ] Hardware device support

**Phase 3: Advanced Features**
- [ ] ML-based energy optimization
- [ ] Voice control integration
- [ ] Mobile app development
- [ ] Advanced analytics dashboard

**Phase 4: Production**
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Production deployment
- [ ] Monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Resources

- [React Documentation](https://reactjs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [MQTT Protocol](https://mqtt.org/)
- [Node-RED](https://nodered.org/)
- [Socket.io](https://socket.io/)

## 💬 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review existing discussions

---

**Built with ❤️ for the Smart Home Community**