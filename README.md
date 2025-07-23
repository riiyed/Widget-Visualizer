# Widget-Visualizer

A comprehensive full-stack financial dashboard and data visualization web application built with **Spring Boot**, **Angular**, and **PostgreSQL**. Features secure JWT-based authentication, role-based access control, dynamic database connections, and interactive chart generation with real-time data visualization capabilities.

![Dashboard Preview](https://via.placeholder.com/800x400/3498db/ffffff?text=Widget+Visualizer+Dashboard)

## 🌟 Key Features

- **🔐 Secure Authentication**: JWT-based login/logout with BCrypt password encryption
- **👥 Role-Based Access Control**: User and Admin roles with method-level security
- **🗄️ Dynamic Database Connectivity**: Connect to external databases on-the-fly
- **📊 Interactive Data Visualization**: Create Bar, Line, and Area charts using AG Charts
- **💾 Graph Persistence**: Save and load user-specific chart configurations
- **📱 Responsive Design**: Modern dashboard with sidebar navigation
- **⚡ Real-time Updates**: Live chart updates based on query results
- **🔍 Dynamic Query Execution**: Run custom SQL queries on connected databases

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐    JDBC    ┌─────────────────┐
│                 │ ◄─────────────────► │                 │ ◄────────► │                 │
│  Angular 16     │                     │  Spring Boot    │            │  PostgreSQL     │
│  Frontend       │                     │  Backend        │            │  Database       │
│                 │                     │                 │            │                 │
└─────────────────┘                     └─────────────────┘            └─────────────────┘
```

## 🛠️ Technology Stack

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Spring Boot** | 3.5.0 | Main application framework |
| **Spring Security** | Latest | Authentication & Authorization |
| **Spring Data JPA** | Latest | Database operations |
| **PostgreSQL** | 12+ | Primary database |
| **JWT (JJWT)** | 0.11.5 | Token-based authentication |
| **BCrypt** | Latest | Password encryption |
| **Lombok** | 1.18.34 | Boilerplate code reduction |

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | 16.2.0 | Frontend framework |
| **AG Charts** | 10.3.5 | Data visualization |
| **Bootstrap** | 5.3.7 | UI components |
| **RxJS** | 7.8.0 | Reactive programming |
| **TypeScript** | 5.1.3 | Type-safe JavaScript |

## 📋 Prerequisites

Ensure you have the following installed on your system:

- ☕ **Java 17** or higher
- 🟢 **Node.js 16** or higher
- 📦 **npm** or **yarn**
- 🐘 **PostgreSQL 12** or higher
- 🔨 **Maven 3.6** or higher
- 🌿 **Git**

## 🚀 Quick Start Guide

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Widget-Visualizer.git
cd Widget-Visualizer
```

### 2. Database Setup

#### Create PostgreSQL Database

```sql
-- Connect to PostgreSQL as superuser
CREATE DATABASE postgres;
CREATE USER postgres WITH PASSWORD 'System@123';
GRANT ALL PRIVILEGES ON DATABASE postgres TO postgres;
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend/ReportingApp
```

#### Configure Database Connection

Update `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=postgres
spring.datasource.password=System@123

# JWT Configuration
app.jwt-secret=bXlTdXBlclNlY3JldEtleU15U3VwZXJTZWNyZXRLZXlNeVN1cGVyU2VjcmV0S2V5MTIzNDU2Nzg5MDEyMzQ1Njc4OTA=
app.jwt-expiration-milliseconds=86400000

# Server Configuration
server.port=8080
```

#### Install Dependencies & Run

```bash
# Install dependencies
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend/Dynamicreport
```

#### Install Dependencies

```bash
npm install
```

#### Start Development Server

```bash
ng serve
```

The frontend will start on `http://localhost:4200`

## 📱 Application Features

### 🔐 Authentication System

- **User Registration**: Create new accounts with role assignment
- **Secure Login**: JWT token-based authentication
- **Password Security**: BCrypt encryption for all passwords
- **Session Management**: Automatic token refresh and logout

### 📊 Dashboard Features

- **Interactive Metrics**: Real-time loan analytics and statistics
- **Chart Visualization**: Multiple chart types (Bar, Line, Area)
- **Responsive Design**: Works seamlessly on all device sizes
- **User Profile**: Personalized user experience

### 🗄️ Database Management

- **Dynamic Connections**: Connect to any PostgreSQL database
- **Query Execution**: Run custom SQL queries
- **Result Visualization**: Automatic chart generation from query results
- **Data Persistence**: Save and load chart configurations

## 🔗 API Endpoints

### Authentication Endpoints
```http
POST /api/register    # User registration
POST /api/login       # User login
```

### User Management
```http
GET    /api/users/{id}        # Get user by ID
POST   /api/users             # Create user
PUT    /api/users/{id}/role   # Assign roles
```

### Database Operations
```http
POST /api/dynamic-query/connect        # Connect to external database
POST /api/dynamic-query/execute-query  # Execute SQL query
```

### Graph Management
```http
POST /api/jsondata/save    # Save graph configuration
GET  /api/jsondata/all     # Get user's saved graphs
GET  /api/jsondata/{id}    # Get specific graph
```

### Database Info
```http
GET    /api/dbdata       # Get all database connections
POST   /api/dbdata       # Save database connection
PUT    /api/dbdata/{id}  # Update database connection
DELETE /api/dbdata/{id}  # Delete database connection
```

## 🧪 Testing with Postman

### Authentication Flow

1. **Register User**
```json
POST http://localhost:8080/api/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "roles": ["ROLE_USER"]
}
```

2. **Login User**
```json
POST http://localhost:8080/api/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

3. **Use Protected Endpoints**
```http
GET http://localhost:8080/api/users/1
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

## 🔒 Security Features

### JWT Authentication
- Stateless authentication using JSON Web Tokens
- 24-hour token expiration (configurable)
- Secure token storage in localStorage

### Password Security
- BCrypt password hashing with salt
- Minimum password requirements enforced
- Secure password reset functionality

### Role-Based Access Control
- USER and ADMIN roles
- Method-level security annotations
- Protected API endpoints

### CORS Configuration
- Configured for Angular frontend
- Credentials allowed for authenticated requests
- Secure cross-origin resource sharing

## 📊 Chart Types & Visualization

### Supported Chart Types
- **📊 Bar Charts**: Perfect for comparing categories
- **📈 Line Charts**: Ideal for showing trends over time
- **📉 Area Charts**: Great for displaying cumulative data

### Chart Features
- Interactive tooltips and legends
- Responsive design for all screen sizes
- Export functionality (PNG, SVG, PDF)
- Real-time data updates
- Customizable colors and themes

## 🐛 Troubleshooting

### Common Issues & Solutions

#### CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Verify CORS configuration in `SecurityConfig.java`

#### JWT Token Issues
```
401 Unauthorized - Invalid JWT token
```
**Solution**: Check token format and expiration in browser localStorage

#### Database Connection Issues
```
Connection refused to localhost:5432
```
**Solution**: Ensure PostgreSQL is running and credentials are correct

#### Angular Build Issues
```
Module not found: Error: Can't resolve 'ag-charts-angular'
```
**Solution**: Run `npm install` to install all dependencies

## 🚀 Deployment

### Backend Deployment
```bash
# Build JAR file
./mvnw clean package

# Run JAR file
java -jar target/ReportingApp-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
```bash
# Build for production
ng build --prod

# Deploy dist/ folder to web server
```

## 📈 Performance Optimization

### Database Optimization
- **Indexing**: Add indexes on frequently queried columns
- **Connection Pooling**: HikariCP configuration for optimal performance
- **Query Optimization**: Efficient SQL queries and pagination

### Frontend Optimization
- **Lazy Loading**: Angular modules loaded on demand
- **Chart Performance**: Optimized data rendering for large datasets
- **Caching**: Strategic caching of API responses

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines

#### Backend Development
- Follow Spring Boot best practices
- Use proper exception handling
- Implement comprehensive logging
- Write unit tests for all services
- Use DTOs for API responses

#### Frontend Development
- Follow Angular style guide
- Use TypeScript strictly
- Implement proper error handling
- Use reactive programming with RxJS
- Maintain component separation

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors & Contributors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- **Spring Boot Team** - For the excellent framework
- **Angular Team** - For the powerful frontend framework
- **AG Charts** - For the amazing visualization library
- **PostgreSQL Team** - For the robust database system
- **Community Contributors** - For their valuable feedback and contributions

## 📞 Support & Contact

If you need help or have questions:

1. 📖 Check the [Documentation](https://github.com/yourusername/Widget-Visualizer/wiki)
2. 🔍 Search [Existing Issues](https://github.com/yourusername/Widget-Visualizer/issues)
3. 🆕 Create a [New Issue](https://github.com/yourusername/Widget-Visualizer/issues/new)
4. 💬 Join our [Discord Community](https://discord.gg/widget-visualizer)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by the Widget-Visualizer Team

[🌐 Website](https://widget-visualizer.com) • [📚 Documentation](https://docs.widget-visualizer.com) • [🐛 Report Bug](https://github.com/yourusername/Widget-Visualizer/issues) • [💡 Request Feature](https://github.com/yourusername/Widget-Visualizer/issues)

</div>