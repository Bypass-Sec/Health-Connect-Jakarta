-- Firebase Firestore Collections Schema
-- This represents the data structure for HealthConnect Jakarta

-- Users Collection
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  name VARCHAR(255),
  age INTEGER,
  address TEXT,
  preferred_language ENUM('id', 'en') DEFAULT 'id',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Clinics Collection
CREATE TABLE clinics (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  coordinates JSON, -- {lat: number, lng: number}
  services JSON, -- Array of services
  hours VARCHAR(255),
  ngo_partner VARCHAR(255),
  capacity INTEGER DEFAULT 50,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointments Collection
CREATE TABLE appointments (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  clinic_id VARCHAR(255),
  service VARCHAR(255),
  appointment_date DATE,
  appointment_time TIME,
  status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (clinic_id) REFERENCES clinics(id)
);

-- Medications Collection
CREATE TABLE medications (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  dosage VARCHAR(255),
  frequency VARCHAR(255),
  start_date DATE,
  end_date DATE,
  next_dose TIMESTAMP,
  remaining_count INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Donations Collection
CREATE TABLE donations (
  id VARCHAR(255) PRIMARY KEY,
  donor_email VARCHAR(255),
  donor_name VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  is_recurring BOOLEAN DEFAULT FALSE,
  stripe_payment_id VARCHAR(255),
  campaign_id VARCHAR(255),
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fund Requests Collection (NGO requests)
CREATE TABLE fund_requests (
  id VARCHAR(255) PRIMARY KEY,
  ngo_name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  urgency ENUM('low', 'medium', 'high') DEFAULT 'medium',
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  beneficiaries INTEGER,
  submitted_date DATE,
  approved_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat Sessions Collection
CREATE TABLE chat_sessions (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255),
  language ENUM('id', 'en') DEFAULT 'id',
  urgency_level ENUM('low', 'medium', 'high'),
  recommended_clinics JSON, -- Array of clinic IDs
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Chat Messages Collection
CREATE TABLE chat_messages (
  id VARCHAR(255) PRIMARY KEY,
  session_id VARCHAR(255),
  role ENUM('user', 'assistant'),
  content TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
);

-- Analytics Data Collection
CREATE TABLE analytics_demand (
  id VARCHAR(255) PRIMARY KEY,
  location VARCHAR(255),
  service_type VARCHAR(255),
  demand_count INTEGER,
  date DATE,
  predicted_shortage BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NGO Partners Collection
CREATE TABLE ngo_partners (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  services_provided JSON, -- Array of services
  active_clinics JSON, -- Array of clinic IDs
  total_funds_received DECIMAL(10,2) DEFAULT 0,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_appointments_user_date ON appointments(user_id, appointment_date);
CREATE INDEX idx_medications_user_next_dose ON medications(user_id, next_dose);
CREATE INDEX idx_donations_created_at ON donations(created_at);
CREATE INDEX idx_fund_requests_status ON fund_requests(status);
CREATE INDEX idx_clinics_location ON clinics(ngo_partner);
CREATE INDEX idx_analytics_location_date ON analytics_demand(location, date);
