"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  MapPin,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"

interface FundRequest {
  id: string
  ngo: string
  title: string
  amount: number
  description: string
  urgency: "low" | "medium" | "high"
  status: "pending" | "approved" | "rejected"
  submittedDate: string
  beneficiaries: number
}

interface ClinicData {
  id: string
  name: string
  location: string
  services: string[]
  status: "active" | "inactive"
  patientsToday: number
  capacity: number
}

const mockFundRequests: FundRequest[] = [
  {
    id: "1",
    ngo: "Yayasan Kesehatan Indonesia",
    title: "Vaksin Hepatitis B untuk 100 Anak",
    amount: 500,
    description:
      "Program vaksinasi Hepatitis B untuk anak-anak di daerah Cempaka Putih yang belum mendapat vaksin lengkap.",
    urgency: "high",
    status: "pending",
    submittedDate: "2024-01-10",
    beneficiaries: 100,
  },
  {
    id: "2",
    ngo: "Doctors Without Borders",
    title: "Obat TB untuk 50 Pasien",
    amount: 750,
    description: "Pengadaan obat TB untuk pasien yang sedang menjalani pengobatan di Klinik Sehat Bersama.",
    urgency: "medium",
    status: "approved",
    submittedDate: "2024-01-08",
    beneficiaries: 50,
  },
]

const mockClinics: ClinicData[] = [
  {
    id: "1",
    name: "Puskesmas Cempaka Putih",
    location: "Jakarta Pusat",
    services: ["Vaksin", "Prenatal", "Pemeriksaan Umum"],
    status: "active",
    patientsToday: 45,
    capacity: 60,
  },
  {
    id: "2",
    name: "Klinik Sehat Bersama",
    location: "Jakarta Pusat",
    services: ["Vaksin", "TB Treatment", "Dental"],
    status: "active",
    patientsToday: 38,
    capacity: 50,
  },
]

export default function AdminPage() {
  const [fundRequests, setFundRequests] = useState<FundRequest[]>(mockFundRequests)
  const [clinics] = useState<ClinicData[]>(mockClinics)
  const [activeTab, setActiveTab] = useState<"overview" | "funds" | "clinics" | "analytics">("overview")

  const handleFundRequest = (id: string, action: "approve" | "reject") => {
    setFundRequests((prev) =>
      prev.map((request) =>
        request.id === id ? { ...request, status: action === "approve" ? "approved" : "rejected" } : request,
      ),
    )
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalFundsRequested = fundRequests.reduce((sum, req) => sum + req.amount, 0)
  const approvedFunds = fundRequests
    .filter((req) => req.status === "approved")
    .reduce((sum, req) => sum + req.amount, 0)
  const pendingRequests = fundRequests.filter((req) => req.status === "pending").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-teal-400 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Admin Panel NGO</h1>
          <p className="text-teal-100">Kelola layanan kesehatan dan alokasi dana</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "funds", label: "Fund Requests", icon: DollarSign },
            { id: "clinics", label: "Clinic Management", icon: MapPin },
            { id: "analytics", label: "Analytics", icon: TrendingUp },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id as any)}
              className={activeTab === tab.id ? "bg-teal-400 hover:bg-teal-500" : ""}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">${totalFundsRequested}</div>
                  <div className="text-sm text-gray-600">Total Requested</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">${approvedFunds}</div>
                  <div className="text-sm text-gray-600">Approved Funds</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{pendingRequests}</div>
                  <div className="text-sm text-gray-600">Pending Requests</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{clinics.length}</div>
                  <div className="text-sm text-gray-600">Active Clinics</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Fund Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {fundRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium text-sm">{request.title}</p>
                          <p className="text-xs text-gray-600">{request.ngo}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Clinic Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {clinics.map((clinic) => (
                      <div key={clinic.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium text-sm">{clinic.name}</p>
                          <p className="text-xs text-gray-600">{clinic.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {clinic.patientsToday}/{clinic.capacity}
                          </p>
                          <p className="text-xs text-gray-600">Patients Today</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Fund Requests Tab */}
        {activeTab === "funds" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Fund Requests Management</h2>
              <Button className="bg-teal-400 hover:bg-teal-500">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>

            <div className="space-y-4">
              {fundRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{request.ngo}</p>
                        <p className="text-sm text-gray-700 mb-3">{request.description}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>
                            Amount: <strong>${request.amount}</strong>
                          </span>
                          <span>
                            Beneficiaries: <strong>{request.beneficiaries}</strong>
                          </span>
                          <span>Submitted: {new Date(request.submittedDate).toLocaleDateString("id-ID")}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Badge className={getUrgencyColor(request.urgency)}>{request.urgency} priority</Badge>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </div>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2 pt-4 border-t">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleFundRequest(request.id, "approve")}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => handleFundRequest(request.id, "reject")}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Clinic Management Tab */}
        {activeTab === "clinics" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Clinic Management</h2>
              <Button className="bg-teal-400 hover:bg-teal-500">
                <Plus className="h-4 w-4 mr-2" />
                Add Clinic
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {clinics.map((clinic) => (
                <Card key={clinic.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{clinic.name}</CardTitle>
                        <p className="text-sm text-gray-600">{clinic.location}</p>
                      </div>
                      <Badge
                        className={
                          clinic.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {clinic.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {clinic.services.map((service) => (
                            <Badge key={service} variant="secondary" className="bg-teal-100 text-teal-800">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Patients Today</p>
                          <p className="text-lg font-semibold">{clinic.patientsToday}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Capacity</p>
                          <p className="text-lg font-semibold">{clinic.capacity}</p>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-400 h-2 rounded-full"
                          style={{ width: `${(clinic.patientsToday / clinic.capacity) * 100}%` }}
                        ></div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Predictions</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demand Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                      <p>AI Demand Prediction</p>
                      <p className="text-sm">Heatmap by location & ailment</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shortage Predictions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 border border-red-200 rounded">
                      <p className="font-medium text-red-800">High Risk: Vaccine Shortage</p>
                      <p className="text-sm text-red-600">Predicted shortage in Central Jakarta by Jan 20</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="font-medium text-yellow-800">Medium Risk: TB Medication</p>
                      <p className="text-sm text-yellow-600">Potential shortage in North Jakarta by Feb 1</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <p className="font-medium text-green-800">Low Risk: Prenatal Care</p>
                      <p className="text-sm text-green-600">Adequate supply for next 30 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
