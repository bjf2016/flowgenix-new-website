'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function StrategyCallPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    businessName: '',
    website: '',
    businessType: '',
    needs: '',
    company_code: '', // honeypot field
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Honeypot check - if filled, silently ignore
    if (formData.company_code) {
      console.log('Spam detected via honeypot');
      return;
    }

    // Validate required fields
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.businessType) {
      newErrors.businessType = 'Please select a business type';
    }

    if (!formData.needs.trim()) {
      newErrors.needs = 'Please tell us what you need help with';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Send form data to n8n webhook
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      businessName: formData.businessName,
      website: formData.website,
      businessType: formData.businessType,
      aiHelp: formData.needs,
      source: "strategy_call_form",
    };

    try {
      await fetch("https://n8n.flowgenixai.com/webhook/fgx-strategy-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Failed to send lead to n8n", error);
    }

    // Set submitted to reveal calendar
    setIsSubmitted(true);
  };

  const handleInputChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#CDE4F3] to-white pt-16 pb-6">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Book a strategy call
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-3">
              A focused 30-minute call to map where AI and automation can remove busywork in your business. No hard pitch, just practical next steps.
            </p>
            <p className="text-base text-gray-500">
              Designed for dentists, local service businesses, and other SMBs exploring AI systems.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Left Column: Intake Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Step 1 · Tell us about your business
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field - hidden */}
                <input
                  type="text"
                  name="company_code"
                  className="hidden"
                  autoComplete="off"
                  tabIndex={-1}
                  value={formData.company_code}
                  onChange={(e) => handleInputChange('company_code', e.target.value)}
                />

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Business Name */}
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    Business name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className={errors.businessName ? 'border-red-500' : ''}
                  />
                  {errors.businessName && (
                    <p className="text-sm text-red-500">{errors.businessName}</p>
                  )}
                </div>

                {/* Website (optional) */}
                <div className="space-y-2">
                  <Label htmlFor="website">Website (optional)</Label>
                  <Input
                    id="website"
                    type="text"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>

                {/* Business Type */}
                <div className="space-y-2">
                  <Label htmlFor="businessType">
                    Business type <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.businessType}
                    onValueChange={(value) => handleInputChange('businessType', value)}
                  >
                    <SelectTrigger className={errors.businessType ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select your business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dentists">Dentists</SelectItem>
                      <SelectItem value="hvac-trades">HVAC / trades</SelectItem>
                      <SelectItem value="local-services">Other local services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.businessType && (
                    <p className="text-sm text-red-500">{errors.businessType}</p>
                  )}
                </div>

                {/* Needs */}
                <div className="space-y-2">
                  <Label htmlFor="needs">
                    What are you hoping AI can help with? <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="needs"
                    placeholder="e.g. missed calls, intake chaos, repetitive admin, reporting…"
                    rows={4}
                    value={formData.needs}
                    onChange={(e) => handleInputChange('needs', e.target.value)}
                    className={errors.needs ? 'border-red-500' : ''}
                  />
                  {errors.needs && (
                    <p className="text-sm text-red-500">{errors.needs}</p>
                  )}
                </div>

                <p className="text-sm text-gray-500 italic">
                  We use this info only to prepare for your call. No spam, ever.
                </p>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#009CE3] hover:bg-[#0082C4] text-white"
                >
                  Submit details
                </Button>
              </form>
            </div>

            {/* Right Column: What to Expect */}
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What to expect on the call
              </h2>

              <p className="text-gray-700 mb-6 leading-relaxed">
                This is a collaborative conversation to understand your business and identify the best opportunities for automation.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#009CE3] mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">30 minutes on Zoom or phone</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#009CE3] mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">Quick overview of your current workflows</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#009CE3] mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">1–3 recommended automations you could implement</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-[#009CE3] mr-3 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">Time for your questions</span>
                </li>
              </ul>

              <p className="text-sm text-gray-600 italic border-t border-slate-300 pt-4">
                If we're not a fit, we'll tell you honestly.
              </p>
            </div>
          </div>

          {/* Step 2: Cal.com Embed */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Step 2 · Choose a time
            </h2>

            {!isSubmitted ? (
              <div className="bg-slate-50 border border-slate-300 rounded-lg p-6 text-center">
                <p className="text-gray-600">
                  Please complete the form above first. Once you submit, available times will appear here.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  Thanks! Now choose a time that works for you:
                </p>
                {/* TODO: replace with the real Cal.com booking link */}
                <iframe
                  src="https://cal.com/b.foroodian/30-min-ai-strategy-call"
                  title="Book a strategy call with FlowGenixAI"
                  className="w-full h-[650px] rounded-xl border border-slate-200"
                  allow="clipboard-write; fullscreen"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
