# Widget-Visualizer

A full-stack financial dashboard and data visualization web application built with Spring Boot, Angular, and PostgreSQL. It includes secure JWT-based authentication, role-based access control, and BCrypt password encryption. Users can register, log in, and create personalized financial graphs with configurations saved per user in a flexible JSON column.

## 🏗️ Architecture Overview

```
┌─────────────────┐    HTTP/REST API    ┌─────────────────┐    JDBC    ┌─────────────────┐
│                 │ ◄─────────────────► │                 │ ◄────────► │                 │
│  Angular 16     │                     │  Spring Boot    │            │  PostgreSQL     │
│  Frontend       │                     │  Backend        │            │  Database       │
│                 │                     │                 │            │                 │
└─────────────────┘                     └─────────────────┘            └─────────────────┘
```

## 🚀 Features

- **JWT Authentication**: Secure login/logout with Bearer token
- **Role-Based Access Control**: User and Admin roles
- **Dynamic Database Connection**: Connect to external databases
- **Dynamic Query Execution**: Run SQL queries on connected databases
- **Interactive Charts**: Create Bar, Line, and Area charts using AG Charts
- **Graph Persistence**: Save and load user-specific graph configurations
- **Responsive Dashboard**: Modern UI with sidebar navigation
- **Real-time Data Visualization**: Live chart updates based on query results

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.5.0** - Main framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database operations
- **PostgreSQL** - Primary database
- **JWT (JJWT)** - Token-based authentication
- **BCrypt** - Password encryption
- **Lombok** - Boilerplate code reduction

### Frontend
- **Angular 16** - Frontend framework
- **AG Charts** - Data visualization
- **Bootstrap 5** - UI components
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe JavaScript

### Database
- **PostgreSQL** - Primary database for user data and configurations
- **Dynamic Database Support** - Connect to external databases for queries

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17** or higher
- **Node.js 16** or higher
- **npm** or **yarn**
- **PostgreSQL 12** or higher
- **Maven 3.6** or higher
- **Git**

## 🔧 Installation & Setup

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

#### Database Tables (Auto-created by Spring Boot)

The application will automatically create the following tables:

- `users` - User authentication data
- `roles` - User roles (USER, ADMIN)
- `user_roles` - Many-to-many relationship
- `jsondata` - Saved graph configurations
- `graphs` - Graph metadata
- `database_info` - External database connections

### 3. Backend Setup

#### Navigate to Backend Directory

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
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

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

#### Navigate to Frontend Directory

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

## 🔗 Backend-Frontend Integration

### 1. CORS Configuration

The backend is configured to allow requests from the Angular frontend:

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:4200"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}
```

### 2. JWT Token Handling

#### Backend JWT Generation

```java
public String generateToken(Authentication authentication) {
    String username = authentication.getName();
    Date currentDate = new Date();
    Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

    return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(currentDate)
            .setExpiration(expireDate)
            .signWith(key(), SignatureAlgorithm.HS512)
            .compact();
}
```

#### Frontend JWT Interceptor

```typescript
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: token // Already includes "Bearer"
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
```

### 3. API Service Integration

#### Authentication Service

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((res: any) => {
        const fullToken = `${res.tokenType} ${res.accessToken}`;
        localStorage.setItem('token', fullToken);
      })
    );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
```

## 🧪 Testing with Postman

### 1. Import Postman Collection

Create a new Postman collection with the following requests:

### 2. Authentication Endpoints

#### Register User

```http
POST http://localhost:8080/api/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "roles": ["ROLE_USER"]
}
```

**Expected Response:**
```json
{
  "userId": 1,
  "username": "testuser",
  "email": "test@example.com",
  "roles": ["ROLE_USER"]
}
```

#### Login User

```http
POST http://localhost:8080/api/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer"
}
```

### 3. Protected Endpoints (Require JWT Token)

#### Get User Profile

```http
GET http://localhost:8080/api/users/1
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

#### Connect to External Database

```http
POST http://localhost:8080/api/dynamic-query/connect
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
Content-Type: application/json

{
  "URL": "jdbc:postgresql://localhost:5432/testdb",
  "Username": "testuser",
  "Password": "testpass"
}
```

#### Execute Dynamic Query

```http
POST http://localhost:8080/api/dynamic-query/execute-query
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
Content-Type: application/json

"SELECT * FROM employees LIMIT 10"
```

#### Save Graph Configuration

```http
POST http://localhost:8080/api/jsondata/save
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
Content-Type: application/json

{
  "chartType": "bar",
  "coordinates": "{\"xAxis\":\"month\",\"yAxis\":\"sales\",\"email\":\"test@example.com\"}"
}
```

#### Get Saved Graphs

```http
GET http://localhost:8080/api/jsondata/all
Authorization: Bearer eyJhbGciOiJIUzUxMiJ9...
```

### 4. Postman Environment Variables

Create environment variables in Postman:

```json
{
  "baseUrl": "http://localhost:8080/api",
  "token": "Bearer eyJhbGciOiJIUzUxMiJ9...",
  "userId": "1"
}
```

### 5. Postman Test Scripts

Add test scripts to validate responses:

```javascript
// For Login endpoint
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('accessToken');
    pm.environment.set("token", "Bearer " + jsonData.accessToken);
});

// For protected endpoints
pm.test("Authentication successful", function () {
    pm.response.to.have.status(200);
    pm.response.to.not.have.status(401);
});
```

## 🔄 Application Flow

### 1. User Registration & Authentication

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database

    U->>F: Register/Login
    F->>B: POST /api/register or /api/login
    B->>D: Save/Validate user
    D-->>B: User data
    B-->>F: JWT Token
    F->>F: Store token in localStorage
    F-->>U: Redirect to dashboard
```

### 2. Database Connection & Query Execution

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant E as External DB

    U->>F: Enter DB credentials
    F->>B: POST /api/dynamic-query/connect
    B->>E: Test connection
    E-->>B: Connection success
    B-->>F: Connection established
    
    U->>F: Enter SQL query
    F->>B: POST /api/dynamic-query/execute-query
    B->>E: Execute query
    E-->>B: Query results
    B-->>F: JSON data
    F->>F: Display results & generate charts
```

### 3. Chart Generation & Persistence

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database

    U->>F: Configure chart (type, axes)
    F->>F: Generate chart with AG Charts
    U->>F: Save chart
    F->>B: POST /api/jsondata/save
    B->>D: Save chart configuration
    D-->>B: Save confirmation
    B-->>F: Success response
    F-->>U: Chart saved notification
```

## 🚦 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login

### User Management
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/{id}/role` - Assign roles

### Database Operations
- `POST /api/dynamic-query/connect` - Connect to external database
- `POST /api/dynamic-query/execute-query` - Execute SQL query

### Graph Management
- `POST /api/jsondata/save` - Save graph configuration
- `GET /api/jsondata/all` - Get user's saved graphs
- `GET /api/jsondata/{id}` - Get specific graph

### Database Info
- `GET /api/dbdata` - Get all database connections
- `POST /api/dbdata` - Save database connection
- `PUT /api/dbdata/{id}` - Update database connection
- `DELETE /api/dbdata/{id}` - Delete database connection

## 🔒 Security Features

### 1. JWT Authentication
- Stateless authentication using JSON Web Tokens
- Token expiration (24 hours by default)
- Secure token storage in localStorage

### 2. Password Security
- BCrypt password hashing
- Minimum password requirements enforced

### 3. Role-Based Access Control
- USER and ADMIN roles
- Method-level security annotations
- Protected endpoints

### 4. CORS Configuration
- Configured for Angular frontend
- Credentials allowed for authenticated requests

## 🎨 Frontend Features

### 1. Dashboard
- Modern sidebar navigation
- Responsive design
- Real-time metrics display
- Interactive charts

### 2. Chart Visualization
- AG Charts integration
- Support for Bar, Line, and Area charts
- Dynamic data binding
- Save/load functionality

### 3. Database Management
- Dynamic database connection
- SQL query execution
- Result table display
- Error handling

## 🐛 Troubleshooting

### Common Issues

#### 1. CORS Errors
```
Access to XMLHttpRequest at 'http://localhost:8080/api/login' from origin 'http://localhost:4200' has been blocked by CORS policy
```

**Solution:** Ensure CORS is properly configured in `SecurityConfig.java`

#### 2. JWT Token Issues
```
401 Unauthorized - Invalid JWT token
```

**Solution:** Check token format and expiration in browser localStorage

#### 3. Database Connection Issues
```
Connection refused to localhost:5432
```

**Solution:** Ensure PostgreSQL is running and credentials are correct

#### 4. Angular Build Issues
```
Module not found: Error: Can't resolve 'ag-charts-angular'
```

**Solution:** Run `npm install` to install all dependencies

## 📝 Development Guidelines

### Backend Development
1. Follow Spring Boot best practices
2. Use proper exception handling
3. Implement proper logging
4. Write unit tests for services
5. Use DTOs for API responses

### Frontend Development
1. Follow Angular style guide
2. Use TypeScript strictly
3. Implement proper error handling
4. Use reactive programming with RxJS
5. Maintain component separation

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

# Serve static files
# Deploy dist/ folder to web server
```

## 📊 Performance Considerations

1. **Database Indexing**: Add indexes on frequently queried columns
2. **Connection Pooling**: Configure HikariCP for optimal database connections
3. **Caching**: Implement Redis for session management
4. **Lazy Loading**: Use Angular lazy loading for large modules
5. **Chart Optimization**: Limit data points for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Angular team for the powerful frontend framework
- AG Charts for the visualization library
- PostgreSQL team for the robust database system

---

## 📞 Support

If you have any questions or need help with setup, please:

1. Check the troubleshooting section
2. Search existing issues on GitHub
3. Create a new issue with detailed information
4. Contact the development team

**Happy Coding! 🚀**