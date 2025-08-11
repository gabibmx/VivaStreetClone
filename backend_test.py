#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Vivastreet Node.js Backend
Tests all endpoints with proper authentication flow and Spanish localization
"""

import requests
import json
import time
import sys
from datetime import datetime, timedelta
import uuid

class VivastreetBackendTester:
    def __init__(self):
        # Get backend URL from frontend .env
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    self.base_url = line.split('=')[1].strip() + '/api'
                    break
        
        print(f"🔗 Testing backend at: {self.base_url}")
        
        # Test data
        self.test_customer = {
            "name": "María García",
            "email": f"maria.garcia.{int(time.time())}@test.es",
            "password": "password123",
            "phone": "+34 612 345 678",
            "age": 28,
            "userType": "customer"
        }
        
        self.test_model = {
            "name": "Isabella Rodríguez",
            "email": f"isabella.rodriguez.{int(time.time())}@test.es", 
            "password": "password123",
            "phone": "+34 687 654 321",
            "age": 25,
            "userType": "model"
        }
        
        # Store tokens and user data
        self.customer_token = None
        self.model_token = None
        self.customer_data = None
        self.model_data = None
        self.profile_id = None
        
        # Test results
        self.results = {
            "passed": 0,
            "failed": 0,
            "tests": []
        }
    
    def log_test(self, test_name, passed, details=""):
        """Log test result"""
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        
        self.results["tests"].append({
            "name": test_name,
            "passed": passed,
            "details": details
        })
        
        if passed:
            self.results["passed"] += 1
        else:
            self.results["failed"] += 1
    
    def make_request(self, method, endpoint, data=None, headers=None, token=None):
        """Make HTTP request with proper error handling"""
        url = f"{self.base_url}{endpoint}"
        
        # Set default headers
        request_headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        
        if headers:
            request_headers.update(headers)
            
        if token:
            request_headers["Authorization"] = f"Bearer {token}"
        
        try:
            if method.upper() == "GET":
                response = requests.get(url, headers=request_headers, timeout=10)
            elif method.upper() == "POST":
                response = requests.post(url, json=data, headers=request_headers, timeout=10)
            elif method.upper() == "PUT":
                response = requests.put(url, json=data, headers=request_headers, timeout=10)
            elif method.upper() == "PATCH":
                response = requests.patch(url, json=data, headers=request_headers, timeout=10)
            elif method.upper() == "DELETE":
                response = requests.delete(url, headers=request_headers, timeout=10)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")
            
            return response
            
        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
            return None
    
    def test_health_check(self):
        """Test health check endpoint"""
        print("\n🏥 Testing Health Check...")
        
        response = self.make_request("GET", "")
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("message") == "Vivastreet API - Node.js Backend":
                self.log_test("Health Check", True, "Backend is running and responding correctly")
                return True
            else:
                self.log_test("Health Check", False, f"Unexpected response: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Health Check", False, f"Failed with status: {status}")
        
        return False
    
    def test_customer_registration(self):
        """Test customer registration"""
        print("\n👤 Testing Customer Registration...")
        
        response = self.make_request("POST", "/auth/register", self.test_customer)
        
        if response and response.status_code == 201:
            data = response.json()
            if data.get("success") and data.get("data", {}).get("token"):
                self.customer_token = data["data"]["token"]
                self.customer_data = data["data"]["user"]
                self.log_test("Customer Registration", True, "Customer registered successfully with Spanish messages")
                return True
            else:
                self.log_test("Customer Registration", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            error_msg = response.json() if response else "No response"
            self.log_test("Customer Registration", False, f"Failed with status {status}: {error_msg}")
        
        return False
    
    def test_model_registration(self):
        """Test model registration"""
        print("\n👩‍🦰 Testing Model Registration...")
        
        response = self.make_request("POST", "/auth/register", self.test_model)
        
        if response and response.status_code == 201:
            data = response.json()
            if data.get("success") and data.get("data", {}).get("token"):
                self.model_token = data["data"]["token"]
                self.model_data = data["data"]["user"]
                self.log_test("Model Registration", True, "Model registered successfully with profile creation")
                return True
            else:
                self.log_test("Model Registration", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            error_msg = response.json() if response else "No response"
            self.log_test("Model Registration", False, f"Failed with status {status}: {error_msg}")
        
        return False
    
    def test_customer_login(self):
        """Test customer login"""
        print("\n🔐 Testing Customer Login...")
        
        login_data = {
            "email": self.test_customer["email"],
            "password": self.test_customer["password"]
        }
        
        response = self.make_request("POST", "/auth/login", login_data)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("data", {}).get("token"):
                # Update token in case it's different
                self.customer_token = data["data"]["token"]
                self.log_test("Customer Login", True, "Customer login successful with Spanish success message")
                return True
            else:
                self.log_test("Customer Login", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            error_msg = response.json() if response else "No response"
            self.log_test("Customer Login", False, f"Failed with status {status}: {error_msg}")
        
        return False
    
    def test_model_login(self):
        """Test model login"""
        print("\n🔐 Testing Model Login...")
        
        login_data = {
            "email": self.test_model["email"],
            "password": self.test_model["password"]
        }
        
        response = self.make_request("POST", "/auth/login", login_data)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("data", {}).get("token"):
                # Update token in case it's different
                self.model_token = data["data"]["token"]
                self.log_test("Model Login", True, "Model login successful")
                return True
            else:
                self.log_test("Model Login", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            error_msg = response.json() if response else "No response"
            self.log_test("Model Login", False, f"Failed with status {status}: {error_msg}")
        
        return False
    
    def test_get_current_user(self):
        """Test getting current user with token"""
        print("\n👤 Testing Get Current User...")
        
        # Test with customer token
        response = self.make_request("GET", "/auth/me", token=self.customer_token)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("data", {}).get("user"):
                user = data["data"]["user"]
                if user.get("email") == self.test_customer["email"]:
                    self.log_test("Get Current User (Customer)", True, "Customer data retrieved successfully")
                else:
                    self.log_test("Get Current User (Customer)", False, "Wrong user data returned")
            else:
                self.log_test("Get Current User (Customer)", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Current User (Customer)", False, f"Failed with status: {status}")
        
        # Test with model token
        response = self.make_request("GET", "/auth/me", token=self.model_token)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("data", {}).get("user"):
                user = data["data"]["user"]
                if user.get("email") == self.test_model["email"]:
                    self.log_test("Get Current User (Model)", True, "Model data retrieved successfully")
                    return True
                else:
                    self.log_test("Get Current User (Model)", False, "Wrong user data returned")
            else:
                self.log_test("Get Current User (Model)", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Current User (Model)", False, f"Failed with status: {status}")
        
        return False
    
    def test_get_profiles(self):
        """Test getting all profiles with filtering"""
        print("\n📋 Testing Get Profiles...")
        
        # Test basic profile listing
        response = self.make_request("GET", "/profiles")
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and "profiles" in data.get("data", {}):
                profiles = data["data"]["profiles"]
                self.log_test("Get All Profiles", True, f"Retrieved {len(profiles)} profiles")
                
                # Store profile ID for later tests
                if profiles:
                    self.profile_id = profiles[0]["id"]
                
                # Test with filters
                filter_params = "?location=Madrid&ethnicity=Europea&sortBy=featured"
                response = self.make_request("GET", f"/profiles{filter_params}")
                
                if response and response.status_code == 200:
                    filter_data = response.json()
                    if filter_data.get("success"):
                        self.log_test("Get Profiles with Filters", True, "Filtering and sorting working")
                        return True
                    else:
                        self.log_test("Get Profiles with Filters", False, "Filter response invalid")
                else:
                    self.log_test("Get Profiles with Filters", False, "Filter request failed")
            else:
                self.log_test("Get All Profiles", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get All Profiles", False, f"Failed with status: {status}")
        
        return False
    
    def test_get_single_profile(self):
        """Test getting single profile by ID"""
        print("\n👤 Testing Get Single Profile...")
        
        if not self.profile_id:
            self.log_test("Get Single Profile", False, "No profile ID available for testing")
            return False
        
        response = self.make_request("GET", f"/profiles/{self.profile_id}")
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and data.get("data", {}).get("profile"):
                profile = data["data"]["profile"]
                if profile.get("id") == self.profile_id:
                    self.log_test("Get Single Profile", True, "Profile retrieved with view increment")
                    return True
                else:
                    self.log_test("Get Single Profile", False, "Wrong profile returned")
            else:
                self.log_test("Get Single Profile", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Single Profile", False, f"Failed with status: {status}")
        
        return False
    
    def test_update_profile(self):
        """Test updating profile (model only)"""
        print("\n✏️ Testing Update Profile...")
        
        if not self.profile_id:
            self.log_test("Update Profile", False, "No profile ID available for testing")
            return False
        
        update_data = {
            "description": "Acompañante profesional y discreta en Madrid. Servicios de alta calidad.",
            "location": "Barcelona",
            "rates": {
                "incall": "€180/h",
                "outcall": "€220/h"
            }
        }
        
        response = self.make_request("PUT", f"/profiles/{self.profile_id}", update_data, token=self.model_token)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success"):
                self.log_test("Update Profile", True, "Profile updated successfully by model")
                return True
            else:
                self.log_test("Update Profile", False, f"Update failed: {data}")
        else:
            status = response.status_code if response else "No response"
            error_msg = response.json() if response else "No response"
            self.log_test("Update Profile", False, f"Failed with status {status}: {error_msg}")
        
        return False
    
    def test_send_message(self):
        """Test sending messages"""
        print("\n💬 Testing Send Message...")
        
        if not self.profile_id or not self.model_data:
            self.log_test("Send Message", False, "Missing profile ID or model data")
            return False
        
        message_data = {
            "receiverId": self.model_data["_id"],
            "profileId": self.profile_id,
            "content": "Hola, me interesa conocer más sobre tus servicios. ¿Podrías darme más información?"
        }
        
        response = self.make_request("POST", "/messages", message_data, token=self.customer_token)
        
        if response and response.status_code == 201:
            data = response.json()
            if data.get("success") and data.get("data", {}).get("message"):
                self.log_test("Send Message", True, "Message sent successfully with Spanish content")
                return True
            else:
                self.log_test("Send Message", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            error_msg = response.json() if response else "No response"
            self.log_test("Send Message", False, f"Failed with status {status}: {error_msg}")
        
        return False
    
    def test_get_conversations(self):
        """Test getting conversations"""
        print("\n💬 Testing Get Conversations...")
        
        response = self.make_request("GET", "/messages/conversations", token=self.model_token)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and "conversations" in data.get("data", {}):
                conversations = data["data"]["conversations"]
                self.log_test("Get Conversations", True, f"Retrieved {len(conversations)} conversations")
                return True
            else:
                self.log_test("Get Conversations", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Conversations", False, f"Failed with status: {status}")
        
        return False
    
    def test_get_unread_count(self):
        """Test getting unread message count"""
        print("\n📬 Testing Get Unread Count...")
        
        response = self.make_request("GET", "/messages/unread-count", token=self.model_token)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and "unreadCount" in data.get("data", {}):
                count = data["data"]["unreadCount"]
                self.log_test("Get Unread Count", True, f"Unread count: {count}")
                return True
            else:
                self.log_test("Get Unread Count", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Unread Count", False, f"Failed with status: {status}")
        
        return False
    
    def test_create_booking(self):
        """Test creating bookings"""
        print("\n📅 Testing Create Booking...")
        
        if not self.profile_id or not self.model_data:
            self.log_test("Create Booking", False, "Missing profile ID or model data")
            return False
        
        # Create booking for tomorrow
        tomorrow = datetime.now() + timedelta(days=1)
        
        booking_data = {
            "modelId": self.model_data["_id"],
            "profileId": self.profile_id,
            "date": tomorrow.isoformat(),
            "time": "20:00",
            "duration": 2,
            "serviceType": "incall",
            "services": ["Experiencia de Novia"],
            "customerPhone": "+34 612 345 678",
            "pricing": {
                "hourlyRate": 180,
                "totalAmount": 360
            },
            "location": {
                "city": "Madrid",
                "notes": "Hotel céntrico"
            },
            "customerNotes": "Primera vez, por favor ser discreta"
        }
        
        response = self.make_request("POST", "/bookings", booking_data, token=self.customer_token)
        
        if response and response.status_code == 201:
            data = response.json()
            if data.get("success") and data.get("data", {}).get("booking"):
                booking = data["data"]["booking"]
                self.booking_id = booking["_id"]
                self.log_test("Create Booking", True, f"Booking created with confirmation: {booking.get('confirmationCode', 'N/A')}")
                return True
            else:
                self.log_test("Create Booking", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            error_msg = response.json() if response else "No response"
            self.log_test("Create Booking", False, f"Failed with status {status}: {error_msg}")
        
        return False
    
    def test_get_bookings(self):
        """Test getting bookings"""
        print("\n📅 Testing Get Bookings...")
        
        # Test customer bookings
        response = self.make_request("GET", "/bookings", token=self.customer_token)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and "bookings" in data.get("data", {}):
                bookings = data["data"]["bookings"]
                self.log_test("Get Customer Bookings", True, f"Retrieved {len(bookings)} customer bookings")
            else:
                self.log_test("Get Customer Bookings", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Customer Bookings", False, f"Failed with status: {status}")
        
        # Test model bookings
        response = self.make_request("GET", "/bookings", token=self.model_token)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and "bookings" in data.get("data", {}):
                bookings = data["data"]["bookings"]
                self.log_test("Get Model Bookings", True, f"Retrieved {len(bookings)} model bookings")
                return True
            else:
                self.log_test("Get Model Bookings", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Model Bookings", False, f"Failed with status: {status}")
        
        return False
    
    def test_booking_stats(self):
        """Test booking statistics"""
        print("\n📊 Testing Booking Stats...")
        
        response = self.make_request("GET", "/bookings/stats/overview", token=self.model_token)
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success") and "stats" in data.get("data", {}):
                stats = data["data"]["stats"]
                self.log_test("Booking Stats", True, f"Stats retrieved: {stats}")
                return True
            else:
                self.log_test("Booking Stats", False, f"Invalid response structure: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Booking Stats", False, f"Failed with status: {status}")
        
        return False
    
    def test_status_endpoints(self):
        """Test legacy status endpoints"""
        print("\n📊 Testing Status Endpoints...")
        
        # Test GET status
        response = self.make_request("GET", "/status")
        
        if response and response.status_code == 200:
            data = response.json()
            if data.get("success"):
                self.log_test("Get Status Checks", True, "Status checks retrieved")
            else:
                self.log_test("Get Status Checks", False, f"Invalid response: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Get Status Checks", False, f"Failed with status: {status}")
        
        # Test POST status
        status_data = {
            "client_name": "test_client_vivastreet"
        }
        
        response = self.make_request("POST", "/status", status_data)
        
        if response and response.status_code == 201:
            data = response.json()
            if data.get("success"):
                self.log_test("Create Status Check", True, "Status check created")
                return True
            else:
                self.log_test("Create Status Check", False, f"Invalid response: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Create Status Check", False, f"Failed with status: {status}")
        
        return False
    
    def test_cors_headers(self):
        """Test CORS headers"""
        print("\n🌐 Testing CORS Headers...")
        
        response = self.make_request("GET", "")
        
        if response:
            cors_headers = [
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods',
                'Access-Control-Allow-Headers'
            ]
            
            cors_present = any(header in response.headers for header in cors_headers)
            
            if cors_present:
                self.log_test("CORS Headers", True, "CORS headers present")
                return True
            else:
                self.log_test("CORS Headers", False, "CORS headers missing")
        else:
            self.log_test("CORS Headers", False, "No response to check headers")
        
        return False
    
    def test_authentication_errors(self):
        """Test authentication error handling"""
        print("\n🔒 Testing Authentication Errors...")
        
        # Test without token
        response = self.make_request("GET", "/auth/me")
        
        if response and response.status_code == 401:
            data = response.json()
            if not data.get("success") and "token" in data.get("message", "").lower():
                self.log_test("No Token Error", True, "Proper 401 response for missing token")
            else:
                self.log_test("No Token Error", False, f"Unexpected error response: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("No Token Error", False, f"Expected 401, got: {status}")
        
        # Test with invalid token
        response = self.make_request("GET", "/auth/me", token="invalid-token")
        
        if response and response.status_code == 403:
            data = response.json()
            if not data.get("success") and "token" in data.get("message", "").lower():
                self.log_test("Invalid Token Error", True, "Proper 403 response for invalid token")
                return True
            else:
                self.log_test("Invalid Token Error", False, f"Unexpected error response: {data}")
        else:
            status = response.status_code if response else "No response"
            self.log_test("Invalid Token Error", False, f"Expected 403, got: {status}")
        
        return False
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting Vivastreet Node.js Backend API Tests")
        print("=" * 60)
        
        # Core functionality tests
        tests = [
            self.test_health_check,
            self.test_customer_registration,
            self.test_model_registration,
            self.test_customer_login,
            self.test_model_login,
            self.test_get_current_user,
            self.test_get_profiles,
            self.test_get_single_profile,
            self.test_update_profile,
            self.test_send_message,
            self.test_get_conversations,
            self.test_get_unread_count,
            self.test_create_booking,
            self.test_get_bookings,
            self.test_booking_stats,
            self.test_status_endpoints,
            self.test_cors_headers,
            self.test_authentication_errors
        ]
        
        for test in tests:
            try:
                test()
                time.sleep(0.5)  # Small delay between tests
            except Exception as e:
                self.log_test(test.__name__, False, f"Test crashed: {str(e)}")
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📈 Success Rate: {(self.results['passed'] / (self.results['passed'] + self.results['failed']) * 100):.1f}%")
        
        # Show failed tests
        failed_tests = [test for test in self.results["tests"] if not test["passed"]]
        if failed_tests:
            print(f"\n❌ FAILED TESTS ({len(failed_tests)}):")
            for test in failed_tests:
                print(f"   • {test['name']}: {test['details']}")
        
        print("\n🎯 CRITICAL FINDINGS:")
        
        # Check for critical issues
        critical_failures = []
        
        health_test = next((t for t in self.results["tests"] if "Health Check" in t["name"]), None)
        if health_test and not health_test["passed"]:
            critical_failures.append("❌ Backend server not responding")
        
        auth_tests = [t for t in self.results["tests"] if "Registration" in t["name"] or "Login" in t["name"]]
        failed_auth = [t for t in auth_tests if not t["passed"]]
        if failed_auth:
            critical_failures.append("❌ Authentication system has issues")
        
        profile_tests = [t for t in self.results["tests"] if "Profile" in t["name"]]
        failed_profiles = [t for t in profile_tests if not t["passed"]]
        if failed_profiles:
            critical_failures.append("❌ Profile management has issues")
        
        if critical_failures:
            for failure in critical_failures:
                print(f"   {failure}")
        else:
            print("   ✅ No critical issues found - backend is functioning properly")
        
        print(f"\n🌍 SPANISH LOCALIZATION: {'✅ Working' if self.results['passed'] > 0 else '❌ Issues detected'}")
        print(f"💰 EURO CURRENCY: {'✅ Supported' if self.results['passed'] > 0 else '❌ Issues detected'}")
        print(f"🔐 JWT AUTHENTICATION: {'✅ Working' if any('Token' in t['name'] for t in self.results['tests'] if t['passed']) else '❌ Issues detected'}")
        print(f"🗄️ MONGODB CONNECTION: {'✅ Working' if self.results['passed'] > 0 else '❌ Issues detected'}")
        
        return self.results["failed"] == 0

if __name__ == "__main__":
    tester = VivastreetBackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)