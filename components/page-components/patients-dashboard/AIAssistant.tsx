'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader, Button, Input, Textarea } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";

interface AIFeature {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
}

const roleFeatures: Record<string, AIFeature[]> = {
  superadmin: [
    {
      title: "System Analysis",
      description: "Analyze system performance and suggest optimizations",
      placeholder: "Enter specific metrics or areas to analyze...",
      buttonText: "Analyze System",
    },
    {
      title: "Predictive Analytics",
      description: "Generate predictions for platform growth and usage",
      placeholder: "Enter parameters for prediction...",
      buttonText: "Generate Prediction",
    },
  ],
  hospital: [
    {
      title: "Resource Optimization",
      description: "Optimize resource allocation and staffing",
      placeholder: "Enter current resource distribution...",
      buttonText: "Optimize Resources",
    },
    {
      title: "Patient Flow Analysis",
      description: "Analyze and optimize patient flow patterns",
      placeholder: "Enter patient flow data...",
      buttonText: "Analyze Flow",
    },
  ],
  professional: [
    {
      title: "Diagnostic Assistant",
      description: "Get AI assistance for diagnosis based on symptoms",
      placeholder: "Enter patient symptoms...",
      buttonText: "Get Diagnosis",
    },
    {
      title: "Treatment Planning",
      description: "Generate treatment plan suggestions",
      placeholder: "Enter diagnosis and patient history...",
      buttonText: "Generate Plan",
    },
  ],
  researcher: [
    {
      title: "Data Analysis",
      description: "Analyze research data and identify patterns",
      placeholder: "Enter research data points...",
      buttonText: "Analyze Data",
    },
    {
      title: "Literature Review",
      description: "AI-powered literature review and synthesis",
      placeholder: "Enter research topic...",
      buttonText: "Review Literature",
    },
  ],
  patient: [
    {
      title: "Symptom Checker",
      description: "Check symptoms and get preliminary advice",
      placeholder: "Describe your symptoms...",
      buttonText: "Check Symptoms",
    },
    {
      title: "Health Coach",
      description: "Get personalized health recommendations",
      placeholder: "Enter your health goals...",
      buttonText: "Get Recommendations",
    },
  ],
};

export default function AIAssistant({ role }: { role: string }) {
  const [activeFeature, setActiveFeature] = useState<string>("0");
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const features = roleFeatures[role] || [];

  const handleSubmit = async () => {
    // TODO: Implement actual AI integration
    setResult("AI analysis in progress... This is a placeholder response.");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">AI Assistant</h2>
      </CardHeader>
      <CardBody>
        <Tabs
          selectedKey={activeFeature}
          onSelectionChange={(key) => setActiveFeature(key.toString())}
        >
          {features.map((feature, index) => (
            <Tab key={index} title={feature.title}>
              <div className="space-y-4 p-4">
                <p className="text-gray-600">{feature.description}</p>
                <Textarea
                  placeholder={feature.placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  minRows={3}
                />
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  className="w-full"
                >
                  {feature.buttonText}
                </Button>
                {result && (
                  <Card className="mt-4">
                    <CardBody>
                      <p className="text-sm">{result}</p>
                    </CardBody>
                  </Card>
                )}
              </div>
            </Tab>
          ))}
        </Tabs>
      </CardBody>
    </Card>
  );
} 