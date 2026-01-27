"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  fullName: string;
  email: string;
  businessName: string;
  website: string;
  message: string;
  company_website_check: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  fullName: "",
  email: "",
  businessName: "",
  website: "",
  message: "",
  company_website_check: "",
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [submitError, setSubmitError] = useState<string>("");

  const isLoading = status === "submitting";

  const emailRegex = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    []
  );

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (formData.message.trim().length < 20) {
      nextErrors.message = "Message must be at least 20 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    if (!validate()) return;

    setSubmitError("");
    setStatus("submitting");

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_STRATEGY_CALL_WEBHOOK_URL;

    // Honeypot: silently succeed
    if (formData.company_website_check.trim()) {
      setStatus("success");
      setFormData(initialState);
      return;
    }

    if (!webhookUrl) {
      setStatus("idle");
      setSubmitError("Form is temporarily unavailable. Please email info@flowgenixai.com.");
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      businessName: formData.businessName || "",
      website: formData.website || "",
      source: "Contact Form",
      status: "New",
      notes: formData.message,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Non-2xx response");
      }

      setStatus("success");
      setFormData(initialState);
      setErrors({});
    } catch (error) {
      console.error("Failed to submit contact form", error);
      setStatus("idle");
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  const updateField =
    (field: keyof FormState) =>
    (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
      if (status === "success") {
        setStatus("idle");
      }
      if (submitError) {
        setSubmitError("");
      }
    };

  return (
    <main className="pb-20">
      <section className="bg-[#CDE4F3] py-16">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
            Contact
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contact FlowGenixAI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us what you&apos;re trying to automate — we&apos;ll respond
            within 1 business day.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-semibold text-gray-900">Send us a message</CardTitle>
              <CardDescription className="text-muted-foreground">
                Share a bit about your workflows and what you want to improve.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-6 space-y-6">
                <div
                  role="status"
                  aria-live="polite"
                  className="min-h-[28px]"
                >
                  {status === "success" && (
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      Thanks for reaching out! We received your note and will
                      respond within 1 business day.
                    </div>
                  )}
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot field for bots */}
                  <input
                    type="text"
                    name="company_website_check"
                    value={formData.company_website_check}
                    onChange={(event) =>
                      updateField("company_website_check")(event.target.value)
                    }
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2.5">
                      <Label className="text-sm md:text-base" htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        autoComplete="name"
                        value={formData.fullName}
                        onChange={(event) =>
                          updateField("fullName")(event.target.value)
                        }
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={
                          errors.fullName ? "fullName-error" : undefined
                        }
                      />
                      {errors.fullName && (
                        <p
                          id="fullName-error"
                          className="text-sm text-red-600"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2.5">
                      <Label className="text-sm md:text-base" htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={(event) =>
                          updateField("email")(event.target.value)
                        }
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2.5">
                      <Label className="text-sm md:text-base" htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={(event) =>
                          updateField("businessName")(event.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label className="text-sm md:text-base" htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        placeholder="https://"
                        value={formData.website}
                        onChange={(event) =>
                          updateField("website")(event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label className="text-sm md:text-base" htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={(event) =>
                        updateField("message")(event.target.value)
                      }
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                      placeholder="Share the workflows, tools, and goals you have in mind."
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                      * Required fields
                    </p>
                    {submitError && (
                      <p className="text-sm text-red-600">{submitError}</p>
                    )}
                    <Button
                      type="submit"
                      className="h-11 px-6 font-semibold bg-[#009CE3] hover:bg-[#0082C4] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send message"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border-slate-200/80 h-fit">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-semibold text-gray-900">Other ways to reach us</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Prefer a quick email or want to book time right away? Choose
                  what works best.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pb-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-[0.14em]">
                    Email
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    info@flowgenixai.com
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-[0.14em]">
                    Response time
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Within 1 business day
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    asChild
                    className="w-full h-11 font-semibold bg-[#009CE3] hover:bg-[#0082C4] text-white"
                  >
                    <Link href="/strategy-call">Book a strategy call</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
      </section>
    </main>
  );
}
