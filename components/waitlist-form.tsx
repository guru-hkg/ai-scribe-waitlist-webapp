"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CheckCircle } from "lucide-react";

export function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    clinicName: "",
    workEmail: "",
    mobileNumber: "",
    newsletterSignup: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // redirect to https://aiscribe.hikigai.app/signup
    window.location.href = "https://aiscribe.hikigai.app/signup";
    return;

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Welcome to the Future</h3>
          <p className="text-gray-600 leading-relaxed">
            You're now on the waitlist. We'll notify you as soon as early access is available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Button
      type="submit"
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="w-full h-12 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors"
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Joining...
        </>
      ) : (
        "Sign Up"
      )}
    </Button>
    // <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
    //   <form onSubmit={handleSubmit} className="space-y-6">
    //     <div className="space-y-4">
    //       <div>
    //         <Label htmlFor="fullName" className="text-sm font-medium text-gray-900 mb-2 block">
    //           Full Name
    //         </Label>
    //         <Input
    //           id="fullName"
    //           type="text"
    //           required
    //           value={formData.fullName}
    //           onChange={(e) => handleInputChange("fullName", e.target.value)}
    //           className="h-12 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500"
    //           placeholder="Dr. John Smith"
    //         />
    //       </div>

    //       <div>
    //         <Label htmlFor="clinicName" className="text-sm font-medium text-gray-900 mb-2 block">
    //           Clinic Name
    //         </Label>
    //         <Input
    //           id="clinicName"
    //           type="text"
    //           required
    //           value={formData.clinicName}
    //           onChange={(e) => handleInputChange("clinicName", e.target.value)}
    //           className="h-12 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500"
    //           placeholder="Smith Medical Center"
    //         />
    //       </div>

    //       <div>
    //         <Label htmlFor="workEmail" className="text-sm font-medium text-gray-900 mb-2 block">
    //           Work Email
    //         </Label>
    //         <Input
    //           id="workEmail"
    //           type="email"
    //           required
    //           value={formData.workEmail}
    //           onChange={(e) => handleInputChange("workEmail", e.target.value)}
    //           className="h-12 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500"
    //           placeholder="doctor@clinic.com"
    //         />
    //       </div>

    //       <div>
    //         <Label htmlFor="mobileNumber" className="text-sm font-medium text-gray-900 mb-2 block">
    //           Mobile Number
    //         </Label>
    //         <Input
    //           id="mobileNumber"
    //           type="tel"
    //           required
    //           value={formData.mobileNumber}
    //           onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
    //           className="h-12 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-emerald-500"
    //           placeholder="+1 (555) 123-4567"
    //         />
    //         <p className="text-xs text-gray-500 mt-1">A validated mobile number is essential for signup</p>
    //       </div>
    //     </div>

    //     <div className="flex items-start space-x-3 pt-2">
    //       <Checkbox
    //         id="newsletter"
    //         checked={formData.newsletterSignup}
    //         onCheckedChange={(checked) => handleInputChange("newsletterSignup", checked as boolean)}
    //         className="mt-0.5"
    //       />
    //       <Label htmlFor="newsletter" className="text-sm text-gray-600 leading-relaxed">
    //         Subscribe to Hikigai's Healthcare AI Newsletter for updates and insights
    //       </Label>
    //     </div>

    //     <Button
    //       type="submit"
    //       disabled={isSubmitting}
    //       className="w-full h-12 text-base font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors"
    //     >
    //       {isSubmitting ? (
    //         <>
    //           <Loader2 className="w-4 h-4 mr-2 animate-spin" />
    //           Joining...
    //         </>
    //       ) : (
    //         "Sign Up for Early Access"
    //       )}
    //     </Button>
    //   </form>
    // </div>
  );
}
